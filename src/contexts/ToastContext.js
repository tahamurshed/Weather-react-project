import { createContext, useContext, useState } from "react";
export let ToastContext = createContext(null);
export function ToastProvider({ children }) {
  const [openToast, setOpenToast] = useState(false);
  const [message, setMessage] = useState(" المدينة غير موجودة");
  return (
    <ToastContext.Provider
      value={{ openToast, setOpenToast, message, setMessage }}
    >
      {children}
    </ToastContext.Provider>
  );
}

export const useToast = () => {
  return useContext(ToastContext);
};
