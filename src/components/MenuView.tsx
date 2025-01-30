import { FaChevronLeft } from "react-icons/fa6"
import { useGlobalContext } from "../contexts/useGlobalContext"
import VerticalTabControl from "./controls/VerticalTabControl"
import AboutMenu from "./menu/AboutMenu"
import CountdownMenu from "./menu/CountdownsMenu"
import SettingsMenu from "./menu/SettingsMenu"
import StopwatchesMenu from "./menu/StopwatchesMenu"
import TimersMenu from "./menu/TimersMenu"
import WorldClockMenu from "./menu/WorldClockMenu"

interface IMenuView {
    onClose: () => void
}

function MenuView({ onClose }: IMenuView): JSX.Element {

    const {
        globalBottomPadding
    } = useGlobalContext()

    return (
        <>
            <div style={{ paddingBottom: `${globalBottomPadding}px` }} className="flex h-full flex-col justify-between items-center gap-4 bg-white">
                {/* HEADING */}
                <div className="p-4 w-full gap-16 flex flex-row justify-between items-center">
                    <h1 className="!text-4xl">Menu</h1>
                    <a onClick={onClose} className="cursor-pointer scale-[150%] p-4">
                        <FaChevronLeft />
                    </a>
                </div>

                <div className="w-full h-full flex flex-col">
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
                                    disabled: true,
                                    component: <TimersMenu />
                                },
                                {
                                    title: "Stopwatches",
                                    disabled: true,
                                    component: <StopwatchesMenu />
                                },
                                {
                                    title: "World Clock",
                                    disabled: false,
                                    component: <WorldClockMenu />
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
                </div>

            </div>


        </>
    )
}

export default MenuView