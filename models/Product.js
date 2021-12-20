import mongoose from 'mongoose';
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;

const productSchema = new Schema(
  {
    restaurant: {
      type: ObjectId,
      ref: 'Restaurant'
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    image: {
      url: String,
      public_id: String
    },
    category: {
      type: String,
      required: true
    },
    createdBy: {
      type: ObjectId,
      ref: 'User'
    }
  },

  {
    timestamps: true
  }
);

export default mongoose.model('Product', productSchema);
