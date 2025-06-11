import React from 'react';
import { Text, View, FlatList, Image } from 'react-native';
import useLaunch from 'source/hooks/query/use-past-launch';
import { Launch } from 'source/types/launchTypes';

const PastLaunchScreen = () => {
  const { launchData } = useLaunch();
  console.log('lauch', launchData);
  if (!launchData || launchData.length === 0) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-900">
        <Text className="text-lg text-white">No hay datos de lanzamientos</Text>
      </View>
    );
  }

  const renderLaunchItem = ({ item }: { item: Launch }) => (
    <View className="mx-2 mb-3 rounded-lg bg-gray-800 p-4">
      {/* Encabezado */}
      <View className="mb-2 flex-row items-start justify-between">
        <Text className="flex-1 text-xl font-bold text-white">{item.name}</Text>
        <View className={`rounded px-2 py-1 ${item.success ? 'bg-green-900' : 'bg-red-900'}`}>
          <Text className="text-xs text-white">{item.success ? 'ÉXITO' : 'FALLO'}</Text>
        </View>
      </View>

      {/* Fecha y cohete */}
      <Text className="mb-1 text-sm text-gray-400">
        {new Date(item.date_utc).toLocaleDateString()} • {item.rocket}
      </Text>

      {/* Detalles */}
      {item.details && (
        <Text className="mt-1 text-sm text-gray-300" numberOfLines={2}>
          {item.details}
        </Text>
      )}

      {/* Cores */}
      <View className="mt-2">
        <Text className="text-xs text-gray-500">Cores utilizados:</Text>
        <View className="mt-1 flex-row flex-wrap">
          {item.cores.map((core, index) => (
            <View key={index} className="mb-1 mr-1 rounded bg-gray-700 px-2 py-1">
              <Text className="text-xs text-gray-300">{core.core || `Core ${index + 1}`}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );

  return (
    <View className="flex-1 bg-gray-900 pt-2">
      <FlatList
        data={launchData}
        renderItem={renderLaunchItem}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <Text className="mx-4 mb-3 text-2xl font-bold text-white">Historial de Lanzamientos</Text>
        }
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
};

export default PastLaunchScreen;
