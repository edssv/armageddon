import { Metadata } from 'next';

import OrderPage from '@/components/pages/order-page/order-page';

export const metadata: Metadata = {
  title: 'Заказ',
};

export default async function Order() {
  return <OrderPage />;
}
