import Head from 'next/head';
import { getApolloClient } from '../lib/apollo-client';
import { gql } from '@apollo/client';
import Header from './components/Header';
import Main from './components/Main';

export default function Home({ page, menus, themes, posts }) {
    const { title, description } = page;

    return (
        <div className="site__grid">
            <Head>
                <title>{title} &mdash; {description}</title>
                <meta name="description" content={description} />
                <link rel="icon" href="/icons/favicon.png" />
            </Head>
            <Header menus={menus} />
            <Main themes={themes} posts={posts} />
        </div>
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
                menuItems(where: { location: API_MENU }) {
                    edges {
                        node {
                            menuItemId
                            path
                            label
                        }
                    }
                }
                posts(first: 3) {
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
                themas(first: 10000) {
                    edges {
                        node {
                            themaId
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
                path: `/post/${post.slug}`,
            };
        });

    const themes = data?.data.themas.edges
        .map(({ node }) => node)
        .map((theme) => {
            return {
                ...theme,
                path: `/theme/${theme.slug}`,
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
