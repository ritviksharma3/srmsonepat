import { NextApiRequest, NextApiResponse } from "next";
// import { connectToDatabase } from "../../utils/mongodb";
import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const {
      name,
      email,
      registration,
      description,
      busRoute,
      vehicleNumber,
      phoneNumber,
      image,
    } = req.body;

    // const { db } = await connectToDatabase();

    // const collection = db.collection("SRMStudentData");

    // await collection.insertOne({
    // 	name,
    // 	email,
    // 	registration,
    // 	description,
    // 	dropdownValues,
    // 	area,
    // 	room,
    // 	hostel,
    // 	labName,
    // 	examName,
    // 	busRoute,
    // 	phoneNumber,
    // 	createdAt: new Date().toISOString(),
    // });

    await db.transportSonepat.create({
      data: {
        name,
        email,
        registration,
        description,
        busRoute,
        vehicleNumber,
        phoneNumber,
        image,
      },
    });

    return res.status(200).json({ message: "Message sent successfully" });
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}
