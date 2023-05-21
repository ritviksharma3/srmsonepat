import { NextApiRequest, NextApiResponse } from "next";
import { client, verifySid } from "../../config/twilio";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST")
    return res.status(405).json({ message: "Method Not Allowed" });

  const { otpCode, phoneNumber } = JSON.parse(req.body);

  if (!otpCode || !phoneNumber || phoneNumber.length !== 10)
    return res.status(400).json({ message: "Invalid Phone Number" });

  let response;
  try {
    response = await client.verify.v2
      .services(verifySid)
      .verificationChecks.create({
        to: "+91" + phoneNumber,
        code: otpCode,
      });

    if (!response.valid)
      return res.status(400).json({ message: "Invalid OTP" });

    return res.status(200).json({
      message: "OTP Verified Successfully",
      data: response,
    });
  } catch (e: any) {
    return res.status(500).json({ message: e.message });
  }
}
