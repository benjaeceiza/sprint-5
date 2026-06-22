import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import ProductsList from "./pages/Products/ProductsList/ProductsList";
import ProductView from "./pages/Products/ProductView/ProductView";
import Profile from "./pages/Profile/Profile";
import Sidebar from "./components/Sidebar/Sidebar";
import Header from "./components/Header/Header"; 

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        
        <Sidebar />
        
        {/* MAIN AREA */}
        <div className="main-area">
          
          {/* HEADER */}
          <Header />

          {/* CONTENT  */}
          <div className="content-area">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<ProductsList />} />
              <Route path="/products/:id" element={<ProductView />} />
              <Route path="*" element={<Profile />} />
            </Routes>
          </div>

        </div>

      </div>
    </BrowserRouter>
  )
}

export default App;