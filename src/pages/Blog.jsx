export default function Blog(){
  return (
    <div className="container">
      <section className="blog-section">
        <h2>Blog y Comunidad Gamer</h2>
        <p>Mantente actualizado con las últimas noticias, consejos y eventos del mundo gamer ٩(ˊᗜˋ*)و.</p>

        <div className="blog-grid">
          <article className="blog-card">
            <div className="blog-img">
              <img src="/img/juegos_pc.jpg" alt="Los mejores juegos para PC en 2025" />
            </div>
            <div className="blog-content">
              <h3>Los mejores juegos para PC en 2025</h3>
              <div className="blog-meta">Por: MERISTATION - 2025</div>
              <p>Descubre los títulos más esperados y las sorpresas que nos depara este año en el mundo del gaming para PC.</p>
              <a href="https://as.com/meristation/plataformas/computadora-personal/top/2025" className="read-more" target="_blank">Leer más</a>
            </div>
          </article>

          <article className="blog-card">
            <div className="blog-img">
              <img src="/img/antesvsdsp.jpg" alt="Cómo mejorar tu setup gamer" />
            </div>
            <div className="blog-content">
              <h3>Guía: Cómo mejorar tu setup gamer</h3>
              <div className="blog-meta">Por: Canal en Youtube: Proto - 2023</div>
              <p>Aprende los consejos esenciales para optimizar tu espacio de juego y llevar tu experiencia al siguiente nivel.</p>
              <a href="https://www.youtube.com/watch?v=Hzbc9SdCZBo" className="read-more" target="_blank">Leer más</a>
            </div>
          </article>

          <article className="blog-card">
            <div className="blog-img">
              <img src="/img/expogame.jpg" alt="Eventos gaming en Chile" />
            </div>
            <div className="blog-content">
              <h3>Eventos gaming en Chile 2025</h3>
              <div className="blog-meta">Por: Burger King - EXPOGAME 2025</div>
              <p>No te pierdas los torneos, convenciones y encuentros de gamers que ocurrirán este mes en todo el país.</p>
              <a href="https://www.expogamechile.cl" className="read-more" target="_blank">Leer más</a>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
}
