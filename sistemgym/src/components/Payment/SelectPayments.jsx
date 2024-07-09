import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";

const SelectPayments = () => {
  initMercadoPago("YOUR_PUBLIC_KEY", {
    locale: "es-AR"
  });
  return (
    <div className="flex justify-center align-middle items-center">
      <Wallet
        initialization={{ preferenceId: "<PREFERENCE_ID>" }}
        customization={{ texts: { valueProp: "smart_option" } }}
      />
    </div>
  );
};

export default SelectPayments;
