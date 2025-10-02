import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { emailOTP } from "better-auth/plugins";
import { db } from "../db/index";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const auth = betterAuth({
  secret: process.env.BETTER_AUTH_SECRET!,
  baseURL: process.env.BETTER_AUTH_URL!,
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  emailAndPassword: {
    enabled: true,
  },
  plugins: [
    emailOTP({
      async sendVerificationOTP({ email, otp, type }) {
        if (type === "sign-in") {
          await resend.emails.send({
            from: process.env.RESEND_FROM_EMAIL!,
            to: email,
            subject: "Sign in to Pyrax",
            html: `
              <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #333;">Sign in to Pyrax</h2>
                <p style="color: #666; font-size: 16px;">Your one-time password is:</p>
                <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0;">
                  <h1 style="color: #000; font-size: 36px; margin: 0; letter-spacing: 8px;">${otp}</h1>
                </div>
                <p style="color: #666; font-size: 14px;">This code will expire in 5 minutes.</p>
                <p style="color: #999; font-size: 12px; margin-top: 30px;">If you didn't request this code, please ignore this email.</p>
              </div>
            `,
          });
        } else if (type === "email-verification") {
          await resend.emails.send({
            from: process.env.RESEND_FROM_EMAIL!,
            to: email,
            subject: "Verify your email",
            html: `
              <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #333;">Verify your email</h2>
                <p style="color: #666; font-size: 16px;">Your verification code is:</p>
                <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0;">
                  <h1 style="color: #000; font-size: 36px; margin: 0; letter-spacing: 8px;">${otp}</h1>
                </div>
                <p style="color: #666; font-size: 14px;">This code will expire in 5 minutes.</p>
              </div>
            `,
          });
        } else if (type === "forget-password") {
          await resend.emails.send({
            from: process.env.RESEND_FROM_EMAIL!,
            to: email,
            subject: "Reset your password",
            html: `
              <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #333;">Reset your password</h2>
                <p style="color: #666; font-size: 16px;">Your password reset code is:</p>
                <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0;">
                  <h1 style="color: #000; font-size: 36px; margin: 0; letter-spacing: 8px;">${otp}</h1>
                </div>
                <p style="color: #666; font-size: 14px;">This code will expire in 5 minutes.</p>
              </div>
            `,
          });
        }
      },
      sendVerificationOnSignUp: true,
    }),
  ],
});
