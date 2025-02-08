import { useLoaderData } from 'react-router-dom';
import { formatPrice, generateSequentialArray } from '../utils/helperFuncs';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addItem } from '../features/cart/cartSlice';

const SingleProduct = () => {
  const [amount, setAmount] = useState(1);

  const { product } = useLoaderData();
  const { image, title, price, description, colors, company } =
    product.attributes;
  const [productColor, setProductColor] = useState(colors[0]);
  const dollarsAmount = formatPrice(price);
  const amountOptions = generateSequentialArray(5);
  const dispatch = useDispatch();
  const cartProduct = {
    cartID: product.id + productColor,
    productID: product.id,
    image,
    title,
    price,
    amount,
    productColor,
    company,
  };

  const addToCart = () => {
    dispatch(addItem({ product: cartProduct }));
  };

  const handleAmount = (e) => {
    setAmount(parseInt(e.target.value));
  };

  return (
    <section>
      <div className="text-md breadcrumbs">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/products">Products</Link>
          </li>
        </ul>
      </div>
      {/* PRODUCT */}
      <div className="mt-6 grid gap-y-8 lg:grid-cols-2 lg:gap-x-16">
        <img
          src={image}
          alt={title}
          className="h-96 w-96 object-cover rounded-lg lg:w-full"
        />
        {/* PRODUCT INFO */}
        <div>
          <h1 className="capitalize text-3xl font-bold">{title}</h1>
          <h4 className="text-xl text-neutral-content font-bold mt-2">
            {company}
          </h4>
          <p className="mt-3 text-xl">{dollarsAmount}</p>
          <p className="mt-6 leading-8">{description}</p>
          {/* COLORS */}
          <div className="mt-6">
            <h4 className="text-md font-medium tracking-wide">Colors</h4>
            <div className="mt-2">
              {colors.map((color) => {
                return (
                  <button
                    key={color}
                    type="button"
                    className={`badge mr-2 ${
                      color === productColor && 'border-2 border-secondary'
                    }`}
                    style={{ backgroundColor: color }}
                    onClick={() => setProductColor(color)}
                  />
                );
              })}
            </div>
            {/* AMOUNT */}
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <h4 className="text-md font-medium tracking-wide">Amount</h4>
              </label>
              <select
                className="select select-secondary select-md"
                value={amount}
                onChange={handleAmount}
              >
                {amountOptions.map((amount) => {
                  return (
                    <option key={amount} value={amount}>
                      {amount}
                    </option>
                  );
                })}
              </select>
            </div>
            {/* CART BUTTON */}
            <div className="mt-10">
              <button className="btn btn-secondary" onClick={addToCart}>
                Add to bag
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default SingleProduct;
