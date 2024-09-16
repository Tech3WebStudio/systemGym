const { MercadoPagoConfig, Payment } = require("mercadopago");
const dotenv = require("dotenv");
dotenv.config();

const client = new MercadoPagoConfig({
  accessToken: process.env.ACCESS_TOKEN_MP,
  options: { timeout: 5000, idempotencyKey: "abc" },
});

const createOrder = async (req, res) => {
  const payment = new Payment(client);

  const body = {
    transaction_amount: 5000,
    description: "Pago mensual Gimnasio",
    payer: {
      email: "niveyrojulian5@gmail.com",
    },
  };

  const requestOptions = {
    idempotencyKey: process.env.PUBLIC_KEY_MP,
  };

  // Step 6: Make the request
  payment.create({ body, requestOptions }).then(console.log).catch(console.log);
};

module.exports = createOrder;
