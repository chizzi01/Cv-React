import './App.css'
import { SocialLinks } from './components/social-Links'
import { Avatar } from './components/avatar'
import { CustomizedProgressBars } from './components/progressBar'
import { Navbar } from './components/navbar'
// import { Card } from './components/card'

export function App() {
  return (
    <div className='App'>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@100,200,300,400,500,600,700,800&display=swap');
      </style>
      <Navbar />
      <section className='avatar-section'>
        <Avatar />
        <div className='info-align'>
          <h1>Agustin<br></br>Chizzini Melo</h1>
          <h3> <span className='blue'> Desarrollador Web Jr</span> | <span className='green'>Analista BI </span> y estudiante de Lic. Sistemas</h3>
        </div>
      </section>
      <section className='estudios-section'>
        <h1>Estudios <span className='dark-blue'>_</span></h1>
        <div className='barContainer-align'>
          <CustomizedProgressBars title="Universitario" valueMount={79} />
          <CustomizedProgressBars title="Secundario" valueMount={100} />
        </div>
      </section>
      <section className='aptitudes-section'>
        <h1>Aptitudes <span className='dark-blue'>_</span></h1>
      </section>
      <SocialLinks/>
    </div>




  )

}
