import { ChangeEvent } from 'react';
import { useTimerContext } from './contexts/useTimerContext'

function App() {
  const { changeEndTimeFromString, isExpired, days, hours, minutes, seconds } = useTimerContext()

  const handleEndTimeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    changeEndTimeFromString(target.value);
  };

  return (
    <>
      <div
        id="bgMain"
        className='flex justify-center h-full w-full items-center'>
        <div id="timerMain" className='relative transition-all p-24 shadow-2xl hover:shadow-3xl hover:scale-[100.5%] rounded-full bg-white flex justify-center items-center'>
          {
            !isExpired ? (
              <>
                {/* <div className='w-full absolute h-full'>
                  <div className='h-full bg-green-400 rounded-full'></div>
                </div> */}


                <div className='z-10 h-full w-full flex gap-8 flex-row items-center justify-center'>
                  <div className='p-4'>
                    <h1>{days} d</h1>
                  </div>
                  <p>:</p>
                  <div className='p-4'>
                    <h1>{hours} h</h1>
                  </div>
                  <p>:</p>
                  <div className='p-4'>
                    <h1>{minutes} m</h1>
                  </div>
                  <p>:</p>
                  <div className='p-4'>
                    <h1>{seconds} s</h1>
                  </div>
                </div>

              </>
            ) : (
              <h1>Timer ended</h1>
            )
          }

        </div>
        <div className='absolute transition-all bottom-0 right-0 flex items-center justify-center z-20 opacity-0 hover:opacity-100 p-4'>
          <input className='px-4 py-2 rounded-full shadow-2xl' onChange={handleEndTimeChange} type="date" name="" id="" />
        </div>


      </div>
    </>
  )
}

export default App
