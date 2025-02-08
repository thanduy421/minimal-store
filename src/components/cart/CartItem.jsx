import { useDispatch } from 'react-redux';
import { removeItem, editItem } from '../../features/cart/cartSlice';
import { formatPrice, generateSequentialArray } from '../../utils/helperFuncs';

const CartItem = ({ order }) => {
  const dispatch = useDispatch();
  const { cartID, title, price, image, amount, company, productColor } = order;

  const removeItemFromTheCart = () => {
    dispatch(removeItem({ cartID }));
  };

  const handleAmount = (e) => {
    const newAmount = parseInt(e.target.value);
    dispatch(editItem({ amount: newAmount, cartID }));
  };

  return (
    <article
      key={cartID}
      className="mb-12 flex flex-col gap-y-4 sm:flex-row flex-wrap border-b border-base-300 pb-6 last:border-b-0"
    >
      <img
        src={image}
        alt={title}
        className="h-24 w-24 rounded-lg sm:h-32 sm:w-32 object-cover"
      />
      {/* INFO */}
      <div className="sm:ml-16 sm:w-48">
        <h3 className="capitalize font-medium">{title}</h3>
        <h4 className="mt-2 capitalize text-sm text-neutral-content">
          {company}
        </h4>
        <p className="mt-4 text-sm flex items-center gap-x-2">
          Color:
          <span
            className="badge badge-sm"
            style={{ backgroundColor: productColor }}
          />
        </p>
      </div>
      <div className="sm:ml-12">
        {/* AMOUNT */}
        <div className="form-control max-w-xs">
          <label htmlFor="amount" className="label p-0">
            <span>Amount</span>
          </label>
          <select
            className="select select-base select-bordered select-xs mt-2"
            value={amount}
            onChange={handleAmount}
          >
            {generateSequentialArray(amount + 5).map((amount) => {
              return (
                <option value={amount} key={amount}>
                  {amount}
                </option>
              );
            })}
          </select>
          <button
            className="mt-2 link link-primary link-hover text-sm"
            onClick={removeItemFromTheCart}
          >
            remove
          </button>
        </div>
      </div>
      <p className="sm:ml-auto font-medium">{formatPrice(price)}</p>
    </article>
  );
};

export default CartItem;
