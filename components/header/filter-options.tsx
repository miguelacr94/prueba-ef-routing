import { Ionicons } from '@expo/vector-icons';
import React, { useRef } from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import ActionSheet, { ActionSheetRef } from 'react-native-actions-sheet';
import { FilterOption, SearchHeaderProps } from 'source/types/filtesTypes';

const FilterOptionSheet = ({
  statusFilter,
  setStatusFilter,
  sortOrder,
  setSortOrder,
  statusOptions,
  sortOptions,
}: SearchHeaderProps) => {
  const actionSheetRef = useRef<ActionSheetRef>(null);

  const openSupportSheet = () => {
    actionSheetRef.current?.show();
  };

  const closeSupportSheet = () => {
    actionSheetRef.current?.hide();
  };

  const handleSupportOption = (option: string) => {
    // Aquí puedes agregar la lógica específica para cada opción
    closeSupportSheet();
  };

  const renderFilterButton = (
    options: FilterOption[],
    currentValue: string,
    setter: (value: string) => void,
    variant: 'status' | 'sort' = 'status'
  ) => (
    <View className="mt-3 flex-row flex-wrap gap-2">
      {options.map((option, index) => {
        const isActive = currentValue === option.value;
        const colorScheme =
          variant === 'status'
            ? {
                active: 'bg-emerald-500 shadow-emerald-500/25',
                inactive: 'bg-slate-700/60 border border-slate-600/40',
              }
            : {
                active: 'bg-indigo-500 shadow-indigo-500/25',
                inactive: 'bg-slate-700/60 border border-slate-600/40',
              };

        return (
          <TouchableOpacity
            key={option.value}
            onPress={() => setter(option.value)}
            className={`
                rounded-xl px-4 py-2.5 shadow-lg
                ${
                  isActive
                    ? `${colorScheme.active} shadow-lg`
                    : `${colorScheme.inactive} active:bg-slate-600/70`
                }
              `}
            style={{
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: isActive ? 0.3 : 0,
              shadowRadius: 8,
              elevation: isActive ? 8 : 2,
            }}>
            <Text
              className={`
                  text-sm font-semibold tracking-wide
                  ${isActive ? 'text-white' : 'text-slate-300'}
                `}>
              {option.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );

  return (
    <>
      <TouchableOpacity style={styles.option} onPress={openSupportSheet}>
        <Ionicons color={'white'} name="options" size={35} />
      </TouchableOpacity>

      <ActionSheet
        ref={actionSheetRef}
        containerStyle={styles.actionSheet}
        indicatorStyle={styles.indicator}
        gestureEnabled={true}
        closable={true}>
        <View style={styles.sheetContainer}>
          <View className="space-y-5">
            {/* Filtro por estado */}
            <View>
              <View className="mb-1 flex-row items-center">
                <Text className="text-lg font-bold text-white">Filtrar por estado</Text>
                <View className="ml-2 h-2 w-2 rounded-full bg-emerald-400" />
              </View>
              <Text className="mb-1 text-sm text-slate-400">
                Selecciona el estado de las misiones
              </Text>
              {renderFilterButton(statusOptions, statusFilter, setStatusFilter, 'status')}
            </View>

            {/* Filtro de ordenamiento */}
            <View>
              <View className="mb-1 flex-row items-center">
                <Text className="text-lg font-bold text-white">Ordenar por</Text>
                <View className="ml-2 h-2 w-2 rounded-full bg-indigo-400" />
              </View>
              <Text className="mb-1 text-sm text-slate-400">
                Organiza los resultados según tu preferencia
              </Text>
              {renderFilterButton(sortOptions, sortOrder, setSortOrder, 'sort')}
            </View>
          </View>
        </View>
      </ActionSheet>
    </>
  );
};

export default FilterOptionSheet;

const styles = StyleSheet.create({
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
  },
  optionText: {
    fontSize: 16,
    marginLeft: 10,
  },
  actionSheet: {
    backgroundColor: '#f8f8f8',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  indicator: {
    backgroundColor: '#ccc',
    width: 50,
  },
  sheetContainer: {
    padding: 20,
    paddingBottom: 30,
  },
  sheetHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
  },
  sheetTitle: {
    fontSize: 20,
    marginLeft: 10,
    color: '#e25b24',
  },
  sheetOption: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e5e5e5',
  },
  sheetOptionText: {
    fontSize: 16,
    color: '#333',
  },
  cancelOption: {
    backgroundColor: '#f8f8f8',
    borderColor: '#f8f8f8',
    marginTop: 10,
  },
  cancelText: {
    color: '#e25b24',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
