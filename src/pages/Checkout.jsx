import { useSelector } from 'react-redux';
import { SectionTitle, CheckoutForm, CartTotals } from '../components';

const Checkout = () => {
  const cartTotal = useSelector((state) => state.cartState.cartTotal);

  return (
    <>
      {cartTotal ? (
        <>
          <SectionTitle text="Place your order" />
          <div className="mt-8 grid gap-8 md:grid-cols-2 items-start">
            <CheckoutForm />
            <CartTotals />
          </div>
        </>
      ) : (
        <SectionTitle text="Your cart is empty" />
      )}
    </>
  );
};

export default Checkout;
