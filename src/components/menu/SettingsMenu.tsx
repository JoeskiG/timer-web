import { ChangeEvent } from "react"
import { useGlobalContext } from "../../contexts/useGlobalContext"
import { BACKGROUND_MODES } from "../../util/constants"
import BackgroundSettingsModal from "../modals/BackgroundSettingsModal"
import UpdateGlobalZoomModal from "../modals/UpdateGlobalZoomModal"

interface IBackgroundModeButton {
    text: string,
    bgMode: BACKGROUND_MODES
}

const zoomPresets = [
    {
        value: 25,
    },
    {
        value: 50,
    },
    {
        value: 75,
    },
    {
        value: 100,
    },
    {
        value: 110,
    },
    {
        value: 125,
    },
    {
        value: 150,
    },
    {
        value: 175,
    },
    {
        value: 200,
    },
]

function SettingsMenu(): JSX.Element {

    const {
        setModal,
        backgroundMode,
        showCurrentDate,
        toggleShowCurrentDate,
        globalBottomPadding,
        updateGlobalBottomPadding,
        globalZoom,
        updateGlobalZoom
    } = useGlobalContext()

    const handleClickBackgroundMode = (mode: BACKGROUND_MODES) => {
        setModal(1, (
            <BackgroundSettingsModal mode={mode} id={1} />
        ))
    }

    function handleToggleShowCurrentDate() {
        toggleShowCurrentDate()
    }


    function handleGlobalBottomPaddingChange(e: ChangeEvent<HTMLInputElement>) {
        const target = e.target as HTMLInputElement;
        updateGlobalBottomPadding(Number(target.value))
    }


    function openZoomModal() {
        setModal(0, (
            <UpdateGlobalZoomModal id={0} />
        ))
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

            <div className="flex flex-row justify-between transition-all bg-gray-200 rounded-full hover:shadow-md gap-8 standardPadding px-6 items-center w-full">
                <p className=" whitespace-nowrap font-bold">Bottom Padding {"(use if taskbar is covering this)"}</p>
                <div className="flex w-full flex-row gap-8 items-center">
                    <input className="w-full slider !bg-gray-300" onChange={handleGlobalBottomPaddingChange} type="range" min={0} step={1} max={window.innerHeight} value={globalBottomPadding ?? 0} />
                    <p className=" whitespace-nowrap">{globalBottomPadding} px</p>
                </div>

            </div>

            <div className="flex flex-row justify-between transition-all bg-gray-200 rounded-full hover:shadow-md gap-8 standardPadding px-6 items-center w-full">
                <p className="whitespace-nowrap font-bold">Zoom</p>

                <div className="flex flex-row gap-4 items-center">
                    {
                        zoomPresets.map((preset, i) => (
                            <button key={i} onClick={() => updateGlobalZoom(preset.value)} className={`button_3 ${globalZoom === preset.value ? "bg-[var(--secondaryColor)]" : undefined}`}>{preset.value}%</button>
                        ))
                    }

                    <button onClick={openZoomModal}>
                        Set Custom
                    </button>
                </div>

            </div>

            <div className="flex flex-col gap-4 overflow-y-auto pb-16">
            </div>

        </div>
    )


}





export default SettingsMenu