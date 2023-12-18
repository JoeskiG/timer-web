import { makeID } from "./util"

export class Timer {
    private _id: string

    private _days: number
    private _hours: number
    private _minutes: number
    private _seconds: number

    private _endTime: number
    private _isExpired: boolean

    private _dateObj: Date

    private _interval?: NodeJS.Timeout | null

    private _timeRemaining: number

    constructor(
        duration?: number | null,
        endTime?: number | null,
        id?: string | null
    ) {
        if (typeof duration === 'undefined' && typeof endTime === 'undefined') {
            throw new Error("Either 'duration' or 'endTime' must be provided.");
        }

        this._id = id || makeID(10);


        const now = new Date();
        if (typeof endTime === 'number') {
            this._endTime = endTime

            this._timeRemaining = now.getTime() - (duration ?? 600000)
        } else {
            this._endTime = now.getTime() + (duration ?? 600000)
            this._timeRemaining = duration ?? 600000
        }


        this._dateObj = new Date(this._endTime)

        this._days = this._dateObj.getDate()
        this._hours = this._dateObj.getHours()
        this._minutes = this._dateObj.getMinutes()
        this._seconds = this._dateObj.getSeconds()

        this._isExpired = false

        this._interval = null

        

        this.tickInterval()
        this.startInterval()

    }

    public get id() {
        return this._id
    }

    public get days() {
        return this._days
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

    public get isExpired() {
        return this._isExpired
    }

    public get endTime() {
        return this._endTime
    }

    public get dateObj() {
        return this._dateObj
    }

    public get interval() {
        return this._interval
    }

    public get timeRemaining() {
        return this._timeRemaining
    }

    public startInterval() {
        this._interval = setInterval(() => this.tickInterval(), 1000)
    }

    private tickInterval() {
        const now = new Date().getTime()

        const distance = this._endTime - now;
        this._timeRemaining = distance

        if (distance < 0) {
            this._isExpired = true
        } else if (this._isExpired === true) {
            this._isExpired = false
        }


        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        this._days = days
        this._hours = hours
        this._minutes = minutes
        this._seconds = seconds
    }
}