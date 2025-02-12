import jwt from "jsonwebtoken";
export const generateAccessToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "7d",
  });
};
