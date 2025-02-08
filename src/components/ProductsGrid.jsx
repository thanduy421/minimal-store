import { Link, useLoaderData } from 'react-router-dom';
import { formatPrice } from '../utils/helperFuncs';

const ProductsGrid = () => {
  const { products } = useLoaderData();

  return (
    <div className="pt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => {
        const { price, title, image } = product.attributes;
        const dollarAmount = formatPrice(price);

        return (
          <Link
            key={product.id}
            to={`/products/${product.id}`}
            className="px-4 shadow-xl card w-full hover:shadow-2xl transition duration-300"
          >
            <figure className="px-4 pt-4">
              <img
                src={image}
                alt={title}
                className="rounded-xl h-64 w-full object-cover "
              />
            </figure>
            <div className="card-body items-center capitalize tracking-wider">
              <h2 className="text-2xl">{title}</h2>
              <span className="text-secondary">{dollarAmount}</span>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default ProductsGrid;
