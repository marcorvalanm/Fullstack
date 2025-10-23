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
      { author:"Carlos Méndez", avatar:"/img/1.jpg", text:"La Xbox Series X es una bestia. Todo carga rapidísimo y los gráficos en 4K se ven increíbles. Game Pass es el mejor valor del mercado." },
      { author:"Fernanda Ruiz", avatar:"/img/2.jpg", text:"Silenciosa, potente y con diseño elegante. El Quick Resume entre juegos es una maravilla." }
    ]
  },
  { id:"ps5", title:"PlayStation 5", price:599990, category:"consolas", img:"/img/ps5.png",
    descr:"Gráficos impresionantes y DualSense con respuesta háptica.", details:[], reviews:[] },
  { id:"switch2", title:"Consola Nintendo Switch 2", price:499990, category:"consolas", img:"/img/nintendo.png",
    descr:"Pantalla OLED grande y retrocompatibilidad.", details:[], reviews:[] },
  { id:"pc4060", title:"PC Gamer RTX 4060", price:1099990, category:"pc", img:"/img/pc.png",
    descr:"Gaming competitivo con gráficos de última generación.", details:[], reviews:[] },
  { id:"acer-nitro-v15", title:"Acer Nitro V 15", price:699990, category:"pc", img:"/img/pc2.png",
    descr:"Intel i5-13420H, 16GB DDR5, RTX 3050, 144Hz.", details:[], reviews:[] },
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
      { author:"Ignacio Soto", avatar:"/img/8.jpg", text:"Muy buen teclado por el precio. RGB potente y switches rojos suaves." },
      { author:"Camila Torres", avatar:"/img/10.jpg", text:"Construcción sólida, luces personalizables y buena respuesta." }
    ]
  },
  { id:"mouse", title:"Mouse Gamer Logitech G502 HERO", price:49990, category:"accesorios", img:"/img/mouse.png",
    descr:"Precisión y personalización al máximo.", details:[], reviews:[] },
  { id:"mousepad", title:"Mousepad Razer Goliathus Extended Chroma", price:29990, category:"accesorios", img:"/img/mousepad.jpg",
    descr:"Estilo e iluminación para tu setup.", details:[], reviews:[] },
  { id:"control-xbox", title:"Controlador Inalámbrico Xbox Series X", price:59990, category:"accesorios", img:"/img/control_xbox.png",
    descr:"Precisión, comodidad y control absoluto.", details:[], reviews:[] },
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
      { author:"Usuario Gaming-Age", avatar:"/img/gamer.jpg", text:"Se ve increíble, almohada magnética y gran comodidad." },
      { author:"ProfesionalReview", avatar:"/img/gamer.jpg", text:"Excelente diseño, estabilidad, y muy bien terminada." }
    ]
  },
  { id:"catan", title:"Catan - Edición Clásica", price:29990, category:"juegos", img:"/img/catan.png",
    descr:"Intercambia recursos y domina la isla.", details:[], reviews:[] },
  { id:"carcassonne", title:"Carcassonne", price:24990, category:"juegos", img:"/img/carcassonne.png",
    descr:"Construye el paisaje medieval con fichas.", details:[], reviews:[] },
  { id:"polera1", title:"Polera Gamer Diseño 1", price:14990, category:"poleras", img:"/img/polera1.png",
    descr:"Polera negra con estampado gamer de control.", details:[], reviews:[] },
  { id:"polera2", title:"Polera Gamer Diseño 2", price:12990, category:"poleras", img:"/img/polera2.png",
    descr:"Polera negra con logo Gamer Zone.", details:[], reviews:[] },
];

export function getProduct(slug){
  return PRODUCTS.find(p => p.id === slug);
}
