import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

export const mailer = nodemailer.createTransport({
  host: "smtp.hostinger.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER, // support@jdmarcng.com
    pass: process.env.SMTP_PASS, // ⚠️ SECRET
  },
}); 