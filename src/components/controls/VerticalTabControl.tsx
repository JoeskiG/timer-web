import { useState } from "react"

interface ITab {
    title: string,
    disabled: boolean,
    component: JSX.Element,
    useDefaultPadding?: boolean | null
}

interface IVerticalTabControl {
    tabs: ITab[]
}

function VerticalTabControl({ tabs }: IVerticalTabControl): JSX.Element {

    const [selectedTab, setSelectedTab] = useState<ITab | null>(tabs[0] || null)

    const handleChangeTab = (tab: ITab) => {
        setSelectedTab(tab)
    }

    return (
        <div className="flex flex-row w-full h-full gap-2">
            <div className="flex flex-col gap-2 bg-gray-200 rounded-lg p-2">
                {
                    tabs.length > 0 && (
                        tabs.map(tab => (
                            <button onClick={() => handleChangeTab(tab)} className={`verticalTab ${tab == selectedTab ? "verticalTabSelected" : ""}`}>
                                {tab?.title}
                            </button>
                        ))
                    )
                }
            </div>

            <div className={`w-full flex rounded-lg bg-gray-100 ${selectedTab?.useDefaultPadding === true ? "p-4" : (typeof selectedTab?.useDefaultPadding === 'undefined' ? "p-4" : "")}`}>
                {
                    selectedTab?.component
                }
            </div>
        </div>
    )
}

export default VerticalTabControl