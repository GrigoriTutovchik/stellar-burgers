import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import { getAllOrders, loadFeedData } from '../../services/slices/feed';

export const Feed: FC = () => {
  const orders: TOrder[] = useSelector(getAllOrders);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadFeedData());
  }, []);

  const handleGetFeeds = () => {
    dispatch(loadFeedData());
  };

  if (!orders.length) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
