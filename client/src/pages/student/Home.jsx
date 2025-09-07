// import React from 'react'
// import Hero from '../../components/students/Hero'
// import Companies from '../../components/students/Companies'
// import CoursesSection from '../../components/students/CoursesSection'
// import TestimonialsSection from '../../components/students/TestimonialsSection'
// import CallToAction from '../../components/students/CallToAction'
// import Footer from '../../components/students/Footer'

// const Home = () => {
//   return (
//     <div className='flex flex-col mt-0 items-center text-center'>
//        <Hero />
//        <Companies />
//        <CoursesSection />
//        <TestimonialsSection/>
//        <CallToAction />
//        <Footer />
//     </div>
//   )
// }

// export default Home







import React from 'react'
import Hero from '../../components/students/Hero'
import Companies from '../../components/students/Companies'
import CoursesSection from '../../components/students/CoursesSection'
import TestimonialsSection from '../../components/students/TestimonialsSection'
import CallToAction from '../../components/students/CallToAction'
import Footer from '../../components/students/Footer'


const Home = () => {
  return (
    <div className='items-center min-h-screen text-center'>
    {/* <div className='lex-1 w-full bg-orange-500 pt-10 pb-10'> */}
      <section className="w-full">
        <Hero />
      </section>

      <section className="w-full py-8">
        <Companies />
      </section>

      <section className="w-full py-8">
        <CoursesSection />
      </section>

      <section className="w-full py-8">
        <TestimonialsSection />
      </section>

      <section className="w-full py-8">
        <CallToAction />
      </section>
      <Footer/>
      
    </div>
  )
}

export default Home










