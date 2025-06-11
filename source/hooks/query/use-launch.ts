import { useQuery } from "@tanstack/react-query";
import { Launch } from "../../types/launchTypes";
import { launchService } from "../../services/launch-service";

const useLaunch = () => {
  const {
    isLoading: isLoadingLaunch,
    refetch,
    isError: isLaunchError,
    error: launchError,
    data: launchData,
  } = useQuery<Launch[], Error>({
    queryKey: ["get-past-launches"],
    queryFn: async () => {
      try {
        return await launchService.getPastLaunches();
      } catch (error) {
        throw new Error(
          error instanceof Error ? error.message : "Failed to fetch launches"
        );
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

export default useLaunch;
