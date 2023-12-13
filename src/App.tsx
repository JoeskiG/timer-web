import { ChangeEvent } from 'react';
import { useTimerContext } from './contexts/useTimerContext'
import { useGlobalContext } from './contexts/useGlobalContext';
import MenuModal from './components/MenuModal';
import { formatDate } from './util/util';
import { FaGear } from 'react-icons/fa6';
import { Countdown } from './util/countdown';

function App() {
  const { countdowns } = useTimerContext() as { countdowns: Countdown[] }
  const { setModal, modal0, modal1 } = useGlobalContext() as { setModal: (id: number, element: JSX.Element) => void, modal0: JSX.Element, modal1: JSX.Element }


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
        className='flex gap-16 flex-col justify-center h-full w-full items-center'>
        <div onClick={handleClickTimer} id="timerMain" className='relative transition-all p-24 shadow-2xl hover:shadow-3xl hover:scale-[100.5%] rounded-full bg-white flex justify-center items-center'>
          {
            countdowns.length > 0 && (
              !countdowns[0].isExpired ? (
                <>
                  {/* <div className='w-full absolute h-full'>
                    <div className='h-full bg-green-400 rounded-full'></div>
                  </div> */}


                  <div className='z-10 h-full w-full flex gap-8 flex-row items-center justify-center'>
                    {
                      countdowns[0].days > 0 && (
                        <>
                          <div className='p-4'>
                            <h1>{countdowns[0].days} d</h1>
                          </div>
                          <p>:</p>
                        </>

                      )
                    }

                    {
                      countdowns[0].hours >= 0 && (
                        <>
                          <div className='p-4'>
                            <h1>{countdowns[0].hours} h</h1>
                          </div>
                          <p>:</p>
                        </>
                      )
                    }

                    {
                      countdowns[0].minutes >= 0 && (
                        <>
                          <div className='p-4'>
                            <h1>{countdowns[0].minutes} m</h1>
                          </div>
                          <p>:</p>
                        </>
                      )
                    }

                    {
                      countdowns[0].seconds >= 0 && (
                        <>
                          <div className='p-4'>
                            <h1>{countdowns[0].seconds} s</h1>
                          </div>
                        </>
                      )
                    }

                  </div>

                </>
              ) : (
                <h1>Timer ended</h1>
              )
            )
          }

        </div>
        <div onClick={handleClickTimer} id="nowDisplay" className='relative transition-all p-24 shadow-2xl hover:shadow-3xl hover:scale-[100.5%] rounded-full bg-gray-200 flex justify-center items-center'>
          <h2>{formatDate(new Date().toString())}</h2>

        </div>

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
