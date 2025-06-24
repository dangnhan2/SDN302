'use client';
import { useCart } from '@/lib/useCart';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart, loaded } = useCart();
  const router = useRouter();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (!loaded) return <div className="p-6">Đang tải giỏ hàng...</div>;
  
  const handleOrder = async () => {
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    alert('Bạn cần đăng nhập để đặt hàng');
    return;
  }

  const res = await fetch('/api/order', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      userId: user.id,
      items: cart.map(item => ({
        productId: item.productId,
        quantity: item.quantity,
      })),
      totalAmount: total,
    }),
  });

  if (res.ok) {
    clearCart();
    alert('Đặt hàng thành công!');
    router.push('/orders');
  } else {
    alert('Đặt hàng thất bại!');
  }
};

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Giỏ hàng</h1>

      {cart.length === 0 ? (
        <p>Không có sản phẩm nào trong giỏ hàng.</p>
      ) : (
        <>
          {cart.map(item => (
            <div key={item.productId} className="mb-4 border-b pb-2">
              <div className="font-semibold">{item.name}</div>
              <div className="text-sm">Giá: ${item.price}</div>
              <div className="text-sm">Số lượng: {item.quantity}</div>
              <input
                type="number"
                min={1}
                value={item.quantity}
                onChange={e =>
                  updateQuantity(item.productId, parseInt(e.target.value))
                }
                className="border p-1 w-16 mt-1"
              />
              <button
                onClick={() => removeFromCart(item.productId)}
                className="ml-2 text-red-600 text-sm"
              >
                Xoá
              </button>
            </div>
          ))}
          <div className="mt-4 font-bold">Tổng cộng: ${total}</div>
          <button
            onClick={handleOrder}
             className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Đặt hàng
          </button>
        </>
      )}
    </div>
  );
}
