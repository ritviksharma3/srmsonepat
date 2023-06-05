import { NextApiRequest, NextApiResponse } from "next";
// import fetch from 'node-fetch';
const TelegramBot = require("node-telegram-bot-api");

const BOT_TOKEN = "5810534401:AAFjd0vjJ23CgTclTz6ZSSiZcDTHwQ7G2Lg";
const CHAT_ID_TG = "-1001931437535";
const TELEGRAM_API_URL = `https://api.telegram.org/bot${BOT_TOKEN}/`;

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   if (req.method === "POST") {
//     try {
//       const { name } = req.body; // Extract the user's name from the form data
//       const message = `New user submission: ${name}`; // Construct the message to send

//       // The chat ID of the user or group you want to send the message to
//       const CHAT_ID = CHAT_ID_TG;

//       const data = {
//         chat_id: CHAT_ID,
//         text: message,
//       };

//       // Send the message to the Telegram API endpoint
//       const response = await axios.post(TELEGRAM_API_URL, data);

//       res.status(200).json({ message: "Message sent successfully!" });
//     } catch (error) {
//       console.error("Error sending message:", error);
//       res.status(500).json({ message: "Error sending message" });
//     }
//   } else {
//     res.status(405).json({ message: "Method not allowed" });
//   }
// }

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { message, phoneNumber, file } = JSON.parse(req.body);
  if (!phoneNumber || phoneNumber.length !== 10) {
    return res.status(400).json({ message: "Invalid phone number" });
  }

  if (!message) {
    return res.status(400).json({ message: "Invalid message" });
  }
  if (req.method === "POST") {
    try {
      if (file) {
        const formData = new FormData();
        formData.append("chat_id", CHAT_ID_TG);
        formData.append("caption", message);
        formData.append("photo", file);
        const response = await fetch(`${TELEGRAM_API_URL}sendPhoto`, {
          method: "POST",
          body: formData,
        });
        if (!response.ok) {
          throw new Error(`Telegram API error: ${response.statusText}`);
        }
      } else {
        const response = await fetch(`${TELEGRAM_API_URL}sendMessage`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            chat_id: CHAT_ID_TG,
            text: message,
          }),
        });
        if (!response.ok) {
          throw new Error(`Telegram API error: ${response.statusText}`);
        }
      }

      res.status(200).json({ message: "Message sent successfully!" });
    } catch (error) {
      console.error("Error sending message:", error);
      res.status(500).json({ message: "Error sending message" });
    }
  }
}
