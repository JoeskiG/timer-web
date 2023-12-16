import { useState } from "react"
import { useTimerContext } from "../../contexts/useTimerContext"
import BaseModal from "./../templates/BaseModal"
import { useGlobalContext } from "../../contexts/useGlobalContext"
import { WorldClock } from "../../util/worldClock"
import cityTimezones from 'city-timezones'

import {
    ComposableMap,
    Geographies,
    Geography,
    ZoomableGroup
} from 'react-simple-maps';

interface ICreateTimerModal {
    id: number
}
const MapComponent = () => {
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [selectedCountryCities, setSelectedCountryCities] = useState([])

    const handleCityClick = (country: any) => {
        const cities = cityTimezones.findFromCityStateProvince(country.properties.name)
        setSelectedCountryCities(cities)
        setSelectedCountry(country);
    };

    return (
        <div className="w-full h-full">
            {selectedCountry && <p>Selected City: {selectedCountry.properties.name}</p>}
            <ComposableMap
                width={500}
                height={350}
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
    );
};


function CreateWorldClockModal(props: ICreateTimerModal): JSX.Element {

    const { addWorldClock } = useTimerContext() as { addWorldClock: (item: WorldClock) => void }
    const { removeModal } = useGlobalContext() as { removeModal: (id: number) => void }


    const [days, setDays] = useState<number>(0)
    const [hours, setHours] = useState<number>(0)
    const [minutes, setMinutes] = useState<number>(0)
    const [seconds, setSeconds] = useState<number>(0)


    return (
        <BaseModal minWidth="50%" id={props.id} title="Create World Clock">
            <>
                <MapComponent />

            </>



        </BaseModal>
    )
}

export default CreateWorldClockModal