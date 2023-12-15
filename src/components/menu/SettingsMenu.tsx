import { useGlobalContext } from "../../contexts/useGlobalContext"
import { BACKGROUND_MODES } from "../../util/constants"
import BackgroundSettingsModal from "../modals/BackgroundSettingsModal"

interface IBackgroundModeButton {
    text: string,
    bgMode: BACKGROUND_MODES
}

function SettingsMenu(): JSX.Element {

    const { 
        setModal, 
        backgroundMode,
        showCurrentDate,
        toggleShowCurrentDate
     } = useGlobalContext() as { 
        setModal: (id: number, element: JSX.Element) => void, 
        backgroundMode: BACKGROUND_MODES,
        showCurrentDate: boolean,
        toggleShowCurrentDate: () => boolean
    
    }

    const handleClickBackgroundMode = (mode: BACKGROUND_MODES) => {
        setModal(1, (
            <BackgroundSettingsModal mode={mode} id={1} />
        ))
    }

    function handleToggleShowCurrentDate() {
        toggleShowCurrentDate()
    }

    function BackgroundModeButton({ text, bgMode }: IBackgroundModeButton): JSX.Element {
        return (
            <button onClick={() => handleClickBackgroundMode(bgMode)} className={`button_3 ${backgroundMode === bgMode ? "bg-[var(--secondaryColor)]" : undefined}`}>{text}</button>
        )
    }

    return (
        <div className="relative w-full flex flex-col gap-2">
            <div className="flex flex-row justify-between transition-all bg-gray-200 rounded-full hover:shadow-md standardPadding px-6 items-center w-full">
                <p className="font-bold">Background</p>
                <div className="flex flex-row gap-4 items-center">
                    <BackgroundModeButton text="Solid" bgMode={BACKGROUND_MODES.solid} />
                    <BackgroundModeButton text="Gradient" bgMode={BACKGROUND_MODES.gradient} />
                    {/* <button className="button_3">RGB</button> */}
                </div>
            </div>

            <div className="flex flex-row justify-between transition-all bg-gray-200 rounded-full hover:shadow-md standardPadding px-6 items-center w-full">
                <p className="font-bold">Show Current Date</p>
                <input onClick={handleToggleShowCurrentDate} checked={showCurrentDate} className="mx-2 scale-125" type="checkbox" id="showCurrentDate" />
            </div>

            <div className="flex flex-col gap-4 overflow-y-auto pb-16">
            </div>

        </div>
    )


}





export default SettingsMenu