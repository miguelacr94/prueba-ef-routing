import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { FilterOption } from '../../types/filtesTypes';
import FilterOptionSheet from './filter-options';

const statusOptions: FilterOption[] = [
  { label: 'Todas', value: 'all' },
  { label: 'Exitosas', value: 'success' },
  { label: 'Fallidas', value: 'failed' },
  { label: 'Próximas', value: 'upcoming' },
];

const sortOptions: FilterOption[] = [
  { label: 'Más recientes', value: 'newest' },
  { label: 'Más antiguas', value: 'oldest' },
];

describe('FilterOptionSheet', () => {
  let statusFilter = 'all';
  let sortOrder = 'newest';
  let searchTerm = '';
  let totalResults = 100;

  const setStatusFilter = jest.fn((val: string) => (statusFilter = val));
  const setSortOrder = jest.fn((val: string) => (sortOrder = val));
  const setSearchTerm = jest.fn((term: string) => (searchTerm = term));

  it('renders filter button and opens sheet on press', async () => {
    const { getByTestId, getByText } = render(
      <FilterOptionSheet
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        statusOptions={statusOptions}
        sortOptions={sortOptions}
        totalResults={totalResults}
      />
    );

    const filterButton = getByTestId('filter-button');
    expect(filterButton).toBeTruthy();

    fireEvent.press(filterButton);

    await waitFor(() => {
      expect(getByText('Filtros')).toBeTruthy();
    });
  });

  it('selects a status filter and closes the sheet', async () => {
    const { getByTestId, getByText } = render(
      <FilterOptionSheet
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        statusOptions={statusOptions}
        sortOptions={sortOptions}
        totalResults={totalResults}
      />
    );

    fireEvent.press(getByTestId('filter-button'));

    const filterOption = await waitFor(() => getByTestId('filter-success'));  // Selección de 'success'
    fireEvent.press(filterOption);

    expect(setStatusFilter).toHaveBeenCalledWith('success');
  });

  it('selects a sort filter and closes the sheet', async () => {
    const { getByTestId } = render(
      <FilterOptionSheet
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        statusOptions={statusOptions}
        sortOptions={sortOptions}
        totalResults={totalResults}
      />
    );

    fireEvent.press(getByTestId('filter-button'));

    const sortOption = await waitFor(() => getByTestId('filter-oldest'));  // Selección de 'oldest'
    fireEvent.press(sortOption);

    expect(setSortOrder).toHaveBeenCalledWith('oldest');
  });

  it('resets filters when pressing reset button', async () => {
    const { getByTestId } = render(
      <FilterOptionSheet
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter="success"
        setStatusFilter={setStatusFilter}
        sortOrder="oldest"
        setSortOrder={setSortOrder}
        statusOptions={statusOptions}
        sortOptions={sortOptions}
        totalResults={totalResults}
      />
    );

    fireEvent.press(getByTestId('filter-button'));

    const resetButton = await waitFor(() => getByTestId('reset-filters-button'));
    fireEvent.press(resetButton);

    expect(setStatusFilter).toHaveBeenCalledWith('all');
    expect(setSortOrder).toHaveBeenCalledWith('newest');
  });
});
