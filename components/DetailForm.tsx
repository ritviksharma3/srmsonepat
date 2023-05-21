import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import styles from "@/styles/DetailForm.module.css";

function DetailForm() {
  const router = useRouter();
  const uploadRef = React.useRef<HTMLInputElement>(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [registration, setRegistration] = useState("");
  const [loading, setLoading] = React.useState(false);
  const [fileName, setFileName] = React.useState("");
  const [file, setFile] = React.useState<any>(null);
  const [description, setDescription] = React.useState("");
  const [busRoute, setBusRoute] = React.useState("");
  const [vehicleNumber, setVehicleNumber] = React.useState("");

  const handleNameChange = (e: any) => setName(e.target.value);
  const handleEmailChange = (e: any) => setEmail(e.target.value);
  const handleRegistrationChange = (e: any) => setRegistration(e.target.value);

  const handleDescriptionChange = (e: any) => setDescription(e.target.value);
  const handleBusRoute = (e: any) => setBusRoute(e.target.value);
  const handleVechicleNumber = (e: any) => setVehicleNumber(e.target.value);

  useEffect(() => {
    if (!localStorage.getItem("phoneNumber")) {
      router.replace("/");
    }
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    let message = `Phone Number: ${localStorage.getItem(
      "phoneNumber"
    )}\nName: ${name}\nEmail: ${email}\nRegistration No: ${registration}\n`;
    if (description) message += `\nDescription: ${description}`;
    if (busRoute) message += `\nBus Route: ${busRoute}`;
    if (vehicleNumber) message += `\nVehicle Number: ${vehicleNumber}`;

    let result;
    if (file) {
      const MaxSize = 1024 * 1024 * 5;
      if (file.size > MaxSize) {
        toast.error("File size is too large. Max size is 5MB", {
          progress: undefined,
        });
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `https://api.cloudinary.com/v1_1/djkp8vliu/image/upload`,
          {
            method: "POST",
            body: file,
          }
        );
        if (!response.ok) {
          throw new Error("Something went wrong! Please try again later.");
        }

        result = await response.json();
        console.log(result.secure_url);
      } catch (error) {
        toast.error(e.message, {
          progress: undefined,
        });
        return;
      }
    }
    //Whatsapp
    // let resp;
    // try {
    // 	resp = await fetch("/api/whatsapp", {
    // 		method: "POST",
    // 		body: JSON.stringify({
    // 			message,
    // 			phoneNumber: localStorage.getItem("phoneNumber"),
    // 			file: result ? result.secure_url : "",
    // 		}),
    // 	});

    // 	if (!resp.ok) {
    // 		throw new Error("Failed to send message. Please try again.");
    // 	}

    // 	const wp = await resp.json();
    // } catch (err) {
    // 	setLoading(false);
    // 	return toast.error("Failed to send message. Please try again.", {
    // 		progress: undefined,
    // 	});
    // }

    //Telegram Bot
    let respon;
    try {
      respon = await fetch("/api/telegram", {
        method: "POST",
        body: JSON.stringify({
          message,
          phoneNumber: localStorage.getItem("phoneNumber"),
          file: result ? result.secure_url : "",
        }),
      });

      if (!respon.ok) {
        throw new Error("Failed to send message. Please try again.");
      }

      const tg = await respon.json();
    } catch (err) {
      setLoading(false);
      return toast.error("Failed to send message. Please try again.", {
        progress: undefined,
      });
    }

    //SMS on Successful Submission
    let resp;
    try {
      resp = await fetch("/api/filled", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phoneNumber: localStorage.getItem("phoneNumber"),
        }),
      });

      if (!resp.ok) {
        throw new Error("Failed to send message. Please try again.");
      }

      const filled = await resp.json();
    } catch (err) {
      setLoading(false);
      return toast.error("Failed to send message. Please try again.", {
        progress: undefined,
      });
    }

    let data;
    try {
      data = await fetch("/api/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          registration,
          description,
          busRoute,
          vehicleNumber,
          image: result ? result.secure_url : "",
          phoneNumber: localStorage.getItem("phoneNumber"),
        }),
      });

      if (!data.ok) {
        throw new Error("Failed to send message. Please try again.");
      }

      const res = await data.json();
    } catch (err) {
      setLoading(false);
      return toast.error("Failed to send message. Please try again.", {
        progress: undefined,
      });
    }

    toast.success("Message sent successfully!", {
      progress: undefined,
    });

    if (data) {
      router.push("/success");
    }
    setLoading(false);
  };

  const handleImageChange = async (e: any) => {
    const file = e.target.files[0];

    const MaxSize = 1024 * 1024 * 5;
    if (file.size > MaxSize) {
      toast.error("File size is too large. Max size is 5MB", {
        progress: undefined,
      });
      return;
    }

    setFileName(file.name);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "lzdeqwmu");
    setFile(formData);
  };

  const handleUploadClick = async () => {
    uploadRef.current!.click();
  };

  return (
    <div className={styles.detailform}>
      <form onSubmit={handleSubmit}>
        <div className={styles.detailformbox}>
          <div className={styles.category}>
            <label htmlFor="name">Enter your Full Name:</label>
            <input
              className={styles.input}
              type="text"
              id="name"
              value={name}
              onChange={handleNameChange}
              required
              maxLength={22}
              minLength={3}
            />
          </div>
          <div className={styles.category}>
            <label htmlFor="name">Enter your SRM Email:</label>
            <input
              className={styles.input}
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              required
              maxLength={22}
              minLength={16}
            />
          </div>
          <div className={styles.category}>
            <label htmlFor="name">Enter your Registation Number:</label>
            <input
              className={styles.input}
              type="text"
              id="registration"
              value={registration}
              onChange={handleRegistrationChange}
              pattern="[A-Za-z]+[0-9]+"
              required
              maxLength={16}
              minLength={10}
            />
          </div>
        </div>

        <>
          <div className={styles.category}>
            <label className={styles.label} htmlFor="bus">
              Bus Route Number:
            </label>
            <input
              className={styles.input}
              type="number"
              id="bus"
              value={busRoute}
              onChange={handleBusRoute}
              required
            />
          </div>
          <div className={styles.category}>
            <label className={styles.label} htmlFor="bus">
              Vehicle Number:
            </label>
            <input
              className={styles.input}
              type="text"
              id="bus"
              value={vehicleNumber}
              onChange={handleVechicleNumber}
              required
            />
          </div>
        </>

        <div className={styles.category}>
          <label className={styles.label} htmlFor="desc">
            Description:
          </label>
          <textarea
            id="description"
            value={description}
            onChange={handleDescriptionChange}
            required
            className={styles.textarea}
          />{" "}
        </div>

        <div>
          {/* upload an image */}
          <label className={styles.upload} onClick={handleUploadClick}>
            Upload an image
          </label>
          {fileName && (
            <p className={styles.fileName}>
              Uploaded file <b>{fileName}</b>
            </p>
          )}
          <input
            id="image"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className={styles.uploadHide}
            ref={uploadRef}
          />
        </div>

        <button
          type="submit"
          id="submit"
          className={styles.button}
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>

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

export default DetailForm;
