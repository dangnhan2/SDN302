// import mongoose from 'mongoose';

// const CartItemSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   description: String,
//   price: { type: Number, required: true },
//   image: String,
//   quantity: {type: Number},
// });

// export default mongoose.models.CartItem || mongoose.model("CartItem", CartItemSchema);
export interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
}