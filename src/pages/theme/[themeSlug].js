import Head from 'next/head';
import Image from 'next/image';
import { gql } from '@apollo/client';
import { getApolloClient } from '../../lib/apollo-client';
import styles from '../../styles/Single.module.css';
import Header from '../components/Header';

const singleBlog = ({ site, theme, menus }) => {
    console.log(theme)
    console.log(site)
    console.log(menus)
    //const { content, featuredImage, title } = theme;

    return (
        <>
            <Head>
                <title>
                    {/* {title} */} &mdash; {site.title}
                </title>
                <meta name="description" content={site.description} />
                <link rel="icon" href="/icons/favicon.png" />
            </Head>
            
        </>
    );
};

export default singleBlog;

export async function getStaticProps({ params = {} } = {}) {
    const { themeSlug } = params;

    const apolloClient = getApolloClient();

    const data = await apolloClient.query({
        query: gql`
            query getPosts($slug: String!) {
                generalSettings {
                    title
                    description
                }
                menuItems(where: { location: API_MENU }) {
                    edges {
                        node {
                            label
                            menuItemId
                            path
                        }
                    }
                }
                themaBy(uri: $slug) {
                    title
                    content
                    Temalar {
                        demoLink
                        indirmelinki
                        teknolojiler
                        temaIndirimFiyat
                        temaNormalFiyat
                        themeDoc
                        hot
                        ucretsiz
                        yeni
                    }
                    featuredImage {
                        node {
                            sourceUrl
                            mediaDetails {
                                height
                                width
                            }
                        }
                    }
                }
            }
        `,
        variables: {
            slug: themeSlug,
        },
    });

    const theme = data?.data.themaBy;

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
            site,
            theme,
            menus,
        },
    };
}

export async function getStaticPaths() {
    const apolloClient = getApolloClient();

    const data = await apolloClient.query({
        query: gql`
            {
                themas(first: 10000) {
                    edges {
                        node {
                            slug
                        }
                    }
                }
            }
        `,
    });

    const themas = data?.data.themas.edges.map(({ node }) => node);

    return {
        paths: themas.map(({ slug }) => {
            return {
                params: {
                    themeSlug: slug,
                },
            };
        }),
        fallback: false,
    };
}
