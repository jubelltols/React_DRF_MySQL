import React, { useCallback, useState } from "react";

const Context = React.createContext();

export function ToastContextProvider({ children }) {
    const [toast, setToast] = useState(null);

    const addToast = useCallback((message, status, bgColor, textColor, icon) => { setToast({ message, status, bgColor, textColor, icon}) },[])

    const removeToast = useCallback(() => { setToast(null) },[]);

    return (
        <Context.Provider value={{toast, addToast, removeToast}}>
            {children}
        </Context.Provider>
    );
}

export default Context;