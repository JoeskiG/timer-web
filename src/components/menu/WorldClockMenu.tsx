import { useState } from "react";
import cityTimezones, { CityData } from 'city-timezones'
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


function WorldClockMenu(): JSX.Element {
    const { addWorldClock, worldClocks } = useTimerContext() as { addWorldClock: (item: WorldClock) => void, worldClocks: WorldClock[] }

    const [selectedCountry, setSelectedCountry] = useState<any>(null);
    const [selectedCountryCities, setSelectedCountryCities] = useState<CityData[]>([])

    const handleCityClick = (country: any) => {
        const cities = cityTimezones.findFromCityStateProvince(country.properties.name)
        const newCities: CityData[] = []
        for (var city of cities) {
            const found = newCities.find(obj => obj.timezone === city.timezone)
            if (!found) {
                newCities.push(city)
            }

        }

        setSelectedCountryCities(newCities)
        setSelectedCountry(country);
    };


    const handleClickCreate = (city: CityData) => {
        const newClock = new WorldClock(city.timezone)
        addWorldClock(newClock)
    }

    return (
        <div className="relative w-full flex flex-col gap-2">
            <div className="flex flex-row gap-4 w-full justify-between">
                <div className="w-2/3 overflow-hidden">
                    <ComposableMap

                    >
                        <ZoomableGroup center={[0, 0]} minZoom={0.5} zoom={0.6}>
                            <Geographies geography="world-110m.json">
                                {({ geographies }) =>
                                    geographies.map((geo) => (
                                        <Geography
                                            key={geo.rsmKey}
                                            geography={geo}
                                            onClick={() => handleCityClick(geo)}
                                            style={{
                                                default: {
                                                    fill: geo.id === selectedCountry?.id ? 'var(--secondaryColor)' : '#ECEFF1',
                                                    outline: 'none',
                                                },
                                                hover: {
                                                    fill: geo.id === selectedCountry?.id ? 'var(--secondaryColor)' : '#CFD8DC',
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

                <div className="flex flex-col gap-2 w-1/3 overflow-y-auto">
                    {
                        selectedCountryCities.length > 0 ? (
                            selectedCountryCities.map((city: CityData, i: number) => (
                                <div key={i} className="flex flex-row items-center justify-between transition-all bg-gray-200 rounded-full hover:shadow-md w-full p-2 pl-4">
                                    <p>{getTextAfterChar(city.timezone, '/')}</p>
                                    <div className="flex items-center justify-center">
                                        <button onClick={() => handleClickCreate(city)} className="button_circle !bg-[var(--primaryColor)]" ><FaPlus /></button>
                                    </div>
                                </div>

                            ))
                        ) : (null)
                    }
                </div>

            </div>



            {
                worldClocks.length > 0 ? (
                    worldClocks.map((wc: WorldClock, i: number) => (
                        <div key={i} className="flex flex-row items-center justify-between transition-all bg-gray-200 rounded-full hover:shadow-md px-2 w-full">
                            <p className="px-4">{wc.timezoneText}</p>
                            <div className="flex flex-row gap-8 items-center">
                                <p>{zeroPad(wc.hours, 2)}:{zeroPad(wc.minutes, 2)}:{zeroPad(wc.seconds, 2)}</p>

                                <p>{wc.dateObj.toDateString()}</p>
                                <div className="flex items-center justify-center">
                                    <button className="button_circle !bg-red-400" ><FaRegTrashCan /></button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (null)
            }

        </div>
    )


}





export default WorldClockMenu