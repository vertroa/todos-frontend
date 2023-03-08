import Head from 'next/head'

export default function Home() {
  return (
    <>
      <head>
        <title>Todos</title>
      </head>

      <header className='flex items-center justify-between bg-red-500 py-4 px-20 text-3xl font-bold drop-shadow-md text-white '>
        <h1 className="">
          Todos
        </h1>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={4} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
      </header>
      
      <div className='flex h-scree'>
        <div className="mx-auto my-20">
          Todos go here 
        </div>
      </div>
    </>
  )
}
