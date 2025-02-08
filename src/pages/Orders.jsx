import { useLoaderData } from 'react-router-dom';
import {
  SectionTitle,
  OrdersList,
  ComplexPaginationContainer,
} from '../components';

const Orders = () => {
  const { meta } = useLoaderData();

  if (!meta || meta.pagination.total === 0) {
    return <SectionTitle text="Please make an order" />;
  } else {
    return (
      <>
        <SectionTitle text="Your Orders" />
        <OrdersList />
        <ComplexPaginationContainer />
      </>
    );
  }
};
export default Orders;
