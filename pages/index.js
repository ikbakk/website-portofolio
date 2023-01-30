import Head from 'next/head'
import MainScreen from '../components/MainScreen'
import { sanityClient, imgUrl } from '../utils/sanity'
import { HiOutlineChevronDoubleUp } from 'react-icons/hi'
import Link from 'next/link'

export default function Home({ data }) {
  const metaImg = imgUrl(data.image).url()
  return (
    <>
      <Head>
        <title>Iqbal | Front-End Developer</title>
        <meta name='description' content='A personal website portfolio' />
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
      <main className='h-screen'>
        <MainScreen data={data} />
        <div className={`fixed bottom-0 right-5 z-30 py-12 md:hidden`}>
          <Link onclick='return false;' href='/'>
            <div className='cursor-pointer rounded-full bg-primary p-4 outline outline-secondary duration-100 ease-in hover:scale-110'>
              <HiOutlineChevronDoubleUp className='text-secondary' size={22} />
            </div>
          </Link>
        </div>
      </main>
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
    },
    revalidate: 60
  }
}
