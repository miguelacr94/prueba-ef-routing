import { Launch } from './launchTypes';

export type RootStackParamList = {
  SplashScreen: undefined;
  BaseHome: undefined;
  LaunchPastScreen: undefined;
  LaunchFutureScreen: undefined;
  LaunchDetailScreen: {
    LaunchData: Launch;
  };
  LaunchSearchScreen: undefined;
};
