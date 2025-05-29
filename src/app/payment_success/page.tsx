// File: app/payment_success/page.tsx
import PaymentSuccess from "../components/PaymentSuccess";
import { ApiResponse } from "@/types";

async function fetchGeneralData(): Promise<ApiResponse> {
  const baseUrl = process.env.BASE_URL;
  const res = await fetch(`${baseUrl}/api/general`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch general data");
  return res.json();
}

const PaymentSuccessPage = async () => {
  const general = await fetchGeneralData();
  return <PaymentSuccess generalData={general} />;
};

export default PaymentSuccessPage;