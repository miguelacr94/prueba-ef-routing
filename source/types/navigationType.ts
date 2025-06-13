import { Launch } from './launchTypes';

export type RootStackParamList = {
  SplashScreen: undefined;
  LoginScreen:undefined;
  BaseHome: undefined;
  LaunchPastScreen: undefined;
  LaunchFutureScreen: undefined;
  LaunchDetailScreen: {
    LaunchData: Launch;
  };
  LaunchSearchScreen: undefined;

};
