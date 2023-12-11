import { ReactNode, createContext, useContext, useEffect, useState } from "react";

const TimerContext = createContext<any>({})

const i_endTime = Number(localStorage.getItem('savedEndTime')) || new Date("Dec 31, 2100 00:00:00").getTime()

interface TimerProviderProps {
    children: ReactNode;
}


export function TimerProvider({ children }: TimerProviderProps) {
    const [endTime, setEndTime] = useState<number>(i_endTime)

    const [isExpired, setIsExpired] = useState<boolean>(false)

    // const [percentageCompleted, setPercentageCompleted] = useState<number>(0)

    const [days, setDays] = useState<number>(0)
    const [hours, setHours] = useState<number>(0)
    const [minutes, setMinutes] = useState<number>(0)
    const [seconds, setSeconds] = useState<number>(0)


    useEffect(() => {

        const interval = setInterval(() => {

            const now = new Date().getTime()

            const distance = endTime - now;

            if (distance < 0) {
                setIsExpired(true)
                clearInterval(interval);
            } else if (isExpired) {
                setIsExpired(false)
            }


            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            setDays(days)
            setHours(hours)
            setMinutes(minutes)
            setSeconds(seconds)


        }, 1000)

        return () => {
            clearInterval(interval)
        }
    }, [endTime])


    const changeEndTimeFromString = (time: string): void => {
        const newEndTime = new Date(time).getTime()
        setEndTime(newEndTime)
        localStorage.setItem('savedEndTime', newEndTime.toString())
    }



    const value = {
        endTime,
        setEndTime,
        changeEndTimeFromString,
        isExpired,
        days,
        hours,
        minutes,
        seconds
    }

    return (
        <TimerContext.Provider value={value}>{children}</TimerContext.Provider>
    )
}

export const useTimerContext = () => useContext(TimerContext);