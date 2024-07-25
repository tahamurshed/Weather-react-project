import { createContext, useContext, useState } from "react";
let LoaderContext = createContext({});

export function LoaderProvider({ children }) {
  const [openLoader, setOpenLoader] = useState(false);
  return (
    <LoaderContext.Provider value={{ openLoader, setOpenLoader }}>
      {children}
    </LoaderContext.Provider>
  );
}

export const useLoader = () => {
  return useContext(LoaderContext);
};
