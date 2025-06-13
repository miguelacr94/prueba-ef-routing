import { Fontisto, Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
  Animated,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';

// Crear componentes animados
const AnimatedIonicons = Animated.createAnimatedComponent(Ionicons);
const AnimatedFontisto = Animated.createAnimatedComponent(Fontisto);

interface ButtonUiProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  icon?: string;
  type?: 'ionicIcon' | 'fontIsto';
  width?: number;
  top?: number;
  backgroundColor?: string;
  iconSize?: number;
  isLoading?: boolean;
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

const ButtonUi = ({
  title,
  onPress,
  disabled = false,
  icon,
  type = 'ionicIcon',
  top = 20,
  backgroundColor,
  iconSize = 20,
  isLoading = false,
  variant = 'primary',
  size = 'md',
}: ButtonUiProps) => {
  // Configuración de variantes
  const getVariantClasses = () => {
    const baseClasses = 'rounded-2xl shadow-lg active:scale-95 transition-all duration-200';
    
    switch (variant) {
      case 'primary':
        return `${baseClasses} bg-blue-600 shadow-blue-500/30`;
      case 'secondary':
        return `${baseClasses} bg-gray-600 shadow-gray-500/30`;
      case 'success':
        return `${baseClasses} bg-green-600 shadow-green-500/30`;
      case 'danger':
        return `${baseClasses} bg-red-600 shadow-red-500/30`;
      case 'outline':
        return `${baseClasses} bg-transparent border-2 border-blue-600 shadow-blue-500/20`;
      default:
        return `${baseClasses} bg-blue-600 shadow-blue-500/30`;
    }
  };

  // Configuración de tamaños
  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'h-10 px-4';
      case 'md':
        return 'h-12 px-6';
      case 'lg':
        return 'h-14 px-8';
      default:
        return 'h-12 px-6';
    }
  };

  const getTextSize = () => {
    switch (size) {
      case 'sm':
        return 'text-sm';
      case 'md':
        return 'text-base';
      case 'lg':
        return 'text-lg';
      default:
        return 'text-base';
    }
  };

  const getIconSize = () => {
    switch (size) {
      case 'sm':
        return iconSize || 16;
      case 'md':
        return iconSize || 20;
      case 'lg':
        return iconSize || 24;
      default:
        return iconSize || 20;
    }
  };

  // Renderizar icono
  const renderIcon = () => {
    const iconColor = variant === 'outline' ? '#2563eb' : '#ffffff';
    const currentIconSize = getIconSize();

    if (type === 'ionicIcon' && icon) {
      //@ts-ignore
      return <AnimatedIonicons name={icon} size={currentIconSize} color={iconColor} />;
    } else if (type === 'fontIsto' && icon) {
      //@ts-ignore
      return <AnimatedFontisto name={icon} size={currentIconSize} color={iconColor} />;
    }
    return null;
  };

  const textColor = variant === 'outline' ? 'text-blue-600' : 'text-white';
  const customStyle = backgroundColor ? { backgroundColor } : {};
  const topMargin = `mt-[${top}px]`;

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      disabled={disabled || isLoading}
      accessibilityLabel={title}
      className={`
        w-full
        ${getVariantClasses()}
        ${getSizeClasses()}
        ${topMargin}
        justify-center
        items-center
        ${disabled || isLoading ? 'opacity-50' : 'opacity-100'}
      `}
      style={customStyle}
    >
      {/* Efecto de gradiente sutil */}
      <View className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent rounded-2xl" />
      
      <View className="flex-row justify-center items-center space-x-2">
        {icon && !isLoading && renderIcon()}
        
        <View className="flex-row justify-center items-center">
          {isLoading ? (
            <View className="flex-row items-center space-x-2">
              <ActivityIndicator 
                color={variant === 'outline' ? '#2563eb' : '#ffffff'} 
                size={size === 'sm' ? 'small' : 'small'}
              />
              {title && (
                <Text className={`${getTextSize()} ${textColor} font-semibold`}>
                  {title}
                </Text>
              )}
            </View>
          ) : (
            <Text className={`${getTextSize()} ${textColor} font-semibold text-center`}>
              {title}
            </Text>
          )}
        </View>
      </View>

      {/* Efecto de brillo en hover/press */}
      <View className="absolute inset-0 bg-white/5 rounded-2xl opacity-0 active:opacity-100 transition-opacity duration-150" />
    </TouchableOpacity>
  );
};

export default ButtonUi;