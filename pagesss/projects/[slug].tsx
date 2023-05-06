import Head from 'next/head'
import ProjectDetail from '../../components/ProjectDetail'
import { sanityClient } from '../../utils/sanity'

const projectId = ({ project }) => {
  return (
    <>
      <div className='h-screen'>
        <Head>
          <title>{project.title}</title>
          <meta name={project.title} content={project.overview} />
          <link rel='icon' href='/favicon.ico' />
        </Head>
        <ProjectDetail data={project} />
      </div>
    </>
  )
}

export default projectId

export const getStaticPaths = async () => {
  const query = `*[_type == "projects"]{
    _id,slug {
      current
    }
  }`
  const projects = await sanityClient.fetch(query)
  const paths = projects.map((project) => ({
    params: {
      slug: project.slug.current
    }
  }))
  return {
    paths,
    fallback: 'blocking'
  }
}

export const getStaticProps = async ({ params }) => {
  const query = `*[_type == 'projects' && slug.current == $slug][0]{
    title, overview, tech, image, demo, code
  }`

  const project = await sanityClient.fetch(query, {
    slug: params?.slug
  })

  if (!project) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      project
    },
    revalidate: 60
  }
}
