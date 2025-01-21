import { User } from "../models/userModel";

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

    const hashedPassword = await bcrypt.hash(password, 10); //this is used because we can not show the password and have to convert it into hash ansd for this bcrypt module is used.
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