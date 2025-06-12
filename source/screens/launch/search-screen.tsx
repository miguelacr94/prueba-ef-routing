import { View, FlatList } from 'react-native';
import LaunchCard from 'components/launch/launch-card';
import { Text } from 'react-native';
import useLaunches from 'source/hooks/query/use-launches';
import type { Launch } from 'source/types/launchTypes';
import { useLaunchSearch } from 'source/hooks/use-launches-search';
import { SearchHeader } from 'components/launch/header-search-launches';

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
      <View className="px-4 pt-6 pb-2 bg-gray-900">
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
      
      {/* FlatList sin header */}
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