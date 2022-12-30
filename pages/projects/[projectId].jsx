import Head from 'next/head'
import Loading from '../../components/Loading'
import ProjectDetail from '../../components/ProjectDetail'
import { useRouter } from 'next/router'
import { db } from '../../components/config/firebase'
import { doc } from 'firebase/firestore'
import { useDocument } from 'react-firebase-hooks/firestore'

const projectId = () => {
  const router = useRouter()
  const id = router.query.projectId
  const [value, loading] = useDocument(doc(db, 'porto', 'projectDetail'), {
    snapshotListenOptions: { includeMetadataChanges: true }
  })
  return (
    <>
      <div className='h-screen'>
        {loading ? (
          <>
            <Head>
              <title>Projects</title>
              <meta
                name='description'
                content="I'm a front-end web developer "
              />
              <link rel='icon' href='/favicon.ico' />
            </Head>
            <Loading />
          </>
        ) : (
          <>
            <Head>
              <title>{value.data()[id].title}</title>
              <meta
                name={`${value.data()[id].title}`}
                content={`${value.data()[id].content}`}
              />
              <link rel='icon' href='/favicon.ico' />
            </Head>
            <ProjectDetail data={value.data()[id]} />
          </>
        )}
      </div>
    </>
  )
}

export default projectId
