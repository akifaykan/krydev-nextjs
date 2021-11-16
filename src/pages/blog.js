import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { gql } from '@apollo/client';
import { getApolloClient } from '../lib/apollo-client';
import styles from '../styles/Single.module.css';
import Header from './components/Header';

const Blog = ({ posts, page, menus }) => {
    return (
        <div className="posts blog">
            <Head>
                <title>
                    {page.title} &mdash; {page.title}
                </title>
                <meta name="description" content={page.description} />
                <link rel="icon" href="/icons/favicon.png" />
            </Head>
            <div className={styles.wrapper}>
                <Header menus={menus} />
                <div className={styles.blog__posts}>
                    <h1 className={styles.title}>Blog Yazıları</h1>
                    <ul className="posts__list">
                        {posts &&
                            posts.length > 0 &&
                            posts.map(({ date, featuredImage, path, postId, title }) => {
                                const dateFormat = new Date(date);
                                const dateOptions = {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                };

                                return (
                                    <li className="post__item" key={postId}>
                                        <Link href={path}>
                                            <a>
                                                {featuredImage && (
                                                    <Image
                                                        className="post__img"
                                                        src={featuredImage.node.sourceUrl}
                                                        alt={title}
                                                        layout="fill"
                                                        objectFit="cover"
                                                        objectPosition="center"
                                                    />
                                                )}
                                            </a>
                                        </Link>
                                        <div className="post__meta">
                                            <span className="post__date">
                                                {dateFormat.toLocaleDateString(
                                                    'tr-TR',
                                                    dateOptions
                                                )}
                                            </span>
                                            <h2 className="post__title">
                                                <Link href={path}>
                                                    <a>{title}</a>
                                                </Link>
                                            </h2>
                                        </div>
                                    </li>
                                );
                            })}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Blog;

export async function getStaticProps({ params = {} } = {}) {
    const { pageSlug } = params;

    const apolloClient = getApolloClient();

    const data = await apolloClient.query({
        query: gql`
            query getBlogPosts {
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
            }
        `,
        variables: {
            slug: pageSlug,
        },
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

    return {
        props: {
            posts,
            menus,
            page,
        },
    };
}
