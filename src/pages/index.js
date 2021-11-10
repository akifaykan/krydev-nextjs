import Head from 'next/head';
import { getApolloClient } from '../lib/apollo-client';
import { gql } from '@apollo/client';
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';

export default function Home({ page, menus, themes }) {
    const { title, description } = page;

    return (
        <>
            <Head>
                <title>
                    {title} &mdash; {description}
                </title>
                <meta name="description" content={description} />
                <link rel="icon" href="/icons/favicon.ico" />
            </Head>
            <div className="siteFlex">
                <Header menus={menus} />
                <Main themes={themes} />
            </div>
        </>
    );
}

export async function getStaticProps() {
    const apolloClient = getApolloClient();

    const data = await apolloClient.query({
        query: gql`
            query getThemes {
                generalSettings {
                    title
                    description
                }
                menuItems {
                    edges {
                        node {
                            locations
                            label
                            menuItemId
                            path
                        }
                    }
                }
                allTemalar(first: 10000) {
                    edges {
                        node {
                            temalarId
                            title
                            slug
                            date
                            content
                            featuredImage {
                                node {
                                    sourceUrl
                                    srcSet
                                    mediaDetails {
                                        width
                                        height
                                    }
                                }
                            }
                            Temalar {
                                demoLink
                                hot
                                indirmelinki
                                teknolojiler
                                temaIndirimFiyat
                                temaNormalFiyat
                                themeDoc
                                ucretsiz
                                yeni
                            }
                        }
                    }
                }
            }
        `,
    });

    const page = {
        ...data?.data.generalSettings,
    };

    const menus = data?.data.menuItems.edges
        .map(({ node }) => node)
        .map((menu) => {
            return {
                ...menu,
            };
        });

    const themes = data?.data.allTemalar.edges
        .map(({ node }) => node)
        .map((theme) => {
            return {
                ...theme,
                path: `/temalar/${theme.slug}`,
            };
        });

    return {
        props: {
            page,
            themes,
            menus
        },
    };
}
