import { FaRegTrashCan } from "react-icons/fa6"
import { useGlobalContext } from "../contexts/useGlobalContext"
import { useTimerContext } from "../contexts/useTimerContext"
import { Timer } from "../util/timer"
import ConfirmDialog from "./templates/ConfirmDialog"

interface ITimerCContainer {
    timer: Timer
}


function TimerContainer({ timer }: ITimerCContainer): JSX.Element {
    const { setModal } = useGlobalContext()
    const { deleteTimer } = useTimerContext() as { deleteTimer: (id: string) => void }

    function handleClickDelete() {
        setModal(0, (
            <ConfirmDialog id={0} text="Are you sure you want to delete this timer?" title="Delete Timer" onConfirm={() => deleteTimer(timer.id)} />
        ))
    }

    return (
        <div className="flex flex-row items-center justify-between transition-all bg-gray-200 rounded-full hover:shadow-md px-2 w-full">
            {/* <div className="flex flex-row justify-between">
                <p>Countdown 1</p>
            </div> */}
            <div className='z-10 h-full flex gap-8 flex-row items-center justify-center'>
                <div className='z-10 h-full flex gap-1 flex-row items-center justify-center'>
                    {
                        !timer.isExpired ? (
                            <>
                                {
                                    timer.days > 0 && (
                                        <>
                                            <div className='p-4'>
                                                <p>{timer.days} d</p>
                                            </div>
                                            <p>:</p>
                                        </>

                                    )
                                }

                                {
                                    timer.hours >= 0 && (
                                        <>
                                            <div className='p-4'>
                                                <p>{timer.hours} h</p>
                                            </div>
                                            <p>:</p>
                                        </>
                                    )
                                }

                                {
                                    timer.minutes >= 0 && (
                                        <>
                                            <div className='p-4'>
                                                <p>{timer.minutes} m</p>
                                            </div>
                                            <p>:</p>
                                        </>
                                    )
                                }

                                {
                                    timer.seconds >= 0 && (
                                        <>
                                            <div className='p-4'>
                                                <p>{timer.seconds} s</p>
                                            </div>
                                        </>
                                    )
                                }
                            </>
                        ) : (
                            <div className="p-4">
                                <p>Expired</p>
                            </div>
                        )
                    }




                </div>

            </div>
            <div className="flex flex-row gap-8 items-center">
                <p>{timer.dateObj.toLocaleString(undefined, { hour12: false })}</p>
                <div className="flex items-center justify-center">
                    <button onClick={handleClickDelete} className="button_circle !bg-red-400" ><FaRegTrashCan /></button>
                </div>
            </div>

        </div>
    )
}

export default TimerContainer