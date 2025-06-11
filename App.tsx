import './global.css';
import { NavigationContainer } from '@react-navigation/native';
import { View } from 'react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Routes from 'source/navigation/routes';

export default function App() {
  const queryClient = new QueryClient();
  return (
    <View className="flex-1 items-center justify-center">
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <Routes />
        </NavigationContainer>
      </QueryClientProvider>
    </View>
  );
}
