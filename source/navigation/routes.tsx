import { createStackNavigator } from '@react-navigation/stack';
import { View } from 'react-native';
import { BottomTabNavigator, SearchLaunchStack } from './tab-navigator';
import { RootStackParamList } from '../types/navigationType';
import SplashScreen from '../screens/splash-screen';
import LoginScreen from 'source/screens/auth/login.screen';

const Stack = createStackNavigator<RootStackParamList>();

const Routes = () => {
  return (
    <View style={{ flex: 1, backgroundColor: 'white', width: '100%' }}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="SplashScreen">
        <Stack.Screen
          name="SplashScreen"
          options={{ animation: 'fade_from_bottom' }}
          component={SplashScreen}
        />
        <Stack.Screen
          name="LoginScreen"
          options={{ animation: 'fade_from_bottom' }}
          component={LoginScreen}
        />
        <Stack.Screen
          name="LaunchPastScreen"
          options={{ animation: 'fade_from_bottom' }}
          component={BottomTabNavigator}
        />

        <Stack.Screen
          name="LaunchSearchScreen"
          options={{ animation: 'fade_from_bottom' }}
          component={SearchLaunchStack}
        />
      </Stack.Navigator>
    </View>
  );
};

export default Routes;
