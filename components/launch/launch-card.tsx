import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Launch } from 'source/types/launchTypes';

const LaunchCard = ({ item }: { item: Launch }) => {
  return (
    <TouchableOpacity activeOpacity={0.9}>
      <View className="mx-4 mb-6 overflow-hidden rounded-2xl border border-gray-700/50 bg-gradient-to-br from-gray-800 to-gray-900 shadow-2xl">
        {/* Barra de estado superior */}
        <View className="flex-row items-center justify-between bg-black/30 px-4 py-3">
          <View className="flex-row items-center">
            <View
              className={`mr-2 h-2 w-2 rounded-full ${item.success ? 'bg-green-400' : 'bg-red-400'}`}
            />
            <Text className="text-xs font-medium text-gray-300">
              {item.success ? 'MISIÓN EXITOSA' : 'MISIÓN FALLIDA'}
            </Text>
          </View>
          <Text className="text-xs text-gray-400">
            {new Date(item.date_utc).toLocaleDateString('es-ES', {
              day: '2-digit',
              month: 'short',
              year: 'numeric',
            })}
          </Text>
        </View>

        {/* Contenido principal */}
        <View className="p-6">
          {/* Encabezado con icono de cohete */}
          <View className="mb-5 flex-row items-start">
            <View
              className={`mr-4 h-12 w-12 items-center justify-center rounded-full shadow-lg ${
                item.success
                  ? 'bg-gradient-to-br from-green-500 to-green-600'
                  : 'bg-gradient-to-br from-red-500 to-red-600'
              }`}>
              <Text className="text-xl">🚀</Text>
            </View>
            <View className="flex-1">
              <Text className="mb-2 text-xl font-bold leading-tight text-white" numberOfLines={2}>
                {item.name}
              </Text>
              <View className="flex-row items-center">
                <View className="mr-2 h-2 w-2 rounded-full bg-blue-400" />
                <Text className="text-sm font-medium text-blue-300">{item.rocket}</Text>
              </View>
            </View>
          </View>

          {/* Detalles de la misión */}
          {item.details && (
            <View className="mb-5 rounded-xl border-l-4 border-blue-400 bg-gradient-to-r from-gray-700/60 to-gray-600/40 p-4">
              <Text className="mb-2 text-xs font-semibold uppercase tracking-wider text-blue-300">
                📋 DETALLES DE LA MISIÓN
              </Text>
              <Text className="text-sm leading-relaxed text-gray-100" numberOfLines={3}>
                {item.details}
              </Text>
            </View>
          )}

          {/* Información de cores */}
          <View className="mb-4">
            <Text className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-300">
              ⚙️ CORES UTILIZADOS ({item.cores.length})
            </Text>
            <View className="flex-row flex-wrap">
              {item.cores.map((core, index) => (
                <View
                  key={index}
                  className="mb-2 mr-2 flex-row items-center rounded-full bg-gradient-to-r from-gray-600 to-gray-700 px-4 py-2 shadow-md">
                  <View className="mr-2 h-2 w-2 rounded-full bg-orange-400" />
                  <Text className="text-xs font-medium text-gray-100">
                    {core.core || `Core ${index + 1}`}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          {/* Pie de carta con estadísticas rápidas */}
          <View className="-mx-6 flex-row items-center justify-between rounded-b-xl border-t border-gray-600/50 bg-gray-800/30 px-6 py-3 pt-4">
            <View className="flex-row items-center">
              <Text className="text-xs text-gray-400">🔗 ID: </Text>
              <Text className="rounded bg-gray-700/50 px-2 py-1 font-mono text-xs text-gray-300">
                {item.id.slice(0, 8)}...
              </Text>
            </View>
            <View className="flex-row items-center rounded-full bg-gray-700/50 px-3 py-1">
              <Text className="mr-1 text-xs text-gray-400">🕐</Text>
              <Text className="text-xs font-medium text-gray-300">
                {new Date(item.date_utc).toLocaleTimeString('es-ES', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}{' '}
                UTC
              </Text>
            </View>
          </View>
        </View>

        {/* Barra de acento inferior */}
        <View
          className={`shadow-inner h-1.5 ${item.success ? 'bg-gradient-to-r from-green-400 to-green-500' : 'bg-gradient-to-r from-red-400 to-red-500'}`}
        />
      </View>
    </TouchableOpacity>
  );
};

export default LaunchCard;
