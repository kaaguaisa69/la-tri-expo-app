# 🇪🇨 App Móvil - Selección Ecuatoriana de Fútbol ("La Tri")

Esta es una aplicación móvil desarrollada con **React Native** y **Expo Go**, diseñada para demostrar principios de **Clean Code**, **Arquitectura Modular** y **Animaciones Avanzadas** a través de la API nativa de React Native.

El proyecto cuenta con una pantalla de bienvenida animada (Splash Screen) y una pantalla principal (Home Screen) que presenta información de la selección ecuatoriana, todo siguiendo una paleta de colores oficial.

---

## Características Principales

1. **Splash Screen Animado Customizado (`AnimatedSplash.js`)**
   - **Fase 1:** Presentación fluida (fade in/out) de la plantilla de jugadores.
   - **Fase 2:** Dibujado de un borde circular interactivo alrededor de la copa, con interpolación de color que transiciona por los colores de la bandera de Ecuador (Amarillo -> Azul -> Rojo).
   - **Fase 3:** Efecto de "Latido" (Heartbeat) en el escudo, seguido de un zoom in masivo (efecto cámara) y destello blanco hacia el dashboard.

2. **Home Screen Premium (`HomeScreen.js`)**
   - Hero banner superpuesto con un componente de escudo tipo "avatar".
   - Animaciones sutiles de entrada (slide-up) cuando la vista carga.
   - **InfoCards Reutilizables:** Tarjetas dinámicas que muestran detalles básicos de la selección con feedback táctil (efecto spring/rebote al presionar).
3. **Modal de Detalles Interactivo (`DetailModal.js`)**
   - Menú estilo "Bottom Sheet" con navegación por pestañas.
   - Muestra la **Plantilla** de jugadores, los **Próximos Partidos** de las eliminatorias, y los **Logros** históricos mundialistas.

4. **Código Documentado (JSDoc)**
   - Todos los componentes, funciones y constantes están estrictamente documentados con sintaxis estándar `JSDoc` para facilitar su entendimiento.

---

## Estructura Modular (Clean Architecture)

El código ha sido separado para evitar un único archivo gigante `App.js`:

```bash
/src/
 ├── components/
 │   ├── AnimatedSplash.js  # Orquesta la línea de tiempo de la intro
 │   ├── DetailModal.js     # Modal de pestañas inferiores
 │   ├── HomeScreen.js      # Interfaz y dashboard principal
 │   └── InfoCard.js        # Tarjeta reutilizable con iconos
 └── styles/
     └── theme.js           # Variables unificadas: colores, sombras, radios
App.js                      # Enrutador simple basado en estados
```

---

## Guía Paso a Paso para Levantar el Proyecto

Sigue estos pasos para ejecutar la aplicación en tu entorno local:

### 1. Requisitos Previos

- Tener instalado [Node.js](https://nodejs.org/) (versión 18+ recomendada).
- Tener instalada la aplicación **Expo Go** en tu dispositivo físico (disponible en iOS App Store y Google Play Store).

### 2. Instalación de Dependencias

Abre una terminal en la raíz del proyecto (la carpeta donde se encuentra este `README.md` y el archivo `package.json`) y ejecuta:

```bash
npm install
```

_(Esto instalará dependencias clave como `expo`, `react-native`, y `react-native-svg` utilizada para los gráficos circulares)._

### 3. Iniciar el Servidor de Desarrollo (Metro Bundler)

Una vez instaladas las dependencias, arranca el servidor local de Expo con el siguiente comando:

```bash
npx expo start -c
```

_El flag `-c` limpia la caché para asegurar que no haya conflictos con builds antiguos._

### 4. Ejecutar la App en tu Teléfono (Expo Go)

1. El comando anterior generará un **código QR** en tu terminal (y a menudo abrirá una ventana en tu navegador mostrando el mismo QR).
2. **Si usas Android:** Abre la aplicación **Expo Go** y escanea el código QR desde la app.
3. **Si usas iOS:** Abre la aplicación nativa de **Cámara** del iPhone, escanea el código QR y selecciona abrir en Expo Go.
4. Espera a que el bundle de Javascript se empaquete y descargue en tu dispositivo. ¡Disfruta de las animaciones!

---

## Notas sobre Tecnologías Utilizadas

- No se utilizaron motores pesados como `GSAP` debido a que React Native no procesa un DOM tradicional web. En su lugar, se utilizó la API `Animated` nativa y la propiedad `useNativeDriver: true` (donde era aplicable) garantizando que las animaciones de Splash Screen alcancen los **60 Frames Por Segundo (FPS)** liberando carga del hilo de Javascript.
- Se ha incluido `.claude/` en el `.gitignore` para prevenir subidas de archivos temporales del agente desarrollador al repositorio.
