import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Animated, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

interface ProfessionalEmptyStateProps {
  title?: string;
  subtitle?: string;
  description?: string;
  onRefresh?: () => void;
  onExplore?: () => void;
  refreshText?: string;
  exploreText?: string;
  showRefreshButton?: boolean;
  showExploreButton?: boolean;
  icon?: string;
}

const EmptyStateScreen: React.FC<ProfessionalEmptyStateProps> = ({
  title = 'No hay lanzamientos disponibles',
  subtitle = '¡El espacio está tranquilo hoy!',
  description = 'Parece que no hay misiones programadas en este momento. Esto es inusual, pero puede suceder.',
  onRefresh,
  onExplore,
  refreshText = 'Actualizar',
  exploreText = 'Explorar histórico',
  showRefreshButton = true,
  showExploreButton = true,
  icon = '🚀',
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  const floatAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const starsAnim = useRef([
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0),
  ]).current;

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
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();

    // Animación flotante para el icono principal
    const floatAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: 1,
          duration: 3000,
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 3000,
          useNativeDriver: true,
        }),
      ])
    );

    // Animación de pulso para elementos de fondo
    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    );

    // Animaciones escalonadas para las estrellas
    const starAnimations = starsAnim.map((anim, index) =>
      Animated.loop(
        Animated.sequence([
          Animated.delay(index * 500),
          Animated.timing(anim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(anim, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      )
    );

    floatAnimation.start();
    pulseAnimation.start();
    starAnimations.forEach((animation) => animation.start());

    return () => {
      floatAnimation.stop();
      pulseAnimation.stop();
      starAnimations.forEach((animation) => animation.stop());
    };
  }, [fadeAnim, scaleAnim, floatAnim, pulseAnim, starsAnim]);

  const floatTranslate = floatAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -10],
  });

  const handleRefresh = (): void => {
    if (onRefresh) {
      onRefresh();
    }
  };

  const handleExplore = (): void => {
    if (onExplore) {
      onExplore();
    }
  };

  return (
    <View className="relative flex-1 items-center justify-center bg-gray-900 px-6">
      {/* Elementos de fondo - estrellas animadas */}
      <View className="absolute h-full w-full">
        {starsAnim.map((anim, index) => (
          <Animated.View
            key={index}
            className="absolute h-1 w-1 rounded-full bg-white"
            style={[
              {
                top: height * (0.2 + index * 0.15),
                left: width * (0.1 + index * 0.2),
                opacity: anim,
              },
            ]}
          />
        ))}

        {/* Círculos de fondo */}
        <Animated.View
          className="absolute h-40 w-40 rounded-full bg-blue-500/5"
          style={{
            top: height * 0.1,
            right: width * 0.1,
            transform: [{ scale: pulseAnim }],
          }}
        />
        <Animated.View
          className="absolute h-24 w-24 rounded-full bg-purple-500/5"
          style={{
            bottom: height * 0.15,
            left: width * 0.15,
            transform: [{ scale: pulseAnim }],
          }}
        />
      </View>

      <Animated.View
        className="max-w-sm items-center"
        style={{
          opacity: fadeAnim,
          transform: [{ scale: scaleAnim }],
        }}>
        {/* Icono principal flotante */}
        <View className="relative mb-8">
          <Animated.View
            className="h-32 w-32 items-center justify-center rounded-full border-2 border-gray-700 bg-gray-800"
            style={{
              transform: [{ translateY: floatTranslate }],
            }}>
            <Text className="text-6xl">{icon}</Text>
          </Animated.View>

          {/* Círculo de fondo con pulso */}
          <Animated.View
            className="absolute -inset-4 -z-10 rounded-full bg-gray-700/20"
            style={{ transform: [{ scale: pulseAnim }] }}
          />

          {/* Pequeñas estrellas alrededor */}
          <View className="absolute -right-2 -top-2">
            <Text className="text-sm">✨</Text>
          </View>
          <View className="absolute -bottom-2 -left-2">
            <Text className="text-xs">⭐</Text>
          </View>
        </View>

        {/* Título principal */}
        <Text className="mb-3 text-center text-2xl font-bold text-white">{subtitle}</Text>

        {/* Subtítulo */}
        <Text className="mb-6 text-center text-lg text-gray-300">{title}</Text>

        {/* Descripción */}
        <Text className="mb-8 text-center text-sm leading-6 text-gray-400">{description}</Text>

        {/* Sugerencias útiles */}
        <View className="mb-8 w-full rounded-lg border border-gray-700 bg-gray-800/50 p-4">
          <Text className="mb-2 text-center text-sm font-medium text-gray-300">
            💡 Mientras tanto puedes:
          </Text>
          <Text className="text-center text-xs leading-4 text-gray-400">
            • Revisar lanzamientos anteriores{'\n'}• Explorar misiones históricas{'\n'}• Configurar
            notificaciones
          </Text>
        </View>

        {/* Botones de acción */}
        <View className="w-full space-y-3">
          {showRefreshButton && onRefresh && (
            <TouchableOpacity
              className="rounded-full bg-blue-500 px-8 py-4 shadow-lg active:bg-blue-600"
              onPress={handleRefresh}
              activeOpacity={0.8}>
              <View className="flex-row items-center justify-center">
                <Text className="mr-2 text-base font-semibold text-white">{refreshText}</Text>
                <Text className="text-lg">🔄</Text>
              </View>
            </TouchableOpacity>
          )}

          {showExploreButton && onExplore && (
            <TouchableOpacity
              className="rounded-full bg-gray-700 px-8 py-4 active:bg-gray-600"
              onPress={handleExplore}
              activeOpacity={0.8}>
              <View className="flex-row items-center justify-center">
                <Text className="mr-2 text-base font-medium text-gray-200">{exploreText}</Text>
                <Text className="text-lg">📚</Text>
              </View>
            </TouchableOpacity>
          )}
        </View>

        {/* Indicadores de estado */}
        <View className="mt-8 flex-row space-x-2">
          <View className="h-2 w-2 rounded-full bg-gray-600" />
          <View className="h-2 w-2 rounded-full bg-gray-600" />
          <View className="h-2 w-2 rounded-full bg-blue-500" />
        </View>

        {/* Texto de ayuda pequeño */}
        <Text className="mt-4 text-center text-xs text-gray-500">
          Los datos se actualizan automáticamente cada hora
        </Text>
      </Animated.View>
    </View>
  );
};

export default EmptyStateScreen;
