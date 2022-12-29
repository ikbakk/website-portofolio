import Head from 'next/head'
import MainScreen from '../components/MainScreen'

export default function Home() {
  return (
    <>
      <Head>
        <title>Iqbal | Front-End Developer</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://fonts.gstatic.com' crossorigin />
        <link
          href='https://fonts.googleapis.com/css2?family=Raleway&display=swap'
          rel='stylesheet'
        />
      </Head>
      <MainScreen />
    </>
  )
}
