import { useSelector } from 'react-redux';
import { CartItemsList, SectionTitle, CartTotals } from '../components';
import { Link } from 'react-router-dom';

const Cart = () => {
  const numItemsInCart = useSelector((state) => state.cartState.numItemsInCart);

  const user = useSelector((state) => state.userState.user);

  if (numItemsInCart === 0) {
    return <SectionTitle text="your cart is empty" />;
  }

  return (
    <>
      <SectionTitle text="shopping cart" />
      <div className="mt-8 grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <CartItemsList />
        </div>
        <div className="lg:col-span-4">
          <CartTotals />
          {user ? (
            <Link to="/checkout" className="btn mt-4 btn-block btn-primary">
              Proceed to check out
            </Link>
          ) : (
            <Link to="/login" className="btn mt-4 btn-block btn-primary">
              please login
            </Link>
          )}
        </div>
      </div>
    </>
  );
};
export default Cart;
