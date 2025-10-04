import { User } from "../users/user.model";
import { TUser } from "../users/user.interface";

const registerUser = async (userData: TUser) => {
  const existingUser = await User.findOne({ email: userData.email });
  if (existingUser) throw new Error("Email already registered");
  const user = await User.create(userData);
  return user;
};

const loginUser = async (email: string, password: string) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("User not found");

  const isMatch = await user.comparePassword(password);
  if (!isMatch) throw new Error("Invalid credentials");

  return user;
};

export const UserServices = { registerUser, loginUser };
