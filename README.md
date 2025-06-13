Descripción
XSpace es una aplicación móvil desarrollada con React Native y Expo que permite [breve descripción de la funcionalidad principal]. Desarrollada con un stack moderno para garantizar rendimiento y mantenibilidad.

Instalación
Prerrequisitos:

Node.js v18+

npm v9+

Expo CLI (npm install -g expo-cli)

Clonar repositorio:

bash
git clone [repo-url] && cd xspace-app  



Instalar dependencias:

bash
npm install  


Configurar variables de entorno (crear .env):

text
API_BASE_URL=tu_url_base_api  
API_KEY=tu_api_key  


Comandos útiles
npm start: Servidor de desarrollo

npm run android: Ejecutar en Android

npm run ios: Ejecutar en iOS

npm run web: Versión web

npm run prebuild: Configuración nativa

npm run lint: Verificar calidad de código

npm run format: Formatear código automáticamente



Arquitectura
Stack principal:

Expo (^53.0.11)

React Native (0.79.3)

React (19.0.0)

NativeWind (Tailwind para RN)

React Navigation

React Query (Manejo de estado)

Formik + Zod (Formularios)



Estructura de carpetas:

text
/src  
├── api/  
├── components/  
├── screens/  
├── navigation/  
├── hooks/  
├── services/  
└── utils/  



Testing
Instalar dependencias:

bash
npm install --save-dev jest @testing-library/react-native  
Ejecutar pruebas:

bash
npm test  


Licencia
MIT © 2023 [Miguel Contreras]