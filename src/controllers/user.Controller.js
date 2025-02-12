import { User } from "../model/user.Model.js";
import { asyncHandler } from "../utils/wrapAsync.js";
import { ApiResponse } from "../utils/responseHandler.js";
import { validateUser } from "../validation/user.Validation.js";
import { generateAccessToken } from "../utils/generateAcessToken.js";
import { generateRefreshToken } from "../utils/generateRefreshToken.js";

const generateAccessAndRefreshTokens = async (userId, next) => {
  const user = await User.findById(userId);

  if (!user) {
    return res.status(404).json(new ApiResponse(404, null, "User not found"));
  }
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  user.refreshToken = refreshToken;

  await user.save({ validateBeforeSave: false });

  if (!accessToken || !refreshToken) {
    return res
      .status(500)
      .json(new ApiResponse(500, null, "Token generation failed"));
  }

  return { accessToken, refreshToken };
};

export const createUser = asyncHandler(async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = new User(req.body);
  await user.save();

  res.status(201).json(new ApiResponse(201, user, "User created successfully"));
});

export const userLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json(new ApiResponse(400, null, "Please provide all required fields"));
  }

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json(new ApiResponse(404, null, "User not found"));
  }

  const isPasswordValidate = await user.isValidPassword(password);

  if (!isPasswordValidate) {
    return res
      .status(400)
      .json(new ApiResponse(400, null, "Invalid email or password"));
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    user._id
  );

  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });

  const { password: _, ...userData } = user.toObject();
  return res
    .status(200)
    .cookie("accessToken", accessToken)
    .cookie("refreshToken", refreshToken)
    .json(
      new ApiResponse(
        200,
        {
          user: userData,
          accessToken,
          refreshToken,
        },
        "User logged in successfully"
      )
    );
});
