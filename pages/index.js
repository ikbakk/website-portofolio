import Head from 'next/head'
import MainScreen from '../components/MainScreen'
import About from '../components/About'
import Skills from '../components/Skills'
import Projects from '../components/Projects'
import Contact from '../components/Contact'
import { sanityClient, imgUrl } from '../utils/sanity'

export default function Home({ data }) {
  const metaImg = imgUrl(data.image).url()
  return (
    <>
      <Head>
        <title>Iqbal | Front-End Developer</title>
        <meta
          name='description'
          content='A personal website portfolio with Next.js, place to showcase simple projects i have built so far.'
        />
        <meta property='og:image' content={metaImg} />
        <meta
          property='og:title'
          content='Iqbal Firdaus | Front-End Web Developer'
        />
        <meta property='og:url' content='https://ikbak.vercel.app/' />
        <meta property='og:type' content='article' />
        <meta property='og:image:secure_url' content={metaImg} />
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
    image,
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
