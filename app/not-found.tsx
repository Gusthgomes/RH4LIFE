import Link from 'next/link';

 
const NotFound = () => {
  return (
    <div className='w-full flex flex-col justify-center items-center mt-4'>
      <h2 className='text-black text-4xl font-semibold my-5'>
        <span className='text-red-500 font-4xl font-bold mr-2'>OPS!</span>
        Não foi possível encontrar essa página
      </h2>
      
        <Link 
          className='w-80 rounded-lg border-slate-400 border-2 bg-blue-400 flex flex-row justify-center items-center mx-auto py-2 text-center' 
          href='/dashboard'>
          Clique aqui para voltar
        </Link>
      
    </div>
  )
}

export default NotFound;