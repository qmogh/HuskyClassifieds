
// import NodeMailer from "next-auth/providers/nodemailer";

// import type { NextAuthConfig } from "next-auth";

// export default {
//     providers: [NodeMailer({
//         id: 'email',
//         name: 'email',
//         server: {
//             host: process.env.EMAIL_SERVER_HOST,
//             port: Number(process.env.EMAIL_SERVER_PORT),
//             auth: {
//                 user: process.env.EMAIL_SERVER_USER,
//                 pass: process.env.EMAIL_SERVER_PASSWORD
//             }
//         },
//         from: process.env.EMAIL_FROM,
//     })],
// } satisfies NextAuthConfig

import NodeMailer from "next-auth/providers/nodemailer";
import nodemailer from "nodemailer";
import type { NextAuthConfig } from "next-auth";
import { emailTemplate } from "./utils/email-template";

export default {
  providers: [
    NodeMailer({
      id: 'email',
      name: 'email',
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: Number(process.env.EMAIL_SERVER_PORT),
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD
        }
      },
      from: process.env.EMAIL_FROM,
      sendVerificationRequest: async ({ identifier, url, provider }) => {
        console.log('Starting email send process');
        try {
          const { server, from } = provider;
          console.log('Email server configuration:', JSON.stringify(server));
          console.log('Creating transport');
          const transport = nodemailer.createTransport(server);
          console.log('Transport created');
          
          console.log('Sending mail');
          const result = await transport.sendMail({
            to: identifier,
            from: from,
            subject: "Sign in to Husky Classifieds",
            text: `Sign in to Husky Classifieds: ${url}`,
            html: emailTemplate(url, identifier),
          });
          console.log('Mail sent, result:', JSON.stringify(result));
          
          const failed = result.rejected.concat(result.pending).filter(Boolean);
          if (failed.length) {
            console.error(`Failed to send to: ${failed.join(", ")}`);
            throw new Error(`Email(s) (${failed.join(", ")}) could not be sent`);
          }
          console.log('Email sent successfully');
        } catch (error) {
          console.error('Error in sendVerificationRequest:', error);
          throw error;
        }
      },
      maxAge: 12 * 60 * 60, 
    }),
  ],
} satisfies NextAuthConfig;