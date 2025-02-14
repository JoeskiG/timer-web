import { useState } from "react"
import { useGlobalContext } from "../../contexts/useGlobalContext"

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
    const { isMobile } = useGlobalContext()

    const [selectedTab, setSelectedTab] = useState<ITab | null>(isMobile ? null : (tabs[0] || null))

    const handleChangeTab = (tab: ITab) => {
        setSelectedTab(tab)
    }


    if (isMobile) {
        if (!selectedTab) {
            return (
                <div className="flex flex-row w-full h-full gap-2">
                    <div className="flex w-full flex-col gap-2 bg-gray-200 overflow-y-auto rounded-lg p-2">
                        {
                            tabs.length > 0 && (
                                tabs.map((tab: ITab, i: number) => (
                                    <button disabled={tab.disabled} key={i} onClick={() => handleChangeTab(tab)} className="verticalTab">
                                        {tab?.title}
                                    </button>
                                ))
                            )
                        }
                    </div>
                </div>
            )
        } else {
            return (
                <div className="flex flex-row w-full h-full gap-2 overflow-y-auto">
                    <div className={`w-full overflow-x-auto overflow-y-auto flex rounded-lg bg-gray-100 ${selectedTab?.useDefaultPadding === true ? "p-4" : (typeof selectedTab?.useDefaultPadding === 'undefined' ? "p-4" : "")}`}>
                        {
                            selectedTab?.component
                        }
                    </div>
                </div>
            )
        }

    }

    return (
        <div className="flex flex-row w-full h-full gap-2 ">
            <div className="flex flex-col gap-2 overflow-y-auto bg-gray-200 rounded-lg p-2">
                {
                    tabs.length > 0 && (
                        tabs.map((tab: ITab, i: number) => (
                            <button disabled={tab.disabled} key={i} onClick={() => handleChangeTab(tab)} className={`verticalTab ${tab.title == selectedTab?.title ? "verticalTabSelected" : ""}`}>
                                {tab?.title}
                            </button>
                        ))
                    )
                }
            </div>

            <div className={`w-full overflow-x-auto overflow-y-auto flex rounded-lg bg-gray-100 ${selectedTab?.useDefaultPadding === true ? "p-4" : (typeof selectedTab?.useDefaultPadding === 'undefined' ? "p-4" : "")}`}>
                {
                    selectedTab?.component
                }
            </div>
        </div>
    )
}

export default VerticalTabControl