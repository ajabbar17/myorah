import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const { order } = await req.json();

    if (!order || !order.customer?.email) {
      return NextResponse.json({ error: "Invalid order data" }, { status: 400 });
    }

    // Configure Nodemailer Transporter (Use your email & app password)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.NEXT_PUBLIC_EMAIL, // Your email
        pass: process.env.NEXT_PUBLIC_APP_PASS, // App password (not your email password)
      },
    });

    // Generate Email HTML
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2>Order Confirmation - ${order.orderNo}</h2>
        <p>Hi ${order.customer?.firstName},</p>
        <p>Thank you for your order! Here are the details:</p>

        <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
          <thead>
            <tr>
              <th style="border-bottom: 2px solid #ddd; padding: 10px;">Product</th>
              <th style="border-bottom: 2px solid #ddd; padding: 10px;">Qty</th>
              <th style="border-bottom: 2px solid #ddd; padding: 10px;">Price</th>
            </tr>
          </thead>
          <tbody>
            ${order.items
              .map(
                (item) => `
              <tr>
                <td style="border-bottom: 1px solid #ddd; padding: 10px;">
                  <img src="${item.image}" alt="${item.name}" width="50" height="50" style="border-radius: 5px;"/>
                  ${item.name}
                </td>
                <td style="border-bottom: 1px solid #ddd; padding: 10px;">${item.quantity}</td>
                <td style="border-bottom: 1px solid #ddd; padding: 10px;">Rs ${item.discountedPrice * item.quantity}</td>
              </tr>
            `
              )
              .join("")}
          </tbody>
        </table>

        <p><strong>Total: Rs ${order.total}</strong></p>
        <p>Shipping Address:</p>
        <p>${order.customer?.address}, ${order.customer?.city}, ${order.customer?.country} - ${order.customer?.postalCode}</p>

        <p>We will notify you when your order is shipped!</p>
        <p>Best Regards,<br>Your Store Team</p>
      </div>
    `;

    // Send Email
    const mailOptions = {
      from: process.env.NEXT_PUBLIC_EMAIL,
      to: order.customer?.email,
      subject: `Order Confirmation - ${order.orderNo}`,
      html: emailHtml,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: "Email sent successfully!" }, { status: 200 });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
