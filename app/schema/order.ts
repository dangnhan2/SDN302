import mongoose, { Schema, model, models, Model, Document, Types } from 'mongoose';

interface OrderItem {
  productId: Types.ObjectId;
  quantity: number;
}

export interface OrderDocument extends Document {
  userId: string;
  items: OrderItem[];
  totalAmount: number;
  status: 'pending' | 'completed';
  createdAt: Date;
  updatedAt: Date;
}

const OrderSchema = new Schema<OrderDocument>(
  {
    userId: { type: String, required: true },
    items: [
      {
        productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
        quantity: { type: Number, required: true },
      },
    ],
    totalAmount: { type: Number, required: true },
    status: { type: String, enum: ['pending', 'completed'], default: 'pending' },
  },
  { timestamps: true }
);

// ✅ Gán đúng kiểu Model<OrderDocument>
const Order: Model<OrderDocument> = models.Order || model<OrderDocument>('Order', OrderSchema);
export default Order;