const generateOtpTemplate = (otp, name) => {
    const verifyLink = `${process.env.FRONTEND_URL}/verify-email`;
    
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
            /* Reset for email clients */
            body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
            table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
            img { -ms-interpolation-mode: bicubic; border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
            
            .body-wrapper { 
                background-color: #030014; 
                margin: 0; 
                padding: 0; 
                width: 100% !important; 
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            }

            .main-container {
                max-width: 600px;
                margin: 40px auto;
                background-color: #030014;
                border: 1px solid #2d1b4e;
                border-radius: 40px;
                overflow: hidden;
                box-shadow: 0 20px 50px rgba(0,0,0,0.5);
            }

            /* Electric Gradient Border effect for Email */
            .gradient-bar {
                height: 4px;
                background: linear-gradient(to right, #ec4899, #8b5cf6, #a855f7);
            }

            .header {
                padding: 40px 20px;
                text-align: center;
                background: linear-gradient(to bottom, #0f0a2a, #030014);
            }

            .content {
                padding: 0 50px 50px 50px;
                text-align: center;
                color: #ffffff;
            }

            .user-greeting {
                font-size: 24px;
                font-weight: 800;
                color: #ffffff;
                margin-bottom: 10px;
            }

            .sub-text {
                color: #9ca3af;
                font-size: 14px;
                line-height: 1.6;
                margin-bottom: 30px;
            }

            /* OTP Box mimicking your UI inputs */
            .otp-container {
                background: rgba(255, 255, 255, 0.05);
                border: 1px solid rgba(168, 85, 247, 0.3);
                border-radius: 20px;
                padding: 30px;
                margin: 20px 0;
            }

            .otp-code {
                font-size: 38px;
                font-weight: 900;
                letter-spacing: 12px;
                color: #ec4899; /* Pink accent */
                margin: 0;
            }

            .btn-verify {
                display: inline-block;
                padding: 16px 40px;
                background: linear-gradient(to right, #ec4899, #8b5cf6, #a855f7);
                color: #ffffff !important;
                text-decoration: none;
                border-radius: 16px;
                font-weight: bold;
                font-size: 14px;
                text-transform: uppercase;
                letter-spacing: 1px;
                margin: 30px 0;
                box-shadow: 0 10px 20px rgba(139, 92, 246, 0.3);
            }

            .footer {
                padding: 30px;
                background-color: #08051a;
                text-align: center;
                border-top: 1px solid #1e1b2e;
            }

            .footer-text {
                font-size: 11px;
                color: #4b5563;
                text-transform: uppercase;
                letter-spacing: 2px;
            }
        </style>
    </head>
    <body class="body-wrapper">
        <div class="main-container">
            <!-- Top Electric Accents -->
            <div class="gradient-bar"></div>
            
            <div class="header">
                <!-- Using cid for your AIRA logo -->
                <h2  style="width: 120px; filter: drop-shadow(0 0 10px rgba(168,85,247,0.5));">AIRA </h2>
            </div>

            <div class="content">
                <div class="user-greeting">Hi, ${name}</div>
                <p class="sub-text">
                    Welcome to the <span style="color: #a855f7; font-weight: bold;">AIRA Ecosystem</span>. <br>
                    Please use the following neural synchronization key to activate your account.
                </p>

                <div class="otp-container">
                    <p style="color: #6b7280; font-size: 10px; text-transform: uppercase; letter-spacing: 3px; margin-bottom: 15px;">Authorization Key</p>
                    <h1 class="otp-code">${otp}</h1>
                </div>

                <a href="${verifyLink}" class="btn-verify">Finalize Activation</a>

                <p style="font-size: 11px; color: #4b5563; margin-top: 20px;">
                    Valid for <span style="color: #9ca3af;">24 hours</span>. If you did not request this code, please ignore this email.
                </p>
            </div>

            <div class="footer">
                <p class="footer-text">© 2026 AIRA PROTOCOL • System Architecture by Aarju Basnet</p>
            </div>
        </div>
    </body>
    </html>
    `;
};

module.exports = generateOtpTemplate;