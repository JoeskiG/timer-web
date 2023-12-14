import BaseModal from "./templates/BaseModal"
import VerticalTabControl from "./controls/VerticalTabControl"
import CountdownMenu from "./menu/CountdownsMenu"
import SettingsMenu from "./menu/SettingsMenu"

interface ISettingsModal {
    id: number
}

function MenuModal(props: ISettingsModal): JSX.Element {

    return (
        <BaseModal minWidth="50%" id={props.id} title="Menu">
            <>
                <div className="pb-4 px-4">
                    <VerticalTabControl
                        tabs={[
                            {
                                title: "Countdowns",
                                disabled: false,
                                component: <CountdownMenu />
                            },
                            {
                                title: "Timers",
                                disabled: false,
                                component: <></>
                            },
                            {
                                title: "Stopwatches",
                                disabled: false,
                                component: <></>
                            },
                            {
                                title: "Settings",
                                disabled: false,
                                component: <SettingsMenu />
                            },
                        ]}
                    />
                </div>

            </>



        </BaseModal>
    )
}

export default MenuModal