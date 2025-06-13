import { useEffect, useRef } from 'react';
import { Text, View, Animated, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from 'source/types/navigationType';
import { Ionicons } from '@expo/vector-icons';

type NavigationProp = StackNavigationProp<RootStackParamList>;

const SplashScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.3)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 100,
          friction: 8,
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();

    const timer = setTimeout(() => {
      navigation.navigate('LoginScreen');
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View className="relative flex-1 overflow-hidden bg-slate-900">
      <View className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900" />

      <View className="absolute left-10 top-20">
        <View className="h-1 w-1 rounded-full bg-white opacity-80" />
      </View>
      <View className="absolute right-16 top-32">
        <View className="h-1.5 w-1.5 rounded-full bg-blue-300 opacity-60" />
      </View>
      <View className="absolute left-20 top-48">
        <View className="h-1 w-1 rounded-full bg-white opacity-70" />
      </View>
      <View className="absolute right-8 top-64">
        <View className="h-1 w-1 rounded-full bg-blue-200 opacity-50" />
      </View>
      <View className="absolute bottom-40 left-8">
        <View className="h-1.5 w-1.5 rounded-full bg-white opacity-90" />
      </View>
      <View className="absolute bottom-32 right-12">
        <View className="h-1 w-1 rounded-full bg-blue-100 opacity-60" />
      </View>

      {/* Contenido principal */}
      <View className="flex-1 items-center justify-center px-8">
        {/* Icono de cohete animado */}
        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          }}
          className="mb-8">
          <View className="h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-700 shadow-lg shadow-blue-500/25">
            <Ionicons name="rocket" size={40} color="#ffffff" />
          </View>
        </Animated.View>

        {/* Título principal */}
        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          }}
          className="mb-4">
          <Text className="mb-2 text-center text-5xl font-bold text-white">
            Space<Text className="text-blue-400">X</Text>
          </Text>
        </Animated.View>

        {/* Subtítulo */}
        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          }}
          className="mb-12">
          <Text className="text-center text-lg font-medium text-slate-300">
            Explore the Future of Space
          </Text>
        </Animated.View>

        <Animated.View style={{ opacity: fadeAnim }} className="absolute bottom-20">
          <View className="flex-row items-center space-x-2">
            <View className="h-2 w-2 animate-pulse rounded-full bg-blue-400" />

            <View
              className="h-2 w-2 animate-pulse rounded-full bg-blue-400"
              /* @ts-ignore */
              style={{ animationDelay: '0.2s' }}
            />
            <View
              className="h-2 w-2 animate-pulse rounded-full bg-blue-400"
              /* @ts-ignore */
              style={{ animationDelay: '0.4s' }}
            />
          </View>
        </Animated.View>
      </View>

      {/* Efecto de brillo sutil */}
      <View className="absolute left-0 right-0 top-0 h-32 bg-gradient-to-b from-blue-500/10 to-transparent" />
    </View>
  );
};

export default SplashScreen;
