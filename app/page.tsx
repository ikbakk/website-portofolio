import React from 'react';
import { sanityClient } from '../utils/sanity';
import { mainInfoQuery } from '../utils/queries';
import MainScreen from '../components/MainScreen';
import MobileNavbar from '../components/MobileNavbar';

export const revalidate = 10;

const RootPage = async () => {
  const mainInfo = await sanityClient.fetch(mainInfoQuery);
  return (
    <main>
      <MainScreen data={mainInfo} />
    </main>
  );
};

export default RootPage;
