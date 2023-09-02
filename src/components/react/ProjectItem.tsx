type Props = {
  image: string;
  slug: {
    current: string;
  };
  techs: string[];
  title: string;
  dim: string;
};

const ProjectItem = ({ image, slug, techs, title, dim }: Props) => {
  return (
    <div className='group'>
      <section
        className={`scale-80 bg-primary group-hover:z-10 group-hover:scale-100 md:scale-95 ${dim} card relative flex w-full flex-col rounded-none duration-300`}>
        <figure className='object-cover'>
          <img
            loading='eager'
            className='duration-300 group-hover:scale-105'
            src={image}
            alt={title}
            width='1366'
            height='768'
          />
        </figure>
        <div className='card-body'>
          <h2 className='card-title text-secondary'>{title}</h2>
          <p>
            Tech: <br />
            {techs.map((tech, index) => {
              return (
                <span key={tech}>
                  {tech}
                  {index < techs.length - 1 ? ' | ' : ''}
                </span>
              );
            })}
          </p>
          <div className='card-actions justify-start'>
            <a href={`/projects/${slug.current}`}>
              <button className='bg-secondary px-5 py-2 font-bold  text-base-100 duration-100 hover:bg-secondary-focus/80 active:scale-95 active:bg-secondary-focus'>
                More Info
              </button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProjectItem;
