import mongoose from 'mongoose';
const { Schema } = mongoose;

const validateEmail = function (email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

const restaurantUserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    lastName: {
      type: String,
      required: true,
      trim: true
    },
    restaurantName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      validate: [validateEmail, 'Please fill a valid email address'],
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: {
      type: String,
      required: true,
      min: 6,
      max: 64
    },
    address: {
      type: String,
      required: true,
      minlength: 30
    },
    phoneNumber: {
      type: String,
      match: /^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/,
      required: true
    },
    vergiNo: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model('RestaurantUser', restaurantUserSchema);
