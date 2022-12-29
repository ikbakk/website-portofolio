import Head from 'next/head'
import MainScreen from '../components/MainScreen'
import About from '../components/About'
import Skills from '../components/Skills'
import Projects from '../components/Projects'
import Contact from '../components/Contact'

export default function Home() {
  return (
    <>
      <Head>
        <title>Iqbal | Front-End Developer</title>
        <meta name='description' content="I'm a front-end web developer " />
        <link rel='icon' href='/favicon.ico' />
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://fonts.gstatic.com' crossorigin />
        <link
          href='https://fonts.googleapis.com/css2?family=Raleway&display=swap'
          rel='stylesheet'
        />
      </Head>
      <MainScreen />
      <About />
      <Skills />
      <Projects />
      <Contact />
    </>
  )
}
