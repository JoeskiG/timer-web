import { FaRegTrashCan } from "react-icons/fa6"
import { useTimerContext } from "../contexts/useTimerContext"
import { Countdown } from "../util/countdown"
import { useGlobalContext } from "../contexts/useGlobalContext"
import ConfirmDialog from "./templates/ConfirmDialog"

interface ICountdownContainer {
    countdown: Countdown
}


function CountdownContainer({ countdown }: ICountdownContainer): JSX.Element {
    const { setModal } = useGlobalContext() as { setModal: (id: number, element: JSX.Element) => void }
    const { deleteCountdown } = useTimerContext() as { deleteCountdown: (id: string) => void }

    function handleClickDelete() {
        setModal(0, (
            <ConfirmDialog id={0} text="Are you sure you want to delete this countdown?" title="Delete Countdown" onConfirm={() => deleteCountdown(countdown.id)} />
        ))
    }

    return (
        <div className="flex flex-row items-center justify-between transition-all bg-gray-200 rounded-full hover:shadow-md px-2 py-1 w-full">
            {/* <div className="flex flex-row justify-between">
                <p>Countdown 1</p>
            </div> */}
            <div className='z-10 h-full flex gap-8 flex-row items-center justify-center'>
                <div className='z-10 h-full flex gap-1 flex-row items-center justify-center'>
                    {
                        countdown.days > 0 && (
                            <>
                                <div className='px-4'>
                                    <p>{countdown.days} d</p>
                                </div>
                                <p>:</p>
                            </>

                        )
                    }

                    {
                        countdown.hours >= 0 && (
                            <>
                                <div className='px-4'>
                                    <p>{countdown.hours} h</p>
                                </div>
                                <p>:</p>
                            </>
                        )
                    }

                    {
                        countdown.minutes >= 0 && (
                            <>
                                <div className='px-4'>
                                    <p>{countdown.minutes} m</p>
                                </div>
                                <p>:</p>
                            </>
                        )
                    }

                    {
                        countdown.seconds >= 0 && (
                            <>
                                <div className='px-4'>
                                    <p>{countdown.seconds} s</p>
                                </div>
                            </>
                        )
                    }



                </div>

            </div>
            <div className="flex flex-row gap-8 items-center">
                <p>{countdown.dateObj.toLocaleString(undefined, { hour12: false })}</p>
                <div className="flex items-center justify-center">
                    <button onClick={handleClickDelete} className="button_circle !bg-red-400" ><FaRegTrashCan /></button>
                </div>
            </div>

        </div>
    )
}

export default CountdownContainer