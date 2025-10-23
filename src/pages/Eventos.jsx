import { useCallback, useEffect, useRef, useState } from "react";

export default function Eventos(){
  const [zoom, setZoom] = useState(1);
  const imgRef = useRef(null);
  const maxZoom = 3;
  const minZoom = 1;
  const step = 0.5;

  const zoomIn = useCallback(()=> setZoom(z => Math.min(maxZoom, z+step)), []);
  const zoomOut = useCallback(()=> setZoom(z => Math.max(minZoom, z-step)), []);

  useEffect(()=>{ window.scrollTo(0,0); },[]);

  function onWheel(e){
    e.preventDefault();
    if(e.deltaY < 0) zoomIn(); else zoomOut();
  }

  return (
    <div className="container">
      <section className="events-section">
        <h2>Mapa de Eventos Gaming</h2>
        <p>Encuentra eventos cerca de tu ubicación y gana puntos LevelUp por participar ◝(ᵔᗜᵔ)◜.</p>

        <div className="map-container">
          <div className="map-interactive">
            <img ref={imgRef} onWheel={onWheel} src="/img/maps_pao.jpg.png" alt="Mapa de eventos gaming" className="map-image" style={{transform:`scale(${zoom})`}} />
            <div className="map-zoom-controls">
              <button className="zoom-btn" onClick={zoomIn}>+</button>
              <button className="zoom-btn" onClick={zoomOut}>-</button>
            </div>
          </div>

          <div className="map-links">
            <a href="https://www.google.com/maps/search/eventos+gaming+chile" className="btn-map" target="_blank">Ver en Google Maps</a>
            <a href="https://www.google.com/maps" className="btn-map" target="_blank">Cómo llegar</a>
          </div>
        </div>
      </section>
    </div>
  );
}
