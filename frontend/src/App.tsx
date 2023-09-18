import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Companies from "./components/company/Companies";
import ProductDetails from "./components/product/ProductDetails";

import Navbar from "./components/layout/Nabvar";
import CompanyDetails from "./components/company/CompanyDetails";
import AddCompany from "./components/company/AddCompany";
import AddProduct from "./components/product/AddProduct";
import Products from "./components/product/Products";

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="w-full px-10 pt-5">
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="product">
            <Route path="all" element={<Products />} />
            <Route path="details/:id" element={<ProductDetails />} />
            <Route path="add" element={<AddProduct />} />
          </Route>

          <Route path="company">
            <Route path="all" element={<Companies />} />
            <Route path="details/:id" element={<CompanyDetails />} />
            <Route path="add" element={<AddCompany />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
