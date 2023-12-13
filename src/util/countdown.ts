export class Countdown {
    private _id: string

    private _days: number
    private _hours: number
    private _minutes: number
    private _seconds: number

    private _endTime: number
    private _isExpired: boolean

    private _dateObj: Date

    private _interval?: NodeJS.Timeout | null

    constructor(
        endTime: number | string,
        id: string
    ) {
        this._id = id
        this._dateObj = new Date(endTime)

        this._endTime = this._dateObj.getTime()

        this._days = this._dateObj.getDate()
        this._hours = this._dateObj.getHours()
        this._minutes = this._dateObj.getMinutes()
        this._seconds = this._dateObj.getSeconds()

        this._isExpired = false

        this._interval = null

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

    public startInterval() {
        this._interval = setInterval(() => {

            const now = new Date().getTime()

            const distance = this._endTime - now;

            if (distance < 0) {
                this._isExpired = true
                //clearInterval(this._interval);
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

        }, 1000)
    }
}