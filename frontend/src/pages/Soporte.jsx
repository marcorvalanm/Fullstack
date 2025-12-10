import { useState } from "react";

export default function Soporte(){
  const [ok, setOk] = useState(false);
  const [form, setForm] = useState({ nombre:"", telefono:"", mensaje:"" });

  function onChange(e){
    const {name, value} = e.target;
    setForm(prev=>({ ...prev, [name]: value }));
  }

  function onSubmit(e){
    e.preventDefault();
    const patron = /^\+56 9[0-9]{8}$/;
    if(!patron.test(form.telefono)){
      alert('Por favor, ingresa un número válido con el formato +56 9XXXXXXXX');
      return;
    }
    setOk(true);
  }

  return (
    <div className="container">
      <h2>Soporte Técnico</h2>
      <p>¿Tienes dudas o problemas? Completa el formulario y nuestro equipo te contactará por WhatsApp lo antes posible.</p>

      {!ok ? (
        <form onSubmit={onSubmit} id="formularioSoporte">
          <label htmlFor="nombre">Nombre</label>
          <input type="text" id="nombre" name="nombre" required value={form.nombre} onChange={onChange} />

          <label htmlFor="telefono">Número de teléfono</label>
          <input type="tel" id="telefono" name="telefono" pattern="\+56 9[0-9]{8}" placeholder="+56 9XXXXXXXX" required value={form.telefono} onChange={onChange} />
          <small>Formato: +56 9 seguido de 8 dígitos</small>

          <label htmlFor="mensaje">Mensaje</label>
          <textarea id="mensaje" name="mensaje" rows={6} required value={form.mensaje} onChange={onChange} />

          <button type="submit">Enviar consulta</button>
        </form>
      ) : (
        <div id="mensajeConfirmacion" style={{ marginTop: 20, padding: 15, backgroundColor: '#313131', color: '#155724', borderRadius: 5 }}>
          <p>¡Tu consulta ha sido enviada por WhatsApp! Nos pondremos en contacto contigo pronto.</p>
        </div>
      )}
    </div>
  );
}
