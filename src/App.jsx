import { Routes, Route, Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h1>Página de Inicio</h1>
      <p>Bienvenido a mi proyecto Fullstack.</p>
    </div>
  );
};

const About = () => {
  return <h1>Acerca de nosotros</h1>;
};

function App() {
  return (
    <div className="App">
      <nav style={{ padding: '10px', borderBottom: '1px solid #ccc', marginBottom: '20px' }}>
        <Link to="/" style={{ marginRight: '10px' }}>Inicio</Link>
        <Link to="/about">About</Link>
      </nav>
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<h2>404 - Página no encontrada</h2>} />
      </Routes>
    </div>
  )
}

export default App
