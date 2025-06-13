import { View, FlatList } from 'react-native';
import LaunchCard from 'components/launch/launch-card';
import { Text } from 'react-native';
import useLaunches from 'source/hooks/query/use-launches';
import type { Launch } from 'source/types/launchTypes';
import { useLaunchSearch } from 'source/hooks/use-launches-search';
import { SearchHeader } from 'components/launch/header-search-launches';
import LoaderScreen from 'components/ui/loader-screen';
import ErrorScreen from 'components/ui/error-screen';
import EmptyStateScreen from 'components/ui/empity-state-screen';

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
