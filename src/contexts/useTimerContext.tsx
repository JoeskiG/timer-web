import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { Countdown } from "../util/countdown";
import { makeID } from "../util/util";

const TimerContext = createContext<any>({})

const i_endTime = Number(localStorage.getItem('savedEndTime')) || new Date("Dec 31, 2100 00:00:00").getTime()

interface TimerProviderProps {
    children: ReactNode;
}

interface ICountdown {
    endTime: number,
    id: string
}

export function TimerProvider({ children }: TimerProviderProps) {

    const [countdowns, setCountdowns] = useState<Countdown[]>([])

    function addCountdown(item: Countdown) {
        setCountdowns(prevState => {
            const newState = [...prevState, item]
            return newState
        })

        saveCountdown(item)
    }

    useEffect(() => {

        loadSavedCountdowns()

        const intervalId = setInterval(() => {
            // Update the state based on the current state
            setCountdowns(prevIntervals => [...prevIntervals]);
        }, 1000); // Run the interval every 1000 milliseconds (1 second)

        // Clean up the interval when the component is unmounted
        return () => clearInterval(intervalId);
    }, []);

    function loadSavedCountdowns() {
        var savedCountdowns = localStorage.getItem('savedCountdowns')

        if (savedCountdowns) {
            var savedCountdownsParsed: ICountdown[] = JSON.parse(savedCountdowns)
            const countdownsToAdd: Countdown[] = []
            for (var cd of savedCountdownsParsed) {
                const newCountdown: Countdown = new Countdown(cd.endTime, cd.id)
                countdownsToAdd.push(newCountdown)
            }

            setCountdowns(countdownsToAdd)
        }
    }

    function saveCountdown(item: Countdown) {
        var savedCountdowns = localStorage.getItem('savedCountdowns')

        var savedCountdownsParsed: ICountdown[] = savedCountdowns ? JSON.parse(savedCountdowns) : []
        savedCountdownsParsed.push({
            endTime: item.endTime,
            id: makeID(10)
        })
        localStorage.setItem('savedCountdowns', JSON.stringify(savedCountdownsParsed))
    }

    function deleteCountdown(id: string) {
        var savedCountdowns = localStorage.getItem('savedCountdowns')

        if (!savedCountdowns) {
            return
        }

        var savedCountdownsParsed: ICountdown[] = JSON.parse(savedCountdowns)

        const foundCountdownIndex = savedCountdownsParsed.findIndex(cd => cd.id === id)
        if (typeof foundCountdownIndex !== 'undefined') {
            savedCountdownsParsed.splice(foundCountdownIndex, 1)
            setCountdowns(prevState => {
                const newState = [...prevState]
                const deleteIndex = newState.findIndex(cd => cd.id === id)
                newState.splice(deleteIndex, 1)
                return newState
            })

            localStorage.setItem('savedCountdowns', JSON.stringify(savedCountdownsParsed))
        }
    }




    const value = {
        countdowns,
        setCountdowns,
        addCountdown,
        deleteCountdown
    }

    return (
        <TimerContext.Provider value={value}>{children}</TimerContext.Provider>
    )
}

export const useTimerContext = () => useContext(TimerContext);