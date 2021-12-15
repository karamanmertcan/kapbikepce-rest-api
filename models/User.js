import mongoose from 'mongoose';
const { Schema } = mongoose;

const validateEmail = function (email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

const userSchema = new Schema(
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
      required: true
    },
    kepcePoints: {
      type: Number,
      default: 0
    },
    orders: [{ type: Schema.ObjectId, ref: 'Order' }],
    creditCards: [{ type: Schema.ObjectId, ref: 'CreditCard' }]
  },
  {
    timestamps: true
  }
);

export default mongoose.model('User', userSchema);
