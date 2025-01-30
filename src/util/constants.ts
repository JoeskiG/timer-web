
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
                color1: "#00f2ff",
                color2: "#a600ff",
                color3: "#ff00a2"
            },
            animationDuration: 10000 //ms
        },
        settings: {
            showCurrentDate: true,
            globalBottomPadding: 50,
            globalZoom: 100
        }

    }
}