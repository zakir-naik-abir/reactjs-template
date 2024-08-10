import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosPublic from "./useAxiosPublic"

const useItem = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();

  const { data: items = [], isLoading, refetch } = useQuery({
    queryKey: ['items', user?.email],
    queryFn: async() =>{
      const { data } = await axiosPublic.get(`/items`);
      return data
    }
  })
  return [items, isLoading, refetch]
};

export default useItem;
