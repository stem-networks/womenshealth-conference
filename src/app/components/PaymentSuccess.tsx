// File: components/PaymentSuccess.tsx
"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { ApiResponse } from "@/types";

interface PaymentSuccessProps {
  generalData: ApiResponse;
}

type PaymentInfo = {
  total_price?: string;
  other_info?: string;
  discount_amt?: number;
};

const PaymentSuccess: React.FC<PaymentSuccessProps> = ({ generalData }) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const general = generalData?.data || {};

  const status = searchParams.get("status");
  const web_token = searchParams.get("web_token");
  const orderID = searchParams.get("orderID");
  const other_info = searchParams.get("other_info");

  const [loading, setLoading] = useState(true);
  const [paymentStatus, setPaymentStatus] = useState<string | null>(null);

  let otherInfoObject: PaymentInfo = {};

  try {
    if (other_info) {
      const decodedString = atob(other_info);
      otherInfoObject = JSON.parse(decodedString);
    }
  } catch (error) {
    console.error("Error decoding payment data:", error);
    otherInfoObject = {};
  }

useEffect(() => {
  const confirmPayment = async () => {
    if (!orderID || !other_info) {
      setPaymentStatus("error");
      setLoading(false);
      return;
    }

    if (status === "success") {
      try {
        const response = await fetch("/api/payment/confirm", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            payment_ref_id: orderID,
            web_token,
            payment_method: "PayPal",
            status: "success",
            total_price: otherInfoObject.total_price || "N/A",
            other_info: otherInfoObject.other_info || "N/A",
            discount_amt: otherInfoObject.discount_amt || 0,
          }),
        });

        const result = await response.json();

        if (result.success) {
          setPaymentStatus("success");
          setLoading(false);
          setTimeout(() => {
            router.push(`/payment-success?web_token=${web_token}`);
          }, 1000);
        } else {
          throw new Error("Server rejected payment");
        }
      } catch (error) {
        console.error("Payment processing error:", error);
        setPaymentStatus("failure");
        setLoading(false);
      }
    } else {
      setPaymentStatus("error");
      setLoading(false);
    }
  };

  confirmPayment();
}, [
  status,
  web_token,
  orderID,
  other_info,
  router,
  otherInfoObject.total_price,
  otherInfoObject.other_info,
  otherInfoObject.discount_amt,
]);


  return (
    <div style={styles.container}>
      <div style={styles.box}>
        {loading ? (
          <div>
            <h2>Please wait... Processing your payment</h2>
            <p>Your payment is being processed. This may take a few seconds.</p>
          </div>
        ) : (
          <div>
            {paymentStatus === "success" ? (
              <div>
                <h2>Payment Successful</h2>
                <p>Thank you for your payment.</p>
                <p>
                  Our conference program manager will contact you at your
                  registered email address within the next 24 hours.
                </p>
                <p>
                  If you have any questions, feel free to reach out to us at{" "}
                  <a href={`mailto:${general.cemail}`}>
                    {general.cemail || ""}
                  </a>
                  .
                </p>
              </div>
            ) : paymentStatus === "failure" ? (
              <div>
                <h4 style={styles.headingTitle}>
                  Something Went Wrong! Please Check Before Retrying
                </h4>
                <div className="content1" style={styles.content1}>
                  <ul>
                    <li>Try again only if the amount was not deducted.</li>
                    <li>
                      If the amount was deducted, please write to{" "}
                      <a href={`mailto:${general.cemail}`}>
                        {general.cemail || ""}
                      </a>{" "}
                      and allow us some time to check and update you on the
                      payment status.
                    </li>
                    <li>
                      If you made multiple attempts and were charged more than
                      once, reach out to us at{" "}
                      <a href={`mailto:${general.cemail}`}>
                        {general.cemail || ""}
                      </a>{" "}
                      for assistance.
                    </li>
                  </ul>
                </div>
              </div>
            ) : (
              <p>
                Payment error. Order ID is missing. Please contact admin for
                assistance.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "60vh",
    textAlign: "center",
  },
  box: {
    maxWidth: "800px",
    width: "90%",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
  },
  content1: {
    marginTop: "10px",
    marginBottom: "0px",
    textAlign: "left",
  },
  headingTitle: {
    color: "#737373",
    fontWeight: 600,
    fontSize: "24px",
    textAlign: "center",
  },
};

export default PaymentSuccess;
