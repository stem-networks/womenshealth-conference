"use client";

import React from "react";
import { useEffect, useState, useRef, useCallback } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ApiResponse, RegistrationInfo } from "@/types";
import countries from "../../data/countries";
import { toast } from "react-toastify";

interface AccommodationPrices {
  single: string;
  doubl: string;
  tri: string;
  accompanying: string;
  [key: string]: string;
}

interface PriceData {
  type: string;
  total: number;
  min: number;
  conference_dt: string;
  category: string;
  standard_price: string;
}

interface FormData {
  title: string;
  name: string;
  first_name: string;
  last_name: string;
  email: string;
  alt_email: string;
  phone: string;
  whatsapp: string;
  city: string;
  institution: string;
  organization: string;
  country: string;
  intrested: string;
  abstract_title: string;
  message: string;
  web_token: string;
  form_type: string;
  submit_status: string;
  no_participants: number;
  no_accompanying: number;
  other_info: {
    "Selected Accommodation": string;
    "check In Date": string;
    "check Out Date": string;
    "Num of Nights": number;
    "selected Accommodation Price": number;
    "Price Per Accompanying Person": number;
    "Registration Price": number;
    "Total Price": number;
  };
}

interface RegisterProps {
  generalData: ApiResponse;
  registerData: RegistrationInfo;
}

