'use client';

import { Suspense } from 'react';
import Loading from './loading';

interface Props {
  children: React.ReactNode;
}

const ProjectsDetailPageLayout = ({ children }: Props) => {
  return <Suspense fallback={<Loading />}>{children}</Suspense>;
};

export default ProjectsDetailPageLayout;
