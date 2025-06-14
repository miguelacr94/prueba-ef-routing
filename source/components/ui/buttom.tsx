import { Fontisto, Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, View, ActivityIndicator } from 'react-native';

interface ButtonUiProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  icon?: string;
  type?: 'ionicIcon' | 'fontIsto';
  width?: 'full' | 'auto' | number;
  top?: number;
  backgroundColor?: string;
  iconSize?: number;
  isLoading?: boolean;
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const ButtonUi = ({
  title,
  onPress,
  disabled = false,
  icon,
  type = 'ionicIcon',
  top = 20,
  backgroundColor,
  iconSize,
  isLoading = false,
  variant = 'primary',
  size = 'md',
  width = 'full',
  className = '',
}: ButtonUiProps) => {
  // Configuración de variantes
  const getVariantClasses = () => {
    const baseClasses = 'rounded-2xl shadow-lg active:opacity-80';

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

  const getTextClasses = () => {
    const textColor = variant === 'outline' ? 'text-blue-600' : 'text-white';

    switch (size) {
      case 'sm':
        return `text-sm ${textColor}`;
      case 'md':
        return `text-base ${textColor}`;
      case 'lg':
        return `text-lg ${textColor}`;
      default:
        return `text-base ${textColor}`;
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
    const size = getIconSize();

    if (type === 'ionicIcon' && icon) {
      return <Ionicons name={icon as any} size={size} color={iconColor} />;
    } else if (type === 'fontIsto' && icon) {
      return <Fontisto name={icon as any} size={size} color={iconColor} />;
    }
    return null;
  };

  const widthClass = width === 'full' ? 'w-full' : width === 'auto' ? 'w-auto' : '';
  const widthStyle = typeof width === 'number' ? { width } : {};

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      disabled={disabled || isLoading}
      accessibilityLabel={title}
      className={`
        ${widthClass}
        ${getVariantClasses()}
        ${getSizeClasses()}
        mt-[${top}px]
        items-center
        justify-center
        ${disabled || isLoading ? 'opacity-60' : 'opacity-100'}
        ${className}
      `}
      style={[widthStyle, backgroundColor ? { backgroundColor } : {}]}>
      <View className="flex-row items-center space-x-2">
        {icon && !isLoading && <View className="mr-2">{renderIcon()}</View>}

        {isLoading ? (
          <View className="flex-row items-center space-x-2">
            <ActivityIndicator
              color={variant === 'outline' ? '#2563eb' : '#ffffff'}
              size={size === 'sm' ? 'small' : 'small'}
            />
            {title && <Text className={`${getTextClasses()} font-semibold`}>{title}</Text>}
          </View>
        ) : (
          <Text className={`${getTextClasses()} font-semibold`}>{title}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default ButtonUi;
