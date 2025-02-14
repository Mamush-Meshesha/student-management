import jwt from "jsonwebtoken";

export const generateToken = (res, id, role) => {
  const token = jwt.sign({ id, role }, process.env.JWT_ACCESS_TOKEN, {
    expiresIn: "1h",
  });

  res.cookie("jwt", token, {
    httpOnly: false,
    maxAge: 3600 * 1000,
    sameSite: "strict",
  });

  return token; 
};
