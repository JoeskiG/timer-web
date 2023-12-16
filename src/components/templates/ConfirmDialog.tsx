import { useGlobalContext } from "../../contexts/useGlobalContext"
import BaseModal from "./BaseModal"

interface IConfirmDialog {
    onConfirm: Function,
    id: number,
    title: string,
    text?: string | null
}

function ConfirmDialog({ id, onConfirm, title, text }: IConfirmDialog): JSX.Element {

    const { removeModal } = useGlobalContext() as { removeModal: (id: number) => void }

    function removeSelf() {
        removeModal(id)
    }

    function confirmAndClose() {
        onConfirm()
        removeSelf()

    }

    return (
        <BaseModal id={id} title={title} >
            <div className="flex flex-col gap-8 p-4">
                {
                    text && (
                        <p>{text}</p>
                    )
                }

                <div className="flex flex-row gap-4 w-full items-center justify-center">
                    <button onClick={confirmAndClose} className="button_2 !bg-[var(--secondaryColor)]">Confirm</button>
                    <button onClick={removeSelf} className="button_2 !bg-gray-300">Cancel</button>
                </div>

            </div>
        </BaseModal>
    )


}





export default ConfirmDialog