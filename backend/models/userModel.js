import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// this method will run on every .create() mongoose call
userSchema.pre("save", async function (next) {
  // mongoose will check first if the password has been modified/created
  // if not, it will skip to the next middleware or save the data
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  // this.password pertains to the user object
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);

export default User;
