import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema({
  number: {
    type: Number,
    required: true,
    unique: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true
  },
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product"
      },
      quantity: Number
    }
  ],
  totalPrice: {
    type: Number,
    required: true
  },
  datetime: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String
  }
});

const ticketModel = mongoose.model("tickets", ticketSchema);

export default ticketModel;