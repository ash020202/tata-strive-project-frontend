import { useCart } from '../contexts/CartContext';
import { useOrder } from '../contexts/OrderContext';
import { CheckoutForm } from '../components/checkout/CheckoutForm';
import { useAuth } from '../contexts/AuthContext';

export function Checkout() {
  const { items, total } = useCart();
  const { userData } = useAuth();

  return (
    <div className="pt-24 pb-16">
      <CheckoutForm userData={userData} items={items} total={total} />
    </div>
  );
}
