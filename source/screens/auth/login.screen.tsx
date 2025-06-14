import { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Button,
} from 'react-native';
import { Formik } from 'formik';

import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { Ionicons } from '@expo/vector-icons';
import { z } from 'zod';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { RootStackParamList } from '../../types/navigationType';
import Input from '../../components/ui/Input';
import ButtonUi from '../../components/ui/buttom';

interface LoginProps {
  email: string;
  password: string;
}

type NavigationProp = StackNavigationProp<RootStackParamList>;

const LoginScreen = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const navigation = useNavigation<NavigationProp>();

  const validationSchema = z.object({
    email: z
      .string({
        required_error: 'Debes escribir el correo del cliente',
      })
      .email({
        message: 'Debes escribir un correo válido',
      }),
    password: z
      .string({
        required_error: 'La contraseña es requerida',
      })
      .min(6, 'La contraseña debe tener al menos 6 caracteres'),
  });

  const onSubmit = async (values: LoginProps) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigation.navigate('BaseTabHome');
    }, 2000);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-slate-900">
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        className="flex-1">
        {/* Header con logo y título */}
        <View className="px-6 pb-8 pt-16">
          <View className="mb-8 items-center">
            {/* Logo */}
            <View className="mb-6 h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-700 shadow-lg shadow-blue-500/25">
              <Ionicons name="rocket" size={32} color="#ffffff" />
            </View>

            {/* Título */}
            <Text className="mb-2 text-4xl font-bold text-white">Bienvenido</Text>
            <Text className="text-center text-base text-slate-400">
              Inicia sesión para explorar el universo SpaceX
            </Text>
          </View>
        </View>

        {/* Formulario */}
        <View className="flex-1 px-6">
          <View className="rounded-3xl border border-slate-700/50 bg-slate-800/50 p-6 shadow-xl backdrop-blur-sm">
            <Formik
              initialValues={{ email: '', password: '' }}
              validationSchema={toFormikValidationSchema(validationSchema)}
              onSubmit={onSubmit}
              validateOnBlur={true}
              validateOnChange={true}>
              {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                <View className="space-y-6">
                  {/* Campo email */}
                  <View>
                    <Text className="mb-2 ml-1 text-sm font-medium text-slate-300">
                      Correo electrónico
                    </Text>
                    <View className="relative">
                      <View className="absolute left-4 top-4 z-10">
                        <Ionicons name="mail-outline" size={20} color="#94a3b8" />
                      </View>
                      <Input
                        placeholder="tu@email.com"
                        onChangeText={handleChange('email')}
                        onBlur={handleBlur('email')}
                        value={values.email}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoComplete="email"
                        error={touched.email ? errors.email : undefined}
                        className="h-14 rounded-xl border-slate-600 bg-slate-700/50 pl-12 text-white placeholder-slate-400"
                      />
                    </View>
                  </View>

                  {/* Campo contraseña */}
                  <View>
                    <Text className="mb-2 ml-1 text-sm font-medium text-slate-300">Contraseña</Text>
                    <View className="relative">
                      <View className="absolute left-4 top-4 z-10">
                        <Ionicons name="lock-closed-outline" size={20} color="#94a3b8" />
                      </View>
                      <Input
                        placeholder="Tu contraseña"
                        onChangeText={handleChange('password')}
                        onBlur={handleBlur('password')}
                        value={values.password}
                        secureTextEntry={!showPassword}
                        autoComplete="password"
                        error={touched.password ? errors.password : undefined}
                        className="h-14 rounded-xl border-slate-600 bg-slate-700/50 pl-12 pr-12 text-white placeholder-slate-400"
                      />
                      <TouchableOpacity
                        onPress={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-4">
                        <Ionicons
                          name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                          size={20}
                          color="#94a3b8"
                        />
                      </TouchableOpacity>
                    </View>
                  </View>

                  {/* Enlace "Olvidé mi contraseña" */}
                  <TouchableOpacity className="self-end">
                    <Text className="text-sm font-medium text-blue-400">
                      ¿Olvidaste tu contraseña?
                    </Text>
                  </TouchableOpacity>

                  {/* Botón de inicio de sesión */}
                  <View className="pt-4">
                    <ButtonUi
                      title="Iniciar Sesión"
                      isLoading={isLoading}
                      disabled={isLoading}
                      onPress={() => handleSubmit()}
                    />
                    {/* <Button title="dsd" onPress={()=>handleSubmit()} /> */}
                  </View>
                </View>
              )}
            </Formik>
          </View>
        </View>

        {/* Decoración de fondo */}
        <View className="absolute left-0 right-0 top-0 h-40 bg-gradient-to-b from-blue-500/10 to-transparent" />
        <View className="absolute right-8 top-20">
          <View className="h-2 w-2 rounded-full bg-blue-300 opacity-60" />
        </View>
        <View className="absolute left-12 top-32">
          <View className="h-1 w-1 rounded-full bg-white opacity-70" />
        </View>
        <View className="absolute right-16 top-48">
          <View className="h-1.5 w-1.5 rounded-full bg-blue-200 opacity-50" />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
