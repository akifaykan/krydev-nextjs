import Head from 'next/head';
import { getApolloClient } from '../lib/apollo-client';
import { gql } from '@apollo/client';
import Header from './components/Header';
import Main from './components/Main';

export default function Home({ page, menus, themes, posts }) {
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
                <Main themes={themes} posts={posts} />
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
                posts {
                    edges {
                        node {
                            title
                            slug
                            postId
                            date
                            featuredImage {
                                node {
                                    sourceUrl
                                }
                            }
                        }
                    }
                }
                allTemalar(first: 10000) {
                    edges {
                        node {
                            temalarId
                            title
                            slug
                            featuredImage {
                                node {
                                    sourceUrl
                                }
                            }
                            Temalar {
                                demoLink
                                hot
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

    const posts = data?.data.posts.edges
        .map(({ node }) => node)
        .map((post) => {
            return {
                ...post,
                path: `/blog/${post.slug}`,
            };
        });

    const themes = data?.data.allTemalar.edges
        .map(({ node }) => node)
        .map((theme) => {
            return {
                ...theme,
                path: `/tema/${theme.slug}`,
            };
        });

    return {
        props: {
            page,
            themes,
            posts,
            menus,
        },
    };
}
