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
    //https://stackoverflow.com/questions/66383516/add-mongoose-validation-for-phone-numbers phone number validation

    phoneNumber: {
      type: String,
      match: /^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/,
      required: true
    },
    address: {
      type: String,
      required: true
    },
    kepcePoints: {
      type: Number,
      default: 0
    },
    creditCards: [{ type: Schema.ObjectId, ref: 'CreditCard' }]
  },
  {
    timestamps: true
  }
);

export default mongoose.model('User', userSchema);
