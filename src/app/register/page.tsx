import { EnvelopeIcon } from '@heroicons/react/20/solid';

export default function Page() {
  return (
    <form action='' className='flex justify-center items-center mt-10 w-full'>
      <div className='flex flex-col items-center rounded-xl p-10 m-5 bg-color-surface-mixed-200 sm:w-[30rem] w-full'>
        <h1>REGISTER</h1>
        <div className='flex flex-col w-full mt-6 border-b border-color-surface-600'>
          <label htmlFor='code' className='px-1 mb-1 text-sm'>
            Access code
          </label>
          <div className='relative'>
            <input
              id='code'
              name='code'
              type='text'
              placeholder='Access code'
              className='pl-8 py-1 w-full text-xl'
            />
            <EnvelopeIcon className='pointer-events-none absolute left-2 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-color-surface-600' />
          </div>
        </div>
        <button className='w-full mt-10 p-3 rounded-full bg-color-primary-500 text-xl text-white font-bold'>
          REGISTER
        </button>
      </div>
    </form>
  );
}
