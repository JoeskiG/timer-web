import { useEffect, useState } from "react"
import { useTimerContext } from "../contexts/useTimerContext"
import { CONSTANTS, CONTROL_TYPES } from "../util/constants"
import IncrementControl from "./controls/IncrementControl"
import BaseModal from "./templates/BaseModal"
import { IMonthData, getMonthData } from "../util/util"
import { useGlobalContext } from "../contexts/useGlobalContext"
import VerticalTabControl from "./controls/VerticalTabControl"
import CountdownMenu from "./menu/CountdownsMenu"
import { Countdown } from "../util/countdown"

interface ISettingsModal {
    id: number
}

const defaultYear = 2024

function SettingsModal(props: ISettingsModal): JSX.Element {

    const { addCountdown } = useTimerContext() as { addCountdown: (item: Countdown) => void }
    const { removeModal, setModal } = useGlobalContext() as { removeModal: (id: number) => void, setModal: (id: number, element: JSX.Element) => void }


    const [day, setDay] = useState<number>(1)
    const [month, setMonth] = useState<IMonthData | null>(getMonthData(defaultYear, CONSTANTS.months[0]))
    const [year, setYear] = useState<number>(2024)

    const [hours, setHours] = useState<number>(0)
    const [minutes, setMinutes] = useState<number>(0)
    const [seconds, setSeconds] = useState<number>(0)

    const handleChangeMonth = (newMonth: string) => {
        const newMonthSimple = CONSTANTS.months.find(m => m.toLowerCase() === newMonth.toLowerCase()) as string
        const newMonthObj = getMonthData(year, newMonthSimple)
        setMonth(newMonthObj)
        return newMonth
    }

    const handleUpdateDate = () => {
        const newDate = month ? new Date(`${day} ${month.shortText}, ${year} ${hours}:${minutes}:${seconds}`).getTime() : 0;
        const now = new Date()
        if (month && newDate < now.getTime()) {
            setModal(1, (
                <BaseModal title="Date must be in the future!" id={1}>
                </BaseModal>
            ));
            return;
        }

        if (month) {
            const newCountdown = new Countdown(`${day} ${month.shortText}, ${year} ${hours}:${minutes}:${seconds}`)
            addCountdown(newCountdown)
        }


        removeModal(props.id);

    }

    const handleClickSetNow = () => {
        const now = new Date()
        const nowYear = now.getFullYear()
        setDay(now.getDate())

        const monthNow = getMonthData(nowYear, CONSTANTS.months[now.getMonth()])
        setMonth(monthNow)
        setYear(now.getFullYear())

        setHours(now.getHours())
        setMinutes(now.getMinutes())
        setSeconds(now.getSeconds())
    }

    useEffect(() => {
        if (month && day > month.lastDate) {
            setDay(month.lastDate);
        }

    }, [year, month])

    return (
        <BaseModal minWidth="20%" id={props.id} title="Settings">
            <>


                <div className="pb-4 px-4">
                    <VerticalTabControl
                        tabs={[
                            {
                                title: "Countdowns",
                                disabled: false,
                                component: <CountdownMenu />
                            },
                            {
                                title: "Timers",
                                disabled: false,
                                component: <></>
                            },
                            {
                                title: "Stopwatches",
                                disabled: false,
                                component: <></>
                            },
                            {
                                title: "Settings",
                                disabled: false,
                                component: <></>
                            },
                        ]}
                    />
                </div>

            </>



        </BaseModal>
    )
}

export default SettingsModal