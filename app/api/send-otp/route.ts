import { type NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(request: NextRequest) {
  try {
    const { email, otp } = await request.json()

    if (!email || !otp) {
      return NextResponse.json({ error: "Email and OTP are required" }, { status: 400 })
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.hostinger.com",
      port: 465,
      secure: true, // Use SSL
      auth: {
        user: "mail@cstrustfund.com",
        pass: "Trusted2025$$",
      },
    })

    const emailHTML = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #7A0C14 0%, #B1121B 50%, #E11D2E 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .otp-box { background: white; border: 2px solid #E11D2E; border-radius: 8px; padding: 20px; text-align: center; margin: 20px 0; }
            .otp-code { font-size: 32px; font-weight: bold; color: #B1121B; letter-spacing: 5px; }
            .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>CSTrustFunds</h1>
              <p>Email Verification</p>
            </div>
            <div class="content">
              <h2>Verify Your Email Address</h2>
              <p>Thank you for registering with CSTrustFunds. To complete your registration, please use the following One-Time Password (OTP):</p>
              <div class="otp-box">
                <div class="otp-code">${otp}</div>
              </div>
              <p>This OTP will expire in 10 minutes.</p>
              <p>If you didn't request this verification, please ignore this email.</p>
              <div class="footer">
                <p>© 2025 CSTrustFunds - Better Savings For Better Tomorrow</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `

    await transporter.sendMail({
      from: '"CSTrustFunds" <mail@cstrustfund.com>',
      to: email,
      subject: "CSTrustFunds - Email Verification OTP",
      html: emailHTML,
    })

    console.log(`[v0] OTP sent successfully to ${email}`)

    return NextResponse.json({
      success: true,
      message: "OTP sent successfully",
      // For development, return OTP in response
      otp: process.env.NODE_ENV === "development" ? otp : undefined,
    })
  } catch (error) {
    console.error("[v0] Error sending OTP:", error)
    return NextResponse.json({ error: "Failed to send OTP" }, { status: 500 })
  }
}
