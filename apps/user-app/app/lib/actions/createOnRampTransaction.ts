"use server";

import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";

export async function createOnRampTransaction(
  provider: "HDFC Bank" | "Axis Bank",
  amount: number
) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return { message: "Unauthenticated request" };
  }

  const token = Math.random().toString();

  await prisma.onRampTransaction.create({
    data: {
      provider,
      status: "Processing",
      startTime: new Date(),
      token,
      userId: Number(session.user.id),
      amount: amount * 100,
    },
  });

  
  const webhookUrl =
    provider === "HDFC Bank"
      ? "http://localhost:3003/hdfcWebhook"
      : "http://localhost:3003/axisWebhook";

  await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      token,
      user_identifier: session.user.id,
      amount: amount * 100,
    }),
  });

  return { message: "done" };
}