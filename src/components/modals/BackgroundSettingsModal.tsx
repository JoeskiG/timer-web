import { ChangeEvent, useState } from "react";
import BaseModal from "./../templates/BaseModal"
import { HexColorPicker } from "react-colorful";
import { useGlobalContext } from "../../contexts/useGlobalContext";
import { BACKGROUND_MODES, CONSTANTS } from "../../util/constants";

interface IBackgroundSettingsModal {
    id: number,
    mode: BACKGROUND_MODES
}

function BackgroundSettingsModal(props: IBackgroundSettingsModal): JSX.Element {

    const { updateBackground, removeModal, backgroundSettings } = useGlobalContext() as { updateBackground: (newBackground: any) => void, removeModal: (id: number) => void, backgroundSettings: any }
    const [color1, setColor1] = useState<string>(typeof backgroundSettings?.colors?.color1 !== 'undefined' ? backgroundSettings.colors.color1 : CONSTANTS.defaults.background.colors.color1);
    const [color2, setColor2] = useState<string>(typeof backgroundSettings?.colors?.color2 !== 'undefined' ? backgroundSettings.colors.color2 : CONSTANTS.defaults.background.colors.color2);
    const [color3, setColor3] = useState<string>(typeof backgroundSettings?.colors?.color3 !== 'undefined' ? backgroundSettings.colors.color3 : CONSTANTS.defaults.background.colors.color3);

    const [animationDurationInMilliseconds, setAnimationDurationInMilliseconds] = useState<number>(backgroundSettings?.animationDuration ? backgroundSettings.animationDuration : CONSTANTS.defaults.background.animationDuration)

    function handleSave() {
        if (props.mode === BACKGROUND_MODES.gradient) {
            updateBackground({
                mode: BACKGROUND_MODES.gradient,
                colors: {
                    color1,
                    color2,
                    color3
                },
                animationDuration: animationDurationInMilliseconds
            })
        } else if (props.mode === BACKGROUND_MODES.solid) {
            updateBackground({
                mode: BACKGROUND_MODES.solid,
                colors: {
                    color1
                }
            })
        }

        removeModal(props.id)
    }

    function handleAnimationDurationChange(e: ChangeEvent<HTMLInputElement>) {
        const target = e.target as HTMLInputElement;
        setAnimationDurationInMilliseconds(Number(target.value))
    }

    if (props.mode === BACKGROUND_MODES.gradient) {
        return (
            <BaseModal minWidth="20%" id={props.id} title="Change Background">
                <>
                    <div className="flex flex-col justify-center items-center gap-4 pb-4 px-4">

                        <div className="flex flex-row justify-center items-center gap-4">
                            <div className="w-full flex flex-col gap-2 justify-evenly items-center py-4">
                                <HexColorPicker color={color1} onChange={setColor1} />
                                <p>Color 1</p>
                            </div>
                            <div className="w-full flex flex-col gap-2 justify-evenly items-center py-4">
                                <HexColorPicker color={color2} onChange={setColor2} />
                                <p>Color 2</p>
                            </div>
                            <div className="w-full flex flex-col gap-2 justify-evenly items-center py-4">
                                <HexColorPicker color={color3} onChange={setColor3} />
                                <p>Color 3</p>
                            </div>
                        </div>

                        <div className="flex flex-row gap-4 w-full items-center">
                            <p className=" whitespace-nowrap">Animation Duration</p>
                            <input className="w-full slider" onChange={handleAnimationDurationChange} type="range" min={100} step={100} max={30000} value={animationDurationInMilliseconds} />
                            <p className=" whitespace-nowrap">{animationDurationInMilliseconds} ms</p>
                        </div>

                        <div className="flex flex-row gap-4 justify-center w-full px-4 mt-4 items-center">
                            <button onClick={handleSave} className="button_2 w-full">Save</button>
                        </div>

                    </div>

                </>



            </BaseModal>
        )

    } else if (props.mode === BACKGROUND_MODES.solid) {
        return (
            <BaseModal minWidth="20%" id={props.id} title="Change Background">
                <>
                    <div className="flex flex-col justify-center items-center gap-4 pb-4 px-4">

                        <div className="flex flex-row justify-center items-center gap-4">
                            <div className="w-full flex flex-col gap-2 justify-evenly items-center py-4">
                                <HexColorPicker color={color1} onChange={setColor1} />
                                <p>Color 1</p>
                            </div>
                        </div>


                        <div className="flex flex-row gap-4 justify-center w-full px-4 mt-4 items-center">
                            <button onClick={handleSave} className="button_2 w-full">Save</button>
                        </div>

                    </div>

                </>



            </BaseModal>
        )
    } else {
        return <></>
    }


}

export default BackgroundSettingsModal