const verifyEmailTemplate = ({ name, url }) => {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Verify Your Email</title>
  </head>
  <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px; color: #333;">
    <div style="max-width: 600px; margin: auto; background-color: #fff; padding: 30px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
      
      <div style="text-align: center;">
        <img src="https://via.placeholder.com/150x50?text=Omnikart" alt="Omnikart Logo" style="margin-bottom: 20px;" />
      </div>

      <p style="font-size: 16px;">Hi ${name},</p>

      <p style="font-size: 16px;">
        Thank you for signing up with <strong>Omnikart</strong>! To complete your registration and activate your account, please confirm your email address by clicking the button below.
      </p>

      <div style="text-align: center; margin: 30px 0;">
        <a href="${url}" style="background-color: #007BFF; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-size: 16px;">
          Verify Email
        </a>
      </div>

      <p style="font-size: 14px; color: #555;">
        If you did not create an account with Omnikart, you can safely ignore this email.
      </p>

      <p style="font-size: 14px; color: #999; text-align: center; margin-top: 40px;">
        &copy; ${new Date().getFullYear()} Omnikart. All rights reserved.
      </p>
    </div>
  </body>
  </html>
  `;
};

export default verifyEmailTemplate;
