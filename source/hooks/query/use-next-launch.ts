import { useQuery } from '@tanstack/react-query';
import { Launch } from '../../types/launchTypes';
import { launchService } from '../../services/launch-service';

const useNextLaunch = () => {
  const {
    isLoading: isLoadingLaunch,
    refetch,
    isError: isLaunchError,
    error: launchError,
    data: launchData,
  } = useQuery<Launch[], Error>({
    queryKey: ['get-next-launches'],
    queryFn: async () => {
      try {
        const allLaunches = await launchService.getNextLaunches();
        return allLaunches;
      } catch (error) {
        throw new Error(error instanceof Error ? error.message : 'Failed to fetch launches');
      }
    },
    retry: false,
  });

  return {
    isLoadingLaunch,
    launchData,
    isLaunchError,
    launchError,
    refetch,
  };
};

export default useNextLaunch;
