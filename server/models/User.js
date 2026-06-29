import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name:
  {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  whishlist: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product"
  }],
  viewedProducts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product"
  }]
});


const User = mongoose.model("User", userSchema);
export default User;