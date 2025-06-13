import React, { useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  ActivityIndicator, 
  Animated, 
  Dimensions 
} from 'react-native';

const { width, height } = Dimensions.get('window');

const LoaderScreen = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Animación de entrada
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 5,
        useNativeDriver: true,
      }),
    ]).start();

    // Animación de rotación continua
    const rotateAnimation = Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 3000,
        useNativeDriver: true,
      })
    );

    // Animación de pulso continua
    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );

    rotateAnimation.start();
    pulseAnimation.start();

    return () => {
      rotateAnimation.stop();
      pulseAnimation.stop();
    };
  }, []);

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View className="flex-1 bg-gray-900 justify-center items-center relative">
      {/* Elementos de fondo animados */}
      <View className="absolute w-full h-full">
        <Animated.View 
          className="absolute w-2 h-2 bg-blue-400 rounded-full"
          style={{
            top: height * 0.2,
            left: width * 0.15,
            opacity: pulseAnim
          }}
        />
        <Animated.View 
          className="absolute w-1 h-1 bg-purple-400 rounded-full"
          style={{
            top: height * 0.7,
            right: width * 0.2,
            opacity: pulseAnim
          }}
        />
        <Animated.View 
          className="absolute w-1.5 h-1.5 bg-white rounded-full"
          style={{
            top: height * 0.3,
            right: width * 0.25,
            opacity: pulseAnim
          }}
        />
      </View>

      <Animated.View 
        className="items-center p-8"
        style={{
          opacity: fadeAnim,
          transform: [{ scale: scaleAnim }]
        }}
      >
        {/* Círculo principal con efecto de halo */}
        <View className="relative mb-8">
          <Animated.View 
            className="absolute w-32 h-32 bg-blue-500 rounded-full opacity-20 -top-2 -left-2"
            style={{ transform: [{ scale: pulseAnim }] }}
          />
          
          {/* Círculo rotatorio */}
          <Animated.View 
            className="w-28 h-28 rounded-full border-4 border-blue-400 justify-center items-center"
            style={{
              transform: [{ rotate: spin }],
              borderTopColor: '#A855F7'
            }}
          >
            <View className="w-20 h-20 rounded-full bg-blue-500/10 justify-center items-center">
              <Text className="text-3xl">🚀</Text>
            </View>
          </Animated.View>
        </View>

        {/* Texto principal */}
        <Text className="text-2xl font-bold text-white mb-4 text-center">
          Cargando lanzamientos
        </Text>
        
        {/* Subtexto */}
        <Text className="text-sm text-gray-400 text-center mb-8 max-w-xs leading-5">
          Preparando los datos de las próximas misiones espaciales...
        </Text>

        {/* Barra de progreso animada */}
        <View className="w-48 h-1 bg-gray-700 rounded-full overflow-hidden mb-6">
          <Animated.View 
            className="h-full bg-blue-400 rounded-full"
            style={{ transform: [{ scaleX: pulseAnim }] }}
          />
        </View>

        {/* Spinner nativo */}
        <View className="flex-row items-center mt-4">
          <ActivityIndicator size="small" color="#60A5FA" />
          <Text className="text-gray-400 text-xs ml-2">
            Sincronizando datos...
          </Text>
        </View>
      </Animated.View>
    </View>
  );
};

export default LoaderScreen;