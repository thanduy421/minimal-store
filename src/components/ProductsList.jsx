import { formatPrice } from '../utils/helperFuncs';
import { Link, useLoaderData } from 'react-router-dom';

const ProductsList = () => {
  const { products } = useLoaderData();

  return (
    <div className="mt-12 grid gap-y-8">
      {products.map((product) => {
        const { image, title, price, company } = product.attributes;
        const dollarsAmount = formatPrice(price);

        return (
          <Link
            key={product.id}
            to={`/products/${products.id}`}
            className="p-8 flex flex-col items-center sm:flex-row gap-y-4 flex-wrap rounded-lg bg-base-100 shadow-xl hover:shadow-2xl duration-300 group"
          >
            <img
              src={image}
              alt={title}
              className="h-24 w-24 rounded-lg sm:h-32 sm:w-32 object-cover group-hover:scale-105 transition duration-300"
            />
            <div className="ml-0 sm:ml-16">
              <h3 className="capitalize font-medium text-lg">{title}</h3>
              <h4 className="capitalize text-md text-neutral-content text-center">
                {company}
              </h4>
            </div>
            <p className="font-medium ml-0 sm:ml-auto text-lg">
              {dollarsAmount}
            </p>
          </Link>
        );
      })}
    </div>
  );
};

export default ProductsList;
