import { createContext, useContext, ReactNode } from "react";
import { useAppwrite } from "./useAppwrite";
import { getCurrentUser } from "./appwrite";

interface GlobalContextType {
    isLoggedIn: boolean;
    user: User | null | undefined;
    loading: boolean;
    refetch: (newParams?: Record<string, string | number> | undefined) => Promise<void>;
}

interface User {
    $id: string;
    name: string;
    email: string;
    avatar: string;
}


const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

interface GlobalProviderProps {
    children: ReactNode;
}

export const GlobalProvider = ({ children }: GlobalProviderProps) => {

    const {
        data: user,
        loading,
        refetch,
    } = useAppwrite({
        fn: getCurrentUser,

    });

    const isLoggedIn = !!user;

    console.log(JSON.stringify(user, null, 2))

    return (
        <GlobalContext.Provider value={{
            isLoggedIn,
            user,
            loading,
            refetch
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = (): GlobalContextType => {
    const context = useContext(GlobalContext);

    if(!context) {
        throw new Error('useGlobalContext must be used within GlobalProvider');
    }

    return context;
}

export default GlobalProvider;