"use client";

import React, { useState, useEffect, useRef } from "react";
// import Head from "next/head";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
// import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import {
  CreateOrderData,
  CreateOrderActions,
  OnApproveData,
  OnApproveActions,
} from "@paypal/paypal-js";

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

const RegisterDetails = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [details, setDetails] = useState<RegistrationData | null>(null);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [discountDetails, setDiscountDetails] =
    useState<DiscountDetails | null>(null);
  const [actualAmount, setActualAmount] = useState<ActualAmount | null>(null);
  const [localError, setLocalError] = useState("");
  const [checkEmail, setCheckEmail] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [couponCodeToCheck, setCouponCodeToCheck] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [showCoupon, setShowCoupon] = useState(false);

  const [adjustedPrice, setAdjustedPrice] = useState<number>(0);
  const [payTotal, setPayTotal] = useState<number>(0);
  //   const adjustedPriceRef = useRef<number>(adjustedPrice);
  const adjustedPriceRef = useRef<number>(0); // Initialize with 0
  const actualAmountRef = useRef<ActualAmount | null>(null);
const [clientId, setClientId] = useState<string | null>(null);

  console.log("adjust price", adjustedPrice);

//   useEffect(() => {
//     async function fetchClientId() {
//       try {
//         const res = await fetch("/api/paypal-client-id");
//         const data = await res.json();
//         setClientId(data.clientId);
//       } catch (error) {
//         console.error("Failed to fetch PayPal Client ID:", error);
//       }
//     }
 useEffect(() => {
    fetch("/api/paypal-client-id")
      .then((res) => res.json())
      .then((data) => setClientId(data.clientId))
      .catch((err) => console.error("Failed to fetch PayPal clientId", err));
  }, []);

