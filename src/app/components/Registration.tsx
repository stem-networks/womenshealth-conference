"use client";

import React from "react";
import { useEffect, useState, useRef, useCallback } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ApiResponse, RegistrationInfo } from "@/types";
import countries from '../../data/countries';

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
  other_info: Record<string, string | number>;
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

  // ==============registration form general info================
  const [title, setTitle] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [altEmail, setAltEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [whatsappNumber, setWhatsappNumber] = useState<string>("");
  const [institution, setInstitution] = useState<string>("");
  const [country, setCountry] = useState<string>("");

  // =======registration table info==============
  const [checkInDate, setCheckInDate] = useState<string>("");
  const [checkOutDate, setCheckOutDate] = useState<string>("");
  const [numNights, setNumNights] = useState<number>(0);
  const [selectedParticipant, setSelectedParticipant] = useState<string>("");
  const [numParticipants, setNumParticipants] = useState<number>(1);
  const [numAccompanyingPersons, setNumAccompanyingPersons] =
    useState<number>(0);
  const [accommodationPrices, setAccommodationPrices] =
    useState<AccommodationPrices>({} as AccommodationPrices);
  const [selectedAccommodation, setSelectedAccommodation] =
    useState<string>("");
  const [totalAccompanyingPersonsPrice, setTotalAccompanyingPersonsPrice] =
    useState<number>(0);
  const [pricePerAccompanyingPerson, setPricePerAccompanyingPerson] =
    useState<number>(0);
  const [totalAccommodationPrice, setTotalAccommodationPrice] =
    useState<number>(0);
  const [nightsError, setNightsError] = useState<string>("");

  const [errors, setErrors] = useState<Record<string, string>>({});

  const [checkInDates, setCheckInDates] = useState<string[]>([]);
  const [checkOutDates, setCheckOutDates] = useState<string[]>([]);
  const [checkOutDatesM, setCheckOutDatesM] = useState<string[]>([]);
  const [pricesData, setPricesData] = useState<PriceData[]>([]);
  const [unitRegistrationPrice, setUnitRegistrationPrice] = useState<number>(0);
  // const [webToken, setWebToken] = useState<string>("");
  // console.log("webToken", webToken);

  // Tab
  const [activeTab, setActiveTab] = useState<string>("tab1");
  const [selectedOption, setSelectedOption] = useState<string>("inperson");

  // reg_category
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  // Focusing for form fields
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
  const [loading, setLoading] = useState<boolean>(false);
  // const [fieldLoading, setFieldLoading] = useState<{ [key: string]: boolean }>(
  //   {}
  // );

  const [formValues, setFormValues] = useState<Record<string, unknown>>({});

  // Function to generate a unique token
  // const generateWebToken = (): string => {
  //   return Date.now() + "_" + Math.floor(Math.random() * 1000000);
  // };

  // Sending draft data to API
  const [formData, setFormData] = useState<FormData>({
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
    intrested: selectedCategory,
    abstract_title: "",
    message: "",
    web_token: "",
    form_type: "register",
    submit_status: "0", // Default submit_status to 0
    no_participants: numParticipants,
    no_accompanying: numAccompanyingPersons,
    other_info: {
      "Selected Accommodation": selectedAccommodation,
      "check In Date": checkInDate,
      "check Out Date": checkOutDate,
      "Num of Nights": numNights,
      "selected Accommodation Price": 0,
      "Price Per Accompanying Person": pricePerAccompanyingPerson,
      "Registration Price": unitRegistrationPrice,
      "Total Price": 0,
    },
  });

  // Handler for selecting participant type
  const handleParticipantChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setSelectedParticipant(event.target.value);
  };

  // Set default participant based on activeTab and pricesData
  useEffect(() => {
    if (pricesData.length > 0) {
      if (activeTab === "tab1") {
        // For In-Person Tab
        const listenerInPersonItem = pricesData.find(
          (item) => item.type === "Presenter (In-Person)"
        );
        if (listenerInPersonItem) {
          setSelectedParticipant(listenerInPersonItem.type);
        } else {
          const inPersonItems = pricesData.filter(
            (item) => item.category === "inperson"
          );
          if (inPersonItems.length > 0) {
            setSelectedParticipant(inPersonItems[0].type);
          }
        }
      } else if (activeTab === "tab2") {
        // For Virtual Tab
        const listenerVirtualItem = pricesData.find(
          (item) => item.type === "Presenter (Virtual)"
        );
        if (listenerVirtualItem) {
          setSelectedParticipant(listenerVirtualItem.type);
        } else {
          const virtualItems = pricesData.filter(
            (item) => item.category === "virtual"
          );
          if (virtualItems.length > 0) {
            setSelectedParticipant(virtualItems[0].type);
          }
        }
      }
    }
  }, [pricesData, activeTab]);

  //  const logError = useCallback(async (message: string) => {
  //   try {
  //     const formData = new FormData();
  //     formData.append("form_based", "Registration Form");
  //     formData.append("cid", process.env.NEXT_PUBLIC_CID ?? "");
  //     formData.append("error_message", message);
  //     formData.append("name", name);
  //     formData.append("email", email);

  //     await fetch("/api/register", {
  //       method: "POST",
  //       body: formData,
  //     });
  //   } catch (err) {
  //     console.error("Error Logging API Failure", err);
  //   }
  // }, [name, email]);

  const logError = useCallback(
    async (message: string) => {
      try {
        const formData = new FormData();
        formData.append("form_based", "Registration Form");
        formData.append("error_message", message);
        formData.append("name", name);
        formData.append("email", email);

        await fetch("/api/send-to-telegram", {
          method: "POST",
          body: formData,
        });
      } catch (err) {
        console.error("Error logging error:", err);
      }
    },
    [name, email]
  );

  const sendFullFormData = useCallback(
    async (data: Record<string, unknown>) => {
      try {
        // setLoading(true);

        const formDataObj = new FormData();
        Object.entries(data).forEach(([key, value]) => {
          if (
            typeof value === "string" ||
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

        console.log("Form data sent successfully");
      } catch (err) {
        console.error("Error saving form data:", err);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // const sendFullFormData = useCallback(
  //   async (data: Record<string, unknown>, field?: string) => {
  //     try {
  //       if (field) {
  //         setFieldLoading((prev) => ({ ...prev, [field]: true }));
  //       }

  //       const formDataObj = new FormData();
  //       Object.entries(data).forEach(([key, value]) => {
  //         if (
  //           typeof value === "string" ||
  //           typeof value === "number" ||
  //           typeof value === "boolean"
  //         ) {
  //           formDataObj.append(key, String(value));
  //         } else if (value instanceof Blob) {
  //           formDataObj.append(key, value);
  //         } else if (value !== undefined && value !== null) {
  //           formDataObj.append(key, JSON.stringify(value));
  //         }
  //       });

  //       await axios.post("/api/send-to-cms", formDataObj, {
  //         headers: { "Content-Type": "multipart/form-data" },
  //       });

  //       console.log("Form data sent successfully");
  //     } catch (err) {
  //       console.error("Error saving form data:", err);
  //     } finally {
  //       if (field) {
  //         setFieldLoading((prev) => ({ ...prev, [field]: false }));
  //       }
  //     }
  //   },
  //   []
  // );

  // Update `selectedCategory` based on `selectedParticipant`
  useEffect(() => {
    let category = "";

    if (selectedParticipant === "Listener (In-Person)") {
      category = "1_Listener-In-Person_listener-in-person";
    } else if (selectedParticipant === "Presenter (In-Person)") {
      category = "2_Presenter-In-Person_presenter-in-person";
    } else if (selectedParticipant === "Student/Young Researcher") {
      category = "3_Young-Researcher-In-Person_young-researcher-in-person";
    } else if (selectedParticipant === "Listener (Virtual)") {
      category = "4_Listener-Virtual_listener-virtual";
    } else if (selectedParticipant === "Presenter (Virtual)") {
      category = "5_Presenter-Virtual_presenter-virtual";
    }

    setSelectedCategory(category);

    setFormData((prevState) => {
      const updatedData = {
        ...prevState,
        intrested: category,
      };

      if (updatedData.email) {
        sendFullFormData(updatedData);
      }

      return updatedData;
    });
  }, [selectedParticipant, sendFullFormData]);

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
      // Set initial selected participant type from the first item in pricesData
      setSelectedParticipant(pricesData[0].type);
    }
  }, [pricesData]);

  useEffect(() => {
    if (selectedParticipant && pricesData.length > 0) {
      try {
        // Find the selected item from pricesData
        const selectedItem = pricesData.find(
          (item) => item.type === selectedParticipant
        );

        // Set price based on API data or default to 0
        setUnitRegistrationPrice(selectedItem ? selectedItem.total : 0);
      } catch (error) {
        console.error("Error retrieving price data:", error);
        setUnitRegistrationPrice(0);
      }
    }

    // if (pricesData.length > 0) {
    //   const types = pricesData.map((item) => item.type);
    //   const fees = pricesData.map((item) => item.total);

    //   setTypesOfParticipation(types);
    //   setStandardFees(fees);
    // }
  }, [selectedParticipant, pricesData]);

  useEffect(() => {
    if (selectedParticipant && pricesData.length > 0) {
      try {
        // Find the selected item from pricesData
        const selectedItem = pricesData.find(
          (item) => item.type === selectedParticipant
        );

        const regPrice = selectedItem ? selectedItem.total : 0;
        setUnitRegistrationPrice(regPrice);

        setFormData((prevState) => {
          const updatedData = {
            ...prevState,
            other_info: {
              ...prevState.other_info,
              "Registration Price": regPrice,
            },
          };

          if (updatedData.email) {
            sendFullFormData(updatedData);
          }
          return updatedData;
        });
      } catch (error) {
        console.error("Error retrieving price data:", error);
        setUnitRegistrationPrice(0);
      }
    }
  }, [selectedParticipant, pricesData]);

  useEffect(() => {
    let price = 0;
    switch (selectedAccommodation) {
      case "single":
        price = parseFloat(accommodationPrices.single);
        break;
      case "double":
        price = parseFloat(accommodationPrices.doubl);
        break;
      case "triple":
        price = parseFloat(accommodationPrices.tri);
        break;
      default:
        price = 0;
    }
    setTotalAccommodationPrice(price * numNights);
  }, [selectedAccommodation, accommodationPrices, numNights]);

  // ============registration info===========
  const [isHydrated, setIsHydrated] = useState<boolean>(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void => {
    const { name, value } = e.target;

    // Update state and clear errors
    setFormData((prevState) => ({ ...prevState, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));

    // Trigger API only when title or country is selected
    if ((name === "title" || name === "country") && formData.email) {
      sendFullFormData({ ...formData, [name]: value });
    }

    // Update state and clear errors for that field
    switch (name) {
      case "title":
        setTitle(value);
        setErrors((prevErrors) => ({ ...prevErrors, title: "" }));
        break;
      case "name":
        setName(value);
        setErrors((prevErrors) => ({ ...prevErrors, name: "" }));
        break;
      case "altEmail":
        setAltEmail(value);
        setErrors((prevErrors) => ({ ...prevErrors, altEmail: "" }));
        break;
      case "email":
        setEmail(value);
        setErrors((prevErrors) => ({ ...prevErrors, email: "" }));
        break;
      case "whatsappNumber":
        setWhatsappNumber(value);
        setErrors((prevErrors) => ({ ...prevErrors, whatsappNumber: "" }));
        break;
      case "phone":
        setPhone(value);
        setErrors((prevErrors) => ({ ...prevErrors, phone: "" }));
        break;
      case "institution":
        setInstitution(value);
        setErrors((prevErrors) => ({ ...prevErrors, institution: "" }));
        break;
      case "country":
        setCountry(value);
        setErrors((prevErrors) => ({ ...prevErrors, country: "" }));
        break;
      // Add cases for other inputs as needed...
      default:
        break;
    }
  };

  const handleAccommodationChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const value = e.target.value;
    const updatedAccomodation = selectedAccommodation === value ? "" : value;

    // Fix: Ensure we use updatedAccomodation instead of selectedAccommodation
    const selectedAccommodationPrice =
      updatedAccomodation === "single"
        ? parseFloat(accommodationPrices.single)
        : updatedAccomodation === "double"
          ? parseFloat(accommodationPrices.doubl)
          : updatedAccomodation === "triple"
            ? parseFloat(accommodationPrices.tri)
            : 0;

    setSelectedAccommodation(updatedAccomodation);

    if (selectedAccommodation !== value) {
      setCheckInDate("NA");
      setCheckOutDate("NA");
      setNumNights(0);
    }

    setFormData((prevState) => {
      const updatedData = {
        ...prevState,
        other_info: {
          ...prevState.other_info,
          "Selected Accommodation": updatedAccomodation,
          "selected Accommodation Price": selectedAccommodationPrice,
        },
      };

      if (updatedData.email) {
        sendFullFormData(updatedData);
      }

      return updatedData;
    });
  };

  const formatDateWithDay = (dateStr: string): string => {
    if (dateStr === "NA") return "NA"; // Return NA directly if the value is 'NA'

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
    const monthName = months[parseInt(month, 10) - 1]; // Convert month number to short name
    const formattedDay = day.padStart(2, "0"); // Ensure two-digit day format

    return `${monthName} ${formattedDay}, ${year} (${dayName})`;
  };

  const handleCheckInChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    const selectedDate = e.target.value || "NA";
    setCheckInDate(selectedDate);

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

    // Format the new checkout dates to include the day of the week
    const formattedCheckOutDates = newCheckOutDates.map((date) => date);
    setCheckOutDates(formattedCheckOutDates);
    setCheckOutDate(""); // Clear pre-selected checkout date

    // **Clear the check-in error dynamically**
    setErrors((prevErrors) => ({
      ...prevErrors,
      checkIn: selectedDate !== "NA" ? "" : prevErrors.checkIn,
    }));

    // **Clear check-out error as well if a valid check-in date is chosen**
    setErrors((prevErrors) => ({
      ...prevErrors,
      checkOut: "",
    }));

    // Calculate nights whenever the check-in date changes
    calculateNights(selectedDate, ""); // Pass empty string for checkOut if not selected

    setFormData((prevState) => {
      const updatedData = {
        ...prevState,
        other_info: {
          ...prevState.other_info,
          "check In Date": selectedDate,
        },
      };

      if (updatedData.email) {
        sendFullFormData(updatedData);
      }

      return updatedData;
    });
  };

  const handleCheckOutChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    const selectedDate = e.target.value;

    // Ensure checkout date is after check-in date
    if (checkInDate && selectedDate) {
      const isValidDate =
        new Date(selectedDate.split("-").reverse().join("-")) >
        new Date(checkInDate.split("-").reverse().join("-"));

      if (!isValidDate) {
        //  set an error message
        setErrors((prevErrors) => ({
          ...prevErrors,
          checkOut: "Check-out date must be after check-in date",
        }));
        return;
      }
    }

    setCheckOutDate(selectedDate);

    // **Clear the check-out error dynamically**
    setErrors((prevErrors) => ({
      ...prevErrors,
      checkOut: selectedDate !== "NA" ? "" : prevErrors.checkOut,
    }));

    // Calculate nights whenever the check-out date changes
    calculateNights(checkInDate, selectedDate);

    setFormData((prevState) => {
      const updatedData = {
        ...prevState,
        other_info: {
          ...prevState.other_info,
          "check Out Date": selectedDate,
        },
      };

      if (updatedData.email) {
        sendFullFormData(updatedData);
      }
      return updatedData;
    });
  };

  const calculateNights = (checkIn: string, checkOut: string): void => {
    if (checkIn && checkOut) {
      // Remove the day of the week (anything inside parentheses)
      const cleanCheckIn = checkIn.replace(/\s*\(.*?\)/, "");
      const cleanCheckOut = checkOut.replace(/\s*\(.*?\)/, "");

      // Split the date strings by '-' and create Date objects
      const [checkInDay, checkInMonth, checkInYear] = cleanCheckIn
        .split("-")
        .map(Number);
      const [checkOutDay, checkOutMonth, checkOutYear] = cleanCheckOut
        .split("-")
        .map(Number);

      // Create Date objects (months are 0-indexed in JavaScript)
      const checkInDate = new Date(checkInYear, checkInMonth - 1, checkInDay);
      const checkOutDate = new Date(
        checkOutYear,
        checkOutMonth - 1,
        checkOutDay
      );

      if (checkOutDate <= checkInDate) {
        setNumNights(0);
        setNightsError("Check-out date must be after check-in date");
        return;
      }

      const timeDiff = checkOutDate.getTime() - checkInDate.getTime();
      const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24)); // convert to days

      if (daysDiff <= 0) {
        setNumNights(0);
        setNightsError("Number of nights must be greater than 0");
        return;
      }

      setNumNights(daysDiff);
      setNightsError("");

      // Update numNights in State and formData
      setNumNights(daysDiff);
      setNightsError("");

      setFormData((prevState) => {
        const updatedData = {
          ...prevState,
          other_info: {
            ...prevState.other_info,
            "check In Date": checkIn,
            "check Out Date": checkOut,
            "Num of Nights": daysDiff,
          },
        };

        // Trigger API only after email is entered
        if (updatedData.email) {
          sendFullFormData(updatedData);
        }

        return updatedData;
      });
    } else if (checkIn && !checkOut) {
      // If check-in is selected but no check-out, set nights to 0
      setNumNights(0);
      setNightsError("");

      setFormData((prevState) => ({
        ...prevState,
        other_info: {
          ...prevState.other_info,
          "check In Date": checkIn,
          "check Out Date": "",
          "Num of Nights": 0,
        },
      }));
    } else {
      // Handle cases where one or both dates are not set
      setNumNights(0);
      setNightsError("Both check-in and check-out dates must be selected");
    }
  };

  const handleNumParticipantsChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    const newValue = parseInt(e.target.value, 10);
    setNumParticipants(newValue);

    setFormData((prevState) => {
      const updatedData = { ...prevState, no_participants: newValue };

      if (updatedData.email) {
        sendFullFormData(updatedData);
      }

      return updatedData;
    });
  };

  const handleNumAccompanyingPersonsChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    const newValueAccom = parseInt(e.target.value, 10);
    setNumAccompanyingPersons(newValueAccom);

    setFormData((prevState) => {
      const updatedData = { ...prevState, no_accompanying: newValueAccom };

      if (updatedData.email) {
        sendFullFormData(updatedData);
      }

      return updatedData;
    });
  };

  useEffect(() => {
    if (accommodationPrices && accommodationPrices.accompanying) {
      const pricePerAccompanyingPerson = parseFloat(
        accommodationPrices.accompanying
      );
      setPricePerAccompanyingPerson(pricePerAccompanyingPerson);
      setTotalAccompanyingPersonsPrice(
        numAccompanyingPersons * pricePerAccompanyingPerson
      );

      setFormData((prevState) => {
        const updatedData = {
          ...prevState,
          other_info: {
            ...prevState.other_info,
            "Price Per Accompanying Person": pricePerAccompanyingPerson,
          },
        };

        if (updatedData.email) {
          sendFullFormData(updatedData);
        }

        return updatedData;
      });
    } else {
      // Handle the case when accommodationPrices or accommodationPrices.accompanying is not available
      setTotalAccompanyingPersonsPrice(0);
      setPricePerAccompanyingPerson(0);

      setFormData((prevState) => ({
        ...prevState,
        other_info: {
          ...prevState.other_info,
          "Price Per Accompanying Person": 0,
        },
      }));
    }
  }, [numAccompanyingPersons, accommodationPrices]);

  const totalPrice =
    unitRegistrationPrice * numParticipants +
    totalAccommodationPrice +
    totalAccompanyingPersonsPrice;

  useEffect(() => {
    setFormData((prevState) => {
      // Prevent unnecessary re-renders by updating state only if value changes
      if (prevState.other_info["Total Price"] !== totalPrice) {
        const updatedData = {
          ...prevState,
          other_info: {
            ...prevState.other_info,
            "Total Price": totalPrice,
          },
        };

        if (updatedData.email) {
          sendFullFormData(updatedData);
        }

        return updatedData;
      }

      return prevState;
    });
  }, [totalPrice]); //Only runs when totalPrice changes

  const selectedAccommodationPrice =
    selectedAccommodation === "single"
      ? parseFloat(accommodationPrices.single)
      : selectedAccommodation === "double"
        ? parseFloat(accommodationPrices.doubl)
        : selectedAccommodation === "triple"
          ? parseFloat(accommodationPrices.tri)
          : 0;

  // Form Submission
  // const handleSubmit = async (e: React.FormEvent): Promise<void> => {
  //   e.preventDefault();

  //   // Disable the submit button and other fields during submission
  //   setLoading(true);

  //   // Reset previous errors
  //   let valid = true;
  //   const newErrors: Record<string, string> = {};

  //   // Validate fields
  //   if (!title) {
  //     newErrors.title = "Title is required";
  //     valid = false;
  //   }

  //   // Stop validation on first error (no need to check further)
  //   if (!valid) {
  //     setErrors(newErrors);

  //     // Display toastr message for the first error field only
  //     for (const field in newErrors) {
  //       if (newErrors[field]) {
  //         // toastr.error(newErrors[field], "Validation Error", { timeOut: 3000 });
  //         break; // Show only the first error message
  //       }
  //     }

  //     // Focus on the first field with an error
  //     if (newErrors.title && titleRef.current) {
  //       titleRef.current.focus();
  //     } else if (newErrors.name && nameRef.current) {
  //       nameRef.current.focus();
  //     } else if (newErrors.email && emailRef.current) {
  //       emailRef.current.focus();
  //     } else if (newErrors.altEmail && altEmailRef.current) {
  //       altEmailRef.current.focus();
  //     } else if (newErrors.phone && phoneRef.current) {
  //       phoneRef.current.focus();
  //     } else if (newErrors.institution && institutionRef.current) {
  //       institutionRef.current.focus();
  //     } else if (newErrors.country && countryRef.current) {
  //       countryRef.current.focus();
  //     } else if (newErrors.checkIn && checkInRef.current) {
  //       checkInRef.current.focus(); // Focus on check-in field
  //     } else if (newErrors.checkOut && checkOutRef.current) {
  //       checkOutRef.current.focus(); // Focus on check-out field
  //     }

  //     setLoading(false);
  //     return; // Stop form submission until validation passes
  //   }

  //   // Validate remaining fields if the first field is valid
  //   if (!name) {
  //     newErrors.name = "Name is required";
  //     valid = false;
  //   } else if (!email) {
  //     newErrors.email = "Email is required";
  //     valid = false;
  //   } else if (!/\S+@\S+\.\S+/.test(email)) {
  //     newErrors.email = "Email is invalid";
  //     valid = false;
  //   } else if (altEmail && !/\S+@\S+\.\S+/.test(altEmail)) {
  //     newErrors.altEmail = "Alternate Email is invalid";
  //     valid = false;
  //   } else if (!phone) {
  //     newErrors.phone = "Phone is required";
  //     valid = false;
  //   } else if (!institution) {
  //     newErrors.institution = "Institution is required";
  //     valid = false;
  //   } else if (!country) {
  //     newErrors.country = "Country is required";
  //     valid = false;
  //   }

  //   // Validate check-in and check-out dates if accommodation is selected
  //   else if (selectedAccommodation) {
  //     if (!checkInDate || checkInDate === "NA") {
  //       newErrors.checkIn = "Check-in Date is required";
  //       valid = false;
  //     } else if (!checkOutDate || checkOutDate === "NA") {
  //       newErrors.checkOut = "Check-out Date is required";
  //       valid = false;
  //     }
  //   }

  //   // If not valid, continue to show error for the first invalid field
  //   if (!valid) {
  //     setErrors(newErrors);

  //     // Display toastr message for the first error field only
  //     for (const field in newErrors) {
  //       if (newErrors[field]) {
  //         // toastr.error(newErrors[field], "Validation Error", { timeOut: 3000 });
  //         break; // Show only the first error message
  //       }
  //     }

  //     // Focus on the first field with an error
  //     if (newErrors.title && titleRef.current) {
  //       titleRef.current.focus();
  //     } else if (newErrors.name && nameRef.current) {
  //       nameRef.current.focus();
  //     } else if (newErrors.email && emailRef.current) {
  //       emailRef.current.focus();
  //     } else if (newErrors.altEmail && altEmailRef.current) {
  //       altEmailRef.current.focus();
  //     } else if (newErrors.phone && phoneRef.current) {
  //       phoneRef.current.focus();
  //     } else if (newErrors.institution && institutionRef.current) {
  //       institutionRef.current.focus();
  //     } else if (newErrors.country && countryRef.current) {
  //       countryRef.current.focus();
  //     } else if (newErrors.checkIn && checkInRef.current) {
  //       checkInRef.current.focus(); // Focus on check-in field
  //     } else if (newErrors.checkOut && checkOutRef.current) {
  //       checkOutRef.current.focus(); // Focus on check-out field
  //     }

  //     setLoading(false);
  //     return; // Stop form submission until validation passes
  //   }

  //   // Update formData with submit_status
  //   const updatedFormData = { ...formData, submit_status: "1" };

  //   // Proceed to submit form if valid
  //   const postData = {
  //     module_name: "registration_save",
  //     keys: {
  //       data: [
  //         {
  //           title,
  //           name,
  //           email,
  //           alt_email: altEmail,
  //           phone,
  //           whatsapp_number: whatsappNumber,
  //           institution,
  //           country,
  //           reg_category: selectedCategory,
  //           occupency_text: selectedAccommodation,
  //           occupancy: selectedAccommodationPrice.toString(),
  //           check_insel: checkInDate,
  //           check_outsel: checkOutDate,
  //           nights: numNights.toString(),
  //           no_of_participants: numParticipants.toString(),
  //           no_of_accompanying: numAccompanyingPersons.toString(),
  //           reg_tot_hidden: unitRegistrationPrice.toString(),
  //           price_of_each_accompanying: pricePerAccompanyingPerson.toString(),
  //           final_amt_input: totalPrice.toString(),
  //         },
  //       ],
  //     },
  //   };

  //   console.log("payload", postData);

  //   // Call sendFullFormData after updating formData
  //   sendFullFormData(updatedFormData);

  //   // Submit the data
  //   try {
  //     const response = await axios.post("/api/register", postData, {
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });

  //     const token = response.data?.data;
  //     if (token) {
  //       // setWebToken(token);
  //       router.push(`/register_details?web_token=${token}`);
  //     } else {
  //       console.error("Web token not found in response");
  //       await logError("Web token is missing in the API response.");
  //     }
  //   } catch (error) {
  //     console.error("Error submitting registration:", error);
  //     await logError("Registration failed: something went wrong.");
  //   }

  //   // Re-enable the submit button and form fields after submission
  //   setLoading(false);
  // };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();

    setLoading(true);
    setErrors({});

    // Validation
    let valid = true;
    const newErrors: Record<string, string> = {};

    if (!title) {
      newErrors.title = "Title is required";
      valid = false;
    }
    // Stop validation early
    if (!valid) {
      setErrors(newErrors);
      // Focus first invalid field
      if (newErrors.title && titleRef.current) titleRef.current.focus();
      setLoading(false);
      return;
    }

    if (!name) {
      newErrors.name = "Name is required";
      valid = false;
    } else if (!email) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid";
      valid = false;
    } else if (altEmail && !/\S+@\S+\.\S+/.test(altEmail)) {
      newErrors.altEmail = "Alternate Email is invalid";
      valid = false;
    } else if (!phone) {
      newErrors.phone = "Phone is required";
      valid = false;
    } else if (!institution) {
      newErrors.institution = "Institution is required";
      valid = false;
    } else if (!country) {
      newErrors.country = "Country is required";
      valid = false;
    } else if (selectedAccommodation) {
      if (!checkInDate || checkInDate === "NA") {
        newErrors.checkIn = "Check-in Date is required";
        valid = false;
      } else if (!checkOutDate || checkOutDate === "NA") {
        newErrors.checkOut = "Check-out Date is required";
        valid = false;
      }
    }

    if (!valid) {
      setErrors(newErrors);
      // Focus on the first invalid field
      if (newErrors.name && nameRef.current) nameRef.current.focus();
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

    // Call sendFullFormData (your existing function) with the form data
    sendFullFormData(updatedFormData);

    // Prepare API payload
    const postData = {
      module_name: "registration_save",
      keys: {
        data: [
          {
            title,
            name,
            email,
            alt_email: altEmail,
            phone,
            whatsapp_number: whatsappNumber,
            institution,
            country,
            reg_category: selectedCategory,
            occupency_text: selectedAccommodation,
            occupancy: selectedAccommodationPrice.toString(),
            check_insel: checkInDate,
            check_outsel: checkOutDate,
            nights: numNights.toString(),
            no_of_participants: numParticipants.toString(),
            no_of_accompanying: numAccompanyingPersons.toString(),
            reg_tot_hidden: unitRegistrationPrice.toString(),
            price_of_each_accompanying: pricePerAccompanyingPerson.toString(),
            final_amt_input: totalPrice.toString(),
          },
        ],
      },
    };

    try {
      const response = await axios.post("/api/register", postData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const token = response.data?.data;
      if (token) {
        router.push(`/register_details?web_token=${token}`);
      } else {
        console.error("Web token not found in response");
        await logError("Web token is missing in the API response.");
      }
    } catch (error) {
      console.error("Error submitting registration:", error);
      await logError("Registration failed: something went wrong.");
    }

    setLoading(false);
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLElement>, // Accepts input, textarea, select, etc.
    fieldName: string,
    nextFieldRef: React.RefObject<HTMLElement | null> | null
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();

      let fieldValid = true;
      const newErrors = { ...errors };

      // Validation logic
      if (fieldName === "title" && !title) {
        newErrors.title = "Title is required";
        fieldValid = false;
      } else if (fieldName === "name" && !name) {
        newErrors.name = "Name is required";
        fieldValid = false;
      } else if (fieldName === "email") {
        if (!email) {
          newErrors.email = "Email is required";
          fieldValid = false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
          newErrors.email = "Email is invalid";
          fieldValid = false;
        }
      } else if (
        fieldName === "altEmail" &&
        altEmail &&
        !/\S+@\S+\.\S+/.test(altEmail)
      ) {
        newErrors.altEmail = "Alternative Email is invalid";
        fieldValid = false;
      } else if (fieldName === "phone" && !phone) {
        newErrors.phone = "Phone is required";
        fieldValid = false;
      } else if (fieldName === "institution" && !institution) {
        newErrors.institution = "Institution is required";
        fieldValid = false;
      } else if (fieldName === "country" && !country) {
        newErrors.country = "Country is required";
        fieldValid = false;
      } else if (fieldName === "checkIn" && selectedAccommodation) {
        if (!checkInDate || checkInDate === "NA") {
          newErrors.checkIn = "Check-in date is required";
          fieldValid = false;
        }
      } else if (fieldName === "checkOut" && selectedAccommodation) {
        if (!checkOutDate || checkOutDate === "NA") {
          newErrors.checkOut = "Check-out date is required";
          fieldValid = false;
        }
      }

      // If field is invalid
      if (!fieldValid) {
        setErrors(newErrors);
        return;
      }

      // Clear error and move to next field
      setErrors((prevErrors) => ({ ...prevErrors, [fieldName]: "" }));

      if (nextFieldRef?.current) {
        nextFieldRef.current.focus();
      }
    }
  };

  // Effect to set the initial tab and checkbox
  useEffect(() => {
    setActiveTab("tab1"); // Set initial tab
    setSelectedOption("inperson"); // Set initial checked checkbox
  }, []);

  // Function to show the clicked tab
  const switchTab = (tabId: string) => {
    setActiveTab(tabId);
  };

  // Handle checkbox change
  const toggleCheckbox = (value: string) => {
    setSelectedOption(value);
  };

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return null;
  }

  const handleReset = () => {
    // Reset all form fields
    setTitle("");
    setName("");
    setEmail("");
    setAltEmail("");
    setPhone("");
    setWhatsappNumber("");
    setInstitution("");
    setCountry("");
    setSelectedParticipant("");
    setNumNights(0);
    setNumParticipants(1);
    setNumAccompanyingPersons(0);
    setSelectedAccommodation("");
    setTotalAccompanyingPersonsPrice(0);
    setPricePerAccompanyingPerson(0);
    setTotalAccommodationPrice(0);
    setNightsError("");
    setCheckInDate("");
    setCheckOutDate("");
    setUnitRegistrationPrice(0);
    // setWebToken("");

    // Clear all errors
    setErrors({});

    // Reset to first tab (In-Person) and first participant (Listener In-Person)
    setActiveTab("tab1");

    if (pricesData.length > 0) {
      const listenerInPersonItem = pricesData.find(
        (item) => item.type === "Presenter (In-Person)"
      );

      if (listenerInPersonItem) {
        // Force re-render by briefly setting to null
        // setSelectedParticipant();
        setTimeout(() => {
          setSelectedParticipant(listenerInPersonItem.type);
          setUnitRegistrationPrice(listenerInPersonItem.total);
        }, 0);
      } else {
        const inPersonItems = pricesData.filter(
          (item) => item.category === "inperson"
        );
        if (inPersonItems.length > 0) {
          // setSelectedParticipant(null);
          setTimeout(() => {
            setSelectedParticipant(inPersonItems[0].type);
            setUnitRegistrationPrice(inPersonItems[0].total);
          }, 0);
        }
      }
    }
  };

  // const handleFieldUpdate = (fieldName: FieldName, value: FieldValue) => {
  //   setFormData((prevState) => {
  //     const otherInfoFields: OtherInfoField[] = [
  //       "Selected Accommodation",
  //       "check In Date",
  //       "check Out Date",
  //       "Num of Nights",
  //       "selected Accommodation Price",
  //       "Price Per Accompanying Person",
  //       "Registration Price",
  //       "Total Price",
  //     ];

  //     const updatedOtherInfo: Partial<Record<OtherInfoField, string | number>> =
  //       {
  //         ...prevState.other_info,
  //       };

  //     if (otherInfoFields.includes(fieldName as OtherInfoField)) {
  //       updatedOtherInfo[fieldName as OtherInfoField] = value as
  //         | string
  //         | number;
  //     }

  //     const updatedData = {
  //       ...prevState,
  //       [fieldName]: value,
  //       other_info: updatedOtherInfo,
  //       submit_status: prevState.submit_status || "0",
  //     };

  //     const isValidEmail = (email: string) => /\S+@\S+\.\S+/.test(email);

  //     if (
  //       typeof updatedData.email === "string" &&
  //       isValidEmail(updatedData.email)
  //     ) {
  //       if (!prevState.web_token) {
  //         updatedData.web_token = generateWebToken();
  //       }
  //       sendFullFormData(updatedData);
  //     } else {
  //       console.error("Invalid email format. API not triggered.");
  //     }

  //     return updatedData;
  //   });
  // };

  // Error Messages sending to API when submitting form

  const handleFieldUpdate = (fieldName: string, value: string) => {
    setFormValues((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  const handleBlur = (fieldName: string, value: string) => {
    handleFieldUpdate(fieldName, value);

    if ((fieldName === "email" || fieldName === "altEmail") && value) {
      const isValidEmail = (email: string) => /\S+@\S+\.\S+/.test(email);
      if (!isValidEmail(value)) {
        console.error(
          `Invalid email format for ${fieldName}. API not triggered.`
        );
        return;
      }
    }

    setTimeout(() => {
      sendFullFormData(formValues);
    }, 0);
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
                      value={title}
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
                      value={name}
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
                <div className="row clearfix">
                  <div className="col-md-1"></div>
                  <div className="col-md-5">
                    <input
                      name="email"
                      id="email"
                      className="set157"
                      placeholder="Email"
                      value={email}
                      onChange={handleChange}
                      type="email"
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
                      name="altEmail"
                      id="alt_email"
                      className="set157"
                      value={altEmail}
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
                <div className="row clearfix">
                  <div className="col-md-1"></div>
                  <div className="col-md-5">
                    <input
                      name="phone"
                      id="phone"
                      className="set157"
                      placeholder="Phone"
                      value={phone}
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
                      name="whatsappNumber"
                      id="whatsapp_number"
                      className="set157"
                      value={whatsappNumber}
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
                    <div className="error" id="whatsapp_number_error"></div>
                  </div>
                </div>
                <div className="row clearfix">
                  <div className="col-md-1"></div>
                  <div className="col-md-5">
                    <input
                      name="institution"
                      id="institution"
                      className="set157"
                      placeholder="Institution"
                      type="text"
                      value={institution}
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
                      value={country}
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
            <div className="row clearfix" style={{ width: "100%" }}>
              <div className="col-md-12 mar_center">
                <div
                  className="tabl_wrap155 wow fadeInUp"
                  data-wow-delay="400ms"
                  data-wow-duration="1000ms"
                >
                  {/* Tab Design for discount values */}

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
                          // Hide the default checkbox
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
                    {activeTab === "tab1" && (
                      <div id="tab1" className="tab active">
                        {/* Tab1 display content */}

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
                                              selectedParticipant ===
                                              item.type ||
                                              (index === 0 &&
                                                selectedParticipant === "")
                                            }
                                            onChange={handleParticipantChange}
                                            disabled={loading}
                                          />{" "}
                                          {item.type}
                                        </td>

                                        {/* Conditional rendering based on item type */}
                                        {item.type ===
                                          "Student/Young Researcher" ? (
                                          <>
                                            <td className="mak1">
                                              <s>{item.standard_price}</s>
                                            </td>
                                            <td className="mak1">
                                              {item.min}%
                                            </td>
                                            <td className="mak1 active">
                                              ${item.total}{" "}
                                              <span className="tick-mark">
                                                ✓
                                              </span>
                                            </td>
                                          </>
                                        ) : (
                                          <>
                                            <td className="mak1">
                                              <s> {item.standard_price}</s>
                                            </td>
                                            <td className="mak1">
                                              {item.min}%
                                            </td>
                                            <td className="mak1 active">
                                              ${item.total}{" "}
                                              <span className="tick-mark">
                                                ✓
                                              </span>
                                            </td>
                                          </>
                                        )}
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
                    )}
                    {activeTab === "tab2" && (
                      <div id="tab2" className="tab active">
                        {/* Tab1 display content */}

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
                                    .filter(
                                      (item) => item.category === "virtual"
                                    )
                                    .map((item, index) => (
                                      <tr key={index}>
                                        <td className="bg_ap1">
                                          <input
                                            type="radio"
                                            name="registrationType"
                                            value={item.type}
                                            checked={
                                              selectedParticipant ===
                                              item.type ||
                                              (index === 0 &&
                                                selectedParticipant === "")
                                            } // Check if it's the first radio
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
                    )}
                  </div>
                </div>

                {/* Based on tabs the Accommodation Will Display */}
                <div className="tab-content">
                  <div
                    className={
                      activeTab === "tab1" ? "tab-pane active" : "tab-pane"
                    }
                    id="tab1"
                  >
                    <div
                      className="acc_wrap1556 wow fadeInUp"
                      data-wow-delay="400ms"
                      data-wow-duration="1000ms"
                    >
                      <h2>Accommodation (Per Night)</h2>

                      <div className="row clearfix accomodation-block">
                        {accommodationPrices &&
                          accommodationPrices &&
                          Number(accommodationPrices.single) > 0 && (
                            <div className="col-md-6">
                              <div className="tk_wrap1">
                                <label className="container15">
                                  Single Occupancy - $
                                  {accommodationPrices.single}
                                  <input
                                    type="checkbox"
                                    value="single"
                                    checked={selectedAccommodation === "single"}
                                    onChange={handleAccommodationChange}
                                    disabled={loading}
                                  />
                                  <span className="checkmark"></span>
                                </label>
                              </div>
                            </div>
                          )}
                        {accommodationPrices &&
                          accommodationPrices &&
                          Number(accommodationPrices.single) > 0 && (
                            <div className="col-md-6">
                              <div className="tk_wrap1">
                                <label className="container15">
                                  Double Occupancy - $
                                  {accommodationPrices.doubl}
                                  <input
                                    type="checkbox"
                                    value="double"
                                    checked={selectedAccommodation === "double"}
                                    onChange={handleAccommodationChange}
                                    disabled={loading}
                                  />
                                  <span className="checkmark"></span>
                                </label>
                              </div>
                            </div>
                          )}
                        {/* {accommodationPrices &&
                          accommodationPrices &&
                          Number(accommodationPrices.single) > 0 && (
                            <div className="col-md-4">
                              <div className="tk_wrap1">
                                <label className="container15">
                                  Triple Occupancy - ${accommodationPrices.tri}
                                  <input
                                    type="checkbox"
                                    value="triple"
                                    checked={selectedAccommodation === "triple"}
                                    onChange={handleAccommodationChange}
                                    disabled={loading}
                                  />
                                  <span className="checkmark"></span>
                                </label>
                              </div>
                            </div>
                          )} */}
                      </div>

                      {selectedAccommodation && (
                        <div className="row clearfix mt_p55">
                          <div className="col-md-4">
                            <label>Check-in Date</label>
                            <select
                              className="set156"
                              value={checkInDate || "NA"} // Keeping original format for submission
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
                                // Shows formatted date, but value remains "DD-MM-YYYY"
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
                              value={checkOutDate || "NA"}
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
                              value={numNights || 0}
                              readOnly
                            />
                            {nightsError && (
                              <span className="error-msg">{nightsError}</span>
                            )}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="row clearfix mt_p551 container">
                      <div className="col-md-6 new_po5">
                        <label>
                          No. of Participants
                          {selectedParticipant
                            ? `($${unitRegistrationPrice} each under ${selectedParticipant}  category)`
                            : ""}
                        </label>

                        <select
                          value={numParticipants}
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
                          {accommodationPrices &&
                            accommodationPrices.accompanying
                            ? `$${accommodationPrices.accompanying} each`
                            : "N/A"}
                          )
                        </label>

                        <select
                          value={numAccompanyingPersons}
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
                  </div>

                  {/* Other tabs */}
                  <div
                    className={
                      activeTab === "tab2" ? "tab-pane active" : "tab-pane"
                    }
                    id="tab2"
                  >
                    {/* Content for tab2 */}
                  </div>
                </div>

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
                            $
                            {unitRegistrationPrice ? unitRegistrationPrice : ""}
                          </td>
                        </tr>
                        <tr>
                          <td className="re_p3">No. of Participants:</td>
                          <td className="re_p3 text-right">
                            {numParticipants ? numParticipants : ""}
                          </td>
                        </tr>
                        <tr>
                          <td className="re_p3_main">
                            Total Registration Price:
                          </td>
                          <td className="re_p3_main text-right">
                            {unitRegistrationPrice && numParticipants
                              ? `$${unitRegistrationPrice * numParticipants}`
                              : ""}
                          </td>
                        </tr>

                        {selectedAccommodationPrice ? (
                          <tr>
                            <td className="re_p3">
                              Accommodation Price Per Night:
                            </td>
                            <td className="re_p3 text-right">
                              ${selectedAccommodationPrice}
                            </td>
                          </tr>
                        ) : (
                          ""
                        )}

                        {selectedAccommodation && checkInDate && (
                          <tr>
                            <td className="re_p3">Check In Date:</td>
                            <td className="re_p3 text-right">
                              {formatDateWithDay(checkInDate)}
                            </td>
                          </tr>
                        )}

                        {selectedAccommodation && (
                          <tr>
                            <td className="re_p3">Check Out Date:</td>
                            <td className="re_p3 text-right">
                              {checkOutDate
                                ? formatDateWithDay(checkOutDate)
                                : "NA"}
                            </td>
                          </tr>
                        )}

                        {selectedAccommodation && (
                          <tr>
                            <td className="re_p3">Total No. Nights:</td>
                            <td className="re_p3 text-right">
                              {numNights >= 0 && checkOutDate ? numNights : "0"}
                            </td>
                          </tr>
                        )}

                        {totalAccommodationPrice ? (
                          <tr>
                            <td className="re_p3_main">
                              Total Accommodation Price:
                            </td>
                            <td className="re_p3_main text-right">
                              ${totalAccommodationPrice}
                            </td>
                          </tr>
                        ) : (
                          ""
                        )}

                        {totalAccompanyingPersonsPrice ? (
                          <tr>
                            <td className="re_p3">
                              Accompanying Persons Price:
                            </td>
                            <td className="re_p3 text-right">
                              ${totalAccompanyingPersonsPrice}
                            </td>
                          </tr>
                        ) : (
                          ""
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

          {/* {showModal && (
            <div className="modal" id="myModal" tabIndex={-1} role="dialog">
              <div
                className="modal-dialog modal-confirm fade-in"
                role="document"
                ref={modalRef}
              >
                <div className="modal-content">
                  <div className="modal-header">
                    <div className="icon-box">
                      <i
                        className="material-icons"
                        style={{ marginBottom: "35px" }}
                      >
                        &#10003;
                      </i>
                    </div>
                    <h4 className="modal-title w-100">
                      Registration completed successfully!{" "}
                    </h4>
                    <p className="modal-text">
                      You’ll receive a confirmation email shortly with further
                      details.
                    </p>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-success btn-block"
                      onClick={closeModal}
                    >
                      OK
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default Registration;
