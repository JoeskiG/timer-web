import { useGlobalContext } from "../../contexts/useGlobalContext"
import { BACKGROUND_MODES } from "../../util/constants"
import BackgroundSettingsModal from "../modals/BackgroundSettingsModal"
import CreateCountdownModal from "../modals/CreateCountdownModal"

function SettingsMenu(): JSX.Element {

    const { setModal, backgroundMode } = useGlobalContext() as { setModal: (id: number, element: JSX.Element) => void, backgroundMode: BACKGROUND_MODES }

    const handleClickCreate = () => {
        setModal(1, (
            <CreateCountdownModal id={1} />
        ))
    }

    const handleClickBackgroundGradient = () => {
        setModal(1, (
            <BackgroundSettingsModal id={1} />
        ))
    }

    return (
        <div className="relative w-full">
            <div className="flex flex-row justify-between transition-all bg-gray-200 rounded-full hover:shadow-md px-6 items-center w-full">
                <p>Background</p>
                <div className="flex flex-row gap-4 items-center">
                    <button className="button_3">Solid</button>
                    <button style={{ scale: backgroundMode === BACKGROUND_MODES.gradient ? "150%" : undefined }} onClick={handleClickBackgroundGradient} className="button_3">Gradient</button>
                    <button className="button_3">RGB</button>
                </div>
            </div>
            <button className="button_2 absolute bottom-0 right-0 z-20" onClick={handleClickCreate}>New</button>
            <div className="flex flex-col gap-4 overflow-y-auto pb-16">
            </div>

        </div>
    )
}

export default SettingsMenu