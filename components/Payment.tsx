import { useStripe } from "@stripe/stripe-react-native";
import React, { useState } from "react";
import { Alert } from "react-native";
import CustomButton from "@/components/CustomButton";
import { PaymentProps } from "@/types/type";

const Payment = ({ amount }: PaymentProps) => {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  // const { userId } = useAuth();
  const [success, setSuccess] = useState<boolean>(false);

  const openPaymentSheet = async () => {
    await initializePaymentSheet();

    const { error } = await presentPaymentSheet();

    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message);
    } else {
      setSuccess(true);
    }
  };

  const initializePaymentSheet = async () => {
    const { error } = await initPaymentSheet({
      merchantDisplayName: "Example, Inc.",
      intentConfiguration: {
        mode: {
          amount: parseInt(amount) * 100,
          currencyCode: "usd",
        },
        confirmHandler: async(),
      },
    });
    if (!error) {
      // setLoading(true);
    }
  };
  return (
    <>
      <CustomButton
        title="Confirm Ride"
        className="my-10"
        onPress={openPaymentSheet}
      />
    </>
  );
};

export default Payment;
