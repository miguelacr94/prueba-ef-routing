import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Animated, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

interface ErrorObject {
  message?: string;
  code?: string | number;
  details?: string;
}

interface ProfessionalErrorScreenProps {
  error?: ErrorObject | Error | null;
  onRetry?: () => void;
  onReportIssue?: () => void;
  title?: string;
  subtitle?: string;
  showReportButton?: boolean;
}

const ErrorScreen: React.FC<ProfessionalErrorScreenProps> = ({
  error,
  onRetry,
  onReportIssue,
  title = 'Error al cargar los lanzamientos',
  subtitle = '¡Oops! Algo salió mal',
  showReportButton = true,
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  const shakeAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Animación de entrada
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();

    // Animación de shake sutil para el icono
    const shakeAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(shakeAnim, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnim, {
          toValue: -1,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnim, {
          toValue: 0,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.delay(3000),
      ])
    );

    // Animación de pulso para elementos de fondo
    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.2,
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

    shakeAnimation.start();
    pulseAnimation.start();

    return () => {
      shakeAnimation.stop();
      pulseAnimation.stop();
    };
  }, [fadeAnim, scaleAnim, shakeAnim, pulseAnim]);

  const shakeTranslate = shakeAnim.interpolate({
    inputRange: [-1, 1],
    outputRange: [-2, 2],
  });

  const getErrorMessage = (): string => {
    if (!error) return 'Error desconocido';

    if (error instanceof Error) {
      return error.message;
    }

    if (typeof error === 'object' && error.message) {
      return error.message;
    }

    return 'Ha ocurrido un error inesperado';
  };

  const handleRetry = (): void => {
    if (onRetry) {
      onRetry();
    }
  };

  const handleReportIssue = (): void => {
    if (onReportIssue) {
      onReportIssue();
    } else {
      // Comportamiento por defecto
      console.log('Reportar problema:', getErrorMessage());
    }
  };

  return (
    <View className="relative flex-1 items-center justify-center bg-gray-900 px-6">
      {/* Icono de error animado */}
      <View className="relative mb-8">
        <View className="mb-4 h-24 w-24 items-center justify-center rounded-full bg-red-500/20">
          <Animated.View style={{ transform: [{ translateX: shakeTranslate }] }}>
            <Text className="text-5xl">⚠️</Text>
          </Animated.View>
        </View>
      </View>

      {/* Título del error */}
      <Text className="mb-4 text-center text-2xl font-bold text-white">{subtitle}</Text>

      {/* Subtítulo */}
      <Text className="mb-6 text-center text-lg text-gray-300">{title}</Text>

      {/* Mensaje de error detallado */}
      {error && (
        <View className="mb-8 w-full rounded-lg border border-red-500/30 bg-red-500/10 p-4">
          <Text className="text-center font-mono text-sm text-red-400">{getErrorMessage()}</Text>
          {error instanceof Error && error.stack && __DEV__ && (
            <Text className="mt-2 text-xs text-red-300 opacity-70">
              {error.stack.split('\n')[0]}
            </Text>
          )}
        </View>
      )}

      {/* Mensaje de ayuda */}
      <Text className="mb-8 text-center text-sm leading-5 text-gray-400">
        No te preocupes, esto puede suceder. Revisa tu conexión a internet e intenta nuevamente.
      </Text>

      {/* Botón de reintentar */}
      {onRetry && (
        <TouchableOpacity
          className="mb-4 rounded-full bg-blue-500 px-8 py-4 shadow-lg active:bg-blue-600"
          onPress={handleRetry}
          activeOpacity={0.8}>
          <View className="flex-row items-center">
            <Text className="mr-2 text-base font-semibold text-white">Reintentar</Text>
            <Text className="text-xl">🔄</Text>
          </View>
        </TouchableOpacity>
      )}

      {/* Botón secundario opcional */}
      {showReportButton && (
        <TouchableOpacity
          className="px-6 py-3 active:opacity-70"
          activeOpacity={0.7}
          onPress={handleReportIssue}>
          <Text className="text-sm text-gray-400 underline">Reportar problema</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ErrorScreen;