const Registration: React.FC<RegisterProps> = ({
  generalData,
  registerData,
}) => {
  const general = generalData?.data || {};
  const router = useRouter();

  const initialFormData: FormData = {
    title: "",
    name: "",
    first_name: "",
    last_name: "",
    email: "",
    alt_email: "",
    phone: "",
    whatsapp: "",
    city: "",
    organization: "",
    country: "",
    institution: "",
    intrested: "",
    abstract_title: "",
    message: "",
    web_token: "",
    form_type: "register",
    submit_status: "0",
    no_participants: 1,
    no_accompanying: 0,
    other_info: {
      "Selected Accommodation": "",
      "check In Date": "",
      "check Out Date": "",
      "Num of Nights": 0,
      "selected Accommodation Price": 0,
      "Price Per Accompanying Person": 0,
      "Registration Price": 0,
      "Total Price": 0,
    },
  };

  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [accommodationPrices, setAccommodationPrices] =
    useState<AccommodationPrices>({} as AccommodationPrices);
  const [pricesData, setPricesData] = useState<PriceData[]>([]);
  const [checkInDates, setCheckInDates] = useState<string[]>([]);
  const [checkOutDates, setCheckOutDates] = useState<string[]>([]);
  const [checkOutDatesM, setCheckOutDatesM] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<string>("tab1");
  const [selectedOption, setSelectedOption] = useState<string>("inperson");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [isHydrated, setIsHydrated] = useState<boolean>(false);
  const [nightsError, setNightsError] = useState<string>("");

  // Refs
  const titleRef = useRef<HTMLSelectElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const altEmailRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const whatsappNumberRef = useRef<HTMLInputElement>(null);
  const institutionRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<HTMLSelectElement>(null);
  const checkInRef = useRef<HTMLSelectElement>(null);
  const checkOutRef = useRef<HTMLSelectElement>(null);

  const isValidEmail = (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // Handler for selecting participant type
  const sendFullFormData = useCallback(async (data: FormData) => {
    try {
      // First check if email exists and is valid
      if (!data.email || !isValidEmail(String(data.email))) {
        console.error("Invalid or missing email");
        return; // Exit the function if email is invalid
      }

      const formDataObj = new FormData();
      // Object.entries(data).forEach(([key, value]) => {
      //   if (
      //     typeof value === "string" ||
      //     typeof value === "number" ||
      //     typeof value === "boolean"
      //   ) {
      //     formDataObj.append(key, String(value));
      //   } else if (value instanceof Blob) {
      //     formDataObj.append(key, value);
      //   } else if (value !== undefined && value !== null) {
      //     formDataObj.append(key, JSON.stringify(value));
      //   }
      // });

      Object.entries(data).forEach(([key, value]) => {
        if (typeof value === "string") {
          formDataObj.append(key, value.trim()); // Trim string
        } else if (
          typeof value === "number" ||
          typeof value === "boolean"
        ) {
          formDataObj.append(key, String(value));
        } else if (value instanceof Blob) {
          formDataObj.append(key, value);
        } else if (value !== undefined && value !== null) {
          formDataObj.append(key, JSON.stringify(value));
        }
      });

      await axios.post("/api/send-to-cms", formDataObj, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // console.log("Form data sent successfully");
    } catch (err) {
      console.error("Error saving form data:", err);
      await sendErrorToCMS({
        name: String(data.name || "Unknown User"),
        email: String(data.email || "Unknown Email"),
        errorMessage:
          "An unexpected error occurred while saving your registration: " +
          (err instanceof Error ? err.message : "Unknown error"),
        formBased: "CMS Registration Form Submission",
      });
    }
  }, []);

  const handleParticipantChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const participantType = event.target.value;
    const selectedItem = pricesData.find(
      (item) => item.type === participantType
    );
    const regPrice = selectedItem ? selectedItem.total : 0;

    setFormData((prev) => ({
      ...prev,
      intrested: getCategoryFromParticipant(participantType),
      other_info: {
        ...prev.other_info,
        "Registration Price": regPrice,
      },
    }));

    if (formData.email) {
      sendFullFormData({
        ...formData,
        intrested: getCategoryFromParticipant(participantType),
        other_info: {
          ...formData.other_info,
          "Registration Price": regPrice,
        },
      });
    }
  };

  const getCategoryFromParticipant = (participant: string): string => {
    switch (participant) {
      case "Listener (In-Person)":
        return "listener-in-person";
      case "Presenter (In-Person)":
        return "presenter-in-person";
      case "Student/Young Researcher":
        return "young-researcher-in-person";
      case "Listener (Virtual)":
        return "listener-virtual";
      case "Presenter (Virtual)":
        return "presenter-virtual";
      default:
        return "";
    }
  };

  const fetchData2 = (data: RegistrationInfo): void => {
    const { accommodation_prices, checkdates, increment_price } = data;

    const checkInDatesArray = checkdates["1"];
    const checkOutDatesArray = checkdates["2"];
    setCheckInDates(checkInDatesArray);
    setCheckOutDates(checkOutDatesArray);
    setCheckOutDatesM(checkOutDatesArray);

    const sortedData = Object.keys(increment_price).map((type) => {
      const isStudentResearcher =
        type.includes("Student") || type.includes("Young Researcher");

      const isInPerson = type.includes("In-Person") || isStudentResearcher;

      const standardPrice =
        increment_price[type]["Standard Registration Fee"] ||
        `$${parseInt(increment_price[type].total, 10)}`;

      return {
        type,
        total: parseInt(increment_price[type].total, 10) || 0,
        min: parseInt(increment_price[type].min, 10) || 0,
        conference_dt: increment_price[type].conference_dt,
        category: isInPerson ? "inperson" : "virtual",
        standard_price: standardPrice,
      };
    });

    setPricesData(sortedData);
    setAccommodationPrices(accommodation_prices[0]);
  };

  useEffect(() => {
    if (registerData) {
      fetchData2(registerData);
    }
  }, [registerData]);

  useEffect(() => {
    if (pricesData.length > 0) {
      const initialParticipant =
        activeTab === "tab1"
          ? pricesData.find((item) => item.type === "Presenter (In-Person)")
            ?.type ||
          pricesData.filter((item) => item.category === "inperson")[0]?.type
          : pricesData.find((item) => item.type === "Presenter (Virtual)")
            ?.type ||
          pricesData.filter((item) => item.category === "virtual")[0]?.type;

      if (initialParticipant) {
        setFormData((prev) => ({
          ...prev,
          intrested: getCategoryFromParticipant(initialParticipant),
          other_info: {
            ...prev.other_info,
            "Registration Price":
              pricesData.find((item) => item.type === initialParticipant)
                ?.total || 0,
          },
        }));
      }
    }
  }, [pricesData, activeTab]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({ ...prev, [name]: "" }));

    if ((name === "title" || name === "country") && formData.email) {
      sendFullFormData({ ...formData, [name]: value });
    }
  };

  const handleAccommodationChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const value = e.target.value;
    const updatedAccomodation =
      formData.other_info["Selected Accommodation"] === value ? "" : value;

    const selectedAccommodationPrice =
      updatedAccomodation === "single"
        ? parseFloat(accommodationPrices.single)
        : updatedAccomodation === "double"
          ? parseFloat(accommodationPrices.doubl)
          : updatedAccomodation === "triple"
            ? parseFloat(accommodationPrices.tri)
            : 0;

    setFormData((prev) => ({
      ...prev,
      other_info: {
        ...prev.other_info,
        "Selected Accommodation": updatedAccomodation,
        "selected Accommodation Price": selectedAccommodationPrice,
        "check In Date": updatedAccomodation
          ? prev.other_info["check In Date"]
          : "NA",
        "check Out Date": updatedAccomodation
          ? prev.other_info["check Out Date"]
          : "NA",
        "Num of Nights": updatedAccomodation
          ? prev.other_info["Num of Nights"]
          : 0,
      },
    }));

    if (formData.email) {
      sendFullFormData({
        ...formData,
        other_info: {
          ...formData.other_info,
          "Selected Accommodation": updatedAccomodation,
          "selected Accommodation Price": selectedAccommodationPrice,
          "check In Date": updatedAccomodation
            ? formData.other_info["check In Date"]
            : "NA",
          "check Out Date": updatedAccomodation
            ? formData.other_info["check Out Date"]
            : "NA",
          "Num of Nights": updatedAccomodation
            ? formData.other_info["Num of Nights"]
            : 0,
        },
      });
    }
  };

  const formatDateWithDay = (dateStr: string): string => {
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
    const monthName = months[parseInt(month, 10) - 1];
    const formattedDay = day.padStart(2, "0");

    return `${monthName} ${formattedDay}, ${year} (${dayName})`;
  };

  const handleCheckInChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    const selectedDate = e.target.value || "NA";

    // Convert selected date to a Date object
    const [day, month, year] = selectedDate.split("-");
    const selectedDateObj = new Date(`${year}-${month}-${day}`);

    // Event date boundaries
    const eventStartDate = new Date(general.startDate);

    // Filter checkout dates
    let newCheckOutDates = [];
    if (selectedDateObj < eventStartDate) {
      newCheckOutDates = checkOutDatesM.filter((date) => {
        const [d, m, y] = date.split("-");
        const dateObj = new Date(`${y}-${m}-${d}`);
        return dateObj >= eventStartDate;
      });
    } else {
      newCheckOutDates = checkOutDatesM.filter((date) => {
        const [d, m, y] = date.split("-");
        const dateObj = new Date(`${y}-${m}-${d}`);
        return dateObj > selectedDateObj;
      });
    }

    setCheckOutDates(newCheckOutDates.map((date) => date));

    // Clear errors
    setErrors((prev) => ({
      ...prev,
      checkIn: selectedDate !== "NA" ? "" : prev.checkIn,
      checkOut: "",
    }));

    // Calculate nights
    calculateNights(selectedDate, formData.other_info["check Out Date"]);

    setFormData((prev) => ({
      ...prev,
      other_info: {
        ...prev.other_info,
        "check In Date": selectedDate,
      },
    }));

    if (formData.email) {
      sendFullFormData({
        ...formData,
        other_info: {
          ...formData.other_info,
          "check In Date": selectedDate,
        },
      });
    }
  };

  const handleCheckOutChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    const selectedDate = e.target.value;

    // Ensure checkout date is after check-in date
    if (formData.other_info["check In Date"] && selectedDate) {
      const isValidDate =
        new Date(selectedDate.split("-").reverse().join("-")) >
        new Date(
          formData.other_info["check In Date"].split("-").reverse().join("-")
        );

      if (!isValidDate) {
        setErrors((prev) => ({
          ...prev,
          checkOut: "Check-out date must be after check-in date",
        }));
        return;
      }
    }

    // Clear the check-out error
    setErrors((prev) => ({
      ...prev,
      checkOut: selectedDate !== "NA" ? "" : prev.checkOut,
    }));

    // Calculate nights
    calculateNights(formData.other_info["check In Date"], selectedDate);

    setFormData((prev) => ({
      ...prev,
      other_info: {
        ...prev.other_info,
        "check Out Date": selectedDate,
      },
    }));

    if (formData.email) {
      sendFullFormData({
        ...formData,
        other_info: {
          ...formData.other_info,
          "check Out Date": selectedDate,
        },
      });
    }
  };

  const calculateNights = (checkIn: string, checkOut: string): void => {
    if (checkIn && checkOut && checkIn !== "NA" && checkOut !== "NA") {
      const cleanCheckIn = checkIn.replace(/\s*\(.*?\)/, "");
      const cleanCheckOut = checkOut.replace(/\s*\(.*?\)/, "");

      const [checkInDay, checkInMonth, checkInYear] = cleanCheckIn
        .split("-")
        .map(Number);
      const [checkOutDay, checkOutMonth, checkOutYear] = cleanCheckOut
        .split("-")
        .map(Number);

      const checkInDate = new Date(checkInYear, checkInMonth - 1, checkInDay);
      const checkOutDate = new Date(
        checkOutYear,
        checkOutMonth - 1,
        checkOutDay
      );

      if (checkOutDate <= checkInDate) {
        setFormData((prev) => ({
          ...prev,
          other_info: {
            ...prev.other_info,
            "Num of Nights": 0,
          },
        }));
        setNightsError("Check-out date must be after check-in date");
        return;
      }

      const timeDiff = checkOutDate.getTime() - checkInDate.getTime();
      const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

      if (daysDiff <= 0) {
        setFormData((prev) => ({
          ...prev,
          other_info: {
            ...prev.other_info,
            "Num of Nights": 0,
          },
        }));
        setNightsError("Number of nights must be greater than 0");
        return;
      }

      setFormData((prev) => ({
        ...prev,
        other_info: {
          ...prev.other_info,
          "Num of Nights": daysDiff,
        },
      }));
      setNightsError("");

      if (formData.email) {
        sendFullFormData({
          ...formData,
          other_info: {
            ...formData.other_info,
            "Num of Nights": daysDiff,
          },
        });
      }
    } else if (
      checkIn &&
      checkIn !== "NA" &&
      (!checkOut || checkOut === "NA")
    ) {
      setFormData((prev) => ({
        ...prev,
        other_info: {
          ...prev.other_info,
          "Num of Nights": 0,
        },
      }));
      setNightsError("");
    } else {
      setFormData((prev) => ({
        ...prev,
        other_info: {
          ...prev.other_info,
          "Num of Nights": 0,
        },
      }));
      setNightsError("Both check-in and check-out dates must be selected");
    }
  };

  const handleNumParticipantsChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    const newValue = parseInt(e.target.value, 10);
    setFormData((prev) => ({
      ...prev,
      no_participants: newValue,
    }));

    if (formData.email) {
      sendFullFormData({
        ...formData,
        no_participants: newValue,
      });
    }
  };

  const handleNumAccompanyingPersonsChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    const newValueAccom = parseInt(e.target.value, 10);
    setFormData((prev) => ({
      ...prev,
      no_accompanying: newValueAccom,
    }));

    if (formData.email) {
      sendFullFormData({
        ...formData,
        no_accompanying: newValueAccom,
      });
    }
  };

  useEffect(() => {
    if (accommodationPrices && accommodationPrices.accompanying) {
      const pricePerAccompanyingPerson = parseFloat(
        accommodationPrices.accompanying
      );
      // const totalAccompanyingPersonsPrice =
      //   formData.no_accompanying * pricePerAccompanyingPerson;

      setFormData((prev) => ({
        ...prev,
        other_info: {
          ...prev.other_info,
          "Price Per Accompanying Person": pricePerAccompanyingPerson,
        },
      }));

      if (formData.email) {
        sendFullFormData({
          ...formData,
          other_info: {
            ...formData.other_info,
            "Price Per Accompanying Person": pricePerAccompanyingPerson,
          },
        });
      }
    }
  }, [formData.no_accompanying, accommodationPrices]);

  const totalPrice =
    formData.other_info["Registration Price"] * formData.no_participants +
    formData.other_info["selected Accommodation Price"] *
    formData.other_info["Num of Nights"] +
    formData.other_info["Price Per Accompanying Person"] *
    formData.no_accompanying;

  useEffect(() => {
    setFormData((prev) => {
      if (prev.other_info["Total Price"] !== totalPrice) {
        const updatedData = {
          ...prev,
          other_info: {
            ...prev.other_info,
            "Total Price": totalPrice,
          },
        };

        if (updatedData.email) {
          sendFullFormData(updatedData);
        }

        return updatedData;
      }
      return prev;
    });
  }, [totalPrice]);

  // UTF-8 safe Base64 encoder
  function utf8ToBase64(str: string) {
    const bytes = new TextEncoder().encode(str);
    let binary = "";
    bytes.forEach((b) => binary += String.fromCharCode(b));
    return btoa(binary);
  }

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    // Validation
    let valid = true;
    const newErrors: Record<string, string> = {};

    if (!formData.title) {
      newErrors.title = "Title is required";
      valid = false;
    }
    else if (!formData.name) {
      newErrors.name = "Name is required";
      valid = false;
    } else if (!formData.email) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
      valid = false;
    } else if (formData.alt_email && !/\S+@\S+\.\S+/.test(formData.alt_email)) {
      newErrors.altEmail = "Alternate Email is invalid";
      valid = false;
    } else if (!formData.phone) {
      newErrors.phone = "Phone is required";
      valid = false;
    } else if (!formData.organization) {
      newErrors.institution = "Institution is required";
      valid = false;
    } else if (!formData.country) {
      newErrors.country = "Country is required";
      valid = false;
    } else if (formData.other_info["Selected Accommodation"]) {
      if (
        !formData.other_info["check In Date"] ||
        formData.other_info["check In Date"] === "NA"
      ) {
        newErrors.checkIn = "Check-in Date is required";
        valid = false;
      } else if (
        !formData.other_info["check Out Date"] ||
        formData.other_info["check Out Date"] === "NA"
      ) {
        newErrors.checkOut = "Check-out Date is required";
        valid = false;
      }
    }

    if (!valid) {
      setErrors(newErrors);

      // Example: show the first validation error via toast
      const firstError = Object.values(newErrors)[0];
      toast.error(firstError);

      // Focus on the first invalid field
      if (newErrors.title && titleRef.current) titleRef.current.focus();
      else if (newErrors.name && nameRef.current) nameRef.current.focus();
      else if (newErrors.email && emailRef.current) emailRef.current.focus();
      else if (newErrors.altEmail && altEmailRef.current)
        altEmailRef.current.focus();
      else if (newErrors.phone && phoneRef.current) phoneRef.current.focus();
      else if (newErrors.institution && institutionRef.current)
        institutionRef.current.focus();
      else if (newErrors.country && countryRef.current)
        countryRef.current.focus();
      else if (newErrors.checkIn && checkInRef.current)
        checkInRef.current.focus();
      else if (newErrors.checkOut && checkOutRef.current)
        checkOutRef.current.focus();

      setLoading(false);
      return;
    }

    // Form data with submit status
    const updatedFormData = { ...formData, submit_status: "1" };
    sendFullFormData(updatedFormData);

    // const rawWebToken = `${Date.now()}_${Math.floor(Math.random() * 1000000)}`;
    const rawWebToken = `${Math.floor(Date.now() / 1000)}_${Math.floor(Math.random() * 32768)}`;
    const encodedWebToken = utf8ToBase64(rawWebToken);

    // Prepare API payload
    const postData = {
      title: utf8ToBase64(formData.title.trim()),
      name: utf8ToBase64(formData.name.trim()),
      email: utf8ToBase64(formData.email.trim()),
      alt_email: utf8ToBase64(formData.alt_email.trim() || ""),
      phone: utf8ToBase64(formData.phone.trim()),
      whatsapp_number: utf8ToBase64(formData.whatsapp.trim() || ""),
      institution: utf8ToBase64(formData.organization.trim()),
      country: utf8ToBase64(formData.country.trim()),
      reg_category: utf8ToBase64(formData.intrested.trim()),
      occupency_text: utf8ToBase64(formData.other_info["Selected Accommodation"]),
      occupancy: utf8ToBase64(formData.other_info["selected Accommodation Price"].toString()),
      check_insel: utf8ToBase64(formData.other_info["check In Date"]),
      check_outsel: utf8ToBase64(formData.other_info["check Out Date"]),
      nights: utf8ToBase64(formData.other_info["Num of Nights"].toString()),
      no_of_participants: utf8ToBase64(formData.no_participants.toString()),
      no_of_accompanying: utf8ToBase64(formData.no_accompanying.toString()),
      reg_tot_hidden: utf8ToBase64(formData.other_info["Registration Price"].toString()),
      price_of_each_accompanying: utf8ToBase64(formData.other_info["Price Per Accompanying Person"].toString()),
      final_amt_input: utf8ToBase64(formData.other_info["Total Price"].toString()),
      web_token: encodedWebToken,
      // description: btoa(formData.description || ""),
    };

    try {
      // 1. Submit to CMS API
      await axios.post("/api/register", postData, {
        headers: { "Content-Type": "application/json" },
      });

      // 2. Prepare payload for saving to JSON blob
      const registerUserPayload = {
        title: formData.title.trim(),
        name: formData.name.trim(),
        email: formData.email.trim(),
        alt_email: formData.alt_email.trim() || "",
        phone: formData.phone.trim(),
        whatsapp: formData.whatsapp.trim() || "",
        institution: formData.organization.trim(),
        country: formData.country.trim(),
        // sub_type: formData.intrested.trim(),
        reg_type: formData.intrested.trim().toLowerCase().replace(/ /g, "-"),
        participants: formData.no_participants.toString(),
        accompanying: formData.no_accompanying.toString(),
        reg_price: formData.other_info["Registration Price"].toString(),
        accompanying_price: formData.other_info["Price Per Accompanying Person"].toString(),
        occupancy: formData.other_info["Selected Accommodation"],
        occupancy_price: formData.other_info["selected Accommodation Price"].toString(),
        checkin_date: formData.other_info["check In Date"],
        checkout_date: formData.other_info["check Out Date"],
        nights: formData.other_info["Num of Nights"].toString(),
        total_price: formData.other_info["Total Price"].toString(),
        price_type: "USD",
        discount_reg: "0",
        discount_accom: "0",
        // currency_rate: "1",
        // created_dt: new Date().toISOString().split("T")[0] + " 00:00:00",
        // updated_dt: new Date().toISOString().split("T")[0] + " 00:00:00",
        reg_date: new Date().toISOString(),
        // viewed_dt: new Date().toISOString(),
        // reply_dt: new Date().toISOString(),
        // received_dt: new Date().toISOString(),
        // attempt: "1",
        status: "1",
        type: "Registration",
        email_check_status: "0",
        // created_by: "User",
        // payment_type: "",
        web_token: rawWebToken,
        cid: general.cid,
        // description: "",
        // url_link: null,
        // transaction_id: null,
        // viewed_by: null,
        // viewed_status: "0",
        // reply_status: "0",
        other_info: null,
        id: Date.now().toString(), // You can use an ID generator or UUID if needed
        // edition_id: "0",

        // New field so API can detect project name
        site_url: general?.site_url || "",
      };

      // 3. Send to your save-register-user API
      await axios.post("/api/save-register-user", registerUserPayload, {
        headers: { "Content-Type": "application/json" },
      });

      // 4. Redirect to register_details
      if (rawWebToken) {
        router.push(`/register_details?web_token=${rawWebToken}`);
      } else {
        console.error("Web token not found in response");
        await sendErrorToCMS({
          name: formData?.name || "Unknown User",
          email: formData?.email || "Unknown Email",
          errorMessage: `Web token is missing in the API response.`,
        });
      }
    } catch (error) {
      console.error("Error submitting registration:", error);
      toast.error("Something went wrong while submitting the form.");
      await sendErrorToCMS({
        name: formData?.name || "Unknown User",
        email: formData?.email || "Unknown Email",
        errorMessage: `Failed to submit registration form: ${(error as Error).message || "No error message"}`,
      });
    }

    setLoading(false);
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLElement>,
    fieldName: string,
    nextFieldRef: React.RefObject<HTMLElement | null> | null
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();

      let fieldValid = true;
      const newErrors = { ...errors };

      // Validation logic
      if (fieldName === "title" && !formData.title) {
        newErrors.title = "Title is required";
        fieldValid = false;
      } else if (fieldName === "name" && !formData.name) {
        newErrors.name = "Name is required";
        fieldValid = false;
      } else if (fieldName === "email") {
        if (!formData.email) {
          newErrors.email = "Email is required";
          fieldValid = false;
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
          newErrors.email = "Email is invalid";
          fieldValid = false;
        }
      } else if (
        fieldName === "altEmail" &&
        formData.alt_email &&
        !/\S+@\S+\.\S+/.test(formData.alt_email)
      ) {
        newErrors.altEmail = "Alternative Email is invalid";
        fieldValid = false;
      } else if (fieldName === "phone" && !formData.phone) {
        newErrors.phone = "Phone is required";
        fieldValid = false;
      } else if (fieldName === "institution" && !formData.organization) {
        newErrors.institution = "Institution is required";
        fieldValid = false;
      } else if (fieldName === "country" && !formData.country) {
        newErrors.country = "Country is required";
        fieldValid = false;
      } else if (
        fieldName === "checkIn" &&
        formData.other_info["Selected Accommodation"]
      ) {
        if (
          !formData.other_info["check In Date"] ||
          formData.other_info["check In Date"] === "NA"
        ) {
          newErrors.checkIn = "Check-in date is required";
          fieldValid = false;
        }
      } else if (
        fieldName === "checkOut" &&
        formData.other_info["Selected Accommodation"]
      ) {
        if (
          !formData.other_info["check Out Date"] ||
          formData.other_info["check Out Date"] === "NA"
        ) {
          newErrors.checkOut = "Check-out date is required";
          fieldValid = false;
        }
      }

      // If field is invalid
      if (!fieldValid) {
        setErrors(newErrors);

        // Show the first error message from the newErrors object
        const firstError = newErrors[fieldName];
        if (firstError) {
          toast.error(firstError);
        }

        return;
      }

      // Clear error and move to next field
      setErrors((prev) => ({ ...prev, [fieldName]: "" }));

      if (nextFieldRef?.current) {
        nextFieldRef.current.focus();
      }
    }
  };

  // Effect to set the initial tab and checkbox
  useEffect(() => {
    setActiveTab("tab1");
    setSelectedOption("inperson");
    setIsHydrated(true);
  }, []);

  // Function to show the clicked tab
  const switchTab = (tabId: string) => {
    setActiveTab(tabId);
  };

  // Handle checkbox change
  const toggleCheckbox = (value: string) => {
    setSelectedOption(value);
  };

  const handleReset = () => {
    setFormData(initialFormData);
    setErrors({});
    setActiveTab("tab1");
    setNightsError("");

    if (pricesData.length > 0) {
      const listenerInPersonItem = pricesData.find(
        (item) => item.type === "Presenter (In-Person)"
      );

      if (listenerInPersonItem) {
        setFormData((prev) => ({
          ...prev,
          intrested: getCategoryFromParticipant(listenerInPersonItem.type),
          other_info: {
            ...prev.other_info,
            "Registration Price": listenerInPersonItem.total,
          },
        }));
      } else {
        const inPersonItems = pricesData.filter(
          (item) => item.category === "inperson"
        );
        if (inPersonItems.length > 0) {
          setFormData((prev) => ({
            ...prev,
            intrested: getCategoryFromParticipant(inPersonItems[0].type),
            other_info: {
              ...prev.other_info,
              "Registration Price": inPersonItems[0].total,
            },
          }));
        }
      }
    }
  };

  const handleBlur = (fieldName: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: value,
    }));

    if ((fieldName === "email" || fieldName === "alt_email") && value) {
      const isValidEmail = (email: string) => /\S+@\S+\.\S+/.test(email);
      if (!isValidEmail(value)) {
        console.error(
          `Invalid email format for ${fieldName}. API not triggered.`
        );
        return;
      }
    }

    if (formData.email) {
      sendFullFormData({
        ...formData,
        [fieldName]: value,
      });
    }
  };

  if (!isHydrated) {
    return null;
  }


  // sendError to Telegram 
  async function sendErrorToCMS({
    name,
    email,
    errorMessage,
    formBased = "Registration Form",
    siteName = `${general.clname || "N/A"} (${general.csname || "N/A"} - ${general.year || "N/A"})`,
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
              <i className="fa fa-angle-right"></i>
              <span>Register</span>
            </div>
          </div>
        </div>
      </div>

      <h2
        className="abs_wrap5 wow fadeInUp"
        data-wow-delay="400ms"
        data-wow-duration="1000ms"
      >
        Registration
      </h2>

      <div className="regist_wrap_white">
        <div className="auto-container container">
          <form onSubmit={handleSubmit}>
            {/* Personal Information Section */}
            <div className="row clearfix">
              <div
                className="col-md-11 mar_center wow fadeInUp"
                data-wow-delay="400ms"
                data-wow-duration="1000ms"
              >
                <div className="row clearfix">
                  <div className="col-md-1"></div>
                  <div className="col-md-5">
                    <select
                      name="title"
                      className="set156"
                      id="title"
                      value={formData.title}
                      onChange={handleChange}
                      ref={titleRef}
                      onKeyDown={(e) => handleKeyDown(e, "title", nameRef)}
                      disabled={loading}
                      autoComplete="off"
                    >
                      <option value="">Select</option>
                      <option value="Dr.">Dr.</option>
                      <option value="Mr.">Mr.</option>
                      <option value="Miss.">Miss.</option>
                      <option value="Mrs.">Mrs.</option>
                    </select>
                    {errors.title && (
                      <div className="error">{errors.title}</div>
                    )}
                  </div>
                  <div className="col-md-5">
                    <input
                      name="name"
                      id="name"
                      className="set157"
                      placeholder="Name"
                      value={formData.name}
                      onChange={handleChange}
                      type="text"
                      ref={nameRef}
                      onKeyDown={(e) => handleKeyDown(e, "name", emailRef)}
                      disabled={loading}
                      onBlur={(e) => handleBlur("name", e.target.value)}
                      autoComplete="new-password"
                    />
                    {errors.name && <div className="error">{errors.name}</div>}
                  </div>
                </div>

                {/* Email and Contact Information */}
                <div className="row clearfix">
                  <div className="col-md-1"></div>
                  <div className="col-md-5">
                    <input
                      name="email"
                      id="email"
                      className="set157"
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleChange}
                      type="text"
                      ref={emailRef}
                      onKeyDown={(e) => handleKeyDown(e, "email", altEmailRef)}
                      disabled={loading}
                      onBlur={(e) => handleBlur("email", e.target.value)}
                      autoComplete="off"
                    />
                    <div className="error" id="email_error">
                      {errors.email}
                    </div>
                  </div>
                  <div className="col-md-5">
                    <input
                      name="alt_email"
                      id="alt_email"
                      className="set157"
                      value={formData.alt_email}
                      placeholder="Alternative Email"
                      onChange={handleChange}
                      ref={altEmailRef}
                      onKeyDown={(e) => handleKeyDown(e, "altEmail", phoneRef)}
                      type="email"
                      disabled={loading}
                      onBlur={(e) => handleBlur("alt_email", e.target.value)}
                      autoComplete="off"
                    />
                    <div className="error" id="alt_email_error">
                      {errors.altEmail}
                    </div>
                  </div>
                </div>

                {/* Phone and WhatsApp */}
                <div className="row clearfix">
                  <div className="col-md-1"></div>
                  <div className="col-md-5">
                    <input
                      name="phone"
                      id="phone"
                      className="set157"
                      placeholder="Phone"
                      value={formData.phone}
                      onChange={handleChange}
                      type="text"
                      ref={phoneRef}
                      onKeyDown={(e) =>
                        handleKeyDown(e, "phone", whatsappNumberRef)
                      }
                      disabled={loading}
                      onBlur={(e) => handleBlur("phone", e.target.value)}
                      autoComplete="new-password"
                    />
                    <div className="error" id="phone_error">
                      {errors.phone}
                    </div>
                  </div>
                  <div className="col-md-5">
                    <input
                      name="whatsapp"
                      id="whatsapp_number"
                      className="set157"
                      value={formData.whatsapp}
                      placeholder="WhatsApp Number"
                      onChange={handleChange}
                      type="text"
                      disabled={loading}
                      ref={whatsappNumberRef}
                      onKeyDown={(e) =>
                        handleKeyDown(e, "whatsapp", institutionRef)
                      }
                      onBlur={(e) => handleBlur("whatsapp", e.target.value)}
                      autoComplete="off"
                    />
                  </div>
                </div>

                {/* Institution and Country */}
                <div className="row clearfix">
                  <div className="col-md-1"></div>
                  <div className="col-md-5">
                    <input
                      name="organization"
                      id="institution"
                      className="set157"
                      placeholder="Institution"
                      type="text"
                      value={formData.organization}
                      onChange={handleChange}
                      ref={institutionRef}
                      onKeyDown={(e) =>
                        handleKeyDown(e, "institution", countryRef)
                      }
                      disabled={loading}
                      onBlur={(e) => handleBlur("organization", e.target.value)}
                      autoComplete="off"
                    />
                    <div className="error" id="institution_error">
                      {errors.institution}
                    </div>
                  </div>
                  <div className="col-md-5">
                    <select
                      className="set156"
                      name="country"
                      id="country"
                      value={formData.country}
                      onChange={handleChange}
                      ref={countryRef}
                      onKeyDown={(e) => handleKeyDown(e, "country", checkInRef)}
                      disabled={loading}
                      autoComplete="off"
                    >
                      <option value="">Select Country</option>
                      {countries.map((country: string) => (
                        <option key={country} value={country}>
                          {country}
                        </option>
                      ))}
                    </select>
                    <div className="error" id="country_error">
                      {errors.country}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Registration Type Section */}
            <div className="row clearfix" style={{ width: "100%" }}>
              <div className="col-md-12 mar_center">
                <div
                  className="tabl_wrap155 wow fadeInUp"
                  data-wow-delay="400ms"
                  data-wow-duration="1000ms"
                >
                  <div className="tabs">
                    <button
                      type="button"
                      className={`tab-button ${activeTab === "tab1" ? "active" : ""
                        }`}
                      onClick={() => switchTab("tab1")}
                    >
                      <label className="container15">
                        In-Person
                        <input
                          type="checkbox"
                          value="inperson"
                          checked={selectedOption === "inperson"}
                          onChange={() => toggleCheckbox("inperson")}
                          disabled={loading}
                          style={{ display: "none" }}
                        />
                        <span className="checkmark"></span>
                      </label>
                    </button>
                    <button
                      type="button"
                      className={`tab-button ${activeTab === "tab2" ? "active" : ""
                        }`}
                      onClick={() => switchTab("tab2")}
                    >
                      <label className="container15">
                        Virtual
                        <input
                          type="checkbox"
                          value="virtual"
                          checked={selectedOption === "virtual"}
                          onChange={() => toggleCheckbox("virtual")}
                          disabled={loading}
                          style={{ display: "none" }}
                        />
                        <span className="checkmark"></span>
                      </label>
                    </button>
                  </div>

                  <div className="tab-content">
                    {/* In-Person Registration Tab */}
                    {activeTab === "tab1" && (
                      <div id="tab1" className="tab active">
                        <table className="conference-table">
                          <thead>
                            <tr>
                              <th className="sty_m1-0">
                                TYPES OF PARTICIPATION
                              </th>
                              <th className="sty_m1-1">
                                Standard Registration Fee
                              </th>
                              <th className="sty_m1-2">Discount %</th>
                              <th className="sty_m1-3">
                                Early Bird Registration Fee
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {pricesData.filter(
                              (item) =>
                                item.category === "inperson" ||
                                item.category === "student"
                            ).length > 0 ? (
                              pricesData
                                .filter(
                                  (item) =>
                                    item.category === "inperson" ||
                                    item.category === "student"
                                )
                                .map((item, index) => (
                                  <tr key={index}>
                                    <td className="bg_ap1">
                                      <input
                                        type="radio"
                                        name="registrationType"
                                        value={item.type}
                                        checked={
                                          formData.intrested ===
                                          getCategoryFromParticipant(item.type)
                                        }
                                        onChange={handleParticipantChange}
                                        disabled={loading}
                                      />{" "}
                                      {item.type}
                                    </td>
                                    <td className="mak1">
                                      <s>{item.standard_price}</s>
                                    </td>
                                    <td className="mak1">{item.min}%</td>
                                    <td className="mak1 active">
                                      ${item.total}{" "}
                                      <span className="tick-mark">✓</span>
                                    </td>
                                  </tr>
                                ))
                            ) : (
                              <tr>
                                <td colSpan={4} className="loading-cell">
                                  Loading data...
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    )}

                    {/* Virtual Registration Tab */}
                    {activeTab === "tab2" && (
                      <div id="tab2" className="tab active">
                        <table className="conference-table">
                          <thead>
                            <tr>
                              <th className="sty_m1-0">
                                TYPES OF PARTICIPATION
                              </th>
                              <th className="sty_m1-1">
                                Standard Registration Fee
                              </th>
                              <th className="sty_m1-2">Discount %</th>
                              <th className="sty_m1-3">
                                Discounted Registration Fee
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {pricesData.filter(
                              (item) => item.category === "virtual"
                            ).length > 0 ? (
                              pricesData
                                .filter((item) => item.category === "virtual")
                                .map((item, index) => (
                                  <tr key={index}>
                                    <td className="bg_ap1">
                                      <input
                                        type="radio"
                                        name="registrationType"
                                        value={item.type}
                                        checked={
                                          formData.intrested ===
                                          getCategoryFromParticipant(item.type)
                                        }
                                        onChange={handleParticipantChange}
                                        disabled={loading}
                                      />{" "}
                                      {item.type}
                                    </td>
                                    <td className="mak1">
                                      <s>{item.standard_price}</s>
                                    </td>
                                    <td className="mak1">{item.min}%</td>
                                    <td className="mak1 active">
                                      ${item.total}{" "}
                                      <span className="tick-mark">✓</span>
                                    </td>
                                  </tr>
                                ))
                            ) : (
                              <tr>
                                <td colSpan={4} className="loading-cell">
                                  Loading data...
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                </div>

                {/* Accommodation Section (only for in-person) */}
                {activeTab === "tab1" && (
                  <div
                    className="acc_wrap1556 wow fadeInUp"
                    data-wow-delay="400ms"
                    data-wow-duration="1000ms"
                  >
                    <h2>Accommodation (Per Night)</h2>
                    <div className="row clearfix accomodation-block">
                      {accommodationPrices &&
                        Number(accommodationPrices.single) > 0 && (
                          <div className="col-md-6">
                            <div className="tk_wrap1">
                              <label className="container15">
                                Single Occupancy - ${accommodationPrices.single}
                                <input
                                  type="checkbox"
                                  value="single"
                                  checked={
                                    formData.other_info[
                                    "Selected Accommodation"
                                    ] === "single"
                                  }
                                  onChange={handleAccommodationChange}
                                  disabled={loading}
                                />
                                <span className="checkmark"></span>
                              </label>
                            </div>
                          </div>
                        )}
                      {accommodationPrices &&
                        Number(accommodationPrices.doubl) > 0 && (
                          <div className="col-md-6">
                            <div className="tk_wrap1">
                              <label className="container15">
                                Double Occupancy - ${accommodationPrices.doubl}
                                <input
                                  type="checkbox"
                                  value="double"
                                  checked={
                                    formData.other_info[
                                    "Selected Accommodation"
                                    ] === "double"
                                  }
                                  onChange={handleAccommodationChange}
                                  disabled={loading}
                                />
                                <span className="checkmark"></span>
                              </label>
                            </div>
                          </div>
                        )}
                    </div>

                    {formData.other_info["Selected Accommodation"] && (
                      <div className="row clearfix mt_p55">
                        <div className="col-md-4">
                          <label>Check-in Date</label>
                          <select
                            className="set156"
                            value={formData.other_info["check In Date"] || "NA"}
                            onChange={handleCheckInChange}
                            ref={checkInRef}
                            onKeyDown={(e) =>
                              handleKeyDown(e, "checkIn", checkOutRef)
                            }
                            disabled={loading}
                          >
                            <option value="NA">Select Date</option>
                            {checkInDates.map((date) => (
                              <option key={date} value={date}>
                                {formatDateWithDay(date)}
                              </option>
                            ))}
                          </select>
                          {errors.checkIn && (
                            <div className="error">{errors.checkIn}</div>
                          )}
                        </div>
                        <div className="col-md-4">
                          <label>Check-out Date</label>
                          <select
                            className="set156"
                            value={
                              formData.other_info["check Out Date"] || "NA"
                            }
                            onChange={handleCheckOutChange}
                            ref={checkOutRef}
                            onKeyDown={(e) =>
                              handleKeyDown(e, "checkOut", null)
                            }
                            disabled={loading}
                          >
                            <option value="NA">Select Date</option>
                            {checkOutDates.map((date) => (
                              <option key={date} value={date}>
                                {formatDateWithDay(date)}
                              </option>
                            ))}
                          </select>
                          {errors.checkOut && (
                            <div className="error">{errors.checkOut}</div>
                          )}
                        </div>
                        <div className="col-md-4">
                          <label>Number of Nights</label>
                          <input
                            className="re-input"
                            type="number"
                            value={formData.other_info["Num of Nights"] || 0}
                            readOnly
                          />
                          {nightsError && (
                            <span className="error-msg">{nightsError}</span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Participants Section */}
                <div className="row clearfix mt_p551 container">
                  <div className="col-md-6 new_po5">
                    <label>
                      No. of Participants
                      {formData.intrested
                        ? ` ($${formData.other_info["Registration Price"]} each)`
                        : ""}
                    </label>
                    <select
                      value={formData.no_participants}
                      onChange={handleNumParticipantsChange}
                      disabled={loading}
                    >
                      <option value="1">01</option>
                      <option value="2">02</option>
                      <option value="3">03</option>
                      <option value="4">04</option>
                      <option value="5">05</option>
                    </select>
                  </div>

                  <div className="col-md-6 new_po5">
                    <label>
                      No of Accompanying Persons (
                      {accommodationPrices && accommodationPrices.accompanying
                        ? `$${accommodationPrices.accompanying} each`
                        : "N/A"}
                      )
                    </label>
                    <select
                      value={formData.no_accompanying}
                      onChange={handleNumAccompanyingPersonsChange}
                      disabled={loading}
                    >
                      <option value="0">00</option>
                      <option value="1">01</option>
                      <option value="2">02</option>
                      <option value="3">03</option>
                      <option value="4">04</option>
                    </select>
                  </div>
                </div>

                {/* Price Summary Section */}
                <div
                  className="count_total_wrap wow fadeInUp"
                  data-wow-delay="400ms"
                  data-wow-duration="1000ms"
                >
                  <div className="sup_wrap_blue">
                    <table>
                      <tbody>
                        <tr>
                          <td colSpan={2} className="re_p1">
                            Registration Summary
                          </td>
                        </tr>
                        <tr>
                          <td className="re_p3">Registration Price:</td>
                          <td className="re_p3 text-right">
                            ${formData.other_info["Registration Price"]}
                          </td>
                        </tr>
                        <tr>
                          <td className="re_p3">No. of Participants:</td>
                          <td className="re_p3 text-right">
                            {formData.no_participants}
                          </td>
                        </tr>
                        <tr>
                          <td className="re_p3_main">
                            Total Registration Price:
                          </td>
                          <td className="re_p3_main text-right">
                            $
                            {formData.other_info["Registration Price"] *
                              formData.no_participants}
                          </td>
                        </tr>

                        {formData.other_info["selected Accommodation Price"] >
                          0 && (
                            <>
                              <tr>
                                <td className="re_p3">
                                  Accommodation Price Per Night:
                                </td>
                                <td className="re_p3 text-right">
                                  $
                                  {
                                    formData.other_info[
                                    "selected Accommodation Price"
                                    ]
                                  }
                                </td>
                              </tr>
                              {formData.other_info["check In Date"] &&
                                formData.other_info["check In Date"] !== "NA" && (
                                  <tr>
                                    <td className="re_p3">Check In Date:</td>
                                    <td className="re_p3 text-right">
                                      {formatDateWithDay(
                                        formData.other_info["check In Date"]
                                      )}
                                    </td>
                                  </tr>
                                )}
                              {formData.other_info["check Out Date"] &&
                                formData.other_info["check Out Date"] !==
                                "NA" && (
                                  <tr>
                                    <td className="re_p3">Check Out Date:</td>
                                    <td className="re_p3 text-right">
                                      {formatDateWithDay(
                                        formData.other_info["check Out Date"]
                                      )}
                                    </td>
                                  </tr>
                                )}
                              <tr>
                                <td className="re_p3">Total No. Nights:</td>
                                <td className="re_p3 text-right">
                                  {formData.other_info["Num of Nights"]}
                                </td>
                              </tr>
                              <tr>
                                <td className="re_p3_main">
                                  Total Accommodation Price:
                                </td>
                                <td className="re_p3_main text-right">
                                  $
                                  {formData.other_info[
                                    "selected Accommodation Price"
                                  ] * formData.other_info["Num of Nights"]}
                                </td>
                              </tr>
                            </>
                          )}

                        {formData.no_accompanying > 0 && (
                          <tr>
                            <td className="re_p3">
                              Accompanying Persons Price:
                            </td>
                            <td className="re_p3 text-right">
                              $
                              {formData.other_info[
                                "Price Per Accompanying Person"
                              ] * formData.no_accompanying}
                            </td>
                          </tr>
                        )}

                        <tr>
                          <td className="re_p4">Total Price:</td>
                          <td className="re_p4 text-right">${totalPrice}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Buttons */}
            <div
              className="process_wrap12 wow fadeInUp"
              data-wow-delay="400ms"
              data-wow-duration="1000ms"
            >
              <h5>
                By clicking &quot;Proceed to pay&quot;, you agree to the privacy
                policy, terms &amp; conditions and cancellation policy.
              </h5>

              <button
                type="button"
                title="Reset"
                onClick={handleReset}
                className="set1566"
                disabled={loading}
              >
                Reset
              </button>
              <button
                type="submit"
                title="Proceed to pay"
                className="set1567"
                disabled={loading}
              >
                {loading ? "Please wait..." : "Proceed to Pay"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Registration;
