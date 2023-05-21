import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import styles from "@/styles/AuthForm.module.css";

function AuthForm() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationCode, setVerificationCode] = React.useState("");
  const [verificationId, setVerificationId] = React.useState(false);
  const [isSending, setIsSending] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  const router = useRouter();

  async function handleSendOTP(e: any) {
    e.preventDefault();
    setVerificationId(false);
    setIsSending(true);
    let resp;
    try {
      resp = await fetch("/api/sendOTP", {
        method: "POST",
        body: JSON.stringify({
          phoneNumber,
        }),
      });

      const json = await resp.json();

      if (!resp.ok) {
        throw new Error(json.message);
      }

      setVerificationId(true);
      toast.success("OTP Sent Successfully!", {
        progress: undefined,
      });
    } catch (e: any) {
      toast.error(e.message, {
        progress: undefined,
      });
    }
    setIsSending(false);
  }

  async function handleVerifyOTP() {
    setIsVerifying(true);
    let resp;
    try {
      resp = await fetch("/api/verifyOTP", {
        method: "POST",
        body: JSON.stringify({
          otpCode: verificationCode,
          phoneNumber,
        }),
      });

      if (!resp.ok) {
        throw new Error("Failed! Please try again later.");
      }

      toast.success("OTP Verified!", {
        progress: undefined,
      });

      localStorage.setItem("phoneNumber", phoneNumber);

      const timeout = setTimeout(() => {
        clearTimeout(timeout);
        router.push("/form");
      }, 2000);
    } catch (e) {
      toast.error("OTP Verification Failed!", {
        progress: undefined,
      });
    }

    setIsVerifying(false);
  }

  return (
    <div className={styles.main}>
      <h1 className={styles.title}>Enter Your Mobile Number To Get Started</h1>
      <p className={styles.info}>Do not add the prefix +91</p>
      <p className={styles.info}>Form Submission could take upto 10 seconds</p>
      <form>
        <div className={styles.card}>
          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            name="phone"
            id="phone"
            className={styles.input}
            required
            pattern="[0-9]{10}"
            maxLength={10}
            minLength={10}
          />
        </div>
        <button
          type="submit"
          id="sign-in"
          className={styles.button}
          onClick={handleSendOTP}
          disabled={!phoneNumber || isSending}
        >
          {isSending ? "Sending OTP..." : "Send OTP"}
        </button>
      </form>
      {verificationId && (
        <form>
          <label className={styles.label}>Enter the OTP:</label>
          <div className={styles.card}>
            <input
              type="number"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              name="otp"
              id="otp"
              className={styles.input}
              required
              pattern="[0-9]{6}"
              maxLength={10}
              minLength={10}
            />
          </div>
          <button
            type="submit"
            id="sign-in"
            className={styles.button}
            onClick={handleVerifyOTP}
            disabled={!verificationCode || isVerifying}
          >
            {isSending ? "Verifying OTP..." : "Verify OTP"}
          </button>
        </form>
      )}
      <ToastContainer
        position="bottom-center"
        autoClose={2000}
        hideProgressBar={false}
        closeOnClick={true}
        pauseOnHover={false}
        draggable={true}
        theme="dark"
      />
    </div>
  );
}

export default AuthForm;
