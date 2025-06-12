export interface FilterOption {
  label: string;  // El texto que se mostrará en la interfaz
  value: string;  // El valor interno que se usará para la lógica de filtrado
}

export interface SearchHeaderProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  statusFilter: string;
  setStatusFilter: (filter: string) => void;
  sortOrder: string;
  setSortOrder: (order: string) => void;
  statusOptions: FilterOption[];
  sortOptions: FilterOption[];
  totalResults: number;
}