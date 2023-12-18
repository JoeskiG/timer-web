import { CityData } from "city-timezones";
import cityTimezones from 'city-timezones'

export class CityTimezones {
    static cities: CityData[] = cityTimezones.cityMapping

    static getCitiesByCountryName(countryName: string) {
        return this.cities.filter((city: CityData) => city.country === countryName)
    }


}