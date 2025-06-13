import { apiClient } from '../config/call-request';
import { Launch } from '../types/launchTypes';

export const launchService = {
  getPastLaunches: async (): Promise<Launch[]> => {
    try {
      const response = await apiClient.get<Launch[]>('/launches/past');
      console.log(response.data);
      return response.data;
    } catch (error: any) {
      if (error.response) {
        const errorMessage =
          error.response.data?.error?.message ||
          error.response.data?.info ||
          error.response.data?.message ||
          error.response.statusText ||
          `Request failed with status code ${error.response.status}`;
        throw new Error(errorMessage);
      } else if (error.request) {
        throw new Error('No response received from server');
      } else {
        throw new Error(error.message || 'Error setting up request');
      }
    }
  },
  getNextLaunches: async (): Promise<Launch[]> => {
    try {
      const response = await apiClient.get<Launch[]>('/launches/next');
      return response.data;
    } catch (error: any) {
      if (error.response) {
        const errorMessage =
          error.response.data?.error?.message ||
          error.response.data?.info ||
          error.response.data?.message ||
          error.response.statusText ||
          `Request failed with status code ${error.response.status}`;
        throw new Error(errorMessage);
      } else if (error.request) {
        throw new Error('No response received from server');
      } else {
        throw new Error(error.message || 'Error setting up request');
      }
    }
  },

  getAllLaunches: async (): Promise<Launch[]> => {
    try {
      const response = await apiClient.get<Launch[]>('/launches');
      return response.data;
    } catch (error: any) {
      if (error.response) {
        const errorMessage =
          error.response.data?.error?.message ||
          error.response.data?.info ||
          error.response.data?.message ||
          error.response.statusText ||
          `Request failed with status code ${error.response.status}`;
        throw new Error(errorMessage);
      } else if (error.request) {
        throw new Error('No response received from server');
      } else {
        throw new Error(error.message || 'Error setting up request');
      }
    }
  },
};
