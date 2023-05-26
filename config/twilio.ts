import twilio from "twilio";

const accountSid = process.env.ACCOUNT_SID as string;
const authToken = process.env.AUTH_TOKEN as string;
const verifySid = process.env.VERIFY_SID as string;
const client = twilio(accountSid, authToken);

export { client, verifySid };
