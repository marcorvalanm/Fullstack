import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useSession } from './context/SessionContext';

// Components
import Header from './components/Header';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Catalogo from './pages/Catalogo';
import Carrito from './pages/Carrito';
import Perfil from './pages/Perfil';
import Soporte from './pages/Soporte';
import Eventos from './pages/Eventos';
import Blog from './pages/Blog';

// Componente para proteger rutas privadas
function ProtectedRoute({ children, role }) {
  const { session, token } = useSession();
  const location = useLocation();

  if (!session || !token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Si se requiere un rol específico (e.g. 'ADMIN')
  if (role && !session.roles.includes(role)) {
    return <Navigate to="/" replace />;
  }

  return children;
}

function App() {
  return (
    <div className="App" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />

      <main style={{ flex: 1, paddingBottom: '2rem' }}>
        <Routes>
          {/* Rutas Públicas */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/catalogo" element={<Catalogo />} />
          <Route path="/soporte" element={<Soporte />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/eventos" element={<Eventos />} />

          {/* Rutas Protegidas */}
          <Route
            path="/carrito"
            element={
              <ProtectedRoute>
                <Carrito />
              </ProtectedRoute>
            }
          />
          <Route
            path="/perfil"
            element={
              <ProtectedRoute>
                <Perfil />
              </ProtectedRoute>
            }
          />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;