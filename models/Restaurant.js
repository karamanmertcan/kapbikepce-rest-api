import mongoose from 'mongoose';
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;

const restaurantSchema = new Schema(
  {
    restaurantName: {
      type: String,
      required: true
    },
    restaurantOwner: {
      type: ObjectId,
      ref: 'RestaurantUser'
    },
    image: {
      url: String,
      public_id: String
    },
    address: {
      type: String
    },
    phoneNumber: {
      type: String,
      required: true
    },
    openHours: {
      type: String,
      required: true
    },
    isOpen: {
      type: Boolean,
      default: true,
      required: true
    },
    rating: [
      {
        type: Number,
        default: 0,
        min: 0,
        max: 5,
        userId: {
          type: ObjectId,
          ref: 'User'
        }
      }
    ],
    comments: [
      {
        content: {
          type: String,
          required: true
        },
        created: { type: Date, default: Date.now },
        createdBy: {
          type: ObjectId,
          ref: 'User'
        }
      }
    ]
  },

  {
    timestamps: true
  }
);

export default mongoose.model('Restaurant', restaurantSchema);
