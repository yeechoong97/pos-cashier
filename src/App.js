import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom'
import Cart from './Pages/Cart';
import ProductList from './Pages/ProductList';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* <Route exact path="/" element={<ProductList />} /> */}
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </Router>
  );
}

export default App;
