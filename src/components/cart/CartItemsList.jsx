import { useSelector } from 'react-redux';
import CartItem from './CartItem';
import { Key } from 'react';

const CartItemsList = () => {
  const { cartItems } = useSelector((state) => state.cartState);

  return (
    <div>
      {cartItems.map((item) => (
        <CartItem key={item.cartID} order={item} />
      ))}
    </div>
  );
};

export default CartItemsList;
