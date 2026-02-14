const userModel = require("../models/user");
const bcrypt = require('bcrypt')
const path = require("path")
const JWT = require("jsonwebtoken")
const transporter = require('../config/nodemailer')
const generateOtpTemplate = require('../Utils/EmailverifyTemplate')
const ResetPasswordTemplate = require('../Utils/ResetpasswordTemplate')

async function register(req, res) {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "Name, email and password are required",
    });
  }
   
   if (password.length < 6) {
    return res.status(400).json({
      success: false,
      message: "Password must be at least 6 characters long",
    });
  }

  try {
    const isUserExists = await userModel.findOne({ email });
    if (isUserExists) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }
     const verificationOtp = String(Math.floor(100000 + Math.random()* 900000))
    const user = await userModel.create({ name,
       email, 
       password,
       verificationOtp,
       verificationOtpExpired: Date.now() + 24 * 60 * 60 * 1000,
       

       });

   transporter.sendMail({
      from: `"AIRA" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Your AIRA Verification Code",
      html: generateOtpTemplate(verificationOtp, name),
      // No attachments = No file path errors!
    }).catch(err => {
      console.error("Email failed to send, but user was created:", err.message);
    });
    
    const token = JWT.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // true in production (HTTPS)
      sameSite: "strict",
    });

    return res.status(201).json({
      success: true,
      token,
      message: "Please check your email for the OTP verification code.",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  }catch (error) {
    console.error("REGISTRATION ERROR DETAILS:", error);
  
  res.status(500).json({
    
    success: false,
    message: error.message
  });
}

}

async function verifyEmail(req, res) {
  try {
    const { otp } = req.body;
    const userId = req.user._id;

    if (!otp) {
      return res.status(400).json({
        success: false,
        message: "OTP is required",
      });
    }

    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

  

    // ✅ 1. Check expiry first
    if (!user.verificationOtp || user.verificationOtpExpired < Date.now()) {
      return res.status(400).json({
        success: false,
        message: "OTP has expired. Please request a new one.",
      });
    }

    // ✅ 2. Match OTP correctly
    if (String(user.verificationOtp) !== String(otp)) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    // ✅ 3. Verify user
    user.isEmailVerified = true;
    user.verificationOtp =  undefined;
    user.verificationOtpExpired =  undefined;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Email verified successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        isEmailVerified: true,
      },
    });

  } catch (error) {
    console.error("Verification Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}


async function login(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email and password are required",
    });
  }

  try {
    const user = await userModel
      .findOne({ email })
      .select("+password");

    if (!user || !(await user.comparePassword(password))) {
  return res.status(401).json({
    success: false,
    message: "Invalid email or password",
  });
}

if (!user.isEmailVerified) {
  return res.status(403).json({
    message: "Please verify your email before logging in",
  });
}
    const token = JWT.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
    });

    return res.status(200).json({
      success: true,
      token,
      message: "Login successful",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}



async function logout(req,res){
    try{
        res.clearCookie("token")
        return res.status(200).json({
            message:"user logged out successfully"
        })
    }catch(error){
        return res.status(500).json({
            success:false,
            message:"internal server error"
        })
    }
}


async function resetPasswords(req,res){
  const{email} =req.body
  if(!email){
    return res.status(400).json({
      success:false,
      message:"Email is required"
    })
  }
    try{
      const user = await userModel.findOne({
        email
      })
      if(!user){
        return res.status(401).json({
          success:false,
          message:"please login first"
        })
      }

      const otp  = String(Math.floor(100000+Math.random()*900000))
      const resetpasswordexpired = Date.now()+1*60*601000
      
      user. resetPasswords = otp
      user.resetPasswordExpired  =resetpasswordexpired
       await user.save()

       await transporter.sendMail({
  from:`"AIRA" <${process.env.SMTP_USER}>`,
  to: email,
  subject: "Reset Your Password",
  html: ResetPasswordTemplate(otp, user.name),
  attachments: [{
    filename: 'Aira.png',
    path: path.join(__dirname, '../assets/Aira.png'), // Change this to your actual folder path
    cid: 'airaLogo' // This MUST match the img src="cid:airaLogo"
  }]
});
      res.json({ success: true, message: "password has been reset successfully"});

     

      
    }catch(error){
      return res.status(500).json({
        success:false,
        message:"Internal server error"
      })
    }

  }




async function enterotp(req, res) {
  const { email, password, otp } = req.body;
  
  if (!email || !password || !otp) {
    return res.status(400).json({ success: false, message: "Please fill all the fields" });
  }

  try {
    const user = await userModel.findOne({ email }).select("+password"); // select password if needed

    if (!user) {
      return res.status(401).json({ success: false, message: "User not found" });
    }
    
    if (user.resetPasswords === '' || user.resetPasswords !== otp) {
      return res.status(400).json({ success: false, message: "Invalid otp" });
    }

    if (user.resetPasswordExpired < Date.now()) {
      return res.status(400).json({ success: false, message: "OTP expired" });
    }

    // 🔥 FIX: Remove 'const hashPassword = await bcrypt.hash(...)'
    // Just assign the plain text password. 
    // The userSchema.pre("save") hook will hash it for you.
    user.password = password; 
    
    user.resetPasswords = '';
    user.resetPasswordExpired = 0;
    
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password has been reset successfully"
    });

  } catch (error) {
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
}

async function getuserdata(req, res) {
  return res.status(200).json({
    success: true,
    user: req.user,
  });
}

  
       



module.exports = {
  register,
  verifyEmail,
  login,
  logout,
  resetPasswords,
  enterotp,
  getuserdata,
}
