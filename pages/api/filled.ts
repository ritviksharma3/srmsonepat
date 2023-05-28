import { NextApiRequest, NextApiResponse } from "next";
import twilio from "twilio";

const accountSid = process.env.ACCOUNT_SID as string;
const authToken = process.env.AUTH_TOKEN as string;
const client = twilio(accountSid, authToken);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { phoneNumber } = req.body;
  try {
    client.messages.create({
      body: `Hi, Thank you for contacting Transport Department at SRM University, Sonepat. We will review your issue at the earliest.`,
      from: "+14092455658",
      to: "+91" + phoneNumber,
    });
    console.log(`SMS message sent.`);
    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
}
