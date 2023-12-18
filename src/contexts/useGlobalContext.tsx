import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { BACKGROUND_MODES, CONSTANTS } from "../util/constants";
import { getSavedBackground, saveBackground } from "../util/util";

const GlobalContext = createContext<any>({})

const i_savedBackground = getSavedBackground()

var i_showCurrentDate = localStorage.getItem('showCurrentDate')

const i_showCurrentDateParsed = i_showCurrentDate ? JSON.parse(i_showCurrentDate) : null


interface GlobalProviderProps {
    children: ReactNode;
}

export function GlobalProvider({ children }: GlobalProviderProps) {
    const [modal0, setModal0] = useState<JSX.Element | null>(null);
    const [modal1, setModal1] = useState<JSX.Element | null>(null);
    const [modal2, setModal2] = useState<JSX.Element | null>(null);

    const [isMobile, setIsMobile] = useState<boolean>(false)

    const [backgroundMode, setBackgroundMode] = useState<BACKGROUND_MODES>(i_savedBackground ? (i_savedBackground.mode) : CONSTANTS.defaults.background.mode)
    const [backgroundSettings, setBackgroundSettings] = useState<any>(i_savedBackground ? (i_savedBackground) : CONSTANTS.defaults.background)

    const [showCurrentDate, setShowCurrentDate] = useState<boolean>(i_showCurrentDateParsed !== null ? i_showCurrentDateParsed : CONSTANTS.defaults.settings.showCurrentDate)

    const [globalBottomPadding, setGlobalBottomPadding] = useState<number | null>(null)

    function updateGlobalBottomPadding(value: number) {
        if (value > window.innerHeight || value < 0) {
            return
        }

        setGlobalBottomPadding(value)
    }

    const handleResize = () => {
        if (window.innerWidth < 1024) {
            setIsMobile(true)
        } else {
            setIsMobile(false)
        }
    }

    useEffect(() => {
        handleResize()
        window.addEventListener("resize", handleResize)


        return () => {
            window.removeEventListener("resize", handleResize)
        }
    }, [])

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
        setBackgroundSettings(newBackground)

        saveBackground(newBackground)
    }

    function toggleShowCurrentDate(): boolean {
        const newShowCurrentDate = !showCurrentDate
        setShowCurrentDate(newShowCurrentDate)

        localStorage.setItem('showCurrentDate', JSON.stringify(newShowCurrentDate))

        return newShowCurrentDate
    }


    const value = {
        isMobile,

        globalBottomPadding,
        updateGlobalBottomPadding,
        
        modal0,
        modal1,
        modal2,
        setModal,
        removeModal,

        backgroundMode,
        backgroundSettings,
        updateBackground,

        showCurrentDate,
        setShowCurrentDate,
        toggleShowCurrentDate
    }

    return (
        <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
    )
}

export const useGlobalContext = () => useContext(GlobalContext);