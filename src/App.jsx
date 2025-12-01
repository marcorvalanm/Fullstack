import { Routes, Route, Navigate } from 'react-router-dom';
import { SessionProvider } from './context/SessionContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Catalogo from './pages/Catalogo';
import Carrito from './pages/Carrito';
import Blog from './pages/Blog';
import Eventos from './pages/Eventos';
import Soporte from './pages/Soporte';
import Perfil from './pages/Perfil';
import Login from './pages/Login';
import ProductoDetalle from './pages/producto/ProductoDetalle';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';

function App() {
  return (
    <SessionProvider>
      <div className="container">
        <Header />
      </div>
      <Routes>
        {/* Rutas existentes */}
        <Route path="/" element={<Home />} />
        <Route path="/catalogo" element={<Catalogo />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/eventos" element={<Eventos />} />
        <Route path="/soporte" element={<Soporte />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/login" element={<Login />} />
        <Route path="/producto/:slug" element={<ProductoDetalle />} />
        
        {/* Rutas del CRUD de productos */}
        <Route path="/products" element={<ProductList />} />
        <Route path="/products/new" element={<ProductForm />} />
        <Route path="/products/edit/:id" element={<ProductForm />} />
        
        {/* Redirección para rutas no encontradas */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <div className="container">
        <Footer />
      </div>
    </SessionProvider>
  )
}

export default App
