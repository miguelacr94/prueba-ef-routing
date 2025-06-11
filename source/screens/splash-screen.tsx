import { useEffect } from 'react';
import { Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from 'source/types/navigationType';

type NavigationProp = StackNavigationProp<RootStackParamList>;

const SplashScreen = () => {
  const navigation = useNavigation<NavigationProp>();

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('LaunchPastScreen');
    }, 5000);
  }, []);

  return (
    <View className="h-20 w-full flex-1 items-center justify-center bg-red-400">
      <Text>dsdsdsds</Text>
    </View>
  );
};

export default SplashScreen;
