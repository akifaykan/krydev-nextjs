import Head from 'next/head';
import { gql } from '@apollo/client';
import { getApolloClient } from '../../lib/apollo-client';
import styles from '../../styles/Single.module.css';
import Header from '../components/Header';

const singlePage = ({ site, page, menus }) => {
    const { content, title } = page;

    return (
        <>
            <Head>
                <title>
                    {title} &mdash; {site.title}
                </title>
                <meta name="description" content={site.description} />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header menus={menus} />
            <div className="single page">
                <h1 className={styles.post__title}>{title}</h1>
                <div
                    className="single__content"
                    dangerouslySetInnerHTML={{
                        __html: content,
                    }}
                ></div>
            </div>
        </>
    );
};

export default singlePage;

export async function getStaticProps({ params = {} } = {}) {
    const { pageSlug } = params;

    const apolloClient = getApolloClient();

    const data = await apolloClient.query({
        query: gql`
            query getPages($slug: String!) {
                generalSettings {
                    title
                    description
                }
                menuItems(where: {location: API_MENU}) {
                    edges {
                        node {
                            label
                            menuItemId
                            path
                        }
                    }
                }
                pageBy(uri: $slug) {
                    title
                    content
                }
            }
        `,
        variables: {
            slug: pageSlug,
        },
    });

    const page = data?.data.pageBy;

    const site = {
        ...data?.data.generalSettings,
    };

    const menus = data?.data.menuItems.edges
        .map(({ node }) => node)
        .map((menu) => {
            return {
                ...menu,
            };
        });

    return {
        props: {
            page,
            site,
            menus,
        },
    };
}

export async function getStaticPaths() {
    const apolloClient = getApolloClient();

    const data = await apolloClient.query({
        query: gql`
            {
                pages {
                    edges {
                        node {
                            slug
                        }
                    }
                }
            }
        `,
    });

    const pages = data?.data.pages.edges.map(({ node }) => node);

    return {
        paths: pages.map(({ slug }) => {
            return {
                params: {
                    pageSlug: slug,
                },
            };
        }),
        fallback: false,
    };
}
