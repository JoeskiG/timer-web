import { useState } from "react";
import BaseModal from "./../templates/BaseModal"
import { HexColorPicker } from "react-colorful";
import { useGlobalContext } from "../../contexts/useGlobalContext";
import { BACKGROUND_MODES } from "../../util/constants";

interface ISettingsModal {
    id: number
}

function BackgroundSettingsModal(props: ISettingsModal): JSX.Element {

    const { updateBackground } = useGlobalContext() as { updateBackground: (newBackground: any) => void }
    const [color1, setColor1] = useState("#aabbcc");
    const [color2, setColor2] = useState("#aabbcc");
    const [color3, setColor3] = useState("#aabbcc");

    function handleSave() {
        updateBackground({
            mode: BACKGROUND_MODES.gradient,
            colors: {
                color1,
                color2,
                color3
            }
        })
    }

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


                    <div className="flex flex-row gap-4 justify-center w-full px-4 mt-4 items-center">
                        <button onClick={handleSave} className="button_2 w-full">Save</button>
                    </div>

                </div>

            </>



        </BaseModal>
    )
}

export default BackgroundSettingsModal