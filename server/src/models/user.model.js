import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    phone: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    name: {
      type: String,
      trim: true,
      required: true,
      validate(val) {
        if (!/^[A-Za-z0-9 ]+$/.test(val)) {
          throw new Error({ error: "Name must contain numbers only." });
        }
      },
    },
    password: {
      type: String,
      trim: true,
      required: true,
      minlength: 6,
      validate(val) {
        if (val.includes("password")) {
          throw new error({
            error: "Password must not contain word password.",
          });
        }
      },
    },
    country: {
      type: String,
      required: true,
    },
    digit_code: {
      type: String,
      required: true,
    },
    friends: [
      {
        friendInfo: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "user",
        },
      },
    ],
    avatar: {
      type: Buffer,
    },
    tokens: [
      {
        authToken: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

//Adding auth token
userSchema.methods.generateToken = async function () {
  const user = this;
  const authToken = jwt.sign(
    { _id: user._id.toString() },
    process.env.JWT_SECRET_KEY
  );
  user.tokens = user.tokens.concat({ authToken });

  await user.save();
  return authToken;
};

//Removing certain fiels from userSchema before returning the response
userSchema.methods.toJSON = function () {
  const user = this;
  const userObj = user.toObject();

  delete userObj.tokens;
  delete userObj.password;
  delete userObj.avatar;

  return userObj;
};

//Hashing password before saving to user database
userSchema.pre("save", function (next) {
  const user = this;

  if (user.isModified("password")) {
    user.password = bcrypt.hash(user.password, 8);
  }

  next();
});

//Finding and validating a user
userSchema.statics.findByCredentials = async (phone, password) => {
  const currentUser = await userModel.findOne({ phone });

  if (!currentUser) throw new Error("Invalid phone number or password.");

  const isMatch = bcrypt.compare(password, currentUser.password);
  if (!isMatch) throw new Error("Invalid phone number or password.");

  return currentUser;
};

const userModel = mongoose.model("user", userSchema);

export default userModel;
