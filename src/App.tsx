import { useState } from 'react';
import { FaGear } from 'react-icons/fa6';
import MenuView from './components/MenuView';
import { useGlobalContext } from './contexts/useGlobalContext';
import { useTimerContext } from './contexts/useTimerContext';
import { BACKGROUND_MODES } from './util/constants';
import { Countdown } from './util/countdown';
import { formatDate, zeroPad } from './util/util';
import { WorldClock } from './util/worldClock';

function App() {
  const { countdowns, worldClocks } = useTimerContext() as { countdowns: Countdown[], worldClocks: WorldClock[] }
  const {
    //setModal,
    modal0,
    modal1,
    backgroundMode,
    backgroundSettings,
    showCurrentDate,
    globalBottomPadding
  } = useGlobalContext()

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)


  const handleClickTimer = () => {
    setIsMenuOpen(true)
  }

  return (
    <div className='w-full h-full'>
      {
        modal0 && modal0
      }
      {
        modal1 && modal1
      }

      {
        !isMenuOpen ? (
          <div
            id="bgMain"
            style={
              backgroundMode === BACKGROUND_MODES.gradient ? (
                {
                  background: `linear-gradient(-45deg, ${backgroundSettings.colors.color1}, ${backgroundSettings.colors.color2}, ${backgroundSettings.colors.color3})`,
                  animation: `gradient ${backgroundSettings.animationDuration}ms ease infinite`,
                  paddingBottom: `${globalBottomPadding}px`
                }
              ) : backgroundMode === BACKGROUND_MODES.solid ? (
                {
                  backgroundColor: backgroundSettings.colors.color1,
                  paddingBottom: `${globalBottomPadding}px`

                }
              ) : (undefined)
            }
            className='flex gap-16 overflow-hidden flex-col p-4 justify-center h-full w-full transition-all items-center'>
            {
              countdowns.length > 0 || worldClocks.length > 0 ? (
                countdowns.map((countdown: Countdown, i: number) => {
                  if (!countdown.isExpired) {
                    return (
                      <div key={i} onClick={handleClickTimer} id="timerMain" className='transition-all p-16 shadow-2xl hover:shadow-3xl hover:scale-[100.5%] rounded-full bg-white flex justify-center items-center'>
                        <div className='z-10 h-full w-full flex gap-8 flex-row items-center justify-center'>
                          {
                            countdown.days > 0 && (
                              <>
                                <div className='p-4'>
                                  <h1>{countdown.days} d</h1>
                                </div>
                                <p>:</p>
                              </>

                            )
                          }

                          {
                            countdown.hours >= 0 && (
                              <>
                                <div className='p-4'>
                                  <h1>{countdown.hours} h</h1>
                                </div>
                                <p>:</p>
                              </>
                            )
                          }

                          {
                            countdown.minutes >= 0 && (
                              <>
                                <div className='p-4'>
                                  <h1>{countdown.minutes} m</h1>
                                </div>
                                <p>:</p>
                              </>
                            )
                          }

                          {
                            countdown.seconds >= 0 && (
                              <>
                                <div className='p-4'>
                                  <h1>{countdown.seconds} s</h1>
                                </div>
                              </>
                            )
                          }

                        </div>

                      </div>
                    )
                  } else {
                    <h1>Countdown ended</h1>
                  }
                })

              ) : (
                <div onClick={handleClickTimer} id="timerMain" className='transition-all p-24 shadow-2xl hover:shadow-3xl hover:scale-[100.5%] rounded-full bg-white flex justify-center items-center'>
                  <h1>Click to start</h1>

                </div>
              )
            }

            {
              showCurrentDate && (
                <div onClick={handleClickTimer} className='clockDisplay relative transition-all p-24 shadow-2xl hover:shadow-3xl hover:scale-[100.5%] rounded-full bg-gray-200 flex justify-center items-center'>
                  <h2>{formatDate(new Date().toString())}</h2>

                </div>
              )
            }

            <div className='flex flex-row gap-8'>
              {
                worldClocks.length > 0 && (
                  worldClocks.map((wc: WorldClock, i: number) => (
                    <div key={i} onClick={handleClickTimer} className='clockDisplay relative transition-all p-24 shadow-2xl hover:shadow-3xl hover:scale-[100.5%] rounded-full bg-gray-200 flex justify-center items-center'>
                      <h2>{zeroPad(wc.hours, 2)}:{zeroPad(wc.minutes, 2)}:{zeroPad(wc.seconds, 2)} in {wc.timezoneText}</h2>

                    </div>
                  ))

                )
              }
            </div>


            <div className='absolute transition-all top-0 right-0 flex items-center justify-center z-20 opacity-0 hover:opacity-100 p-4'>
              <button onClick={handleClickTimer} className='p-4 bg-white rounded-full shadow-2xl'><FaGear /></button>
            </div>


          </div>
        ) : (
          <MenuView onClose={() => setIsMenuOpen(false)} />
        )
      }

    </div>
  )
}

export default App
