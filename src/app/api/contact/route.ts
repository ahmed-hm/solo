import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  try {
    // Parse request body
    const body = await req.json();
    const { firstName, lastName, email, country, phone, companyName, message } = body;

    // Validate required fields
    if (!firstName || !lastName || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Create email transporter
    // For production, you should use your actual SMTP credentials
    // For development/example, we're using a placeholder
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.example.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER || 'user@example.com',
        pass: process.env.SMTP_PASSWORD || 'password',
      },
    });

    // Compose email content
    const mailOptions = {
      from: `"Solo Contact Form" <${process.env.SMTP_FROM || 'noreply@yourdomain.com'}>`,
      to: process.env.SMTP_TO,
      subject: `Contact Form: ${firstName} ${lastName}`,
      text: `
        Name: ${firstName} ${lastName}
        Email: ${email}
        ${country ? `Country: ${country}` : ''}
        ${phone ? `Phone: ${phone}` : ''}
        ${companyName ? `Company: ${companyName}` : ''}
        
        Message:
        ${message}
      `,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #DBB58F;">New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${firstName} ${lastName}</p>
          <p><strong>Email:</strong> ${email}</p>
          ${country ? `<p><strong>Country:</strong> ${country}</p>` : ''}
          ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
          ${companyName ? `<p><strong>Company:</strong> ${companyName}</p>` : ''}
          <div style="margin-top: 20px;">
            <p><strong>Message:</strong></p>
            <p style="background-color: #f5f5f5; padding: 15px; border-radius: 5px;">${message.replace(
              /\n/g,
              '<br>'
            )}</p>
          </div>
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #666;">
            <p>This email was sent from the Solo Sauce contact form.</p>
          </div>
        </div>
      `,
    };

    // In production, you would uncomment this to send the actual email
    await transporter.sendMail(mailOptions);

    // For now, just log the email that would be sent
    console.log('Email would be sent with:', mailOptions);

    return NextResponse.json({ success: true, message: 'Email sent successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
