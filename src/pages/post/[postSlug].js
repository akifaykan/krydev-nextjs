import Head from 'next/head';
import Image from 'next/image';
import { gql } from '@apollo/client';
import { getApolloClient } from '../../lib/apollo-client';
import styles from '../../styles/Single.module.css';
import Header from '../components/Header';

const singleBlog = ({ site, post, menus }) => {
    const { content, featuredImage, title } = post;

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
            <div className="single post">
                <h1 className={styles.post__title}>{title}</h1>
                {featuredImage && (
                    <Image
                        className={styles.post__img}
                        src={featuredImage.node.sourceUrl}
                        width={featuredImage.node.mediaDetails.width}
                        height={featuredImage.node.mediaDetails.height}
                        alt={title}
                    />
                )}
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

export default singleBlog;

export async function getStaticProps({ params = {} } = {}) {
    const { postSlug } = params;

    const apolloClient = getApolloClient();

    const data = await apolloClient.query({
        query: gql`
            query getPosts($slug: String!) {
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
                postBy(slug: $slug) {
                    title
                    content
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
            slug: postSlug,
        },
    });

    const post = data?.data.postBy;

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
            post,
            menus,
        },
    };
}

export async function getStaticPaths() {
    const apolloClient = getApolloClient();

    const data = await apolloClient.query({
        query: gql`
            {
                posts {
                    edges {
                        node {
                            slug
                        }
                    }
                }
            }
        `,
    });

    const posts = data?.data.posts.edges.map(({ node }) => node);

    return {
        paths: posts.map(({ slug }) => {
            return {
                params: {
                    postSlug: slug,
                },
            };
        }),
        fallback: false,
    };
}
