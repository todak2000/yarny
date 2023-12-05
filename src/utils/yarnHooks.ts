import { useQuery } from "react-query";
import { getYarns } from "@/pages/api";
// Define the query key and the query function for the yarns data

export const useGetDashboardYarnData = () => {
    return useQuery("dashboardYarns", async () => {
      try {
        const result = await getYarns();
        return result;
      } catch (error) {
        console.error(error);
        return [];
      }
    });
  };
  
 