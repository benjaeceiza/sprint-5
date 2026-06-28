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
              <Route path="/products/:id" element={<ProductView />} />
              <Route path="/products/new" element={<ProductNew />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>

        </div>

      </div>
    </BrowserRouter>
  )
}

export default App;