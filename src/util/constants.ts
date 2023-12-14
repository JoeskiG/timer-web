
export enum CONTROL_TYPES {
    number,
    options
}

export enum BACKGROUND_MODES {
    solid,
    gradient
}

export const CONSTANTS = {
    months: [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ],
    defaults: {

        background: {
            mode: BACKGROUND_MODES.gradient,
            colors: {
                color1: "#14C2CC",
                color2: "#fc3ee6",
                color3: "#FF00A0"
            },
            animationDuration: 10000 //ms
        },
        settings: {
            showCurrentDate: true
        }

    }
}