import { useGlobalContext } from "../../contexts/useGlobalContext"
import { useTimerContext } from "../../contexts/useTimerContext"
import { Countdown } from "../../util/countdown"
import CountdownContainer from "../CountdownContainer"
import CreateCountdownModal from "../modals/CreateCountdownModal"

function CountdownMenu(): JSX.Element {

    const { setModal } = useGlobalContext() as { setModal: (id: number, element: JSX.Element) => void }
    const { countdowns } = useTimerContext()

    const handleClickCreate = () => {
        setModal(1, (
            <CreateCountdownModal id={1} />
        ))
    }

    return (
        <div className="relative w-full">
            {
                countdowns.length > 0 ? (
                    <>
                        <button className="button_2 absolute bottom-0 right-0 z-20" onClick={handleClickCreate}>New</button>
                        <div className="flex flex-col gap-4 overflow-y-auto pb-16">
                            {
                                countdowns.length > 0 && (
                                    countdowns.map((countdown: Countdown, i: number) => (
                                        <CountdownContainer key={i} countdown={countdown} />
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

export default CountdownMenu