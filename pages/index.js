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
      <Projects data={data} />
      <Contact />
    </>
  )
}

export const getStaticProps = async () => {
  const query = `*[_type =='info' ][0]{
    _id,
    firstName,
    lastName,
    description,
    'skills': *[_type == 'skills']{
      name,logo
    },
    'projects': *[_type == 'projects']{
      title,image,tech,overview,slug
    },
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
