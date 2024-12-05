
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
        const { server, from } = provider;
        const transport = nodemailer.createTransport(server);
        const result = await transport.sendMail({
          to: identifier,
          from: from,
          subject: "Sign in to Husky Classifieds",
          text: `Sign in to Husky Classifieds: ${url}`,
          html: emailTemplate(url, identifier),
        });
        const failed = result.rejected.concat(result.pending).filter(Boolean);
        if (failed.length) {
          throw new Error(`Email(s) (${failed.join(", ")}) could not be sent`);
        }
      },
    }),
  ],
} satisfies NextAuthConfig;
// import NodeMailer from "next-auth/providers/nodemailer";

// import type { NextAuthConfig } from "next-auth";

// export default {
//     providers: [NodeMailer({
//         id: 'email',
//         name: 'email',
//         server: {
//             host: process.env.EMAIL_SERVER_HOST,
//             port: process.env.EMAIL_SERVER_PORT,
//             auth: {
//                 user: process.env.EMAIL_SERVER_USER,
//                 pass: process.env.EMAIL_SERVER_PASSWORD
//             }
//         },
//         from: process.env.EMAIL_FROM,
//     })],
// } satisfies NextAuthConfig
