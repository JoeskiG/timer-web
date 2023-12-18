
function AboutMenu(): JSX.Element {

    return (
        <div className="relative w-full flex flex-col gap-2">

            <div className="flex flex-col transition-all standardPadding px-6 w-full">
                <p className="font-bold text-xl">Clock App for Wallpaper Engine</p>
                <p>Version 0.5</p>
                <br />
                <p>WORK IN PROGRESS! THERE WILL BE ISSUES!</p>
                <br />
                <p>Post a comment on the Workshop page for feedback.</p>
                <br />
                <a href="https://github.com/JoeskiG">By <b>JoeskiG</b> on GitHub</a>

                <br />
                <br />
                <p className="font-bold text-lg">Libraries</p>
                <ul>
                    <li>react-simple-maps for world clock map</li>
                    <li>react-colorful for color pickers</li>
                    <li>react-icons for Font Awesome 6 icons</li>
                    <li>city-timezones for city and timezone data for world clock</li>
                </ul>
            </div>
        </div>
    )


}





export default AboutMenu