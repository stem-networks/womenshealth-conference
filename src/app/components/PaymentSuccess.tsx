"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
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
  const status = searchParams.get("status");
  const web_token = searchParams.get("web_token");
  const orderID = searchParams.get("orderID");
  const other_info = searchParams.get("other_info");

  const general = generalData?.data || {};
  const email = general?.cemail || "";

  const [loading, setLoading] = useState(true);
  const [paymentStatus, setPaymentStatus] = useState<
    "success" | "not_done" | "error" | null
  >(null);

  let otherInfoObject: PaymentInfo = {};

  try {
    if (other_info) {
      const decodedString = atob(other_info);
      otherInfoObject = JSON.parse(decodedString);
    }
  } catch (error) {
    console.error("Error decoding payment data:", error);
  }

  useEffect(() => {
    const handlePayment = async () => {
      if (!web_token) {
        setPaymentStatus("error");
        setLoading(false);
        return;
      }

      // Extract project name from site_url
      const rawSiteUrl = general?.site_url || "";
      const projectName = rawSiteUrl
        .replace(/^https?:\/\//, "")
        .replace(".com", "")
        .trim();

      // If payment was marked success
      if (status === "success" && orderID && other_info) {
        try {
          const response = await fetch("/api/payment/confirm", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              payment_ref_id: orderID,
              projectName,
              web_token,
              payment_method: "PayPal",
              status: "success",
              total_price: otherInfoObject.total_price || "N/A",
              other_info: otherInfoObject.other_info || "N/A",
              discount_amt: otherInfoObject.discount_amt || 0,
            }),
          });

          console.log(
            'Payment Confirm',
            new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
          );

          const result = await response.json();

          if (result.success) {
            // Directly show final success content (do not redirect)
            setPaymentStatus("success");
            setLoading(false);
            return;
          }
        } catch (error) {
          console.error("Payment processing error:", error);
        }
      }

      // If orderID is missing or processing failed, check actual status


      try {
        const res = await axios.post("/api/payment-check", { projectName, web_token });
        const resData = res.data;

        if (resData.status === 200 && resData.data) {
          setPaymentStatus("success");
        } else {
          setPaymentStatus("not_done");
        }

        console.log(
          'Payment check',
          new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
        );

      } catch (error) {
        console.error("Client: Payment check failed", error);
        setPaymentStatus("error");
      }
    };

    handlePayment();
  }, [
    status,
    web_token,
    orderID,
    other_info,
    otherInfoObject.total_price,
    otherInfoObject.other_info,
    otherInfoObject.discount_amt,
  ]);

  return (
    <div style={styles.container}>
      <div
        style={
          paymentStatus === "not_done" ? styles.failureBox : styles.successBox
        }
      >
        {loading ? (
          <p>Loading... Please wait while we check your payment status.</p>
        ) : paymentStatus === "success" ? (
          <>
            <h2>Payment Successful</h2>
            <p>Thank you for your payment.</p>
            <p>
              Our conference program manager will contact you at your registered
              email address within the next 24 hours.
            </p>
            <p>
              If you have any questions, feel free to reach out to us at{" "}
              <a href={`mailto:${email}`}>{email}</a>.
            </p>
          </>
        ) : paymentStatus === "not_done" ? (
          <>
            <h4 style={styles.headingTitle}>
              Something Went Wrong! Please Check Before Retrying
            </h4>
            <div style={styles.content1}>
              <ul>
                <li>Try again only if the amount was not deducted.</li>
                <li>
                  If the amount was deducted, please write to{" "}
                  <a href={`mailto:${email}`}>{email}</a> and allow us some time
                  to check and update you on the payment status.
                </li>
                <li>
                  If you made multiple attempts and were charged more than once,
                  reach out to us at <a href={`mailto:${email}`}>{email}</a> for
                  assistance.
                </li>
              </ul>
            </div>
          </>
        ) : (
          <p>
            Payment error. Order ID is missing or invalid. Please contact admin
            for assistance.
          </p>
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

export default PaymentSuccess;
