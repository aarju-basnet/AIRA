const ResetPasswordTemplate = (otp, name) => {
   
  return `
    <div style="font-family: 'Poppins', sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e1e1e1; border-radius: 20px;">
      <div style="text-align: center; margin-bottom: 20px;">
        <img src="cid:airaLogo" alt="AIRA" style="width: 150px; height: auto;">
      </div>
      <div style="background: linear-gradient(to right, #ec4899, #8b5cf6, #3b82f6); padding: 2px; border-radius: 15px;">
        <div style="background: white; padding: 30px; border-radius: 13px; text-align: center;">
          <h2 style="color: #1f2937; margin-bottom: 10px;">Reset Your Password</h2>
          <p style="color: #6b7280; font-size: 16px;">Hello <b>${name}</b>, we received a request to reset your password. Use the code below to proceed:</p>
          
          <div style="margin: 30px 0;">
            <span style="font-size: 20px; font-weight: 500; letter-spacing: 7px; color: #7c3aed;
            background: #f3f4f6; padding: 15px 25px; border-radius: 12px; border: 2px dashed #8b5cf6;">
              ${otp}
            </span>
          </div>
            
          <p style="color: #9ca3af; font-size: 14px; margin-top: 20px;">
            This code is valid for <b>15 minutes</b>. If you didn't request this, you can safely ignore this email.
          </p>
        </div>
      </div>
      <div style="text-align: center; margin-top: 20px; color: #9ca3af; font-size: 12px;">
        <p>&copy; 2026 AIRA AI. All rights reserved.</p>
      </div>
    </div>
  `;
};

module.exports = ResetPasswordTemplate;