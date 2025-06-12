import LaunchCard from 'components/launch/launch-card';
import { Text, View, FlatList } from 'react-native';
import useNextLaunch from 'source/hooks/query/use-next-launch';
import type { Launch } from 'source/types/launchTypes';

const NextLaunchScreen = () => {
  const { launchData, isLoadingLaunch, isLaunchError, launchError } = useNextLaunch();

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
        <Text className="text-lg text-white">No hay datos de próximos lanzamientos</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-900">
      <FlatList<Launch>
        data={launchData}
        renderItem={({ item }) => <LaunchCard item={item} />}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <View className="mb-6 px-4 pt-6">
            <Text className="text-3xl font-bold text-white">Historial de Lanzamientos pasados</Text>
            <Text className="mt-1 text-sm text-gray-400">
              {launchData.length} misiones registradas
            </Text>
          </View>
        }
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default NextLaunchScreen;
