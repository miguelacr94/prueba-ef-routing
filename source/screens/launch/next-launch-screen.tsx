import type { Launch } from '../../types/launchTypes';
import useNextLaunch from '../../hooks/query/use-next-launch';
import LoaderScreen from '../../components/ui/loader-screen';
import ErrorScreen from '../../components/ui/error-screen';
import EmptyStateScreen from '../../components/ui/empity-state-screen';
import { FlatList, Text, View } from 'react-native';
import LaunchCard from '../../components/launch/launch-card';

const NextLaunchScreen = () => {
  const { launchData, isLoadingLaunch, isLaunchError, launchError } = useNextLaunch();

  if (isLoadingLaunch) {
    return <LoaderScreen />;
  }

  if (isLaunchError) {
    return <ErrorScreen />;
  }

  if (!launchData || launchData.length === 0) {
    return <EmptyStateScreen />;
  }

  return (
    <View className="flex-1 bg-gray-900">
      <FlatList<Launch>
        data={launchData}
        renderItem={({ item }) => <LaunchCard item={item} />}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <View className="mb-6 px-4 pt-6">
            <Text className="text-3xl font-bold text-white">
              Historial de próximos Lanzamientos{' '}
            </Text>
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
