import Head from 'next/head'
import { TodoType } from '@/types/types'
import Todo from '../components/Todo'

 
export default function Home({ todos }: { todos: TodoType[] }) {
  return (
    <>
      <header className='flex items-center justify-between bg-red-500 py-4 px-64 text-3xl font-bold drop-shadow-md text-white '>
        <h1 className="">
          To Dos
        </h1>
        <button className='hover:cursor-pointer'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={4} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </button>
      </header>
      
      {todos.map((todo) => 
          <Todo todo={todo}/>
      )}
    </>
  )
}


export async function getServerSideProps() {
  const res = await fetch('http://localhost:8080/todos/')
  const todos = await res.json()

  return {
    props: {
      todos
    }
  }
}