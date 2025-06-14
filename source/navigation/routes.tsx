import { createStackNavigator } from '@react-navigation/stack';
import { View } from 'react-native';
import { BottomTabNavigator } from './tab-navigator';
import { RootStackParamList } from '../types/navigationType';
import SplashScreen from '../screens/splash-screen';
import LoginScreen from '../screens/auth/login.screen';

const Stack = createStackNavigator<RootStackParamList>();

const Routes = () => {
  return (
    <View style={{ flex: 1, backgroundColor: 'white', width: '100%' }}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: 'fade_from_bottom', // Animación por defecto
        }}
        initialRouteName="SplashScreen">
        {/* Pantallas de autenticación */}
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        
        {/* Main App */}
        <Stack.Screen 
          name="BaseTabHome" 
          component={BottomTabNavigator} 
        />
      </Stack.Navigator>
    </View>
  );
};

export default Routes;