import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
    let email = "";
    let userId = "";
    let adminEmail = process.env.COMPANY_EMAIL || "juttigagowtham@gmail.com";
    let approvalLink = "";

    try {
        const body = await request.json();
        email = body.email;
        userId = body.userId;

        if (!email || !userId) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const adminSecret = process.env.ADMIN_SECRET || "default_secret";
        const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
        approvalLink = `${baseUrl}/api/approve-user?userId=${userId}&secret=${adminSecret}`;

        if (!process.env.SMTP_HOST || !process.env.SMTP_USER) {
            console.log("=================================================");
            console.log("WARNING: SMTP NOT CONFIGURED. MOCKING EMAIL SEND.");
            console.log(`To: ${adminEmail}`);
            console.log(`Subject: New Member Request: ${email}`);
            console.log(`Approval Link: ${approvalLink}`);
            console.log("=================================================");
            return NextResponse.json({ success: true, message: "Mock email logged to console" });
        }

        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT),
            secure: true,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        const mailOptions = {
            from: '"Pearl Bay System" <no-reply@pearlbay.com>',
            to: adminEmail,
            subject: `New Member Request: ${email}`,
            html: `
        <div style="font-family: serif; color: #000; padding: 20px; border: 1px solid #ddd; max-w-md mx-auto;">
          <h1 style="color: #bfa87c;">Membership Approval Request</h1>
          <p>A new user has registered on Pearl Bay.</p>
          <hr style="border: 1px dashed #ccc;" />
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>User ID:</strong> ${userId}</p>
          <br/>
          <p>Click below to grant them access immediately:</p>
          <a href="${approvalLink}" style="background-color: #000; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 50px; font-weight: bold; display: inline-block;">APPROVE INSTANTLY</a>
          <p style="margin-top: 10px;">Or visit the <a href="${baseUrl}/admin/dashboard" style="color: #bfa87c;">Admin Dashboard</a> to manage all requests.</p>
          <br/><br/>
          <p style="font-size: 12px; color: #666;">This link is secure and valid for this user only.</p>
        </div>
      `,
        };

        await transporter.sendMail(mailOptions);

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error("Email send error:", error);

        // Fallback logic: If sending fails (e.g. bad credentials), log it so dev can proceed
        if (email && approvalLink) {
            console.log("=================================================");
            console.log("EMAIL SEND FAILED. FALLBACK MODE.");
            console.log(`Error: ${error.message}`);
            console.log(`To: ${adminEmail}`);
            console.log(`Subject: New Member Request: ${email}`);
            console.log(`Approval Link: ${approvalLink}`);
            console.log("=================================================");

            return NextResponse.json({
                success: true,
                message: "Email failed to send but logged to server console (fallback)"
            });
        }

        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
