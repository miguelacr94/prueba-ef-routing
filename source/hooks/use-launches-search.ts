import { useState, useMemo } from 'react';
import type { Launch } from 'source/types/launchTypes';

export const useLaunchSearch = (launches: Launch[]) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'success' | 'failed' | 'upcoming'>(
    'all'
  );
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');

  // Obtener opciones de filtro
  const filterOptions = useMemo(() => {
    return {
      status: [
        { label: 'Todos', value: 'all' },
        { label: 'Exitosos', value: 'success' },
        { label: 'Fallidos', value: 'failed' },
        { label: 'Próximos', value: 'upcoming' },
      ],
      sort: [
        { label: 'Más recientes', value: 'newest' },
        { label: 'Más antiguos', value: 'oldest' },
      ],
    };
  }, []);

  // Filtrar y ordenar los lanzamientos
  const filteredLaunches = useMemo(() => {
    let result = [...launches];

    // Filtro por término de búsqueda
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (launch) =>
          launch.name.toLowerCase().includes(term) ||
          (launch.details && launch.details.toLowerCase().includes(term))
      );
    }

    // Filtro por estado
    if (statusFilter !== 'all') {
      result = result.filter((launch) => {
        if (statusFilter === 'success') return launch.success;
        if (statusFilter === 'failed') return !launch.success && !launch.upcoming;
        if (statusFilter === 'upcoming') return launch.upcoming;
        return true;
      });
    }

    // Ordenamiento
    result.sort((a, b) => {
      const dateA = new Date(a.date_utc).getTime();
      const dateB = new Date(b.date_utc).getTime();
      return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
    });

    return result;
  }, [launches, searchTerm, statusFilter, sortOrder]);

  return {
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    sortOrder,
    setSortOrder,
    filterOptions,
    filteredLaunches,
    totalResults: filteredLaunches.length,
  };
};
