import { getCurrentTime, getTextAfterChar, makeID } from "./util"


export class WorldClock {
    private _id: string

    private _timezone: string
    private _timezoneText: string

    private _hours: number
    private _minutes: number
    private _seconds: number

    private _dateObj: Date

    private _interval?: NodeJS.Timeout | null

    constructor(
        timezone: string,
        id?: string | null,
    ) {

        this._id = id || makeID(10);

        this._timezone = timezone
        this._timezoneText = (getTextAfterChar(timezone, '/') ?? timezone).replace(/\_/g, ' ')

        const currentTime = getCurrentTime(this._timezone)
        this._dateObj = currentTime.date

        this._hours = this._dateObj.getHours()
        this._minutes = this._dateObj.getMinutes()
        this._seconds = this._dateObj.getSeconds()


        this._interval = null

        this.tickInterval()
        this.startInterval()

    }

    public get id() {
        return this._id
    }


    public get hours() {
        return this._hours
    }

    public get minutes() {
        return this._minutes
    }

    public get seconds() {
        return this._seconds
    }

    public get timezone() {
        return this._timezone
    }

    public get timezoneText() {
        return this._timezoneText
    }

    public get dateObj() {
        return this._dateObj
    }

    public get interval() {
        return this._interval
    }

    public startInterval() {
        this._interval = setInterval(() => this.tickInterval(), 1000)
    }

    private tickInterval() {
        const currentTime = getCurrentTime(this._timezone)

        this._hours = currentTime.hours
        this._minutes = currentTime.minutes
        this._seconds = currentTime.seconds

        this._dateObj = currentTime.date
    }




}

