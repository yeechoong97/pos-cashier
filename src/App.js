import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom'
import ProductList from './Pages/ProductList';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<ProductList />} />
      </Routes>
    </Router>
  );
}

export default App;
