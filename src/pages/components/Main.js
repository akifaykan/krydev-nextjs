import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import Typed from 'typed.js';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay, Pagination, EffectCards } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-cards';

SwiperCore.use([Autoplay, Pagination, EffectCards]);

const Main = ({ themes, posts }) => {
    const el = useRef(null);
    const typed = useRef(null);
    const swiperRef = useRef(null);

    useEffect(() => {
        const options = {
            strings: ['Blog/Portal', 'Eticaret', 'Kurumsal'],
            typeSpeed: 40,
            backSpeed: 40,
            loop: true,
        };
        typed.current = new Typed(el.current, options);
        return () => {
            typed.current.destroy();
        };
    }, []);

    const mouseOver = () => {
        swiperRef.current.swiper.autoplay.stop();
    };
    const mouseLeave = () => {
        swiperRef.current.swiper.autoplay.start();
    };
    const pagination = {
        clickable: true,
        renderBullet: function (index, className) {
            return '<span class="' + className + ' custom">' + (index + 1) + '</span>';
        },
    };

    return (
        <main>
            <div className="mainHead">
                <div className="mainHead__main">
                    <div className="workflow">
                        <div className="typ">
                            <span ref={el}></span>
                        </div>
                    </div>
                    <h2 className="kryexx">Kryex Themes</h2>
                    <p className="dev">Wordpress Developer</p>
                    <p className="desc">
                        Bir temada, arayüz tasarımı, sitenin estetiği, içerik yönetimi, gezinme,
                        seo, site hızı gibi önemli faktörler vardır. Tüm bu faktörleri göz önünde
                        bulundurularak temaları <code>&lt;kodluyoruz&gt;</code> Temalarımızın sade,
                        kafa karıştırmayan, basit ve kullanışlı olmasına özen gösteriyoruz.
                    </p>
                    <div className="contact">
                        <span>BİZE YAZIN: </span>
                        <Link href="https://t.me/akifaykan" target="_blank">
                            <a target="_blank" rel="noopener noreferrer">
                                <svg
                                    enableBackground="new 0 0 24 24"
                                    fill="currentColor"
                                    height="18"
                                    width="18"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="m9.417 15.181-.397 5.584c.568 0 .814-.244 1.109-.537l2.663-2.545 5.518 4.041c1.012.564 1.725.267 1.998-.931l3.622-16.972.001-.001c.321-1.496-.541-2.081-1.527-1.714l-21.29 8.151c-1.453.564-1.431 1.374-.247 1.741l5.443 1.693 12.643-7.911c.595-.394 1.136-.176.691.218z"></path>
                                </svg>
                            </a>
                        </Link>
                    </div>
                </div>
                <div
                    className="mainHead__slider"
                    onMouseOver={() => mouseOver()}
                    onMouseLeave={() => mouseLeave()}
                >
                    <Swiper
                        spaceBetween={50}
                        effect={'cards'}
                        grabCursor={true}
                        autoplay={{
                            delay: 2500,
                            disableOnInteraction: false,
                        }}
                        pagination={pagination}
                        className="mySwiper"
                        ref={swiperRef}
                    >
                        {themes &&
                            themes.length > 0 &&
                            themes.map(({ Temalar, featuredImage, path, temalarId, title }) => {
                                return (
                                    <SwiperSlide
                                        key={temalarId}
                                        className="carousel__slide slider__item"
                                    >
                                        <Image
                                            className="slider__img"
                                            src={featuredImage.node.sourceUrl}
                                            alt={title}
                                            layout="fill"
                                            objectFit="cover"
                                            objectPosition="center"
                                        />
                                        <div className="buttons">
                                            <Link href={Temalar.demoLink}>
                                                <a className="demo" target="_blank">
                                                    DEMO
                                                </a>
                                            </Link>
                                            <Link href={path}>
                                                <a className="permalink">DETAYLAR</a>
                                            </Link>
                                        </div>
                                        <h3 className="theme__title">{title}</h3>
                                    </SwiperSlide>
                                );
                            })}
                    </Swiper>
                </div>
            </div>
            <div className="posts">
                <h2 className="posts__title">Blog Yazıları</h2>
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
                                            {dateFormat.toLocaleDateString('tr-TR', dateOptions)}
                                        </span>
                                        <h3 className="post__title">
                                            <Link href={path}>
                                                <a>{title}</a>
                                            </Link>
                                        </h3>
                                    </div>
                                </li>
                            );
                        })}
                </ul>
            </div>
        </main>
    );
};

export default Main;
