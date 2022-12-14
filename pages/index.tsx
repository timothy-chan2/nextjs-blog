import Head from 'next/head';
import Link from 'next/link';
import { GetStaticProps } from 'next';

import Layout, { siteTitle } from '../components/layout';
import Date from '../components/date';

import utilStyles from '../styles/utils.module.css';

import { getSortedPostsData } from '../lib/posts';

// getStaticProps only runs on the server-side
export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}

export default function Home({
  allPostsData
}: {
  allPostsData: {
    date: string,
    title: string,
    id: string
  }[]
}) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>Hello, I'm Timothy. I'm a full stack web developer and a 
          production support with SRE trainee. You can find more 
          details about me on <a href="https://linkedin.com/in/timothychan2" target="_blank">my LinkedIn profile</a>.
        </p>
        <p>
          Please feel free to click on any of the below links to read more 
          about that topic. This website is built following instructions 
          from the Learn Next.js tutorial.
        </p>
      </section>

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>          
          ))}
        </ul>
      </section>
    </Layout>
  );
}