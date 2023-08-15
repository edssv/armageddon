import { Metadata } from 'next';

import OrderPage from '@/components/order-page/order-page';

export const metadata: Metadata = {
  title: 'Заказ',
};

export default async function Order() {
  return <OrderPage />;
}
