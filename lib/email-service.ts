// Email OTP Service
// In production, this would integrate with an email service like SendGrid, AWS SES, or Resend
// For development, we'll simulate email sending and log OTPs to console

export function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

export async function sendOTPEmail(email: string, otp: string): Promise<boolean> {
  try {
    const response = await fetch("/api/send-otp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, otp }),
    })

    const data = await response.json()

    if (!response.ok) {
      console.error("[v0] Failed to send OTP email:", data.error)
      return false
    }

    console.log(`[v0] OTP sent to ${email}`)

    // For development, show OTP in console
    if (data.otp) {
      console.log(`[v0] Development OTP: ${data.otp}`)
    }

    // Store OTP temporarily in localStorage for verification
    const otpData = {
      email,
      otp,
      timestamp: Date.now(),
      expiresIn: 10 * 60 * 1000, // 10 minutes
    }
    localStorage.setItem(`cstrustfunds_otp_${email}`, JSON.stringify(otpData))

    return true
  } catch (error) {
    console.error("[v0] Error in sendOTPEmail:", error)
    return false
  }
}

export function verifyOTP(email: string, enteredOTP: string): boolean {
  const storedData = localStorage.getItem(`cstrustfunds_otp_${email}`)

  if (!storedData) {
    return false
  }

  const otpData = JSON.parse(storedData)
  const now = Date.now()

  // Check if OTP has expired
  if (now - otpData.timestamp > otpData.expiresIn) {
    localStorage.removeItem(`cstrustfunds_otp_${email}`)
    return false
  }

  // Verify OTP matches
  if (otpData.otp === enteredOTP) {
    // Clear OTP after successful verification
    localStorage.removeItem(`cstrustfunds_otp_${email}`)
    return true
  }

  return false
}
