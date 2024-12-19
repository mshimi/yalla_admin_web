import { useMutation, useQuery, QueryClient } from "@tanstack/react-query";
import { AuthSerivce } from "../service/AuthService";
import { useAppDispatch } from "../../../app/hooks";
import { logout, setAuthenticated } from "../states/AuthSlice";
import USERTYPE from "../types/UserType";
import type User from "../types/User";
import { queryClient } from "../../../main";


const authService = new AuthSerivce();


const tokenStoreKey = 'token';
const refreshTokenStoreKey = 'refreshToken';

export const useAuthQueries = () => {

   const dispatch = useAppDispatch();

   const useAuthCheckQuery = () => useQuery(
    { 
        queryKey: ["authUser"],
        queryFn: async () => {

            const token = localStorage.getItem(tokenStoreKey);

            if(token){
                try {
                    const user = await authService.getCurrentUser();
                    dispatch(setAuthenticated({token, user, userType: getUserType(user.role)}));
                    return user;
                } catch (error) {
                    localStorage.removeItem(tokenStoreKey);
                        dispatch(logout());
                    
                }
            } else {
                // dispatch(logout());
            }
        },
        retry: 0,
       
    },
   

   );

   const useLoginMutation = () =>
    useMutation({
      mutationFn: async ({ email, password }: { email: string; password: string }) =>
        authService.login(email, password),
      onSuccess: (data) => {
        localStorage.setItem(tokenStoreKey, data.token);
        localStorage.setItem(refreshTokenStoreKey, data.refreshToken);
        queryClient.invalidateQueries({ queryKey: ["authUser"] });
      },
      onError: (error) => {
        console.error("Login error", error);
      },
    });

  return {
    useAuthCheckQuery,
    useLoginMutation
  };
};



function getUserType(role:string){
    if(role === 'ADMIN'){
        return USERTYPE.ADMIN
    } else if(role === 'USER'){
        return  USERTYPE.USER;
    } else {
        return USERTYPE.UNKNOWN;
    }
}