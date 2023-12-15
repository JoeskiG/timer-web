import BaseModal from "./templates/BaseModal"
import VerticalTabControl from "./controls/VerticalTabControl"
import CountdownMenu from "./menu/CountdownsMenu"
import SettingsMenu from "./menu/SettingsMenu"
import AboutMenu from "./menu/AboutMenu"
import TimersMenu from "./menu/TimersMenu"
import StopwatchesMenu from "./menu/StopwatchesMenu"

interface ISettingsModal {
    id: number
}

function MenuModal(props: ISettingsModal): JSX.Element {

    return (
        <BaseModal minWidth="50%" height="50%" id={props.id} title="Menu">
            <>
                <div className="pb-4 px-4 h-full w-full">
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
                                component: <TimersMenu />
                            },
                            {
                                title: "Stopwatches",
                                disabled: false,
                                component: <StopwatchesMenu />
                            },
                            {
                                title: "Settings",
                                disabled: false,
                                component: <SettingsMenu />
                            },
                            {
                                title: "About",
                                disabled: false,
                                component: <AboutMenu />
                            },
                        ]}
                    />
                </div>

            </>



        </BaseModal>
    )
}

export default MenuModal