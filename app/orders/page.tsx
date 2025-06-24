'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

interface Order {
  _id: string;
  items: {
    productId: string;
    quantity: number;
  }[];
  totalAmount: number;
  status: string;
  createdAt: string;
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) return;

      const res = await fetch('/api/order/user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id }),
      });

      const data = await res.json();
      setOrders(data);
      setLoading(false);
    };

    fetchOrders();
  }, []);

  if (loading) return <div className="p-6">Đang tải đơn hàng...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Đơn hàng của bạn</h1>

      {orders.length === 0 ? (
        <p>Chưa có đơn hàng nào.</p>
      ) : (
        <div className="space-y-4">
          {orders.map(order => (
            <div key={order._id} className="border p-4 rounded shadow">
              <div className="font-semibold">Mã đơn: {order._id}</div>
              <div className="text-sm text-gray-600">
                Ngày đặt: {new Date(order.createdAt).toLocaleString()}
              </div>
              <div className="text-sm">Tổng tiền: ${order.totalAmount.toFixed(2)}</div>
              <div className="text-sm">Trạng thái: {order.status}</div>
              <div className="mt-2">
                <div className="font-medium">Sản phẩm:</div>
                <ul className="list-disc ml-5 text-sm">
                  {order.items.map((item, idx) => (
                    <li key={idx}>
                      ID: {item.productId} × {item.quantity}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
