import { Client as WorkflowClient } from "@upstash/workflow";
import { Client as QstashClient, resend } from "@upstash/qstash";
import config from "./config";

export const workflowClient = new WorkflowClient({
  baseUrl: config.env.upstash.qstashUrl,
  token: config.env.upstash.qstashToken,
});

const qstashClient = new QstashClient({
  token: config.env.upstash.qstashToken,
});

interface Props {
  email: string;
  subject: string;
  message: string;
}

export const sendEmail = async ({ subject, message }: Props) => {
  await qstashClient.publishJSON({
    api: {
      name: "email",
      provider: resend({ token: config.env.resendToken }),
    },
    body: {
      from: "Acme <onboarding@resend.dev>",
      to: ["ameyak2001@gmail.com"],
      subject,
      html: message,
    },
  });
};
