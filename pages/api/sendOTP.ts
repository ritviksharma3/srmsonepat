import { NextApiRequest, NextApiResponse } from "next";
import { client, verifySid } from "../../config/twilio";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }
  const { phoneNumber } = JSON.parse(req.body);

  if (!phoneNumber || phoneNumber.length !== 10) {
    return res.status(400).json({ message: "Invalid phone number" });
  }

  let response;

  try {
    response = await client.verify.v2.services(verifySid).verifications.create({
      to: "+91" + phoneNumber,
      channel: "sms",
    });

    return res.status(200).json({
      message: "OTP Sent Successfully",
      data: response,
    });
  } catch (e: any) {
    return res.status(500).json({ message: e.message });
  }
}
