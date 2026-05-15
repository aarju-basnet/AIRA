const ResetPasswordTemplate = (otp, name) => {
    const resetLink = `${process.env.FRONTEND_URL}/reset-password`;
   
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <style>
            .body-wrapper { 
                background-color: #030014; 
                margin: 0; 
                padding: 40px 20px; 
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            }
            .main-container {
                max-width: 600px;
                margin: 0 auto;
                background-color: #030014;
                border: 1px solid #2d1b4e;
                border-radius: 40px;
                overflow: hidden;
            }

            /* ANIMATED GRADIENT LOGO - Optimized for visibility */
            .logo-text {
                font-size: 30px;
                font-weight: 600;
                letter-spacing: -2px;
                margin: 0;
                display: inline-block;
                color:  #a855f7;
            }

            
           

            .content {
                padding: 0 50px 50px 50px;
                text-align: center;
                color: #a855f7;
            }

            .otp-container {
                background: #0a0520;
                border: 1px solid #2d1b4e;
                border-radius: 24px;
                padding: 30px;
                margin: 25px 0;
            }

            .otp-code {
                font-size: 42px;
                font-weight: 900;
                letter-spacing: 12px;
                color: #ffffff;
                margin: 0;
            }

            /* GRADIENT BUTTON */
            .btn-reset {
                display: inline-block;
                padding: 18px 45px;
                background: linear-gradient(to right, #ec4899, #a855f7, #8b5cf6);
                color: #ffffff !important;
                text-decoration: none;
                border-radius: 18px;
                font-weight: bold;
                font-size: 14px;
                text-transform: uppercase;
                letter-spacing: 1px;
                margin: 30px 0;
            }

            .footer {
                padding: 30px;
                background-color: #08051a;
                text-align: center;
                border-top: 1px solid #1e1b2e;
            }

            .footer-text {
                font-size: 10px;
                color: #4b5563;
                text-transform: uppercase;
                letter-spacing: 3px;
            }
        </style>
    </head>
    <body class="body-wrapper">
        <div class="main-container">
            
            <div class="header" style="padding: 50px 20px 20px; text-align: center;">
                <!-- Individual spans ensure the word AIRA is never invisible -->
                <h1 class="logo-text">
                    <span class="c1">A</span><span class="c2">I</span><span class="c3">R</span><span class="c4">A</span>
                </h1>
                <div style="height: 1px; width: 60px; background: #2d1b4e; margin: 15px auto;"></div>
            </div>

            <div class="content">
                <h2 style="font-size: 24px; font-weight: 800; margin-bottom: 10px; color: #ffffff;">Reset Password</h2>
                <p style="color: #9ca3af; font-size: 15px; line-height: 1.6;">
                    Hi <b>${name}</b>, use the secure authorization key below to finalize your password recovery.
                </p>

                <div class="otp-container">
                    <h1 class="otp-code">${otp}</h1>
                </div>

                <a href="${resetLink}" class="btn-reset">Reset Password</a>

                <p style="font-size: 11px; color: #4b5563; margin-top: 20px;">
                    This key is active for <span style="color: #9ca3af;">15 minutes</span>. <br>
                    © 2026 AIRA PROTOCOL 
                </p>
            </div>
        </div>
    </body>
    </html>
  `;
};

module.exports = ResetPasswordTemplate;