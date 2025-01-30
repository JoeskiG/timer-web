import { useGlobalContext } from "../../contexts/useGlobalContext"
import { CONTROL_TYPES } from "../../util/constants"
import IncrementControl from "./../controls/IncrementControl"
import BaseModal from "./../templates/BaseModal"

interface IUpdateGlobalZoomModal {
    id: number
}

function UpdateGlobalZoomModal(props: IUpdateGlobalZoomModal): JSX.Element {

    const { globalZoom, updateGlobalZoom } = useGlobalContext()

    function handleZoomChange(value: number) {
        const target = value;
        updateGlobalZoom(target)
    }

    return (
        <BaseModal minWidth="20%" id={props.id} title="Zoom">
            <>
                <div className="flex flex-col justify-center items-center gap-4 pb-4">

                    <IncrementControl value={globalZoom} onChange={handleZoomChange} min={0} step={5} max={400} type={CONTROL_TYPES.number} />

                </div>

            </>



        </BaseModal>
    )
}

export default UpdateGlobalZoomModal