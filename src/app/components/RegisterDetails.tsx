"use client";

import React, { useState, useEffect, useRef } from "react";
// import Head from "next/head";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
// import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
// import {
//   CreateOrderData,
//   CreateOrderActions,
//   OnApproveData,
//   OnApproveActions,
// } from "@paypal/paypal-js";

interface RegistrationData {
  name?: string;
  email?: string;
  phone?: string;
  country?: string;
  reg_type?: string;
  participants?: number;
  reg_price?: number;
  occupancy_price?: number;
  nights?: number;
  checkin_date?: string;
  checkout_date?: string;
  accompanying?: number;
  accompanying_price?: number;
  total_price?: number;
  web_token?: string;
  other_info?: Record<string, unknown>;
  transaction_id?: string | null;
}

interface DiscountDetails {
  checkEmail?: string;
  coupon_code?: string;
  reg_per?: number;
  acc_per?: number;
  cust_amt?: number;
  applied_with?: string;
}

interface ActualAmount {
  [key: string]: string | number;
}

interface GeneralInfo {
  csname?: string;
  year?: string;
  clname?: string;
}
interface RegisterDetailsClientProps {
  generalInfo: GeneralInfo; // Replace `any` with the correct type if available
}

const RegisterDetails = ({ generalInfo }: RegisterDetailsClientProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [details, setDetails] = useState<RegistrationData | null>(null);
  const [showCancelModal, setShowCancelModal] = useState<boolean>(false);
  const [discountDetails, setDiscountDetails] =
    useState<DiscountDetails | null>(null);
  const [actualAmount, setActualAmount] = useState<ActualAmount | null>(null);
  const [localError, setLocalError] = useState("");
  const [checkEmail, setCheckEmail] = useState("");

  const [showModal, setShowModal] = useState<boolean>(false);
  const [couponCodeToCheck, setCouponCodeToCheck] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [showCoupon, setShowCoupon] = useState(false);

  const [adjustedPrice, setAdjustedPrice] = useState<number>(0);
  const [payTotal, setPayTotal] = useState<number>(0);
  //   const adjustedPriceRef = useRef<number>(adjustedPrice);
  const adjustedPriceRef = useRef<number>(0); // Initialize with 0
  const actualAmountRef = useRef<ActualAmount | null>(null);
  const [clientId, setClientId] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);
  // const [isClientReady, setIsClientReady] =  useState<string | null>(null);

  console.log(isPending);
  // console.log("adjust price", adjustedPrice);

  useEffect(() => {
    fetch("/api/paypal-client-id")
      .then((res) => res.json())
      .then((data) => setClientId(data.clientId))
      .catch((err) => console.error("Failed to fetch PayPal clientId", err));
  }, []);

  useEffect(() => {
    if (searchParams?.has("discount")) {
      setShowCoupon(true);
    } else {
      setShowCoupon(false);
    }
  }, [searchParams]);


  useEffect(() => {
    const fetchDetails = async () => {
      const web_token = searchParams?.get("web_token");
      if (!web_token) return;

      try {
        const response = await axios.post("/api/registration-details", {
          web_token,
        });

        if (response.status === 200 && response.data) {
          const data = response.data.data;
          setDetails(data);

          // Prevent double redirect if already on payment_success page
          if (
            data?.transaction_id !== null &&
            !window.location.pathname.includes("payment_success")
          ) {
            router.replace(`/payment_success?web_token=${web_token}`);
          }
        } else {
          setDetails(null);
        }
      } catch (error) {
        console.error("Client error:", error);
        setDetails(null);
      }
    };

    fetchDetails();
  }, [searchParams, router]);


  const dataToShow = details;

  const totalAccommodationPrice =
    (dataToShow?.occupancy_price || 0) * (dataToShow?.nights || 0);

  let totalRegistrationPrice = 0;
  if (dataToShow?.reg_type === "customized-registration") {
    totalRegistrationPrice = dataToShow?.reg_price || 0;
  } else {
    totalRegistrationPrice =
      (dataToShow?.reg_price || 0) * (dataToShow?.participants || 0);
  }

  const convertToDDMMYYYY = (dateStr: string) => {
    const [year, month, day] = dateStr.split("-");
    return `${day}-${month}-${year}`;
  };

  const formatDateWithDay = (dateStr: string) => {
    if (dateStr === "NA") return "NA";

    const [day, month, year] = dateStr.split("-");
    const dateObj = new Date(`${year}-${month}-${day}`);

    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const dayName = daysOfWeek[dateObj.getUTCDay()];
    const monthName = months[parseInt(month) - 1];
    const formattedDay = day.padStart(2, "0");

    return `${monthName} ${formattedDay}, ${year} (${dayName})`;
  };

  useEffect(() => {
    if (dataToShow?.email) {
      setCheckEmail(dataToShow.email);
    }
  }, [dataToShow]);

  useEffect(() => {
    if (!checkEmail) return;
    if (actualAmountRef.current !== null) return;

    // console.log("email coupon", checkEmail);
    const fetchDiscountDetails = async () => {
      try {
        const payload = {
          email: checkEmail || "",
          coupon_code: "",
        };

        const response = await fetch("/api/register_details", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        const data = await response.json();

        // console.log("data details", data);

        if (data.success) {
          setDiscountDetails({
            checkEmail: checkEmail || "",
            coupon_code: couponCodeToCheck || "",
            reg_per: data.reg_per || 0,
            acc_per: data.acc_per || 0,
            cust_amt: data.cust_amt || 0,
          });

          const newActualAmount = data.cust_amt
            ? {
              "Discount Applied With": data.applied_with || "",
              "Total Amount": payTotal || 0,
              "Discount Amount": payTotal - (data.cust_amt || payTotal),
              "Final Amount After Discount": data.cust_amt || 0,
            }
            : {
              "Discount Applied With": data.applied_with || "",
              "Total Amount": payTotal || 0,
              [`Registration Discount (${data?.reg_per || "0"}%) Applied:`]:
                (totalRegistrationPrice * (data?.reg_per || 0)) / 100 || 0,
              [`Accommodation Discount (${data?.acc_per || "0"}%) Applied:`]:
                (totalAccommodationPrice * (data?.acc_per || 0)) / 100 || 0,
              "Final Amount After Discount":
                payTotal -
                (totalRegistrationPrice * (data?.reg_per || 0)) / 100 -
                (totalAccommodationPrice * (data?.acc_per || 0)) / 100 || 0,
            };
          setActualAmount(newActualAmount);
          actualAmountRef.current = newActualAmount;
        } else {
          setLocalError("");
        }
      } catch (err) {
        setLocalError(
          "Error fetching discount details: " + (err as Error).message
        );
      }
    };

    fetchDiscountDetails();
  }, [
    checkEmail,
    payTotal,
    totalRegistrationPrice,
    totalAccommodationPrice,
    couponCodeToCheck,
  ]);

  const toggleModal = () => {
    setShowModal(!showModal);

    if (showModal) {
      setCouponCodeToCheck("");
      setLocalError("");
    }
  };

  useEffect(() => {
    if (showModal && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showModal]);

  const handleApplyCoupon = async () => {
    setLocalError("");

    if (!couponCodeToCheck) {
      setLocalError("Please enter a coupon code.");
      if (inputRef.current) {
        inputRef.current.focus();
      }
      return;
    }

    try {
      const payload: {
        coupon_code: string;
        email?: string;
      } = {
        coupon_code: couponCodeToCheck,
      };

      if (checkEmail) {
        payload.email = checkEmail;
      }

      const response = await fetch("/api/register_details", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      // console.log("data apply coupon", data);

      if (data.success) {
        setDiscountDetails({
          coupon_code: couponCodeToCheck || "",
          reg_per: data.reg_per || 0,
          acc_per: data.acc_per || 0,
          cust_amt: data.cust_amt || 0,
        });
        setActualAmount(dataToShow?.other_info as ActualAmount);

        let updatedActualAmount: ActualAmount = {
          "Discount Applied With": data.applied_with || "",
          "Total Amount": payTotal || 0,
          "Discount Amount": payTotal - (data.cust_amt || payTotal),
          "Final Amount After Discount": data.cust_amt || 0,
        };

        if (!data.cust_amt) {
          const regDiscount =
            (totalRegistrationPrice * (data.reg_per || 0)) / 100;
          const accDiscount =
            (totalAccommodationPrice * (data.acc_per || 0)) / 100;

          updatedActualAmount = {
            ...updatedActualAmount,
            [`Registration Discount (${data.reg_per || "0"}%) Applied:`]:
              regDiscount || 0,
            [`Accommodation Discount (${data.acc_per || "0"}%) Applied:`]:
              accDiscount || 0,
            "Discount Amount": regDiscount + accDiscount || 0,
            "Final Amount After Discount": payTotal - regDiscount - accDiscount,
          };
        }

        if (couponCodeToCheck) {
          updatedActualAmount["Coupon Code"] = couponCodeToCheck;
        }

        setActualAmount(updatedActualAmount);
        actualAmountRef.current = updatedActualAmount;
        setLocalError("");
        toggleModal();
      } else {
        setLocalError("Invalid Coupon.");
      }
    } catch (err) {
      setLocalError("Error applying coupon: " + (err as Error).message);
      console.error("Error applying coupon:", err);

    }
  };

  useEffect(() => {
    if (actualAmount !== null) {
      actualAmountRef.current = actualAmount;
    }
  }, [actualAmount]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleApplyCoupon();
    }
  };

  useEffect(() => {
    let finalPrice = dataToShow?.total_price || 0;

    if (discountDetails?.cust_amt && discountDetails.cust_amt > 0) {
      finalPrice = discountDetails.cust_amt;
    } else if (
      (discountDetails?.reg_per && discountDetails.reg_per > 0) ||
      (discountDetails?.acc_per && discountDetails.acc_per > 0)
    ) {
      const registrationDiscount =
        (totalRegistrationPrice * (discountDetails?.reg_per || 0)) / 100 || 0;
      const accommodationDiscount =
        (totalAccommodationPrice * (discountDetails?.acc_per || 0)) / 100 || 0;
      finalPrice = Math.max(
        0,
        Math.round(
          (dataToShow?.total_price || 0) -
          registrationDiscount -
          accommodationDiscount
        )
      );
    }

    setAdjustedPrice(finalPrice);
    setPayTotal(finalPrice);
    adjustedPriceRef.current = finalPrice;
  }, [
    discountDetails,
    dataToShow,
    totalRegistrationPrice,
    totalAccommodationPrice,
  ]);

  // async function sendErrorToCMS({
  //   name,
  //   email,
  //   errorMessage,
  //   formBased = "PayPal Payment",
  // }: {
  //   name: string;
  //   email: string;
  //   errorMessage: string;
  //   formBased?: string;
  // }) {
  //   try {
  //     const payload = new FormData();
  //     payload.append("name", name);
  //     payload.append("email", email);
  //     payload.append("error_message", errorMessage);
  //     payload.append("form_based", formBased);

  //     const res = await fetch("/api/send-to-telegram", {
  //       method: "POST",
  //       body: payload,
  //     });

  //     if (!res.ok) {
  //       console.error("Failed to send error to CMS");
  //     }
  //   } catch (err) {
  //     console.error("Error sending to CMS:", err);
  //   }
  // }



  // sendError to Telegram 
  async function sendErrorToCMS({
    name,
    email,
    errorMessage,
    formBased = "PayPal Payment",
    siteName = `${generalInfo.clname || "N/A"} (${generalInfo.csname || "N/A"} - ${generalInfo.year || "N/A"})`,
  }: {
    name: string;
    email: string;
    errorMessage: string;
    formBased?: string;
    siteName?: string;
  }) {
    try {
      const payload = new FormData();
      payload.append("name", name);
      payload.append("email", email);
      payload.append("error_message", errorMessage);
      payload.append("form_based", formBased);
      payload.append("siteName", siteName); // added

      const res = await fetch("/api/send-to-telegram", {
        method: "POST",
        body: payload,
      });

      if (!res.ok) {
        console.error("❌ Failed to send error to Telegram API");
      }
    } catch (err) {
      console.error("❌ Exception while sending error to Telegram:", err);
    }
  }


  return (
    <div>
      <div className="brand_wrap">
        <div className="auto-container">
          <div className="row">
            <div className="col-md-12">
              <Link href="/" title="Navigate to Homepage">
                Home
              </Link>{" "}
              <i className="fa fa-angle-right"></i> <span>Payment Details</span>
            </div>
          </div>
        </div>
      </div>

      <h2
        className="abs_wrap5 wow fadeInUp"
        data-wow-delay="400ms"
        data-wow-duration="1000ms"
      >
        Payment Details
      </h2>

      <div className="auto-container">
        <div className="row clearfix payment-block">
          <div className="col-md-9">
            <div
              className="count_total_wrap wow fadeInUp"
              data-wow-delay="400ms"
              data-wow-duration="1000ms"
            >
              <div className="sup_wrap_blue">
                <table width="100%" cellSpacing="0" cellPadding="0">
                  <tbody>
                    {dataToShow?.name && (
                      <tr>
                        <td className="re_p3">Name:</td>
                        <td className="re_p3 text-right fw-600">
                          {dataToShow.name}
                        </td>
                      </tr>
                    )}
                    {dataToShow?.email && (
                      <tr>
                        <td className="re_p3">Email:</td>
                        <td className="re_p3 text-right fw-600">
                          {dataToShow.email}
                        </td>
                      </tr>
                    )}
                    {dataToShow?.phone && (
                      <tr>
                        <td className="re_p3">Phone:</td>
                        <td className="re_p3 text-right fw-600">
                          {dataToShow.phone}
                        </td>
                      </tr>
                    )}
                    {dataToShow?.country && (
                      <tr>
                        <td className="re_p3">Country:</td>
                        <td className="re_p3 text-right fw-600">
                          {dataToShow.country}
                        </td>
                      </tr>
                    )}
                    {dataToShow?.reg_type && (
                      <tr>
                        <td className="re_p3">Registration Type:</td>
                        <td className="re_p3 text-right fw-600">
                          {dataToShow.reg_type}
                        </td>
                      </tr>
                    )}
                    {(dataToShow?.participants || 0) > 0 && (
                      <tr>
                        <td className="re_p3 brb-none">Participants:</td>
                        <td className="re_p3 brb-none text-right fw-600">
                          {dataToShow?.participants}
                        </td>
                      </tr>
                    )}

                    {(dataToShow?.reg_price || 0) > 0 &&
                      dataToShow?.reg_type !== "customized-registration" && (
                        <tr>
                          <td className="re_p3">Registration Price:</td>
                          <td className="re_p3 text-right fw-600">
                            ${dataToShow?.reg_price}
                          </td>
                        </tr>
                      )}

                    {totalRegistrationPrice >= 0 && (
                      <tr>
                        <td className="re_p3_main">
                          Total Registration Price:
                        </td>
                        <td className="re_p3_main text-right fw-600">
                          ${Math.round(totalRegistrationPrice)}
                        </td>
                      </tr>
                    )}

                    {(dataToShow?.occupancy_price || 0) > 0 &&
                      dataToShow?.reg_type !== "customized-registration" && (
                        <tr>
                          <td className="re_p3">
                            Accommodation Price Per Night:
                          </td>
                          <td className="re_p3 text-right fw-600">
                            ${dataToShow?.occupancy_price}
                          </td>
                        </tr>
                      )}

                    {(dataToShow?.nights || 0) > 0 && (
                      <tr>
                        <td className="re_p3">Total No. Nights:</td>
                        <td className="re_p3 text-right fw-600">
                          {dataToShow?.nights}
                        </td>
                      </tr>
                    )}
                    {dataToShow?.checkin_date &&
                      (dataToShow?.nights ?? 0) > 0 && (
                        <tr>
                          <td className="re_p3">Check-in Date:</td>
                          <td className="re_p3 text-right fw-600">
                            {formatDateWithDay(
                              convertToDDMMYYYY(dataToShow.checkin_date)
                            )}
                          </td>
                        </tr>
                      )}

                    {dataToShow?.checkout_date &&
                      (dataToShow?.nights ?? 0) > 0 && (
                        <tr>
                          <td className="re_p3 brb-none">Check-out Date:</td>
                          <td className="re_p3 brb-none text-right fw-600">
                            {formatDateWithDay(
                              convertToDDMMYYYY(dataToShow.checkout_date)
                            )}
                          </td>
                        </tr>
                      )}

                    {(totalAccommodationPrice > 0 ||
                      ((dataToShow?.nights ?? 0) > 0 &&
                        dataToShow?.reg_type ===
                        "customized-registration")) && (
                        <tr>
                          <td className="re_p3_main">
                            Total Accommodation Price:
                          </td>
                          <td className="re_p3_main text-right fw-600">
                            ${Math.round(totalAccommodationPrice)}
                          </td>
                        </tr>
                      )}

                    {(dataToShow?.accompanying_price ?? 0) > 0 && (
                      <tr>
                        <td className="re_p3 brb-none">
                          No of Accompanying Persons ($
                          {(dataToShow?.accompanying ?? 0) > 0
                            ? `${Math.round(
                              (dataToShow?.accompanying_price ?? 0) /
                              (dataToShow?.accompanying ?? 1)
                            )}`
                            : "N/A"}{" "}
                          each Person):
                        </td>
                        <td className="re_p3 brb-none text-right fw-600">
                          {dataToShow?.accompanying ?? 0}
                        </td>
                      </tr>
                    )}

                    {(dataToShow?.accompanying_price || 0) > 0 && (
                      <tr>
                        <td className="re_p3_main">
                          Total Accompanying Persons Price:
                        </td>
                        <td className="re_p3_main text-right fw-600">
                          ${dataToShow?.accompanying_price}
                        </td>
                      </tr>
                    )}

                    {(dataToShow?.total_price ?? 0) > 0 && (
                      <tr>
                        <td className="re_p4">Total Price:</td>
                        <td className="re_p4 text-right fw-600">
                          ${Math.round(dataToShow?.total_price ?? 0)}
                        </td>
                      </tr>
                    )}

                    {showCoupon && (
                      <tr>
                        <td colSpan={2}>
                          <button
                            type="button"
                            className="coupon-link"
                            onClick={toggleModal}
                          >
                            Have a discount coupon?
                          </button>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>

                <table
                  width="100%"
                  cellSpacing="0"
                  cellPadding="0"
                  className="discount-table"
                >
                  <tbody>
                    {discountDetails?.reg_per != null &&
                      discountDetails.reg_per > 0 && (
                        <tr>
                          <td className="re_p3">
                            Registration Discount ({discountDetails.reg_per}%)
                            Applied:
                          </td>
                          <td className="re_p3 text-right fw-600 re_p3_right">
                            -$
                            {Math.round(
                              (totalRegistrationPrice *
                                discountDetails.reg_per) /
                              100
                            )}
                          </td>
                        </tr>
                      )}

                    {totalAccommodationPrice > 0 &&
                      discountDetails &&
                      (discountDetails.acc_per || 0) > 0 && (
                        <tr>
                          <td className="re_p3">
                            Accommodation Discount ({discountDetails.acc_per}%)
                            Applied:
                          </td>
                          <td className="re_p3 text-right fw-600 re_p3_right">
                            -$
                            {Math.round(
                              (totalAccommodationPrice *
                                (discountDetails.acc_per || 0)) /
                              100
                            )}
                          </td>
                        </tr>
                      )}

                    {((discountDetails?.reg_per || 0) > 0 ||
                      (discountDetails?.acc_per || 0) > 0) && (
                        <tr>
                          <td className="re_p3_main">
                            Final Amount After Discount:
                          </td>
                          <td className="re_p3_main text-right fw-600 re_p3_main_right">
                            ${adjustedPrice}
                          </td>
                        </tr>
                      )}

                    {(discountDetails?.cust_amt || 0) > 0 && (
                      <tr>
                        <td className="re_p3">Discount Amount:</td>
                        <td className="re_p3 text-right fw-600 re_p3_main_right">
                          -$
                          {(dataToShow?.total_price || 0) -
                            (discountDetails?.cust_amt || 0)}
                        </td>
                      </tr>
                    )}

                    {discountDetails && (discountDetails.cust_amt || 0) > 0 && (
                      <tr>
                        <td className="re_p3_main">
                          Final Amount After Discount:
                        </td>
                        <td className="re_p3_main text-right fw-600 re_p3_main_right">
                          ${discountDetails.cust_amt}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="pg-head">Payment Gateway</div>
            <div className="payment-section">
              {clientId && adjustedPrice ? (
                <PayPalScriptProvider
                  options={{
                    clientId: clientId,
                    currency: "USD",
                    intent: "capture",
                    // debug: true,
                  }}
                >
                  <PayPalButtons
                    style={{ layout: "vertical" }}
                    onClick={(data, actions) => {
                      // console.log("🔵 [PayPal] onClick Triggered");
                      console.log("🟡 Click Payload:", { data, actions });
                    }}
                    createOrder={async () => {
                      // console.log("🟢 [PayPal] createOrder Triggered");
                      setIsPending(true);

                      try {
                        const payload = {
                          totalAmount: adjustedPriceRef.current,
                          description: `Registration for ${dataToShow?.name}`,
                        };
                        // console.log(
                        //   "📦 Sending to /api/paypal/create-order:",
                        //   payload
                        // );

                        const res = await fetch("/api/paypal/create-order", {
                          method: "POST",
                          headers: {
                            "Content-Type": "application/json",
                          },
                          body: JSON.stringify(payload),
                        });

                        const data = await res.json();
                        // console.log("✅ create-order Response:", data);

                        if (!res.ok)
                          throw new Error(
                            data?.message || "Failed to create order"
                          );

                        return data.orderID;
                      } catch (error) {
                        console.error("❌ Error in createOrder:", error);
                        await sendErrorToCMS({
                          name: dataToShow?.name || "Unknown User",
                          email: dataToShow?.email || "Unknown Email",
                          errorMessage: `Something went wrong while creating the PayPal order: ${(error as Error).message || "Unknown error in createOrder"}`,
                        });
                        setIsPending(false);
                      }
                    }}

                    onApprove={async (data) => {
                      // console.log("🟣 [PayPal] onApprove Triggered");
                      // console.log("🧾 Approval Data:", data);

                      try {
                        const capturePayload = { orderID: data.orderID };
                        // console.log(
                        //   "📤 Sending to /api/paypal/capture-order:",
                        //   capturePayload
                        // );

                        const res = await fetch("/api/paypal/capture-order", {
                          method: "POST",
                          headers: {
                            "Content-Type": "application/json",
                          },
                          body: JSON.stringify(capturePayload),
                        });

                        const captureData = await res.json();
                        // console.log("✅ capture-order Response:", captureData);

                        if (!res.ok) throw new Error("Failed to capture order");

                        const savePaymentPayload = {
                          payment_ref_id: captureData.id,
                          web_token: dataToShow?.web_token,
                          total_price: adjustedPriceRef.current,
                          other_info: actualAmountRef.current,
                          payment_method: "PayPal",
                          status: "success",
                          discount_amt: 0,
                        };

                        // console.log(
                        //   "📤 Sending to /api/paypal/save-payment:",
                        //   savePaymentPayload
                        // );

                        const saveRes = await fetch(
                          "/api/paypal/save-payment",
                          {
                            method: "POST",
                            headers: {
                              "Content-Type": "application/json",
                            },
                            body: JSON.stringify(savePaymentPayload),
                          }
                        );

                        const saveResult = await saveRes.json();
                        console.log("✅ save-payment Response:", saveResult);

                        const encryptedData = btoa(
                          JSON.stringify(savePaymentPayload)
                        );
                        const query = new URLSearchParams({
                          status: "success",
                          web_token: dataToShow?.web_token || "",
                          orderID: data.orderID || "",
                          other_info: encryptedData || "",
                        }).toString();

                        router.push(`/payment_success?${query}`);
                      } catch (error) {
                        console.error("❌ Error in onApprove:", error);
                        await sendErrorToCMS({
                          name: dataToShow?.name || "Unknown User",
                          email: dataToShow?.email || "Unknown Email",
                          errorMessage: `Something went wrong while approving the PayPal transaction (capture/save step): ${(error as Error).message || "Unknown error in onApprove"}`,
                        });
                        router.push(
                          `/register_details?status=failure&web_token=${dataToShow?.web_token}`
                        );
                      } finally {
                        setIsPending(false);
                      }
                    }}

                    onCancel={async (data) => {
                      console.warn("🟠 [PayPal] onCancel Triggered");
                      // console.log("❗ Cancel Payload:", data);

                      // Construct a readable cancel message
                      const cancelMessage = `User canceled the PayPal payment. Order ID: ${data?.orderID || "N/A"
                        }`;

                      await sendErrorToCMS({
                        name: dataToShow?.name || "Unknown User",
                        email: dataToShow?.email || "Unknown Email",
                        errorMessage: cancelMessage,
                      });

                      setShowCancelModal(true);
                    }}

                    onError={async (err) => {
                      console.error("🔴 [PayPal] onError Triggered");
                      console.error("💥 Error Payload:", err);
                      await sendErrorToCMS({
                        name: dataToShow?.name || "Unknown User",
                        email: dataToShow?.email || "Unknown Email",
                        errorMessage: `An unexpected error occurred during the PayPal flow: ${JSON.stringify(err) || "No error in PayPal error"}`,
                      });
                      router.push(
                        `/register_details?status=failure&web_token=${dataToShow?.web_token}`
                      );
                    }}
                  />
                </PayPalScriptProvider>
              ) : (
                <p>Loading payment information...</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* {showCancelModal && <CancelModal />} */}

      {showModal && (
        <div
          className="modal2 brochure-form-modal"
          id="myModal"
          tabIndex={-1}
          role="dialog"
        >
          <div className="modal-dialog2 modal-confirm fade-in" role="document">
            <div className="modal-content2">
              <div className="modal-header">
                <div className="icon-box">
                  <i
                    className="bx bx-gift"
                    style={{ marginBottom: "35px" }}
                  ></i>
                </div>
                <h4 className="modal-title w-100">Discount Coupon</h4>
                <button
                  type="button"
                  className="close"
                  onClick={toggleModal}
                  style={{ fontSize: "30px" }}
                >
                  &times;
                </button>
              </div>
              <div className="modal-body">
                <form onSubmit={(e) => e.preventDefault()}>
                  <div className="row">
                    <div className="d-flex name-info">
                      <div className="col-12 test">
                        <label>Enter Discount Coupon:*</label>
                        <input
                          ref={inputRef}
                          type="text"
                          className="form-control discount-input"
                          placeholder="Enter coupon code"
                          value={couponCodeToCheck}
                          onChange={(e) => setCouponCodeToCheck(e.target.value)}
                          onKeyDown={handleKeyDown}
                        />
                        {localError && (
                          <div
                            className="error-message"
                            style={{ color: "red", fontSize: "14px" }}
                          >
                            {localError}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-success btn-block"
                      onClick={handleApplyCoupon}
                    >
                      Apply Coupon
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {showCancelModal && (
        <div className="modal" id="myModal" tabIndex={-1} role="dialog">
          <div className="modal-dialog modal-confirm fade-in" role="document">
            <div className="modal-content">
              <p className="" style={{ fontSize: "18px" }}>
                You clicked cancel. Do you want to try again?
              </p>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-success btn-block"
                  onClick={() => setShowCancelModal(false)}
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegisterDetails;
