import { useLocation } from 'react-router';
import { Navigate } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { Preloader } from '../ui/preloader';
import { selectIsAuthChecked, selectUser } from '../../services/slices/user';

export const ProtectedRoute = ({
  children,
  onlyUnAuth
}: {
  onlyUnAuth?: boolean;
  children: React.ReactElement;
}) => {
  const isAuthChecked = useSelector(selectIsAuthChecked);
  const user = useSelector(selectUser);
  const location = useLocation();

  if (!isAuthChecked) {
    return <Preloader />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate replace to='/login' state={{ from: location }} />;
  }

  if (onlyUnAuth && user) {
    const from = location.state?.from || { pathname: '/' };

    return <Navigate replace to={from} />;
  }

  return children;
};
