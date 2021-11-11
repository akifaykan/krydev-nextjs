import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { gql } from '@apollo/client';
import { getApolloClient } from '../../lib/apollo-client';
import styles from './Single.module.css';

import React from 'react';

const singleBlog = ({ site, post }) => {
    const { content, featuredImage, postId, slug, title } = post;
    console.log(post);
    return (
        <>
            <Head>
                <title>
                    {title} &mdash; {site.title}
                </title>
                <meta name="description" content={site.description} />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className={styles.post__title}>
                <Link href="/">
                    <a>&larr; Anasayfa</a>
                </Link>
                <h1 className={styles.post__title}>{title}</h1>
                <Image
                    className={styles.post__img}
                    src={featuredImage.node.sourceUrl}
                    width={featuredImage.node.mediaDetails.width}
                    height={featuredImage.node.mediaDetails.height}
                    alt={title}
                />
                <div
                    className="post__content"
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
                postBy(slug: $slug) {
                    postId
                    title
                    slug
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

    return {
        props: {
            site,
            post,
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
                            title
                            slug
                            postId
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
