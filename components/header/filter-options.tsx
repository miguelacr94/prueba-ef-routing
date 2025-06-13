import { Ionicons } from '@expo/vector-icons';
import React, { useRef, useState } from 'react';
import { TouchableOpacity, View, Text, Pressable } from 'react-native';
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
  const [activeSection, setActiveSection] = useState<'status' | 'sort' | null>(null);

  const openFilterSheet = () => {
    actionSheetRef.current?.show();
  };

  const closeFilterSheet = () => {
    actionSheetRef.current?.hide();
    setActiveSection(null);
  };

  const handleFilterSelection = (
    option: FilterOption,
    setter: (value: string) => void,
    type: 'status' | 'sort'
  ) => {
    setter(option.value);
    setActiveSection(type);

    // Auto-close after a brief delay for better UX
    setTimeout(() => {
      closeFilterSheet();
    }, 300);
  };

  const renderFilterButton = (
    options: FilterOption[],
    currentValue: string,
    setter: (value: 'newest' | 'oldest' | any) => void,
    variant: 'status' | 'sort' = 'status'
  ) => {
    const colorScheme = {
      status: {
        primary: 'bg-emerald-500',
        primaryShadow: 'shadow-emerald-500/30',
        accent: 'bg-emerald-400',
        gradientFrom: 'from-emerald-500',
        gradientTo: 'to-emerald-600',
      },
      sort: {
        primary: 'bg-indigo-500',
        primaryShadow: 'shadow-indigo-500/30',
        accent: 'bg-indigo-400',
        gradientFrom: 'from-indigo-500',
        gradientTo: 'to-indigo-600',
      },
    };

    const colors = colorScheme[variant];

    return (
      <View className="mt-4 flex-row flex-wrap gap-3">
        {options.map((option) => {
          const isActive = currentValue === option.value;

          return (
            <Pressable
              key={option.value}
              onPress={() => handleFilterSelection(option, setter, variant)}
              className={`
                min-w-[80px] items-center justify-center rounded-2xl px-5 py-3
                ${
                  isActive
                    ? `${colors.primary} ${colors.primaryShadow} shadow-lg`
                    : 'border border-slate-600/50 bg-slate-700/70 active:bg-slate-600/80'
                }
              `}
              style={{
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: isActive ? 0.4 : 0,
                shadowRadius: 12,
                elevation: isActive ? 12 : 3,
              }}>
              {({ pressed }) => (
                <>
                  <Text
                    className={`
                      text-center text-sm font-bold tracking-wide
                      ${isActive ? 'text-white' : pressed ? 'text-slate-200' : 'text-slate-300'}
                    `}>
                    {option.label}
                  </Text>
                  {isActive && (
                    <View className="absolute -right-1 -top-1">
                      <View className="rounded-full bg-white p-1">
                        <Ionicons
                          name="checkmark"
                          size={12}
                          color={variant === 'status' ? '#10b981' : '#6366f1'}
                        />
                      </View>
                    </View>
                  )}
                </>
              )}
            </Pressable>
          );
        })}
      </View>
    );
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (statusFilter !== 'all') count++;
    if (sortOrder !== 'newest') count++; // Asumiendo que 'newest' es el default
    return count;
  };

  const activeFiltersCount = getActiveFiltersCount();

  return (
    <>
      {/* Filter Button with Badge */}
      <TouchableOpacity
        onPress={openFilterSheet}
        className="relative h-10 w-10 flex-row items-center justify-center rounded-xl border border-slate-700/60 bg-slate-800/80 active:bg-slate-700/90"
        style={{
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 3,
        }}>
        <Ionicons color={'white'} name="options" size={24} />

        {/* Active Filters Badge */}
        {activeFiltersCount > 0 && (
          <View className="absolute -right-2 -top-2 h-5 min-w-[20px] items-center justify-center rounded-full bg-orange-500 px-1">
            <Text className="text-xs font-bold text-white">{activeFiltersCount}</Text>
          </View>
        )}
      </TouchableOpacity>

      {/* Action Sheet */}
      <ActionSheet
        ref={actionSheetRef}
        containerStyle={{
          backgroundColor: '#1e293b',
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
        }}
        indicatorStyle={{
          backgroundColor: '#64748b',
          width: 60,
          height: 5,
          borderRadius: 3,
        }}
        gestureEnabled={true}
        closable={true}>
        <View className="px-6 py-8 pb-10">
          {/* Header */}
          <View className="mb-6 flex-row items-center justify-between">
            <View className="flex-row items-center">
              <View className="mr-3 rounded-full bg-slate-700/60 p-2">
                <Ionicons name="filter" size={20} color="white" />
              </View>
              <Text className="text-2xl font-bold text-white">Filtros</Text>
            </View>

            <TouchableOpacity
              onPress={closeFilterSheet}
              className="rounded-full bg-slate-700/60 p-2 active:bg-slate-600/80">
              <Ionicons name="close" size={20} color="white" />
            </TouchableOpacity>
          </View>

          <View className="space-y-8">
            {/* Status Filter Section */}
            <View>
              <View className="mb-2 flex-row items-center">
                <View className="mr-3 rounded-lg bg-emerald-500/20 p-2">
                  <Ionicons name="flag" size={16} color="#10b981" />
                </View>
                <Text className="text-xl font-bold text-white">Estado</Text>
                <View className="ml-3 h-2 w-2 rounded-full bg-emerald-400" />
              </View>
              <Text className="mb-1 ml-11 text-slate-400">
                Filtra las misiones por su estado actual
              </Text>
              {renderFilterButton(statusOptions, statusFilter, setStatusFilter)}
            </View>

            {/* Divider */}
            <View className="mx-4 my-4 h-px bg-slate-700/60" />

            {/* Sort Filter Section */}
            <View className="">
              <View className="mb-2 flex-row items-center">
                <View className="mr-3 rounded-lg bg-indigo-500/20 p-2">
                  <Ionicons name="swap-vertical" size={16} color="#6366f1" />
                </View>
                <Text className="text-xl font-bold text-white">Ordenar</Text>
                <View className="ml-3 h-2 w-2 rounded-full bg-indigo-400" />
              </View>
              <Text className="mb-1 ml-11 text-slate-400">
                Organiza los resultados según tu preferencia
              </Text>
              {renderFilterButton(sortOptions, sortOrder, setSortOrder, 'sort')}
            </View>
          </View>

          {/* Footer Actions */}
          {activeFiltersCount > 0 && (
            <View className="mt-8 border-t border-slate-700/60 pt-6">
              <TouchableOpacity
                onPress={() => {
                  setStatusFilter('all');
                  setSortOrder('newest');
                  setActiveSection(null);
                }}
                className="flex-row items-center justify-center rounded-2xl bg-slate-700/60 px-6 py-4 active:bg-slate-600/80">
                <Ionicons name="refresh" size={18} color="#f1f5f9" />
                <Text className="ml-2 font-semibold text-slate-200">Limpiar filtros</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ActionSheet>
    </>
  );
};

export default FilterOptionSheet;
