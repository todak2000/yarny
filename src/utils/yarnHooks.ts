import { useQuery, useMutation } from "react-query";
import { createNewYarn, getYarns } from "@/pages/api";

export const useGetDashboardYarnData = () => {
  return useQuery({
    queryKey: ["dashboardYarns"],
    queryFn: async () => {
      try {
                const result = await getYarns();
                return result;
              } catch (error) {
                console.error(error);
                return [];
              }
    },
  });
};


export const useCreateYarn = () => {
  const mutation = useMutation({
    mutationFn: (data: any) =>
    createNewYarn(data)
  });

  const { mutate, data, isError, isLoading, isSuccess, error } = mutation;

  return {
    createNewYarn: (data: any) => mutate(data),
    isError,
    isLoading,
    isSuccess,
    error,
    data,
  };
};
