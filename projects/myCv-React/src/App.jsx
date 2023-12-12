import './App.css'
import { SocialLinks } from './components/social-Links'
import { Avatar } from './components/avatar'

export function App() {
  return (
    <section className='App'>

      <section className='avatar-section'>
      <Avatar></Avatar>
      <h1>Agustin Chizzini Melo</h1>
      </section>
      <SocialLinks></SocialLinks>

    </section>

  )

}
