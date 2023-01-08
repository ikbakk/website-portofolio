import Head from 'next/head'
import MainScreen from '../components/MainScreen'
import About from '../components/About'
import Skills from '../components/Skills'
import Projects from '../components/Projects'
import Contact from '../components/Contact'
import { sanityClient } from '../utils/sanity'

export default function Home({ data }) {
  return (
    <>
      <Head>
        <title>Iqbal | Front-End Developer</title>
        <meta name='description' content="I'm a front-end web developer " />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <MainScreen data={data} />
      <About />
      <Skills data={data} />
      {/* <Projects /> */}
      <Contact />
    </>
  )
}

export const getStaticProps = async () => {
  const query = `*[_type =='info' ][0]{
    _id,
    name,
    'skills': *[_type == 'skills']{
      name,logo
    },
    image,
    'socials': *[_type == 'socials']{
      name,link
    }
  }`

  const data = await sanityClient.fetch(query)
  return {
    props: {
      data
    }
  }
}
