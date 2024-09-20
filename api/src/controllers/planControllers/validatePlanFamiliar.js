const { User, Plan, Sequelize } = require('../../db');
const moment = require('moment');
const  Op  = Sequelize;

// Validar el plan familiar y la lógica de desactivación y reactivación
const validateFamilyPlan = async (req, res) => {
  try {
    const { familyGroupId, paymentData } = req.body; // paymentData debe incluir id del usuario y tipo de plan (individual o diario)

    // Buscar el plan familiar de todos los usuarios en ese grupo
    const familyMembers = await User.findAll({
      where: { specialGroupId: familyGroupId }, // Asumimos que hay un grupo familiar
      include: [Plan]
    });

    if (familyMembers.length < 3) {
      return res.status(400).json({ message: 'Un plan familiar requiere al menos 3 miembros.' });
    }

    let unpaidMembers = [];
    let paidMembers = [];

    familyMembers.forEach((member) => {
      const plan = member.Plan;

      if (plan.planType !== 'family') {
        return res.status(400).json({ message: 'Este usuario no pertenece a un plan familiar.' });
      }

      const planExpiration = moment(plan.expirationDate);
      const currentDate = moment();
      const daysSinceExpiration = currentDate.diff(planExpiration, 'days');

      if (currentDate.isAfter(planExpiration)) {
        if (daysSinceExpiration <= 7) {
          unpaidMembers.push(member);
        } else {
          // Si pasan más de 7 días, cancelar el plan familiar para todos
          unpaidMembers.push(member);
        }
      } else {
        paidMembers.push(member); // Miembro ha pagado dentro del período de vigencia
      }
    });

    // Procesar pagos para cambiar de plan
    for (const payment of paymentData) {
      const member = await User.findByPk(payment.userId);
      if (!member) continue;

      // Verificar que haya pagado el plan elegido
      const selectedPlan = payment.planType; // 'individual' o 'daily'
      const planDetails = await Plan.findOne({ where: { planType: selectedPlan } });

      if (!planDetails) {
        return res.status(400).json({ message: `El tipo de plan ${selectedPlan} no existe.` });
      }

      // Verificar si pagó el precio correspondiente
      if (payment.amountPaid < planDetails.price) {
        return res.status(400).json({
          message: `El pago es insuficiente para el plan ${selectedPlan}. Se requieren ${planDetails.price}.`
        });
      }

      // Cambiar el plan del usuario al seleccionado con su precio y vigencia
      const newExpirationDate = selectedPlan === 'individual' 
        ? moment().add(30, 'days') 
        : moment().add(1, 'days'); // Si es plan por día, se agrega 1 día

      await Plan.update(
        { planType: selectedPlan, expirationDate: newExpirationDate },
        { where: { id: member.planId } }
      );

      paidMembers.push(member);
    }

    // Si algún miembro no pagó dentro de 7 días, cancelar plan familiar para todos
    if (unpaidMembers.length > 0) {
      for (const member of familyMembers) {
        // Si no pagaron en los 14 días, borrar el plan
        if (!paidMembers.includes(member)) {
          await member.update({ planId: null }); // Eliminar el plan
        }
      }

      return res.status(200).json({ message: 'El plan familiar fue desactivado. Los miembros que pagaron fueron movidos al plan seleccionado.' });
    }

    return res.status(200).json({ message: 'Todos los miembros del plan familiar están al día.' });
  } catch (error) {
    return res.status(500).json({ message: 'Error en el servidor', error });
  }
};

module.exports = validateFamilyPlan;
