import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { Countdown } from "../util/countdown";
import { makeID } from "../util/util";
import { Timer } from "../util/timer";
import { WorldClock } from "../util/worldClock";

const TimerContext = createContext<any>({})

interface TimerProviderProps {
    children: ReactNode;
}

interface ICountdown {
    endTime: number,
    id: string
}

interface IWorldClock {
    timezone: string,
    id: string
}


export function TimerProvider({ children }: TimerProviderProps) {

    const [countdowns, setCountdowns] = useState<Countdown[]>([])
    const [timers, setTimers] = useState<Timer[]>([])
    const [worldClocks, setWorldClocks] = useState<WorldClock[]>([])

    function addCountdown(item: Countdown) {
        setCountdowns(prevState => {
            const newState = [...prevState, item]
            return newState
        })

        saveCountdown(item)
    }

    function addTimer(item: Timer) {
        setTimers(prevState => {
            const newState = [...prevState, item]
            return newState
        })

        saveTimer(item)
    }

    function addWorldClock(item: WorldClock) {
        setWorldClocks(prevState => {
            const newState = [...prevState, item]
            return newState
        })

        saveWorldClock(item)
    }

    useEffect(() => {

        loadSavedTimers()
        loadSavedCountdowns()
        loadSavedWorldClocks()

        const intervalId = setInterval(() => {
            // Update the state based on the current state
            setCountdowns(prevIntervals => [...prevIntervals]);
            setTimers(prevIntervals => [...prevIntervals]);
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

    function loadSavedTimers() {
        var savedTimers = localStorage.getItem('savedTimers')

        if (savedTimers) {
            var savedTimersParsed: ICountdown[] = JSON.parse(savedTimers)
            const timersToAdd: Timer[] = []
            for (var cd of savedTimersParsed) {
                const newTimer: Timer = new Timer(undefined, cd.endTime, cd.id)
                timersToAdd.push(newTimer)
            }

            setTimers(timersToAdd)
        }
    }

    function loadSavedWorldClocks() {
        var savedTimers = localStorage.getItem('savedWorldClocks')

        if (savedTimers) {
            var savedTimersParsed: IWorldClock[] = JSON.parse(savedTimers)
            const timersToAdd: WorldClock[] = []
            for (var cd of savedTimersParsed) {
                const newTimer: WorldClock = new WorldClock(cd.timezone, cd.id)
                timersToAdd.push(newTimer)
            }

            setWorldClocks(timersToAdd)
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

    function saveTimer(item: Timer) {
        var savedTimers = localStorage.getItem('savedTimers')

        var savedTimersParsed: ICountdown[] = savedTimers ? JSON.parse(savedTimers) : []
        savedTimersParsed.push({
            endTime: item.endTime,
            id: makeID(10)
        })
        localStorage.setItem('savedTimers', JSON.stringify(savedTimersParsed))
    }

    function saveWorldClock(item: WorldClock) {
        var savedTimers = localStorage.getItem('savedWorldClocks')

        var savedTimersParsed: IWorldClock[] = savedTimers ? JSON.parse(savedTimers) : []
        savedTimersParsed.push({
            timezone: item.timezone,
            id: makeID(10)
        })
        localStorage.setItem('savedWorldClocks', JSON.stringify(savedTimersParsed))
    }

    function deleteCountdown(id: string) {
        setCountdowns(prevState => {
            const newState = [...prevState]
            const deleteIndex = newState.findIndex(cd => cd.id === id)
            newState.splice(deleteIndex, 1)
            return newState
        })


        var savedCountdowns = localStorage.getItem('savedCountdowns')

        if (!savedCountdowns) {
            return
        }

        var savedCountdownsParsed: ICountdown[] = JSON.parse(savedCountdowns)

        const foundCountdownIndex = savedCountdownsParsed.findIndex(cd => cd.id === id)
        if (typeof foundCountdownIndex !== 'undefined') {
            savedCountdownsParsed.splice(foundCountdownIndex, 1)
            

            localStorage.setItem('savedCountdowns', JSON.stringify(savedCountdownsParsed))
        }
    }

    function deleteTimer(id: string) {
        setTimers(prevState => {
            const newState = [...prevState]
            const deleteIndex = newState.findIndex(tmr => tmr.id === id)
            newState.splice(deleteIndex, 1)
            return newState
        })

        var savedTimers = localStorage.getItem('savedTimers')

        if (!savedTimers) {
            return
        }

        var savedTimersParsed: ICountdown[] = JSON.parse(savedTimers)

        const foundTimerIndex = savedTimersParsed.findIndex(tmr => tmr.id === id)
        if (typeof foundTimerIndex !== 'undefined') {
            savedTimersParsed.splice(foundTimerIndex, 1)
            

            localStorage.setItem('savedTimers', JSON.stringify(savedTimersParsed))
        }
    }

    function deleteWorldClock(id: string) {
        setWorldClocks(prevState => {
            const newState = [...prevState]
            const deleteIndex = newState.findIndex(tmr => tmr.id === id)
            newState.splice(deleteIndex, 1)
            return newState
        })

        var savedTimers = localStorage.getItem('savedWorldClocks')

        if (!savedTimers) {
            return
        }

        var savedTimersParsed: IWorldClock[] = JSON.parse(savedTimers)

        const foundTimerIndex = savedTimersParsed.findIndex(tmr => tmr.id === id)
        if (typeof foundTimerIndex !== 'undefined') {
            savedTimersParsed.splice(foundTimerIndex, 1)
            

            localStorage.setItem('savedWorldClocks', JSON.stringify(savedTimersParsed))
        }
    }




    const value = {
        countdowns,
        setCountdowns,
        addCountdown,
        deleteCountdown,

        timers,
        setTimers,
        addTimer,
        deleteTimer,
        saveTimer,

        worldClocks,
        setWorldClocks,
        addWorldClock,
        deleteWorldClock
    }

    return (
        <TimerContext.Provider value={value}>{children}</TimerContext.Provider>
    )
}

export const useTimerContext = () => useContext(TimerContext);