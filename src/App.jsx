import { Navigate, Route, Routes } from 'react-router-dom';
import { lazy, useEffect } from 'react';
import Header from './components/Header/Header';
import { useDispatch } from 'react-redux';
import { fetchBaseCurrency } from './reduxState/currenncy/operation';
import { setBaseCurrency } from './reduxState/currenncy/currencySlice';

const Home = lazy(() => import('./pages/Home'));
const Rates = lazy(() => import('./pages/Rates'));

export const App = () => {
  const dispath = useDispatch();
  useEffect(() => {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };
    const success = ({ coords }) => {
      dispath(fetchBaseCurrency(coords));
    };
    const error = () => {
      dispath(setBaseCurrency('USD'));
    };
    navigator.geolocation.getCurrentPosition(success, error, options);
  }, [dispath]);
  return (
    <Routes>
      <Route path="/" element={<Header />}>
        <Route index element={<Home />} />
        <Route path="/rates" element={<Rates />} />
      </Route>
      <Route path="+" element={<Navigate to="/" />} />
    </Routes>
  );
};
