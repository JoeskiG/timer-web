import { useEffect, useState } from "react"
import { useTimerContext } from "../contexts/useTimerContext"
import { CONSTANTS, CONTROL_TYPES } from "../util/constants"
import IncrementControl from "./controls/IncrementControl"
import BaseModal from "./templates/BaseModal"
import { IMonthData, getMonthData } from "../util/util"
import { useGlobalContext } from "../contexts/useGlobalContext"

interface ISettingsModal {
    id: number
}

const defaultYear = 2024
const now = new Date()

function SettingsModal(props: ISettingsModal): JSX.Element {

    const { changeEndTimeFromString } = useTimerContext() as { changeEndTimeFromString: (time: string) => void }
    const { removeModal, setModal } = useGlobalContext() as { removeModal: (id: number) => void, setModal: (id: number, element: JSX.Element) => void }


    const [day, setDay] = useState<number>(1)
    const [month, setMonth] = useState<IMonthData | null>(getMonthData(defaultYear, CONSTANTS.months[0]))
    const [year, setYear] = useState<number>(2024)

    const handleChangeMonth = (newMonth: string) => {
        const newMonthSimple = CONSTANTS.months.find(m => m.toLowerCase() === newMonth.toLowerCase()) as string
        const newMonthObj = getMonthData(year, newMonthSimple)
        setMonth(newMonthObj)
        return newMonth
    }

    const handleUpdateDate = () => {
        const newDate = month ? new Date(`${day} ${month.shortText}, ${year}`).getTime() : 0;

        if (month && newDate < now.getTime()) {
            setModal(1, (
                <BaseModal title="Date must be in the future!" id={1}>
                </BaseModal>
            ));
            return;
        }

        if (month) {
            changeEndTimeFromString(`${day} ${month.shortText}, ${year}`);
        }

        removeModal(props.id);

    }

    useEffect(() => {


        if (month && day > month.lastDate) {
            setDay(month.lastDate);
        }

    }, [year, month])

    return (
        <BaseModal minWidth="20%" id={props.id} title="Change Countdown Date">
            <div className="flex flex-col justify-center items-center gap-4 pb-4">
                <div className="w-full grid grid-cols-3 gap-2 justify-evenly items-center py-4">
                    <IncrementControl value={day} onChange={setDay} min={1} max={month?.lastDate} type={CONTROL_TYPES.number} />
                    <IncrementControl
                        value={month?.text || ""}
                        onChange={handleChangeMonth}
                        type={CONTROL_TYPES.options}
                        options={CONSTANTS.months}
                    />

                    <IncrementControl value={year} onChange={setYear} min={now.getFullYear()} max={3000} type={CONTROL_TYPES.number} />
                </div>

                <button onClick={handleUpdateDate} className="text-2xl px-6 py-2 rounded-full bg-green-400" style={{ width: "fit-content" }}>Set New Date</button>
            </div>

        </BaseModal>
    )
}

export default SettingsModal