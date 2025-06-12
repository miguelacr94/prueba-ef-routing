export type RootStackParamList = {
  SplashScreen: undefined;
  BaseHome: undefined;
  LaunchPastScreen: undefined;
  LaunchFutureScreen: undefined;

  // ... otras rutas
  RequestDetailScreen: {
    serviceId: string;
    serviceData: any; // O usa una interfaz específica para serviceData
  };
};
