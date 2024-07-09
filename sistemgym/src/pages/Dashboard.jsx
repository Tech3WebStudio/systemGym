import { useSelector } from "react-redux";
import { Layout } from "../components/Layout/Layout";

export function Dashboard() {
  const isAuth = useSelector((state) => state.auth.isAuth);

  return (
    <Layout isAuth={isAuth}>
      <div className="flex">
        <h1 className="text-gray-400">Dashboard</h1>
        <main className="flex-1 p-4 grid mt-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <section className="bg-white p-4 rounded shadow">
          <h3 className="text-xl font-semibold mb-2">Usuarios Registrados</h3>
          <p className="text-2xl">1200</p>
        </section>
        
        <section className="bg-white p-4 rounded shadow">
          <h3 className="text-xl font-semibold mb-2">Ingresos del Mes</h3>
          <p className="text-2xl">$20,000</p>
        </section>
        
        <section className="bg-white p-4 rounded shadow">
          <h3 className="text-xl font-semibold mb-2">Clases Programadas</h3>
          <p className="text-2xl">15</p>
        </section>
        
        <section className="bg-white p-4 rounded shadow col-span-1 md:col-span-2">
          <h2 className="text-xl font-semibold mb-2">Actividades Recientes</h2>
          <ul className="list-disc list-inside space-y-2 bg-gray-200 p-4 rounded-lg">
            <li className="bg-gray-100 p-4 hover:bg-gray-50">Juan Pérez se registró hace 2 horas</li>
            <li className="bg-gray-100 p-4 hover:bg-gray-50">Pago recibido de Ana Gómez por $50</li>
            <li className="bg-gray-100 p-4 hover:bg-gray-50">Clase de Yoga programada para mañana a las 9 AM</li>
          </ul>
        </section>
        
        <section className="bg-white p-4 rounded shadow col-span-1 md:col-span-2 lg:col-span-3">
          <h2 className="text-xl font-semibold mb-2">Calendario de Eventos</h2>
          {/* Puedes utilizar un componente de calendario aquí */}
        </section>
        
        <section className="bg-white p-4 rounded shadow col-span-1 md:col-span-2">
          <h2 className="text-xl font-semibold mb-2">Notificaciones</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>El pago de Luis García está pendiente</li>
            <li>Clase de Spinning cancelada</li>
          </ul>
        </section>
      </main>
      </div>
    </Layout>
  );
}
