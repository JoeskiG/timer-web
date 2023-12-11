import { useGlobalContext } from "../../contexts/useGlobalContext"
import { FaXmark } from "react-icons/fa6";


interface IBaseModal {
    id: number,
    title: string,
    children?: JSX.Element | null,
    minWidth?: string | null
}

function BaseModal(props: IBaseModal): JSX.Element {

    const { removeModal } = useGlobalContext() as { removeModal: (id: number) => void }

    const minWidth = props?.minWidth ?? ""

    function removeSelf() {
        removeModal(props.id)
    }

    return (
        <div className="modalBackdrop">
            <div className="modalContainer" style={props.minWidth !== null ? { minWidth } : undefined}>
                <div className="flex flex-col justify-between items-center gap-4">
                    {/* HEADING */}
                    <div className="p-4 w-full flex flex-row justify-between items-center">
                        <h1 className="!text-4xl">{props?.title}</h1>
                        <a className="cursor-pointer scale-[150%] " onClick={removeSelf}>
                            <FaXmark size={30} />
                        </a>
                    </div>

                    <div className="w-full flex flex-col">
                        {props?.children && props.children}
                    </div>

                </div>
            </div>
        </div>
    )
}

export default BaseModal