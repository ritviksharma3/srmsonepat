import twilio from "twilio";

const accountSid = "ACd3f6351338504eb13f8fade63f9064e4";
const authToken = "5571260d96a1fd90ca571db5be86ea75";
const verifySid = "VA0e1d22e3066b268e3dea49306a6f4ef9";
const client = twilio(accountSid, authToken);

export { client, verifySid };
