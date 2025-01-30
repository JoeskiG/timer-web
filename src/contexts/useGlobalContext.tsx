import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { BACKGROUND_MODES, CONSTANTS } from "../util/constants";
import { getSavedBackground, saveBackground } from "../util/util";

const GlobalContext = createContext<any>({})

const i_savedBackground = getSavedBackground()

var i_showCurrentDate = localStorage.getItem('showCurrentDate')
const i_globalBottomPadding = localStorage.getItem('savedBottomPadding') ? Number(localStorage.getItem('savedBottomPadding')) : CONSTANTS.defaults.settings.globalBottomPadding
const i_globalZoom = localStorage.getItem('savedZoom') ? Number(localStorage.getItem('savedZoom')) : CONSTANTS.defaults.settings.globalZoom

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

    const [globalBottomPadding, setGlobalBottomPadding] = useState<number | null>(i_globalBottomPadding)
    const [globalZoom, setGlobalZoom] = useState<number | null>(i_globalZoom)

    function updateGlobalBottomPadding(value: number) {
        if (value > window.innerHeight || value < 0) {
            return
        }

        setGlobalBottomPadding(value)
        localStorage.setItem('savedBottomPadding', value.toString())
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

        if (typeof globalZoom === 'number') {
            document.body.style.zoom = `${globalZoom || 100}%`;
        }


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

    function updateGlobalZoom(value: number) {
        setGlobalZoom(value)
        document.body.style.zoom = `${value || 100}%`;
        localStorage.setItem('savedZoom', value.toString())
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

        globalZoom,
        updateGlobalZoom,

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

export const useGlobalContext = (() => useContext(GlobalContext)) as () => {
    modal0: JSX.Element;
    modal1: JSX.Element;
    modal2: JSX.Element;
    backgroundSettings: any;
    removeModal: (id: number) => void;
    updateBackground: (newBackground: any) => void;
    setModal: (id: number, element: JSX.Element) => void,
    backgroundMode: BACKGROUND_MODES,
    showCurrentDate: boolean,
    toggleShowCurrentDate: () => boolean,
    globalBottomPadding: number | null,
    updateGlobalBottomPadding: (value: number) => void;
    globalZoom: number;
    isMobile: boolean;
    updateGlobalZoom: (value: number) => void;

};