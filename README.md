Descripción
XSpace es una aplicación móvil desarrollada con React Native y Expo que permite previsualizar por medio de consultas los lanzamientos pasados y proxismos a lanzarse, al igual que permite realizar una vista detallada de cada lanzamiento, que cohete y en que plataforma fue lanzada y adicional si fueron exitosos o fallidos. Desarrollada con un stack moderno para garantizar rendimiento y mantenibilidad.

Instalación
Prerrequisitos:

Node.js v23+

npm v9+

Expo CLI (npm install -g expo-cli)

Clonar repositorio:

bash
git clone https://github.com/miguelacr94/prueba-ef-routing && cd xspace-app  

Instalar dependencias:

bash
npm install  


Configurar variables de entorno (crear .env):

text
API_URL=tu_url_base_api  


Enlace de repositorio de API 
bash
git clone https://github.com/miguelacr94/api-ef-rounting && cd miguel 


se recomienda trabajar con version 18 ya que parte de las librerias con las que fue desarrollada la api son versiones antiguas.



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
components/  
/src  
├── api/  
├── screens/  
├── navigation/  
├── hooks/  
├── services/  
└── utils/  



Testing
Instalar dependencias:

bash
npm install --save-dev jest @testing-library/react-native  
Ejecutar pruebas: por el momento no existe una version funcional para esta version de react

bash
npm test  

vista previa de caputuras y videos de App

https://drive.google.com/drive/folders/11uUy_3c5Aewb6cC6ctKl00vfAeqyOwn3?usp=drive_link



Licencia
MIT © 2025 Miguel Contreras
