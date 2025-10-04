import { Request, Response } from "express";
import { UserServices } from "../users/user.service";
import { registerSchema, loginSchema } from "../users/user.validation";
import { generateToken } from "../../utils/jwt";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const validated = registerSchema.safeParse(req.body);
    if (!validated.success)
return res.status(400).json({ success: false, errors: validated.error.issues });


    const user = await UserServices.registerUser(validated.data);
    res.status(201).json({ success: true, message: "User registered", data: user });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const validated = loginSchema.safeParse(req.body);
    if (!validated.success)
return res.status(400).json({ success: false, errors: validated.error.issues });


    const user = await UserServices.loginUser(validated.data.email, validated.data.password);
const token = generateToken((user as any)._id.toString(), user.role);


    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
    });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};
