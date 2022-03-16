import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';
import HomepageFeatures from '../components/HomepageFeatures';
import MetadataHead from '../components/Head';
// import HomepageFooter from '../components/HomepageFooter';

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout>
      <MetadataHead />
      <HomepageFeatures />
      {/* <HomepageFooter /> */}
    </Layout>
  );
}
