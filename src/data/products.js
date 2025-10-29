export const PRODUCTS = [
  { id:"xbox", title:"Xbox Series X", price:649990, category:"consolas", img:"/img/xbox.png",
    descr:"La Xbox Series X es la consola más potente de Microsoft: rendimiento de nueva generación y tiempos de carga casi nulos.",
    details:[
      "Procesador: AMD Zen 2 8 núcleos a 3.8GHz",
      "GPU: AMD RDNA 2 con 12 teraflops",
      "Memoria RAM: 16GB GDDR6",
      "Almacenamiento: SSD NVMe de 1TB",
      "Resolución: 4K nativo hasta 120FPS / 8K soporte",
      "Incluye: Control inalámbrico Xbox renovado",
      "Conectividad: WiFi 5, Bluetooth, HDMI 2.1"
    ],
    reviews:[
      { author:"Juan Weincher", avatar:"/img/1.jpg", rating:5, text:"La Xbox Series X es una bestia. Todo carga rapidísimo y los gráficos en 4K se ven increíbles. Game Pass es el mejor valor del mercado." },
      { author:"Fernanda Ruiz", avatar:"", rating:4, text:"Silenciosa, potente y con diseño elegante. El Quick Resume entre juegos es una maravilla." },
      { author:"Fabrizio Rios", avatar:"", rating:5, text:"Elegante y me encanta que soporte 8k!!, MUCHAS GRACIAS!" },
      { author:"Carla Méndez", avatar:"/img/2.jpg", rating:5, text:"Excelente consola, la carga es rápida y los gráficos en 4K se ven increíbles." },
    ]
  },
  { id:"ps5", title:"PlayStation 5", price:599990, category:"consolas", img:"/img/ps5.png",
    descr:"Gráficos impresionantes y DualSense con respuesta háptica.",
    details:[
      "CPU: AMD Zen 2 8c/16t",
      "GPU: RDNA 2 con Ray Tracing",
      "SSD ultra-rápido 825GB",
      "Audio 3D Tempest",
      "Control DualSense con gatillos adaptativos"
    ],
    reviews:[
      { author:"María López", avatar:"", rating:5, text:"El DualSense cambia la experiencia. Los exclusivos se ven increíbles." },
      { author:"Jorge Díaz", avatar:"/img/4.jpg", rating:5, text:"Rendimiento sólido y catálogo fuerte. El sonido es genial!!!." },
      { author:"Iván Morales", avatar:"", rating:3, text:"Esta sólida, pero esperaba más HZ." },
    ] },
  { id:"switch2", title:"Consola Nintendo Switch 2", price:499990, category:"consolas", img:"/img/nintendo.png",
    descr:"Pantalla OLED grande y retrocompatibilidad.",
    details:[
      "Modo portátil y dock 4K",
      "Joy-Con mejorados",
      "Autonomía optimizada",
      "Retrocompatibilidad total"
    ],
    reviews:[
      { author:"Ana Padilla", avatar:"/img/5.jpg", rating:5, text:"Perfecta para jugar en cualquier lado. La OLED se ve preciosa." },
      { author:"Luis Moreno", avatar:"", rating:4, text:"Comodidad y versatilidad. Catálogo enorme para toda la familia." }
    ] },
  { id:"pc4060", title:"PC Gamer RTX 4060", price:1099990, category:"pc", img:"/img/pc.png",
    descr:"Gaming competitivo con gráficos de última generación.",
    details:[
      "CPU: Intel Core i5 12ª",
      "GPU: NVIDIA GeForce RTX 4060 8GB",
      "RAM: 16GB DDR5",
      "Almacenamiento: 1TB NVMe",
      "WiFi 6 y Windows 11"
    ],
    reviews:[
      { author:"José Manuel Navarro", avatar:"", rating:5, text:"Corre todo a 1080p/144Hz sin problemas. Silencioso." },
      { author:"Felipe Monge", avatar:"/img/9.jpg", rating:4, text:"Excelente relación precio/rendimiento. Fácil de actualizar." },
      { author:"Carlos Faúndez", avatar:"", rating:5, text:"Perfecto para mi carrera de arquitectura. ;)" }
    ] },
  { id:"acer-nitro-v15", title:"Acer Nitro V 15", price:699990, category:"pc", img:"/img/pc2.png",
    descr:"Intel i5-13420H, 16GB DDR5, RTX 3050, 144Hz.",
    details:[
      "CPU: Intel Core i5-13420H",
      "GPU: NVIDIA GeForce RTX 3050 6GB",
      "Pantalla: 15.6\" IPS 144Hz",
      "RAM: 16GB DDR5 (ampliable)",
      "Almacenamiento: 512GB SSD NVMe"
    ],
    reviews:[
      { author:"Alfonso", avatar:"", rating:4, text:"Excelente para esports a 144Hz. Se mantiene fresco en sesiones largas." },
      { author:"Maru Xian", avatar:"/img/15.jpg", rating:5, text:"Relación precio/rendimiento muy buena tenía dudas sobre la 3050 pero me gustó. Teclado cómodo y pantalla fluida." },
      { author:"Belén Sagredo", avatar:"", rating:5, text:"PERFECTAAAAA :D a mi hermanito le encantó!, gracias por la experiencia de compra!." }
    ]},
  { id:"teclado", title:"Teclado Mecánico RGB", price:49990, category:"accesorios", img:"/img/teclado.webp",
    descr:"Switches rojos lineales para una experiencia suave y silenciosa.",
    details:[
      "Switch: Outemu Red",
      "Formato: Full size",
      "Iluminación: RGB por software",
      "Construcción: Placa metal + keycaps double-shot",
      "Conectividad: USB desmontable",
      "N-Key Rollover completo"
    ],
    reviews:[
      { author:"Ignacio Soto", avatar:"", rating:4, text:"Muy buen teclado por el precio. RGB potente y switches rojos suaves." },
      { author:"Camila Torres", avatar:"/img/10.jpg", rating:5, text:"Construcción sólida, luces personalizables y buena respuesta." },
      { author:"Roberto Rojas", avatar:"", rating:2, text:"No me gustó, es muy ruidoso. Hasta con audifonos siento el ruido del teclado :p" },
      { author:"David Fernandez", avatar:"", rating:3, text:"Es ruidoso. Pero con unos buenos audifonos no se nota." },
      { author:"Sebastían Martinez", avatar:"", rating:4, text:"me gustó." }
    ]
  },
  { id:"mouse", title:"Mouse Gamer Logitech G502 HERO", price:49990, category:"accesorios", img:"/img/mouse.png",
    descr:"Precisión y personalización al máximo.",
    details:[
      "Sensor HERO 25K",
      "11 botones programables",
      "Pesos ajustables",
      "Iluminación LIGHTSYNC"
    ],
    reviews:[
      { author:"ProFPS", avatar:"/img/11.jpg", rating:5, text:"Ergonomía excelente y sensor impecable." },
      { author:"Nicole Vega", avatar:"/img/12.jpg", rating:4, text:"Macros útiles y materiales durables, pero extremadamente pesado." }
    ] },
  { id:"mousepad", title:"Mousepad Razer Goliathus Extended Chroma", price:29990, category:"accesorios", img:"/img/mousepad.jpg",
    descr:"Estilo e iluminación para tu setup.",
    details:["Tamaño XL", "Base de goma antideslizante", "Iluminación RGB perimetral"],
    reviews:[
      { author:"Moira Naranjo", avatar:"/img/13.jpg", rating:5, text:"RGB hermoso y superficie muy consistente." },
      { author:"Pedro A.", avatar:"/img/24.jpg", rating:4, text:"Tamaño perfecto para teclado y mouse; el RGB se ve filete." }
    ] },
  { id:"control-xbox", title:"Controlador Inalámbrico Xbox Series X", price:59990, category:"accesorios", img:"/img/control_xbox.png",
    descr:"Precisión, comodidad y control absoluto.", details:[],
    reviews:[
      { author:"Seba", avatar:"/img/25.jpg", rating:5, text:"Ergonómico y con excelente autonomía. Funciona en PC sin problemas." },
      { author:"María José Contrerass", avatar:"/img/26.jpg", rating:4, text:"Agarre súper cómodo y el bluetooth se empareja rápido. Gracias." }
    ] },
  { id:"silla", title:"Silla Gamer Secretlab Titan", price:399990, category:"sillas", img:"/img/silla.png",
    descr:"Máxima comodidad y ergonomía.",
    details:[
      "Material: Cuero sintético PRIME™ 2.0",
      "Soporte lumbar ajustable",
      "Reposabrazos 4D",
      "Reclinado hasta 165°",
      "Peso máx: 130 kg",
      "Base de aluminio reforzado"
    ],
    reviews:[
      { author:"Daniel Soto", avatar:"/img/gamer.jpg", rating:5, text:"Se ve increíble, almohada magnética y gran comodidad!." },
      { author:"ProfesionalReview", avatar:"/img/gamer.jpg", rating:4, text:"Excelente diseño, estabilidad, y muy bien terminada." },
      { author:"Lucas Carrasco", avatar:"/img/gamer.jpg", rating:5, text:"Muy comoda, y realmente bien terminada. Esto fascinará a mi hermanito." },
      { author:"Javier Q.", avatar:"/img/gamer.jpg", rating:5, text:"Comoda para teletrabajo y largas horas de estar sentado." }
    ]
  },
  { id:"catan", title:"Catan - Edición Clásica", price:29990, category:"juegos", img:"/img/catan.png",
    descr:"Intercambia recursos y domina la isla.",
    details:[
      "Jugadores: 3-4",
      "Duración: 60-90 min",
      "Mecánicas: Comercio, colocación de losetas",
      "Edad recomendada: 10+"
    ],
    reviews:[
      { author:"MesaGeek", avatar:"/img/16.jpg", rating:5, text:"Clásico imprescindible para empezar en los juegos de mesa." },
      { author:"Carla", avatar:"/img/17.jpg", rating:4, text:"Muy entretenido con amigos. Gran jugabilidad." },
      { author:"Miguel Perez", avatar:"/img/17.jpg", rating:2, text:"Muy fome, no me gustó." }
    ] },
  { id:"carcassonne", title:"Carcassonne", price:24990, category:"juegos", img:"/img/carcassonne.png",
    descr:"Construye el paisaje medieval con fichas.",
    details:[
      "Jugadores: 2-5",
      "Duración: 35-45 min",
      "Mecánicas: Colocación de losetas, mayorías",
      "Edad recomendada: 8+"
    ],
    reviews:[
      { author:"Tamara Vargas", avatar:"/img/18.jpg", rating:5, text:"Sencillo de explicar y muy táctico. Ideal para familia." },
      { author:"Tomás R.", avatar:"/img/19.jpg", rating:4, text:"Escala bien a 2 jugadores, partidas rápidas y adictivas." }
    ] },
  { id:"polera1", title:"Polera Gamer Diseño 1", price:14990, category:"poleras", img:"/img/polera1.png",
    descr:"Polera negra con estampado gamer de control.",
    details:["Algodón peinado 100%", "Estampado de alta durabilidad", "Corte unisex"],
    reviews:[
      { author:"Vale Castro", avatar:"/img/20.jpg", rating:5, text:"Tela suave y el estampado no se cuartea al lavar." },
      { author:"Fabián Torres", avatar:"/img/21.jpg", rating:4, text:"Calce cómodo y colores fieles a la foto." }
    ] },
  { id:"polera2", title:"Polera Gamer Diseño 2", price:12990, category:"poleras", img:"/img/polera2.png",
    descr:"Polera negra con logo Gamer Zone.",
    details:["Algodón + poliéster", "Impresión serigráfica", "Respirable"],
    reviews:[
      { author:"Katy Barriga", avatar:"/img/22.jpg", rating:4, text:"Muy fresca para el verano y buen acabado del logo." },
      { author:"Leo Messi", avatar:"/img/23.jpg", rating:2, text:"Muy caro... pero es un diseñador." }
    ] },
];

export function getProduct(slug){
  return PRODUCTS.find(p => p.id === slug);
}
