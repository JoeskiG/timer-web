import { useEffect, useState } from "react"
import { useTimerContext } from "../../contexts/useTimerContext"
import { CONSTANTS, CONTROL_TYPES } from "../../util/constants"
import IncrementControl from "./../controls/IncrementControl"
import BaseModal from "./../templates/BaseModal"
import { IMonthData, getMonthData } from "../../util/util"
import { useGlobalContext } from "../../contexts/useGlobalContext"
import VerticalTabControl from "./../controls/VerticalTabControl"
import CountdownMenu from "./../menu/CountdownsMenu"
import { Countdown } from "../../util/countdown"

interface ISettingsModal {
    id: number
}

const defaultYear = 2024

function CreateCountdownModal(props: ISettingsModal): JSX.Element {

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
        <BaseModal minWidth="20%" id={props.id} title="Create Countdown">
            <>
                <div className="flex flex-col justify-center items-center gap-4 pb-4">

                    <div className="w-full grid grid-cols-5 gap-2 justify-evenly items-center py-4">
                        <IncrementControl value={day} onChange={setDay} step={1} min={1} max={month?.lastDate} type={CONTROL_TYPES.number} />
                        <div></div>
                        <IncrementControl
                            value={month?.text || ""}
                            onChange={handleChangeMonth}
                            type={CONTROL_TYPES.options}
                            options={CONSTANTS.months}
                        />
                        <div></div>
                        <IncrementControl value={year} onChange={setYear} step={1} min={new Date().getFullYear()} max={3000} type={CONTROL_TYPES.number} />
                    </div>

                    <div className="w-full grid grid-cols-5 gap-2 justify-evenly items-center py-4">
                        <IncrementControl value={hours} onChange={setHours} min={0} step={1} max={23} type={CONTROL_TYPES.number} />
                        <p className="mx-auto text-4xl">:</p>
                        <IncrementControl value={minutes} onChange={setMinutes} min={0} step={1} max={59} type={CONTROL_TYPES.number} />
                        <p className="mx-auto text-4xl">:</p>
                        <IncrementControl value={seconds} onChange={setSeconds} step={1} min={0} max={59} type={CONTROL_TYPES.number} />
                    </div>

                    <div className="flex flex-row gap-4 justify-between w-full px-4 mt-4 items-center">
                        <button className="button_2 !bg-blue-400" onClick={handleClickSetNow}>Now</button>
                        <button onClick={handleUpdateDate} className="button_2" style={{ width: "fit-content" }}>Set New Countdown</button>
                    </div>

                </div>

            </>



        </BaseModal>
    )
}

export default CreateCountdownModal