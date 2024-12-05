export const emailTemplate = (url: string, email: string) => {
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Sign In to Husky Classifieds</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
          <tr>
            <td style="padding: 40px 30px; background-color: #0e1837; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: bold;">Husky Classifieds</h1>
            </td>
          </tr>
          <tr>
            <td style="padding: 40px 30px;">
              <p style="color: #333333; font-size: 16px; line-height: 24px; margin: 0 0 20px;">Hello ${email},</p>
              <p style="color: #333333; font-size: 16px; line-height: 24px; margin: 0 0 20px;">Welcome to Husky Classifieds, your go-to marketplace for UConn students! Click the button below to sign in to your account:</p>
              <table border="0" cellpadding="0" cellspacing="0" style="margin: 0 auto;">
                <tr>
                  <td align="center" style="border-radius: 5px;" bgcolor="#0e1837">
                    <a href="${url}" target="_blank" style="font-size: 18px; font-family: Arial, sans-serif; color: #ffffff; text-decoration: none; padding: 15px 30px; border: 1px solid #0e1837; display: inline-block; border-radius: 5px;">Sign In</a>
                  </td>
                </tr>
              </table>
              <p style="color: #333333; font-size: 16px; line-height: 24px; margin: 20px 0 0;">If you didn't request this email, you can safely ignore it.</p>
            </td>
          </tr>
          <tr>
            <td style="padding: 30px; background-color: #f4f4f4; text-align: center;">
              <p style="color: #666666; font-size: 14px; line-height: 20px; margin: 0;">Find and sell furniture easily with Husky Classifieds</p>
              <p style="color: #666666; font-size: 14px; line-height: 20px; margin: 10px 0 0;">© 2024 Husky Classifieds. All rights reserved.</p>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `;
  };