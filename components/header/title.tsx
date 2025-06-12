import React from 'react';
import { Text, View } from 'react-native';

const Title = ({ 
  title = "Xspace App",
  variant = 'primary',
  className = ''
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'secondary':
        return 'text-xl font-semibold text-gray-700';
      case 'accent':
        return 'text-xl font-bold text-blue-600';
      case 'gradient':
        return 'text-xl font-bold text-transparent bg-gradient-to-r from-blue-600 to-purple-600';
      default:
        return 'text-xl font-bold text-gray-900';
    }
  };

  return (
    <View className={`items-center justify-center py-2  ${className}`}>
      <Text className={`${getVariantClasses()} tracking-tight text-white`}>
        {title}
      </Text>
    </View>
  );
};

export default Title;