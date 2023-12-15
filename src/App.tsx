import { useTimerContext } from './contexts/useTimerContext'
import { useGlobalContext } from './contexts/useGlobalContext';
import MenuModal from './components/MenuModal';
import { formatDate } from './util/util';
import { FaGear } from 'react-icons/fa6';
import { Countdown } from './util/countdown';
import { BACKGROUND_MODES } from './util/constants';

function App() {
  const { countdowns } = useTimerContext() as { countdowns: Countdown[] }
  const {
    setModal,
    modal0,
    modal1,
    backgroundMode,
    backgroundSettings,
    showCurrentDate
  } = useGlobalContext() as {
    setModal: (id: number, element: JSX.Element) => void,
    modal0: JSX.Element,
    modal1: JSX.Element,
    backgroundMode: BACKGROUND_MODES,
    backgroundSettings: any,
    showCurrentDate: boolean
  }


  const handleClickTimer = () => {
    setModal(0, (
      <MenuModal id={0} />
    ))
  }

  return (
    <>
      {
        modal0 && modal0
      }
      {
        modal1 && modal1
      }
      <div
        id="bgMain"
        style={
          backgroundMode === BACKGROUND_MODES.gradient ? (
            {
              background: `linear-gradient(-45deg, ${backgroundSettings.colors.color1}, ${backgroundSettings.colors.color2}, ${backgroundSettings.colors.color3})`,
              animation: `gradient ${backgroundSettings.animationDuration}ms ease infinite`
            }
          ) : backgroundMode === BACKGROUND_MODES.solid ? (
            {
              backgroundColor: backgroundSettings.colors.color1
            }
          ) : (undefined)
        }
        className='flex gap-16 overflow-hidden flex-col p-4 justify-center h-full w-full transition-all items-center'>
        {
          countdowns.length > 0 ? (
            countdowns.map((countdown: Countdown, i: number) => {
              if (!countdown.isExpired) {
                return (
                  <div key={i} onClick={handleClickTimer} id="timerMain" className='transition-all p-24 shadow-2xl hover:shadow-3xl hover:scale-[100.5%] rounded-full bg-white flex justify-center items-center'>
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
                <h1>Timer ended</h1>
              }
            })

          ) : (
            <h1>Click to start</h1>
          )
        }

        {
          showCurrentDate && (
            <div id="nowDisplay" className='relative transition-all p-24 shadow-2xl hover:shadow-3xl hover:scale-[100.5%] rounded-full bg-gray-200 flex justify-center items-center'>
              <h2>{formatDate(new Date().toString())}</h2>

            </div>
          )
        }


        {/* <div className='absolute transition-all bottom-0 right-0 flex items-center justify-center z-20 opacity-0 hover:opacity-100 p-4'>
          <input className='px-4 py-2 rounded-full shadow-2xl' onChange={handleEndTimeChange} type="date" name="" id="" />
        </div> */}
        <div className='absolute transition-all top-0 right-0 flex items-center justify-center z-20 opacity-0 hover:opacity-100 p-4'>
          <button onClick={handleClickTimer} className='p-4 bg-white rounded-full shadow-2xl'><FaGear /></button>
        </div>


      </div>
    </>
  )
}

export default App
