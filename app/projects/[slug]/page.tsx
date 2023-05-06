import ProjectDetail from '../../../components/ProjectDetail';
import { projectDetailQuery } from '../../../utils/queries';
import { sanityClient } from '../../../utils/sanity';

const ProjectsDetailPage = async ({ params }) => {
  const data = await sanityClient.fetch(projectDetailQuery, {
    slug: params.slug
  });

  return (
    <div className='h-screen'>
      <ProjectDetail data={data} />
    </div>
  );
};

export default ProjectsDetailPage;
