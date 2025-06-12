import FilterOptionSheet from 'components/header/filter-options';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import { FilterOption, SearchHeaderProps } from 'source/types/filtesTypes';

export const SearchHeader = ({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  sortOrder,
  setSortOrder,
  statusOptions,
  sortOptions,
  totalResults,
}: SearchHeaderProps) => {
  

  return (
    <View className="bg-gradient-to-b from-slate-900 to-slate-800">
      {/* Header principal con gradiente sutil */}
      <View className="px-6 pb-6 pt-8">
        {/* Título principal mejorado */}
        <View className="mb-6">
          <Text className="text-4xl font-black tracking-tight text-white">
            Historial de Lanzamientos
          </Text>
          <View className="mt-2 flex-row items-center">
            <View className="h-1 w-12 rounded-full bg-gradient-to-r from-emerald-400 to-indigo-500" />
            <Text className="ml-3 text-base font-medium text-slate-400">
              {totalResults.toLocaleString()} misiones encontradas
            </Text>
          </View>
        </View>
        <View className="flex-row justify-between ">
          <View className="relative mb-6 w-full">
            <TextInput
              className="
              shadow-inner h-14 w-full rounded-2xl border  border-slate-700/50 bg-slate-800/80 px-5
              pr-12 text-base text-white
              placeholder:text-slate-400
            "
              placeholder="🚀 Buscar lanzamientos..."
              placeholderTextColor="#94A3B8"
              value={searchTerm}
              onChangeText={setSearchTerm}
              style={{
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 2,
              }}
            />
            {/* Icono de búsqueda simulado con texto */}
            <View className="absolute right-4 top-1/2 -translate-y-1/2">
              <Text className="text-lg text-slate-400">🔍</Text>
            </View>
          </View>
          <FilterOptionSheet
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            setSortOrder={setSortOrder}
            setStatusFilter={setStatusFilter}
            sortOptions={sortOptions}
            sortOrder={sortOrder}
            statusFilter={statusFilter}
            statusOptions={statusOptions}
            totalResults={totalResults}
          />
        </View>
      </View>

      {/* Separador sutil */}
      <View className="mx-6 h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent" />
    </View>
  );
};
