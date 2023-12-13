import { CONTROL_TYPES } from "../../util/constants"
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

interface IIncrementControl {
    type: CONTROL_TYPES,
    step?: number | null,
    options?: string[] | null,
    defaultValue?: string | number | null,
    max?: number | null,
    min?: number | null,
    onChange: Function,
    value: number | string
}

function IncrementControl(props: IIncrementControl): JSX.Element {

    if (props.type === CONTROL_TYPES.number) {
        const currentValue = Number(props.value)
        const step = Number(props.step) || 1
        const max = typeof props.max !== undefined ? (Number(props.max)) : Infinity
        const min = typeof props.min !== undefined ? (Number(props.min)) : Infinity

        const handleIncrement = () => {
            if (currentValue + step > max) {
                return
            }
            //setCurrentValue(currentValue + step)
            props.onChange(currentValue + step)
        };

        const handleDecrement = () => {
            if (currentValue - step < min) {
                return
            }
            //setCurrentValue(currentValue - step)
            props.onChange(currentValue - step)
        };


        return (
            <div className="flex flex-col gap-4 justify-center items-center">
                <button className="button_1" onClick={handleIncrement}><FaChevronUp /></button>
                <p className="!text-3xl font-bold">{currentValue}</p>
                <button className="button_1" onClick={handleDecrement}><FaChevronDown /></button>
            </div>
        )
    } else if (props.type === CONTROL_TYPES.options) {
        const currentValue = props.value
        const options = props.options || []

        const handleIncrement = () => {
            const currentIndex = options?.findIndex(opt => opt == currentValue)
            if (currentIndex >= options.length - 1) {
                return
            }
            props.onChange(options[currentIndex + 1])
        };

        const handleDecrement = () => {
            const currentIndex = options?.findIndex(opt => opt == currentValue)
            if (typeof currentIndex === 'undefined') {
                return
            }
            if (currentIndex - 1 < 0) {
                return
            }
            props.onChange(options[currentIndex - 1])
        };


        return (
            <div className="flex flex-col gap-4 justify-center items-center">
                <button className="button_1" onClick={handleIncrement}><FaChevronUp /></button>
                <p className="!text-3xl font-bold">{currentValue}</p>
                <button className="button_1" onClick={handleDecrement}><FaChevronDown /></button>
            </div>
        )
    } else {
        return (
            <p>Error</p>
        )
    }


}

export default IncrementControl