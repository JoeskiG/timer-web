import { useState } from "react";
import { CityData } from 'city-timezones'
import {
    ComposableMap,
    Geographies,
    Geography,
    ZoomableGroup
} from 'react-simple-maps';
import { getTextAfterChar, zeroPad } from "../../util/util";
import { FaPlus, FaRegTrashCan } from "react-icons/fa6";
import { WorldClock } from "../../util/worldClock";
import { useTimerContext } from "../../contexts/useTimerContext";
import { useGlobalContext } from "../../contexts/useGlobalContext";
import ConfirmDialog from "../templates/ConfirmDialog";
import { IMousePosition, useMousePositionContext } from "../../contexts/useMousePositionContext";
import { CityTimezones } from "../../util/cityTimezones";


function WorldClockMenu(): JSX.Element {
    const { setModal } = useGlobalContext() as { setModal: (id: number, element: JSX.Element) => void }
    const { deleteWorldClock, addWorldClock, worldClocks, worldClockExists } = useTimerContext() as { deleteWorldClock: (id: string) => void, addWorldClock: (item: WorldClock) => void, worldClocks: WorldClock[], worldClockExists: (timezone: string) => boolean }
    const { mousePosition } = useMousePositionContext() as { mousePosition: IMousePosition }

    const [page, setPage] = useState<string>('saved')



    const [selectedCountry, setSelectedCountry] = useState<any>(null);
    const [selectedCountryCities, setSelectedCountryCities] = useState<CityData[]>([])

    const [hoverCountry, setHoverCountry] = useState<any>(null)

    const handleCountryClick = (country: any) => {
        //const cities = cityTimezones.findFromCityStateProvince(country.properties.name)
        const cities = CityTimezones.getCitiesByCountryName(country.properties.name)
        const newCities: CityData[] = []
        for (var city of cities) {
            // if (city.timezone) {
            //     city.timezone = city.timezone.replace(/\_/g, ' ')
            // } else {
            //     continue
            // }
            if (!city.timezone) continue

            const found = newCities.find(obj => obj.timezone === city.timezone)
            if (!found) {
                // const worldClockExists = worldClocks.find((clock: WorldClock) => clock.timezone === city.timezone)
                // if (!worldClockExists) {
                //city.timezone = city.timezone.replace('_', ' ')
                newCities.push(city)
                //}

            }

        }

        setSelectedCountryCities(newCities)
        setSelectedCountry(country);
    };

    function handleClickNew() {
        setPage('new')
    }


    const handleClickCreate = (city: CityData) => {
        const newClock = new WorldClock(city.timezone)
        addWorldClock(newClock)
        setPage('saved')
    }

    function handleClickDelete(wc: WorldClock) {
        setModal(0, (
            <ConfirmDialog id={0} text="Are you sure you want to delete this world clock?" title="Delete World Clock" onConfirm={() => deleteWorldClock(wc.id)} />
        ))
    }

    function handleMouseEnterCountry(geo: any) {
        setHoverCountry(geo)
    }

    function handleMouseLeaveCountry() {
        setHoverCountry(null)
    }

    return (
        <>
            {
                hoverCountry && (
                    <div className="absolute z-20 rounded-full p-2 bg-white" style={{
                        top: `${mousePosition.y - 50}px`,
                        left: `${mousePosition.x - 25}px`
                    }}>
                        <p>{hoverCountry.properties.name}</p>
                    </div>
                )
            }
            <div className="relative w-full flex flex-col gap-2">

                {
                    page === 'new' ? (
                        <>
                            <div className="w-full h-full">
                                <ComposableMap height={369} style={{ maxHeight: "100%", width: "100%" }}>
                                    <ZoomableGroup center={[0, 0]} minZoom={1} zoom={1}>
                                        <Geographies geography="world-110m.json">
                                            {({ geographies }) =>
                                                geographies.map((geo) => (
                                                    <Geography
                                                        key={geo.rsmKey}
                                                        geography={geo}
                                                        onClick={() => handleCountryClick(geo)}
                                                        onMouseEnter={() => handleMouseEnterCountry(geo)}
                                                        onMouseLeave={handleMouseLeaveCountry}
                                                        style={{
                                                            default: {
                                                                fill: geo.id === selectedCountry?.id ? 'var(--secondaryColor)' : '#c8c8c8',
                                                                outline: 'none',
                                                            },
                                                            hover: {
                                                                fill: geo.id === selectedCountry?.id ? 'var(--secondaryColor)' : 'var(--secondaryColorActive)',
                                                                outline: 'none',
                                                            },
                                                            pressed: {
                                                                fill: '#B0BEC5',
                                                                outline: 'none',
                                                            },
                                                        }}
                                                    />
                                                ))
                                            }
                                        </Geographies>
                                    </ZoomableGroup>
                                </ComposableMap>
                            </div>
                            <div className="flex flex-col gap-2 w-1/3 overflow-y-auto max-h-full absolute top-0 right-0 p-2">
                                {
                                    selectedCountryCities.length > 0 ? (
                                        selectedCountryCities.map((city: CityData, i: number) => (
                                            <div key={i} className="flex flex-row items-center justify-between transition-all bg-gray-200 rounded-full hover:shadow-md w-full p-2 pl-4">
                                                <p>{(getTextAfterChar(city.timezone, '/'))?.replace(/\_/g, ' ')}</p>
                                                <div className="flex items-center justify-center">
                                                    {
                                                        worldClockExists(city.timezone) ? (
                                                            <p className="p-3">Added</p>
                                                        ) : (
                                                            <button onClick={() => handleClickCreate(city)} className="button_circle !bg-[var(--primaryColor)]" ><FaPlus /></button>
                                                        )
                                                    }

                                                </div>
                                            </div>

                                        ))
                                    ) : (null)
                                }
                            </div>
                        </>
                    ) : (
                        <>
                            {
                                worldClocks.length > 0 ? (
                                    <>
                                        <div className="flex flex-col gap-2 w-full">
                                            {
                                                worldClocks.length > 0 ? (
                                                    worldClocks.map((wc: WorldClock, i: number) => (
                                                        <div key={i} className="flex flex-row items-center justify-between transition-all bg-gray-200 rounded-full hover:shadow-md px-2 py-1 w-full">
                                                            <p className="pl-4">{wc.timezoneText}</p>
                                                            <div className="flex flex-row gap-8 items-center">
                                                                <p>{zeroPad(wc.hours, 2)}:{zeroPad(wc.minutes, 2)}:{zeroPad(wc.seconds, 2)}</p>

                                                                <p>{wc.dateObj.toDateString()}</p>
                                                                <div className="flex items-center justify-center">
                                                                    <button onClick={() => handleClickDelete(wc)} className="button_circle !bg-red-400" ><FaRegTrashCan /></button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))
                                                ) : (null)
                                            }
                                        </div>
                                        <button className="button_2 absolute bottom-0 right-0 z-20" onClick={handleClickNew}>New</button>
                                    </>
                                ) : (
                                    <div className="flex items-center justify-center h-full">
                                        <button className="button_2" onClick={handleClickNew}>New</button>
                                    </div>
                                )
                            }

                        </>
                    )
                }




            </div>
        </>


    )


}





export default WorldClockMenu