import { Fontisto, Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
  Animated,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

// Crear el componente animado para Ionicons
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
}

const ButtonUi = ({
  title,
  onPress,
  disabled = false,
  icon,
  type = 'ionicIcon', // Default to IonicIcon if not specified
  top = 20, // Default top margin
  backgroundColor = '#707070', // Default background color
  iconSize = 20, // Default icon size
  isLoading = false,
}: ButtonUiProps) => {
  // Decide what icon to render based on the type
  const renderIcon = () => {
    if (type === 'ionicIcon' && icon) {
      //@ts-ignore
      return <AnimatedIonicons name={icon} size={iconSize} color="#fff" />;
    } else if (type === 'fontIsto' && icon) {
      //@ts-ignore
      return <AnimatedFontisto name={icon} size={iconSize} color="#fff" />;
    }
    return null;
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      disabled={disabled || isLoading}
      accessibilityLabel={title}
      style={[
        styles.touchable,
        {
          opacity: disabled ? 0.5 : 1,
          marginTop: top,
          backgroundColor: backgroundColor,
        },
      ]} // Adjust opacity for disabled state
    >
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          marginHorizontal: 'auto',
          height: 45,
        }}>
        {renderIcon()}

        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          {isLoading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.buttonText}>{title}</Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  touchable: {
    width: '100%',
    borderRadius: 20,
    height: 45,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 'auto',
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    fontWeight: '500',
    marginLeft: 10, // Add space between icon and text
  },
});

export default ButtonUi;
