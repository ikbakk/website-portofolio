import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html className='font-raleway' data-theme='mytheme' lang='en'>
      <Head />
      <body>
        <Main />
        <NextScript />
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://fonts.gstatic.com' crossorigin />
        <link
          href='https://fonts.googleapis.com/css2?family=Raleway&display=swap'
          rel='stylesheet'
        />
      </body>
    </Html>
  )
}
