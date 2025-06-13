import LaunchCard from 'components/launch/launch-card';
import React from 'react';
import { Text, View, FlatList } from 'react-native';
import useLaunch from 'source/hooks/query/use-past-launch';
import type { Launch } from 'source/types/launchTypes';

const PastLaunchScreen = () => {
  const { launchData, isLoadingLaunch, isLaunchError, launchError } = useLaunch();

  if (isLoadingLaunch) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-900">
        <Text className="text-lg text-white">Cargando lanzamientos...</Text>
      </View>
    );
  }

  if (isLaunchError) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-900">
        <Text className="text-lg text-red-500">
          Error: {launchError?.message || 'Error al cargar los lanzamientos'}
        </Text>
      </View>
    );
  }

  if (!launchData || launchData.length === 0) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-900">
        <Text className="text-lg text-white">No hay datos de lanzamientos</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-900">
      {/* Header fijo */}
      <View className="bg-gray-900 px-4 pb-2 pt-6">
        <Text className="text-3xl font-bold text-white">Historial de pasados lanzamientos</Text>
        <Text className="mt-1 text-sm text-gray-400">{launchData.length} misiones registradas</Text>
      </View>

      {/* FlatList sin header */}
      <FlatList<Launch>
        data={launchData}
        renderItem={({ item }) => <LaunchCard item={item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingTop: 16, paddingBottom: 40, paddingHorizontal: 4 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default PastLaunchScreen;
