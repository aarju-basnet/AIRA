const generateOtpTemplate = (otp, name) => {
    const verifyLink = `${process.env.FRONTEND_URL}/verify-email`;
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <style>
            .body-wrapper { font-family: 'Segoe UI', Arial, sans-serif; background-color: #f9f9f9; padding: 20px; }
            .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.05); }
            .header { padding: 30px; text-align: center; border-bottom: 1px solid #f0f0f0; }
            .logo { width: 140px; height: auto; }
            .content { padding: 40px; text-align: center; color: #333; }
            
            /* CSS REPLACEMENT FOR FRAMER MOTION */
            .animated-aira {
                font-weight: bold;
                background: linear-gradient(to right, #ec4899, #8b5cf6, #a855f7, #3b82f6);
                background-size: 300% 300%;
                -webkit-background-clip: text;
                background-clip: text;
                color: transparent;
                animation: gradientMove 5s linear infinite;
                display: inline-block;
            }

            @keyframes gradientMove {
                0% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
                100% { background-position: 0% 50%; }
            }

            .otp-box { font-size: 36px; font-weight: 800; color: #007bff; letter-spacing: 8px; padding: 20px; background: #f0f7ff; display: inline-block; border-radius: 8px; border: 1px solid #d0e7ff; margin: 25px 0; }
            .btn { display: inline-block; padding: 14px 28px; background-color: #007bff; color: #ffffff !important; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 20px 0; }
            .footer { padding: 20px; text-align: center; font-size: 12px; color: #999; background: #f4f4f4; }
        </style>
    </head>
    <body class="body-wrapper">
        <div class="container">
            <div class="header">
                <img src="cid:airaLogo" alt="AIRA" class="logo">
            </div>
            <div class="content">
                <h2 style="margin-top:0;"> Hi ${name}</h2>
                 <h3>  Welcome to <span class="animated-aira">AIRA</span>! </h3> 
             
                <p>Use the code below to verify your email address and complete your signup.</p>
                <div class="otp-box">${otp}</div>
                <br>
                <a href="${verifyLink}" class="btn">Click Here to Verify</a>
                <p style="font-size: 12px; color: #666; margin-top: 20px;">
                    This code is valid for <strong>24 hours</strong>.
                </p>
            </div>
            <div class="footer">
                <p>&copy; 2026 AIRA Team. Your AI Partner.</p>
            </div>
        </div>
    </body>
    </html>
    `;
};

module.exports = generateOtpTemplate;