import { FlatList, Text } from 'react-native';
import EmptyStateScreen from '../../components/ui/empity-state-screen';
import ErrorScreen from '../../components/ui/error-screen';
import LoaderScreen from '../../components/ui/loader-screen';
import type { Launch } from '../../types/launchTypes';
import { View } from 'react-native';
import LaunchCard from '../../components/launch/launch-card';
import usePastLaunch from '../../hooks/query/use-past-launch';

const PastLaunchScreen = () => {
  const { launchData, isLoadingLaunch, isLaunchError } = usePastLaunch();

  if (isLoadingLaunch) {
    return <LoaderScreen />;
  }

  // if (isLaunchError) {
  //   return <ErrorScreen />;
  // }

  // if (!launchData || launchData.length === 0) {
  //   return <EmptyStateScreen />;
  // }

  return (
    <View className="flex-1 bg-gray-900">
      <View className="bg-gray-900 px-4 pb-2 pt-6">
        <Text className="text-3xl font-bold text-white">Historial de pasados lanzamientos</Text>
        <Text className="mt-1 text-sm text-gray-400">{launchData?.length} misiones registradas</Text>
      </View>

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
