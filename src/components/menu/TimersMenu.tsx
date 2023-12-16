import { useGlobalContext } from "../../contexts/useGlobalContext"
import { useTimerContext } from "../../contexts/useTimerContext"
import { Timer } from "../../util/timer"
import TimerContainer from "../TimerContainer"
import CreateTimerModal from "../modals/CreateTimerModal"

function TimersMenu(): JSX.Element {

    const { setModal } = useGlobalContext() as { setModal: (id: number, element: JSX.Element) => void }
    const { timers } = useTimerContext()

    const handleClickCreate = () => {
        setModal(0, (
            <CreateTimerModal id={0} />
        ))
    }

    return (
        <div className="relative w-full">
            {
                timers.length > 0 ? (
                    <>
                        <button className="button_2 absolute bottom-0 right-0 z-20" onClick={handleClickCreate}>New</button>
                        <div className="flex flex-col gap-4 overflow-y-auto pb-16">
                            {
                                timers.length > 0 && (
                                    timers.map((timer: Timer, i: number) => (
                                        <TimerContainer timer={timer} key={i} />
                                    ))
                                )
                            }
                        </div>
                    </>
                ) : (
                    <div className="flex items-center justify-center h-full">
                        <button className="button_2" onClick={handleClickCreate}>New</button>
                    </div>
                )
            }


        </div>
    )
}

export default TimersMenu