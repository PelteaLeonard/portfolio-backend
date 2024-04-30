import nodemailer from "nodemailer";
import { Contact } from "../types/contact-types";

class EmailUtils {
  private static async sendEmail(
    to: string[],
    subject: string,
    text: string,
    html = "" as string
  ) {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `${process.env.APP_NAME} <${process.env.MAIL_USERNAME}>`,
      to,
      subject,
      text,
      html,
    });
  }

  public static async sendContactEmail(
    to: string | string[],
    data: Omit<Contact, "id">
  ) {
    const { firstName, lastName, email, message } = data;

    this.sendEmail(
      Array.isArray(to) ? to : [to],
      `[${process.env.APP_NAME}] Un nou mesaj de contact!`,
      `Ai primit un nou mesaj de contact de la ${lastName} ${firstName}, ce are emailul ${email}, mesajul lasat este ${message}`
    );
  }
}

export default EmailUtils;
