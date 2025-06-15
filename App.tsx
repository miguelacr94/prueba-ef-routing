import './global.css';
import {  View } from 'react-native';
import Routes from './source/navigation/routes';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SheetProvider } from 'react-native-actions-sheet';

export default function App() {
 const queryClient = new QueryClient();

  return (
    <View className="flex-1 items-center justify-center bg-red-400">
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