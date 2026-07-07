import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import ProductsList from "./pages/Products/ProductsList/ProductsList";
import ProductView from "./pages/Products/ProductView/ProductView";
import Profile from "./pages/Profile/Profile";
import Sidebar from "./components/Sidebar/Sidebar";
import Header from "./components/Header/Header";
import ProductNew from "./pages/Products/ProductNew/ProductNew";
import NotFound from "./pages/NotFound/NotFound";
import CategoriesList from "./pages/Categories/CategoriesList/CategoriesList";
import CategoryView from "./pages/Categories/CategoryView/CategoryView";
import CategoryNew from "./pages/Categories/CategoryNew/CategoryNew";
import StoresList from "./pages/Stores/StoresList/StoresList";
import StoreView from "./pages/Stores/StoreView/StoreView";
import StoreNew from "./pages/Stores/StoreNew/StoreNew";


function App() {
  // 1. Creamos el estado para manejar si el menú está abierto o cerrado (mobile)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // 2. Función para alternar el estado del sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <BrowserRouter>
      <div className="app-container">

        {/* 3. Le pasamos el estado y la función al Sidebar para que sepa cuándo abrirse/cerrarse */}
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

        {/* MAIN AREA */}
        <div className="main-area">

          {/* 4. Le pasamos la función al Header para que el botón hamburguesa pueda dispararla */}
          <Header toggleSidebar={toggleSidebar} />

          {/* CONTENT  */}
          <div className="content-area">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<ProductsList />} />
              <Route path="/products/new" element={<ProductNew />} />
              <Route path="/products/:id" element={<ProductView />} />
              <Route path="/categories" element={<CategoriesList />} />
              <Route path="/categories/new" element={<CategoryNew />} />
              <Route path="/categories/:id" element={<CategoryView />} />
              <Route path="/tienda" element={<StoresList />} />
              <Route path="/tienda/new" element={<StoreNew />} />
              <Route path="/tienda/:id" element={<StoreView />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>

        </div>

      </div>
    </BrowserRouter>
  )
}

export default App;