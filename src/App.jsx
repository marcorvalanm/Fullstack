import { Routes, Route } from 'react-router-dom'
import { SessionProvider } from './context/SessionContext'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Catalogo from './pages/Catalogo'
import Carrito from './pages/Carrito'
import Blog from './pages/Blog'
import Eventos from './pages/Eventos'
import Soporte from './pages/Soporte'
import Perfil from './pages/Perfil'
import Login from './pages/Login'
import ProductoDetalle from './pages/producto/ProductoDetalle'

function App() {
  return (
    <SessionProvider>
      <div className="container">
        <Header />
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalogo" element={<Catalogo />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/eventos" element={<Eventos />} />
        <Route path="/soporte" element={<Soporte />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/login" element={<Login />} />
        <Route path="/producto/:slug" element={<ProductoDetalle />} />
      </Routes>
      <div className="container">
        <Footer />
      </div>
    </SessionProvider>
  )
}

export default App
