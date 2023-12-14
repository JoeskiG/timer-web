import { ReactNode, createContext, useContext, useState } from "react";
import { BACKGROUND_MODES, CONSTANTS } from "../util/constants";
import { getSavedBackground } from "../util/util";

const GlobalContext = createContext<any>({})

const i_savedBackground = getSavedBackground()

interface GlobalProviderProps {
    children: ReactNode;
}

export function GlobalProvider({ children }: GlobalProviderProps) {
    const [modal0, setModal0] = useState<JSX.Element | null>(null);
    const [modal1, setModal1] = useState<JSX.Element | null>(null);
    const [modal2, setModal2] = useState<JSX.Element | null>(null);

    const [backgroundMode, setBackgroundMode] = useState<BACKGROUND_MODES>(i_savedBackground ? (i_savedBackground.mode) : CONSTANTS.defaults.background.mode)
    const [backgroundSettings, setBackgroundSettings] = useState<any>(i_savedBackground ? (i_savedBackground.colors) : CONSTANTS.defaults.background.colors)

    function setModal(id: number, element: JSX.Element) {
        if (id === 0) {
            document.body.style.overflow = "hidden"
            setModal0(element)
        } else if (id === 1) {
            document.body.style.overflow = "hidden"
            setModal1(element)
        } else if (id === 2) {
            document.body.style.overflow = "hidden"
            setModal2(element)
        }
    }

    function removeModal(id: number) {
        if (id === 0) {
            document.body.style.overflow = "auto"
            setModal0(null)
        } else if (id === 1) {
            document.body.style.overflow = "auto"
            setModal1(null)
        } else if (id === 2) {
            document.body.style.overflow = "auto"
            setModal2(null)
        }
    }

    function updateBackground(newBackground: any) {
        setBackgroundMode(newBackground.mode)
        setBackgroundSettings(newBackground.colors)
    }


    const value = {
        modal0,
        modal1,
        modal2,
        setModal,
        removeModal,

        backgroundMode,
        backgroundSettings,
        updateBackground
    }

    return (
        <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
    )
}

export const useGlobalContext = () => useContext(GlobalContext);