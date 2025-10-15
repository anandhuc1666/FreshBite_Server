import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  number: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    default: 'user'
  },
  status: {
    type: String,
    default: 'active'
  },
  cart: {
    type: Array,
    default: []
  },
  fav: {
    type: Array,
    default: []
  },
  order: {
    type: Array,
    default: []
  }
}, { timestamps: true }); 
const User = mongoose.model('User', userSchema);

export default User;
