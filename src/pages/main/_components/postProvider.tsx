import { useState, createContext, useContext, ReactNode} from "react";
const PostsContext = createContext<any | undefined>(undefined);

export const PostsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [refetch, setRefetch] = useState<boolean>(false);
  
    return (
      <PostsContext.Provider value={{refetch, setRefetch}}>
        {children}
      </PostsContext.Provider>
    );
  };
  
  export const usePosts = () => {
    const context = useContext(PostsContext);
    if (!context) {
      throw new Error('usePosts must be used within a PostsProvider');
    }
    return context;
  };
  