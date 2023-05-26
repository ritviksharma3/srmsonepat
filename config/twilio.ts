import twilio from "twilio";

const accountSid = "ACd3f6351338504eb13f8fade63f9064e4";
const authToken = "d74a4a7b74ad00e60ee55783f2dbf3a1";
const verifySid = "VA6577a1e681adf7c5a254d92235eb19d0";
const client = twilio(accountSid, authToken);

export { client, verifySid };
