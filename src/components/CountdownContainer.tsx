import { FaRegTrashCan } from "react-icons/fa6"
import { useTimerContext } from "../contexts/useTimerContext"
import { Countdown } from "../util/countdown"

interface ICountdownContainer {
    countdown: Countdown
}


function CountdownContainer({ countdown }: ICountdownContainer): JSX.Element {
    const { deleteCountdown } = useTimerContext() as { deleteCountdown: (id: string) => void }

    function handleClickDelete() {
        deleteCountdown(countdown.id)
    }

    return (
        <div className="flex flex-row justify-between transition-all bg-gray-200 rounded-full hover:shadow-md px-2 w-full">
            {/* <div className="flex flex-row justify-between">
                <p>Countdown 1</p>
            </div> */}
            <div className='z-10 h-full w-full flex gap-8 flex-row items-center justify-center'>
                <div className='z-10 h-full w-full flex gap-8 flex-row items-center justify-center'>
                    {
                        countdown.days > 0 && (
                            <>
                                <div className='p-4'>
                                    <p>{countdown.days} d</p>
                                </div>
                                <p>:</p>
                            </>

                        )
                    }

                    {
                        countdown.hours >= 0 && (
                            <>
                                <div className='p-4'>
                                    <p>{countdown.hours} h</p>
                                </div>
                                <p>:</p>
                            </>
                        )
                    }

                    {
                        countdown.minutes >= 0 && (
                            <>
                                <div className='p-4'>
                                    <p>{countdown.minutes} m</p>
                                </div>
                                <p>:</p>
                            </>
                        )
                    }

                    {
                        countdown.seconds >= 0 && (
                            <>
                                <div className='p-4'>
                                    <p>{countdown.seconds} s</p>
                                </div>
                            </>
                        )
                    }

                    <button onClick={handleClickDelete} className="button_2 !shadow-none !bg-red-400" ><FaRegTrashCan /></button>

                </div>

            </div>
        </div>
    )
}

export default CountdownContainer