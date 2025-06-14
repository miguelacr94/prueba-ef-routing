import './global.css';
import { StyleSheet, Text, View } from 'react-native';
import { useEffect, useState } from 'react';
import * as Font from 'expo-font';
import 'react-native-gesture-handler';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NavigationContainer } from '@react-navigation/native';
import { SheetProvider } from 'react-native-actions-sheet';
import Routes from './source/navigation/routes';

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const queryClient = new QueryClient();

  const loadFonts = async () => {
    await Font.loadAsync({
      'Poppins-light': require('./assets/fonts/Poppins/Poppins-Light.ttf'),
      'Poppins-medium': require('./assets/fonts/Poppins/Poppins-Medium.ttf'),
      'Poppins-bold': require('./assets/fonts/Poppins/Poppins-Bold.ttf'),
      'Open-sans': require('./assets/fonts/Open_Sans/OpenSans.ttf'),
      Ionicons: require('@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/Ionicons.ttf'),
      FontAwesome: require('@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/FontAwesome.ttf'),
    });
    setFontsLoaded(true);
  };

  useEffect(() => {
    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return null; // O un componente de carga mientras las fuentes se cargan
  }

  return (
    <View className="flex-1 items-center justify-center">
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <SheetProvider context="global">
            <Routes />
          </SheetProvider>
        </NavigationContainer>
      </QueryClientProvider>
    </View>
  );
}
