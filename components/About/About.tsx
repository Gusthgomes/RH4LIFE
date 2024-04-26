import React from 'react';
import Image from 'next/image';

const About = () => {
  return (
    <div>
        <h2 className='text-xl md:text-2xl font-mono my-2 md:my-4'>Bem-vindo ao Nosso Setor de Recursos Humanos..</h2>
        <p className='text-base md:text-lg font-mono'>Aqui acreditamos que o coração de uma organização bem-sucedida reside em seu pessoal. É por isso que nosso setor de Recursos Humanos se dedica a cultivar um ambiente de trabalho onde talentos possam florescer, ideias possam prosperar e o sucesso seja uma jornada compartilhada</p>

        <section className='w-full flex flex-col md:flex-row items-center justify-center text-xl md:text-2xl font-mono gap-2 md:gap-3 p-2 rounded my-2 md:my-4'>
            <Image 
                src="/assets/images/RH1.jpeg" 
                alt="RH1" 
                width={300} 
                height={200} 
                className="rounded-xl mr-3"
            ></Image>

            <p className='text-1xl'><span className='font-bold text-blue-600'>Recrutamento e Seleção:</span> Encontramos os melhores talentos usando uma abordagem holística que avalia não apenas as competências técnicas, mas também o alinhamento cultural e a paixão pelo que fazem.</p>
        </section>

        <section className='w-full flex flex-col md:flex-row items-center justify-center text-xl md:text-2xl font-mono gap-2 md:gap-3 p-2 rounded my-2 md:my-4'>
        <p className='text-1xl'><span className='font-bold text-blue-600'>Desenvolvimento Profissional:</span> Oferecemos programas de treinamento e desenvolvimento contínuos para garantir que nossos colaboradores estejam sempre à frente nas últimas tendências e práticas do setor.</p>

            <Image 
                src="/assets/images/RH4.jpeg" 
                alt="RH4" 
                width={300} 
                height={200} 
                className="rounded-xl mr-3"
            ></Image>
        </section>

        <section className='w-full flex flex-col md:flex-row items-center justify-center text-xl md:text-2xl font-mono gap-2 md:gap-3 p-2 rounded my-2 md:my-4'>
            <Image 
                src="/assets/images/RH2.jpeg" 
                alt="RH2" 
                width={300} 
                height={200} 
                className="rounded-xl mr-3"
            ></Image>

            <p className='text-1xl'><span className='font-bold text-blue-600'>Gestão de Desempenho:</span> Através de feedbacks construtivos e avaliações periódicas, trabalhamos para garantir que todos estejam alinhados com os objetivos da empresa e se sintam valorizados por suas contribuições.</p>
        </section>

        <section className='w-full flex flex-col md:flex-row items-center justify-center text-xl md:text-2xl font-mono gap-2 md:gap-3 p-2 rounded my-2 md:my-4'>
        <p className='text-1xl'><span className='font-bold text-blue-600'>Gerenciar o capital humano da empresa:</span> alinhando as estratégias de recursos humanos com os objetivos organizacionais. Isso inclui recrutamento e seleção de talentos, desenvolvimento profissional, gestão de desempenho, e promoção de um ambiente de trabalho inclusivo e produtivo.</p>

            <Image 
                src="/assets/images/RH3.jpeg" 
                alt="RH3" 
                width={300} 
                height={200} 
                className="rounded-xl mr-3"
            ></Image>
        </section>

        <footer className='w-full h-16 md:h-30 flex flex-col md:flex-row gap-2 md:gap-5 items-center justify-center md:justify-between rounded bg-blue-400 p-2 md:px-4 mt-2 md:mt-6'>
    <div className='font-mono flex flex-row items-center md:items-start px-1 md:px-0'>
        <Image 
            src="/assets/icons/logo.ico" 
            alt="Logo" 
            width={30} 
            height={15} 
            className="rounded-xl mr-2 md:mr-3 p-1 md:p-0 mt-0"
        ></Image>
        <p className='text-base md:text-lg'>RH4LIFE - Todos os direitos reservados/2024</p>
    </div>

    <div className="mt-2 md:mt-0">
        <p className='text-base md:text-lg'>Em caso de dúvida: Gomesgustavo20@outlook.com</p>
    </div>
</footer>

        
    </div>
  )
}

export default About