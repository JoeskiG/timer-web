import { useEffect, useState } from "react"
import { useTimerContext } from "../../contexts/useTimerContext"
import { CONSTANTS, CONTROL_TYPES } from "../../util/constants"
import IncrementControl from "./../controls/IncrementControl"
import BaseModal from "./../templates/BaseModal"
import { IMonthData, getMonthData } from "../../util/util"
import { useGlobalContext } from "../../contexts/useGlobalContext"
import { Timer } from "../../util/timer"

interface ICreateTimerModal {
    id: number
}

function CreateTimerModal(props: ICreateTimerModal): JSX.Element {

    const { addTimer } = useTimerContext() as { addTimer: (item: Timer) => void }
    const { removeModal } = useGlobalContext() as { removeModal: (id: number) => void }


    const [days, setDays] = useState<number>(0)
    const [hours, setHours] = useState<number>(0)
    const [minutes, setMinutes] = useState<number>(0)
    const [seconds, setSeconds] = useState<number>(0)


    const handleUpdateDate = () => {
        const ms = (
            (days * 24 * 60 * 60 * 1000) +
            (hours * 60 * 60 * 1000) +
            (minutes * 60 * 1000) +
            (seconds * 1000)
        )
        const newCountdown = new Timer(ms)
        addTimer(newCountdown)


        removeModal(props.id);

    }

    return (
        <BaseModal minWidth="20%" id={props.id} title="Create Countdown">
            <>
                <div className="flex flex-col justify-center items-center gap-4 pb-4">

                    <div className="w-full grid grid-cols-5 gap-2 justify-evenly items-center py-4">
                        <IncrementControl value={days} onChange={setDays} step={1} min={1} type={CONTROL_TYPES.number} />
                        <IncrementControl value={hours} onChange={setHours} step={1} min={1} max={23} type={CONTROL_TYPES.number} />
                        <IncrementControl value={minutes} onChange={setMinutes} step={1} min={1} max={59} type={CONTROL_TYPES.number} />
                        <IncrementControl value={seconds} onChange={setSeconds} step={1} min={1} max={59} type={CONTROL_TYPES.number} />
                    </div>

                    <div className="flex flex-row gap-4 justify-between w-full px-4 mt-4 items-center">
                        <button onClick={handleUpdateDate} className="button_2" style={{ width: "fit-content" }}>Create</button>
                    </div>

                </div>

            </>



        </BaseModal>
    )
}

export default CreateTimerModal