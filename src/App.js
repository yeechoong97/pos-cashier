import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom'
import Cart from './Pages/Cart';
import ProductList from './Pages/ProductList';
import { Provider as ReduxProvider } from 'react-redux';
import store from './redux/store';

const App = () => {
  return (
    <ReduxProvider store={store}>
      <Router>
        <Routes>
          <Route exact path="/" element={<ProductList />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </Router>
    </ReduxProvider>

  );
}

export default App;
