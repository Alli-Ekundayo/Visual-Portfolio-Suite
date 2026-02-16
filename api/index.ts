import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Resend } from "resend";
import { z } from "zod";

const resend = new Resend(process.env.RESEND_API_KEY);

const messageSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(1, "Message is required"),
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // Handle POST /api/messages
  if (req.method === "POST" && req.url?.includes("/messages")) {
    try {
      const input = messageSchema.parse(req.body);
      
      await resend.emails.send({
        from: "Portfolio Contact <onboarding@resend.dev>",
        to: "alliekundayo6@gmail.com",
        subject: `New message from ${input.name}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${input.name}</p>
          <p><strong>Email:</strong> ${input.email}</p>
          <p><strong>Message:</strong></p>
          <p>${input.message}</p>
        `,
        replyTo: input.email,
      });
      
      return res.status(201).json({ success: true, message: "Message sent successfully" });
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ message: err.errors[0].message });
      }
      console.error("Error sending message:", err);
      return res.status(500).json({ message: "Failed to send message" });
    }
  }

  return res.status(404).json({ message: "Not found" });
}
