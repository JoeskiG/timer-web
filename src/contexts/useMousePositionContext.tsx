import { ReactNode, createContext, useContext, useEffect, useState } from "react";

const MousePositionContext = createContext<any>({})


interface MousePositionProviderProps {
    children: ReactNode;
}

export interface IMousePosition {
    x: number,
    y: number
}

export function MousePositionProvider({ children }: MousePositionProviderProps) {

    const [mousePosition, setMousePosition] = useState<IMousePosition>({ x: 0, y: 0 })

    useEffect(() => {
        const updateMousePosition = (ev: any) => {
            setMousePosition({ x: ev.clientX, y: ev.clientY });
        }

        window.addEventListener('mousemove', updateMousePosition);
        return () => {
            window.removeEventListener('mousemove', updateMousePosition);
        };

    }, [])


    const value = {
        mousePosition
    }

    return (
        <MousePositionContext.Provider value={value}>{children}</MousePositionContext.Provider>
    )
}

export const useMousePositionContext = () => useContext(MousePositionContext);