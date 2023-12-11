import { ReactNode, createContext, useContext, useState } from "react";

const GlobalContext = createContext<any>({})

interface GlobalProviderProps {
    children: ReactNode;
}

export function GlobalProvider({ children }: GlobalProviderProps) {
    const [modal0, setModal0] = useState<JSX.Element | null>(null);
    const [modal1, setModal1] = useState<JSX.Element | null>(null);

    function setModal(id: number, element: JSX.Element) {
        if (id === 0) {
            document.body.style.overflow = "hidden"
            setModal0(element)
        } else if (id === 1) {
            document.body.style.overflow = "hidden"
            setModal1(element)
        }
    }

    function removeModal(id: number) {
        if (id === 0) {
            document.body.style.overflow = "auto"
            setModal0(null)
        } else if (id === 1) {
            document.body.style.overflow = "auto"
            setModal1(null)
        }
    }


    const value = {
        modal0,
        modal1,
        setModal,
        removeModal
    }

    return (
        <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
    )
}

export const useGlobalContext = () => useContext(GlobalContext);