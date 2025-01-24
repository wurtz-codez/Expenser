import { User } from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


export const register = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    if (!fullName || !email || !password) {
      return res.status(400).json({
        message: "All fields are required.",
        success: false
      })
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "Email is already registered.",
        success: false
      })
    }

    const hashedPassword = await bcrypt.hash(password, 10); //this is used because we can not show the password and have to convert it into hash and for this bcrypt module is used.
    await User.create({
      fullName,
      email,
      password: hashedPassword
    });

    return res.status(201).json({
      message: "Account created successfully.",
      success: true
    })

  } catch (error) {
    console.log(error)
  }
}

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: `All fields are required.`,
        success: false
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Email does not exist.",
        success: false
      })
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({
        message: 'Incorrect password.',
        success: false
      });
    }
    const tokenData = {
      userId: user._id
    }

    const token = await jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' });
    return res.status(201).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: 'strict' }).json({
      message: `Welcome back ${user.fullName}`,
      user: {
        _id: user._id,
        fullName: user.fullName,
        email: user.email
      },
      success: true
    })

  } catch (error) {
    console.error(error);

  }
}

export const logout = async(req,res) => {
  try {
    return res.status(201).cookie("token", null, {maxAge: 0}).json({
      message: `User logged out successfully.`,
      success: true
    })
  } catch (error) {
    console.error(error);
    
  }
}