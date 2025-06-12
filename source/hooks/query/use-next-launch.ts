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
        const currentDate = new Date();

        const upcoming = allLaunches.filter((launch) => new Date(launch.date_utc) > currentDate);

        return upcoming;
      } catch (error) {
        throw new Error(
          error instanceof Error ? error.message : 'Failed to fetch upcoming launches'
        );
      }
    },
    retry: false,
  });

  return {
    isLoadingLaunch,
    launchData: launchData || [],
    isLaunchError,
    launchError,
    refetch,
  };
};

export default useNextLaunch;
