import React, { useState, useRef } from 'react';
import { TextInput, TouchableOpacity, View, TextInputProps, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Text } from 'react-native';

type IoniconName = keyof typeof Ionicons.glyphMap;

interface InputProps extends TextInputProps {
  label?: string;
  error?: string | null;
  touched?: boolean;
  icon?: React.ReactNode | IoniconName;
  iconPosition?: 'left' | 'right';
  showPasswordToggle?: boolean;
  className?: string;
  variant?: 'default' | 'outlined' | 'filled';
  size?: 'sm' | 'md' | 'lg';
  helpText?: string;
  required?: boolean;
  disabled?: boolean;
}

const Input = React.forwardRef<TextInput, InputProps>(
  (
    {
      label,
      value,
      onChangeText,
      onBlur,
      secureTextEntry,
      error,
      touched = false,
      icon,
      iconPosition = 'left',
      showPasswordToggle = false,
      className = '',
      variant = 'default',
      size = 'md',
      helpText,
      required = false,
      disabled = false,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [hasValue, setHasValue] = useState(!!value);

    // Animaciones
    const labelAnimation = useRef(new Animated.Value(value ? 1 : 0)).current;
    const borderAnimation = useRef(new Animated.Value(0)).current;
    const shakeAnimation = useRef(new Animated.Value(0)).current;

    const handleFocus = () => {
      setIsFocused(true);

      // Animar label hacia arriba
      Animated.timing(labelAnimation, {
        toValue: 1,
        duration: 200,
        useNativeDriver: false,
      }).start();

      // Animar borde
      Animated.timing(borderAnimation, {
        toValue: 1,
        duration: 200,
        useNativeDriver: false,
      }).start();
    };

    const handleBlurLocal = (e: any) => {
      setIsFocused(false);
      setHasValue(!!value);

      // Animar label hacia abajo si no hay valor
      if (!value) {
        Animated.timing(labelAnimation, {
          toValue: 0,
          duration: 200,
          useNativeDriver: false,
        }).start();
      }

      // Animar borde
      Animated.timing(borderAnimation, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start();

      onBlur?.(e);
    };

    const handleChangeText = (text: string) => {
      setHasValue(!!text);
      onChangeText?.(text);

      // Si hay error, hacer shake
      if (error && touched) {
        Animated.sequence([
          Animated.timing(shakeAnimation, {
            toValue: 10,
            duration: 100,
            useNativeDriver: true,
          }),
          Animated.timing(shakeAnimation, {
            toValue: -10,
            duration: 100,
            useNativeDriver: true,
          }),
          Animated.timing(shakeAnimation, {
            toValue: 0,
            duration: 100,
            useNativeDriver: true,
          }),
        ]).start();
      }
    };

    const togglePasswordVisibility = () => setIsPasswordVisible((prev) => !prev);

    // Configuración de tamaños
    const sizeConfig = {
      sm: {
        height: 'h-10',
        text: 'text-sm',
        padding: 'px-3 py-2',
        icon: 16,
      },
      md: {
        height: 'h-12',
        text: 'text-base',
        padding: 'px-4 py-3',
        icon: 20,
      },
      lg: {
        height: 'h-14',
        text: 'text-lg',
        padding: 'px-5 py-4',
        icon: 24,
      },
    };

    const currentSize = sizeConfig[size];

    const renderIcon = (position: 'left' | 'right') => {
      if (!icon || (position !== iconPosition && !(position === 'right' && showPasswordToggle))) {
        return null;
      }

      if (position === 'right' && showPasswordToggle && secureTextEntry) {
        return (
          <TouchableOpacity
            className="absolute right-3 top-1/2 z-10 -translate-y-2.5"
            onPress={togglePasswordVisibility}
            disabled={disabled}>
            <Ionicons
              name={isPasswordVisible ? 'eye-off-outline' : 'eye-outline'}
              size={currentSize.icon}
              color={disabled ? '#9ca3af' : isFocused ? '#3b82f6' : '#6b7280'}
            />
          </TouchableOpacity>
        );
      }

      if (React.isValidElement(icon)) {
        return (
          <View
            className={`absolute ${position === 'left' ? 'left-3' : 'right-3'} top-1/2 z-10 -translate-y-2.5`}>
            {icon}
          </View>
        );
      }

      if (typeof icon === 'string' && position === iconPosition) {
        return (
          <View
            className={`absolute ${position === 'left' ? 'left-3' : 'right-3'} top-1/2 z-10 -translate-y-2.5`}>
            <Ionicons
              name={icon as IoniconName}
              size={currentSize.icon}
              color={disabled ? '#9ca3af' : isFocused ? '#3b82f6' : '#6b7280'}
            />
          </View>
        );
      }

      return null;
    };

    // Clases dinámicas para el input
    const getInputClasses = () => {
      const baseClasses = [
        'flex-1',
        currentSize.text,
        currentSize.padding,
        'text-slate-100',
        'bg-transparent',
        iconPosition === 'left' && icon ? 'pl-10' : '',
        (iconPosition === 'right' && icon) || showPasswordToggle ? 'pr-10' : '',
        disabled ? 'opacity-50' : '',
        className,
      ];

      return baseClasses.filter(Boolean).join(' ');
    };

    // Clases dinámicas para el container
    const getContainerClasses = () => {
      const baseClasses = [
        'w-full',
        'flex-row',
        'items-center',
        'relative',
        'rounded-xl',
        'transition-all',
        'duration-200',
        currentSize.height,
      ];

      // Variantes de estilo
      switch (variant) {
        case 'outlined':
          baseClasses.push(
            'border-2',
            'bg-transparent',
            error && touched ? 'border-red-500' : isFocused ? 'border-blue-500' : 'border-slate-600'
          );
          break;
        case 'filled':
          baseClasses.push(
            'bg-slate-700/50',
            'border-2',
            'border-transparent',
            error && touched
              ? 'border-red-500'
              : isFocused
                ? 'border-blue-500'
                : 'border-transparent'
          );
          break;
        default:
          baseClasses.push(
            'bg-slate-700/50',
            'border',
            error && touched ? 'border-red-500' : isFocused ? 'border-blue-500' : 'border-slate-600'
          );
      }

      if (disabled) {
        baseClasses.push('opacity-60');
      }

      return baseClasses.join(' ');
    };

    // Estilos animados para el borde
    const animatedBorderColor = borderAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: ['transparent', '#3b82f6'],
    });

    return (
      <Animated.View
        className="relative mb-4 w-full"
        style={{
          transform: [{ translateX: shakeAnimation }],
        }}>
        {/* Label flotante */}
        {label && (
          <Animated.View
            className="absolute left-3 z-20 bg-slate-900 px-1"
            style={{
              top: labelAnimation.interpolate({
                inputRange: [0, 1],
                outputRange: [size === 'lg' ? 16 : size === 'md' ? 12 : 8, -8],
              }),
            }}>
            <Animated.Text
              className="font-medium"
              style={{
                fontSize: labelAnimation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [size === 'lg' ? 18 : size === 'md' ? 16 : 14, 12],
                }),
                color: labelAnimation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [
                    disabled ? '#9ca3af' : '#94a3b8',
                    error && touched ? '#ef4444' : isFocused ? '#3b82f6' : '#e2e8f0',
                  ],
                }),
              }}>
              {label}
              {required && <Text className="ml-1 text-red-500">*</Text>}
            </Animated.Text>
          </Animated.View>
        )}

        {/* Container principal */}
        <Animated.View className={getContainerClasses()}>
          {/* Borde animado */}
          <Animated.View
            className="absolute inset-0 rounded-xl border-2"
            style={{
              borderColor: animatedBorderColor,
              opacity: isFocused ? 1 : 0,
            }}
          />

          {renderIcon('left')}

          <TextInput
            ref={ref}
            placeholder={!label ? props.placeholder : ''}
            placeholderTextColor="#94a3b8"
            value={value}
            onChangeText={handleChangeText}
            secureTextEntry={secureTextEntry && !isPasswordVisible}
            className={getInputClasses()}
            onFocus={handleFocus}
            onBlur={handleBlurLocal}
            editable={!disabled}
            selectTextOnFocus={!disabled}
            {...props}
          />

          {renderIcon('right')}
        </Animated.View>

        {/* Texto de ayuda */}
        {helpText && !error && <Text className="ml-1 mt-1 text-xs text-slate-400">{helpText}</Text>}

        {/* Mensaje de error */}
        {error && (
          <View className="ml-1 mt-2 flex-row items-center">
            <Ionicons name="alert-circle" size={12} color="#ef4444" />
            <Text className="ml-1 text-xs font-medium text-red-500">{error}</Text>
          </View>
        )}
      </Animated.View>
    );
  }
);

Input.displayName = 'Input';

export default Input;