//     fetchClientId();
//   }, []);

  useEffect(() => {
    if (searchParams?.has("discount")) {
      setShowCoupon(true);
    } else {
      setShowCoupon(false);
    }
  }, [searchParams]);

  const CancelModal: React.FC = () => {
    return (
      <div className="modal-backdrop">
        <div className="modal">
          <p>You clicked cancel. Do you want to try again?</p>
          <div className="modal-footer">
            <button onClick={() => setShowCancelModal(false)} className="btn">
              OK
            </button>
          </div>
        </div>
        <style jsx>{`
          .modal-backdrop {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
          }
          .modal {
            background: white;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
            width: 400px;
            height: 200px;
            max-width: 90%;
            display: flex;
            flex-direction: column;
          }
          .modal p {
            margin-bottom: 5px;
            line-height: 28px;
            font-size: 18px;
            text-align: center;
          }
          .modal-backdrop .modal-footer {
            width: 100%;
          }
          .btn {
            padding: 10px 20px;
            font-size: 16px;
            background: var(--primary-color);
            color: #fff;
            border-radius: 4px;
            text-decoration: none;
            transition: all 0.4s;
            line-height: normal;
            border: none;
            transition: background-color 0.2s ease;
            width: 100%;
          }
          .btn:hover {
            background: var(--primary-color);
          }
        `}</style>
      </div>
    );
  };

  useEffect(() => {
    const fetchDetails = async () => {
      const web_token = searchParams?.get("web_token");

      try {
        const postData = {
          module_name: "registration_details",
          keys: {
            data: [{ web_token }],
          },
          cid: process.env.NEXT_PUBLIC_CID,
        };

        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}`,
          postData
        );
        setTimeout(() => {
          if (response.status === 200 && response.data) {
            if (response.data.data.transaction_id !== null) {
              router.push(`/payment-success?web_token=${web_token}`);
            }
            setDetails(response.data.data);
          } else {
            setDetails(null);
          }
        }, 1000);
      } catch (error) {
        setDetails(null);
        console.warn(error);
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

    const fetchDiscountDetails = async () => {
      try {
        const payload = {
          email: checkEmail || "",
          coupon_code: "",
          cid: process.env.NEXT_PUBLIC_CID,
        };

        const response = await fetch("/api/register_details", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        const data = await response.json();

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
        cid: string | undefined;
        coupon_code: string;
        email?: string;
      } = {
        cid: process.env.NEXT_PUBLIC_CID,
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

  const logError = async (message: string) => {
    try {
      if (!dataToShow) return;

      await fetch("/api/log-error", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          error_message: message,
          name: dataToShow?.name || "N/A",
          email: dataToShow?.email || "N/A",
        }),
      });
    } catch (err) {
      console.error("Client error while calling logError:", err);
    }
  };

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
              {adjustedPrice ? (
                <PayPalScriptProvider
                  options={{
                   clientId: clientId ?? "",
                    currency: "USD",
                    intent: "capture",
                    debug: false,
                  }}
                >
                  <PayPalButtons
                    style={{ layout: "vertical" }}
                    // Triggered when the button is clicked
                    onClick={(data, actions) => {
                      console.log("[PayPal] onClick triggered");
                      console.log("Button Click Payload:", { data, actions });
                    }}
                    // Create the PayPal order
                    createOrder={async (
                      data: CreateOrderData,
                      actions: CreateOrderActions
                    ) => {
                      try {
                        console.log("[PayPal] createOrder called");
                        console.log("createOrder - Payload:", { data });

                        const amount = Number(
                          adjustedPriceRef.current ||
                            dataToShow?.total_price ||
                            0
                        );
                        const safeAmount = Math.max(0.01, amount).toFixed(2);

                        const order = await actions.order.create({
                          intent: "CAPTURE",
                          purchase_units: [
                            {
                              amount: {
                                currency_code: "USD",
                                value: safeAmount,
                              },
                              description: `Registration Payment for ${encodeURIComponent(
                                dataToShow?.name || "Unknown"
                              )}`,
                            },
                          ],
                          application_context: {
                            return_url: `${origin}/payment-status?status=success&web_token=${dataToShow?.web_token}`,
                            cancel_url: `${origin}/register_details?web_token=${
                              dataToShow?.web_token ||
                              searchParams?.get("web_token") ||
                              ""
                            }`,
                          },
                        });

                        console.log("Order Created - ID:", order);
                        return order;
                      } catch (err) {
                        console.error("[PayPal] Error creating order:", err);
                        await logError(
                          `Error creating PayPal order: ${
                            (err as Error).message
                          }`
                        );
                        throw err;
                      }
                    }}
                    // Triggered when the user approves the payment
                    onApprove={async (
                      data: OnApproveData,
                      actions: OnApproveActions
                    ) => {
                      try {
                        console.log("[PayPal] onApprove triggered");
                        console.log("Approval Payload:", { data });

                        const captureResult = await actions.order?.capture();
                        console.log("Payment Captured:", captureResult);

                        const encryptedData = btoa(
                          JSON.stringify({
                            total_price: adjustedPriceRef.current,
                            other_info: actualAmountRef.current,
                            discount_amt: 0,
                          })
                        );

                        const paymentData = {
                          module_name: "payment",
                          keys: {
                            data: [
                              {
                                payment_ref_id: data.orderID,
                                web_token: dataToShow?.web_token,
                                payment_method: "PayPal",
                                status: "success",
                                total_price: adjustedPriceRef.current,
                                other_info: actualAmountRef.current,
                                discount_amt: 0,
                              },
                            ],
                          },
                          cid: process.env.NEXT_PUBLIC_CID,
                        };

                        console.log("Payment Data to API:", paymentData);

                        await axios.post(
                          `${process.env.NEXT_PUBLIC_API_URL}`,
                          paymentData
                        );

                        const params = new URLSearchParams({
                          status: "success",
                          web_token: dataToShow?.web_token || "",
                          orderID: data.orderID,
                          other_info: encryptedData,
                        });

                        router.push(`/payment_success?${params.toString()}`);
                      } catch (error) {
                        console.error(
                          "[PayPal] Payment processing error:",
                          error
                        );
                        await logError(
                          `Payment processing error: ${
                            (error as Error).message
                          }`
                        );
                        router.push(
                          `/register_details?status=failure&web_token=${dataToShow?.web_token}`
                        );
                      }
                    }}
                    // Triggered when the user cancels the payment
                    onCancel={(data) => {
                      console.warn("[PayPal] onCancel triggered");
                      console.log("Cancel Payload:", data);
                      setShowCancelModal(true);
                    }}
                    // Triggered if there's an error in the PayPal process
                    onError={(err) => {
                      console.error("[PayPal] onError triggered");
                      console.error("Error Payload:", err);
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

      {showCancelModal && <CancelModal />}

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
    </div>
  );
};

export default RegisterDetails;
