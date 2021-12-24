import mongoose from 'mongoose';
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;

const orderSchema = new Schema(
  {
    orderUserId: {
      type: ObjectId,
      ref: 'User',
      required: true
    },

    restaurantOwnerId: {
      type: ObjectId,
      ref: 'RestaurantUser',
      required: true
    },
    totalPrice: {
      type: Number,
      default: 0,
      required: [true, 'Fiyat Zorunludur !!!']
    },
    address: {
      type: String,
      required: [true, 'Adres Zorunludur !!!']
    },
    isPaid: {
      type: Boolean,
      default: false,
      required: [true, 'Ödeme Durumu Zorunludur !!!']
    },
    items: [
      {
        text: {
          type: String,
          required: true
        },
        description: {
          type: String,
          required: true
        },
        qty: { type: Number, required: true, default: 1 },
        price: {
          type: Number,
          required: true,
          default: 0
        },

        category: {
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

export default mongoose.model('Order', orderSchema);
