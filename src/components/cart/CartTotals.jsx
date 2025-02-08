import { useSelector } from 'react-redux';
import { formatPrice } from '../../utils/helperFuncs';

const CartTotals = () => {
  const { cartTotal, shipping, tax, orderTotal } = useSelector(
    (state) => state.cartState
  );

  return (
    <div className="card bg-base-200">
      <div className="card-body">
        {/* SUBTOTAL */}
        <p className="flex justify-between border-b border-base-300 text-xs pb-2">
          <span>Subtotal</span>
          <span>{formatPrice(cartTotal)}</span>
        </p>
        {/* SHIPPING */}
        <p className="flex justify-between border-b border-base-300 text-xs pb-2">
          <span>Shipping</span>
          <span>{formatPrice(shipping)}</span>
        </p>
        {/* Tax */}
        <p className="flex justify-between border-b border-base-300 text-xs pb-2">
          <span>Tax</span>
          <span>{formatPrice(tax)}</span>
        </p>
        {/* Total */}
        <p className="flex justify-between text-sm font-medium mt-4">
          <span>Order Total</span>
          <span>{formatPrice(orderTotal)}</span>
        </p>
      </div>
    </div>
  );
};

export default CartTotals;
