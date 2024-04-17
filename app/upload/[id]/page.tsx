import React from 'react'

const UpdateVaga = () => {
  return (
    <div className='w-full max-w-[1280px] gap-2 flex flex-col rounded bg-blue-400 border-2 border-white shadow-md'>
      <h2 className='text-4xl font-mono text-center my-3'>Atualizando status da vaga</h2>
      <form className='w-[600px] max-w-[1280px] flex flex-col rounded items-center justify-center gap-3 m-auto py-2'>
          <label className='text-2xl font-mono items-start my-1'>Número de candidatos:</label>
          <input placeholder='3' type='number' required className='w-[300px] text-center rounded text-black border-2 border-black pl-2'/>

          <label className='text-2xl font-mono items-start my-1'>Em triagem:</label>
          <input placeholder='2' type='number' required className='w-[300px] text-center rounded text-black border-2 border-black pl-2'/>
      </form>
    </div>
  )
}

export default UpdateVaga