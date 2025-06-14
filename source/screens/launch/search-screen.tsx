import { View, FlatList, Text } from 'react-native';
import { useLaunchSearch } from '../../hooks/use-launches-search';
import LoaderScreen from '../../components/ui/loader-screen';
import ErrorScreen from '../../components/ui/error-screen';
import EmptyStateScreen from '../../components/ui/empity-state-screen';
import { SearchHeader } from '../../components/launch/header-search-launches';
import LaunchCard from '../../components/launch/launch-card';
import type { Launch } from '../../types/launchTypes';
import useLaunches from '../../hooks/query/use-launches';
const SearchLaunchScreen = () => {
  const { launchData, isLoadingLaunch, isLaunchError, launchError } = useLaunches();
  const {
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    sortOrder,
    setSortOrder,
    filterOptions,
    filteredLaunches,
    totalResults,
  } = useLaunchSearch(launchData || []);

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
      <View className="bg-gray-900 px-4 pb-2 pt-6">
        <SearchHeader
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
          statusOptions={filterOptions.status}
          sortOptions={filterOptions.sort}
          totalResults={totalResults}
        />
      </View>

      <FlatList<Launch>
        data={filteredLaunches}
        renderItem={({ item }) => <LaunchCard item={item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingTop: 16, paddingBottom: 40, paddingHorizontal: 4 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View className="items-center justify-center py-10">
            <Text className="text-white">No se encontraron lanzamientos</Text>
          </View>
        }
      />
    </View>
  );
};

export default SearchLaunchScreen;
