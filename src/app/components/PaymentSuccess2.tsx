// File: components/PaymentSuccess2.tsx
"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { ApiResponse } from "@/types";

interface PaymentSuccess2Props {
  generalData: ApiResponse;
}

const PaymentSuccess2: React.FC<PaymentSuccess2Props> = ({ generalData }) => {
    const general = generalData?.data || {};
  const searchParams = useSearchParams();
  const web_token = searchParams.get("web_token");

  const [paymentStatus, setPaymentStatus] = useState<"success" | "not_done" | "error" | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkPayment = async () => {
      if (!web_token) {
        setPaymentStatus("error");
        setLoading(false);
        return;
      }

      const paymentCheckData = {
        module_name: "payment_check",
        keys: { data: [{ web_token }] },
        cid: process.env.NEXT_PUBLIC_CID,
      };

      try {
        const response = await axios.post(process.env.NEXT_PUBLIC_API_URL || "", paymentCheckData);
        const resData = response.data;

        if (resData.status === 200 && resData.data) {
          setPaymentStatus("success");
        } else {
          setPaymentStatus("not_done");
        }
      } catch (error) {
        console.error("Payment check failed:", error);
        setPaymentStatus("error");
      } finally {
        setLoading(false);
      }
    };

    checkPayment();
  }, [web_token]);

  const email = general?.cemail || "";

  return (
    <div style={styles.container}>
      <div style={paymentStatus === "not_done" ? styles.failureBox : styles.successBox}>
        {loading ? (
          <p>Loading... Please wait while we check your payment status.</p>
        ) : paymentStatus === "success" ? (
          <>
            <h2>Payment Successful</h2>
            <p>Thank you for your payment.</p>
            <p>Our conference program manager will contact you at your registered email address within the next 24 hours.</p>
            <p>
              If you have any questions, feel free to reach out to us at{" "}
              <a href={`mailto:${email}`}>{email}</a>.
            </p>
          </>
        ) : paymentStatus === "not_done" ? (
          <>
            <h4 style={styles.headingTitle}>Something Went Wrong! Please Check Before Retrying</h4>
            <div style={styles.content1}>
              <ul>
                <li>Try again only if the amount was not deducted.</li>
                <li>
                  If the amount was deducted, please write to{" "}
                  <a href={`mailto:${email}`}>{email}</a> and allow us some time to check and update you on the payment status.
                </li>
                <li>
                  If you made multiple attempts and were charged more than once, reach out to us at{" "}
                  <a href={`mailto:${email}`}>{email}</a> for assistance.
                </li>
              </ul>
            </div>
          </>
        ) : (
          <p>Error checking payment status. Please contact admin for assistance.</p>
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
  successBox: {
    maxWidth: "600px",
    width: "90%",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
  },
  failureBox: {
    maxWidth: "800px",
    width: "90%",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    textAlign: "left",
  },
  content1: {
    marginTop: "10px",
    marginBottom: "0px",
  },
  headingTitle: {
    color: "#737373",
    fontWeight: 600,
    fontSize: "24px",
    textAlign: "center",
  },
};

export default PaymentSuccess2;
