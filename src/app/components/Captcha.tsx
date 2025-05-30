"use client";

import Image from "next/image";
import {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
  useRef,
} from "react";

interface CaptchaProps {
  onValidate: (valid: boolean) => void;
  onInputChange: () => void;
  setCaptchaValue: (value: { text: string; captchaId: string }) => void;
  isSubmitting: boolean;
}

export interface CaptchaRef {
  focusCaptcha: () => void;
  resetCaptchaInput: () => void;
  refreshCaptcha: () => void;
}

const Captcha = forwardRef<CaptchaRef, CaptchaProps>(
  ({ onValidate, onInputChange, setCaptchaValue, isSubmitting }, ref) => {
    const [captchaSrc, setCaptchaSrc] = useState<string>("");
    const [captchaId, setCaptchaId] = useState<string>("demo"); // default demo
    const [captchaText, setCaptchaText] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [isVerified, setIsVerified] = useState<boolean>(false);
    const validateTimeout = useRef<NodeJS.Timeout | null>(null);

    const inputRef = useRef<HTMLInputElement | null>(null);

    const fetchCaptcha = async () => {
      try {
        setCaptchaText("");
        setErrorMessage("");
        setIsVerified(false);
        onValidate(false);

        // Fetch new CAPTCHA from backend API
        const res = await fetch("/api/captcha");
        if (!res.ok) throw new Error("Failed to fetch CAPTCHA");

        const data = await res.json();
        const { captchaId, captchaData } = data;

        // captchaData is an SVG string - convert to base64 for img src
        const dataUrl = `data:image/svg+xml;base64,${btoa(captchaData)}`;

        setCaptchaSrc(dataUrl);
        setCaptchaId(captchaId);
        sessionStorage.setItem("captchaId", captchaId);
      } catch (error) {
        console.error("Error fetching CAPTCHA:", error);
      }
    };

    const validateCaptcha = (text: string) => {
      if (validateTimeout.current) clearTimeout(validateTimeout.current);

      if (!text || text.length < 4) {
        // assuming captcha length is 4 (adjust as needed)
        setIsVerified(false);
        setErrorMessage("");
        onValidate(false);
        return;
      }

      validateTimeout.current = setTimeout(async () => {
        try {
          const res = await fetch("/api/validate-captcha", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text, captchaId }),
          });

          const result = await res.json();

          if (result.valid) {
            setIsVerified(true);
            setErrorMessage("");
            onValidate(true);
          } else {
            setIsVerified(false);
            setErrorMessage("Invalid CAPTCHA");
            onValidate(false);
          }
        } catch (error) {
          console.error("CAPTCHA validation failed:", error);
          setIsVerified(false);
          setErrorMessage("Validation error");
          onValidate(false);
        }
      }, 500);
    };

    useEffect(() => {
      fetchCaptcha();
    }, []);

    useImperativeHandle(ref, () => ({
      focusCaptcha: () => {
        inputRef.current?.focus();
      },
      resetCaptchaInput: () => {
        setCaptchaText("");
        setErrorMessage("");
        setIsVerified(false);
        onValidate(false);
      },
      refreshCaptcha: () => {
        fetchCaptcha();
        setCaptchaText("");
        setErrorMessage("");
        setIsVerified(false);
        onValidate(false);
      },
    }));

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const textValue = e.target.value;
      setCaptchaText(textValue);
      setCaptchaValue({ text: textValue, captchaId });

      // Reset error on input change immediately, but keep validation debounce
      setErrorMessage("");
      setIsVerified(false);
      onValidate(false);

      onInputChange();

      validateCaptcha(textValue);
    };

    return (
      <div className="captcha-container">
        <div className="mb-3 d-flex align-items-center">
          {captchaSrc && (
            <Image
              src={captchaSrc}
              alt="CAPTCHA"
              className="border rounded shadow-sm"
              width={100}
              height={40}
            />
          )}
          {/* <button
            type="button"
            className="btn btn-outline-secondary ms-2"
            onClick={fetchCaptcha}
            disabled={isSubmitting}
          >
            <i className="bx bx-refresh"></i> Refresh
          </button> */}
          <button
            type="button"
            className="btn btn-outline-secondary ms-2"
            onClick={fetchCaptcha} // Calls fetchCaptcha to reset & refresh
            disabled={isSubmitting}
          >
            <i className="bx bx-refresh"></i> Refresh
          </button>
        </div>

        <div className="input-group mb-3 captcha-text-block">
          <input
            ref={inputRef}
            id="captchaInput"
            type="text"
            className="form-control"
            value={captchaText}
            onChange={handleChange}
            placeholder="Enter CAPTCHA"
            disabled={isSubmitting}
          />
        </div>

        {errorMessage && !isVerified && (
          <p className="text-danger small">{errorMessage}</p>
        )}
        {isVerified && <p className="text-success small">CAPTCHA Verified!</p>}
      </div>
    );
  }
);

Captcha.displayName = "Captcha";

export default Captcha;
