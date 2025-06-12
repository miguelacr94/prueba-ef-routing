import { apiClient } from '../config/call-request';
import { Launch } from '../types/launchTypes';

export const launchService = {
  getPastLaunches: async (): Promise<Launch[]> => {
    try {
      const response = await apiClient.get<Launch[]>('/launches/past');
      return response.data;
    } catch (error) {
      console.error('Error fetching past launches:', error);
      throw error;
    }
  },
  getNextLaunches: async (): Promise<Launch[]> => {
    try {
      const response = await apiClient.get<Launch[]>('/launches/next');
      return response.data;
    } catch (error) {
      console.error('Error fetching past launches:', error);
      throw error;
    }
  },

  getAllLaunches: async (): Promise<Launch[]> => {
    try {
      const response = await apiClient.get<Launch[]>('/launches');
      return response.data;
    } catch (error) {
      console.error('Error fetching past launches:', error);
      throw error;
    }
  },

  getLaunchById: async (id: string): Promise<Launch> => {
    try {
      const response = await apiClient.get<Launch>(`/launches/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching launch with id ${id}:`, error);
      throw error;
    }
  },

  getRecentLaunches: async (limit: number = 5): Promise<Launch[]> => {
    try {
      const response = await apiClient.get<Launch[]>('/launches/past');
      const sortedLaunches = response.data
        .sort((a, b) => new Date(b.date_utc).getTime() - new Date(a.date_utc).getTime())
        .slice(0, limit);
      return sortedLaunches;
    } catch (error) {
      console.error('Error fetching recent launches:', error);
      throw error;
    }
  },

  getFailedLaunches: async (): Promise<Launch[]> => {
    try {
      const response = await apiClient.get<Launch[]>('/launches/past');
      const failedLaunches = response.data.filter((launch) => !launch.success);
      return failedLaunches;
    } catch (error) {
      console.error('Error fetching failed launches:', error);
      throw error;
    }
  },

  getSuccessfulLaunches: async (): Promise<Launch[]> => {
    try {
      const response = await apiClient.get<Launch[]>('/launches/past');
      const successfulLaunches = response.data.filter((launch) => launch.success);
      return successfulLaunches;
    } catch (error) {
      console.error('Error fetching successful launches:', error);
      throw error;
    }
  },

  getLaunchesByDateRange: async (startDate: string, endDate: string): Promise<Launch[]> => {
    try {
      const response = await apiClient.get<Launch[]>('/launches/past');
      const filteredLaunches = response.data.filter((launch) => {
        const launchDate = new Date(launch.date_utc).toISOString().split('T')[0];
        return launchDate >= startDate && launchDate <= endDate;
      });
      return filteredLaunches;
    } catch (error) {
      console.error('Error fetching launches by date range:', error);
      throw error;
    }
  },
};
