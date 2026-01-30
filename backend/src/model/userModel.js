import mongoose from "mongoose";

const { Schema } = mongoose;

const userModel = new Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique:true
  },
  phone: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
},{
    timestamps:true
});

const User = mongoose.model("User", userModel);
export default User;
