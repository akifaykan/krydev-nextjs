import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import Typed from 'typed.js';
import ReactCarousel from './Carousel.js';

const Main = ({ themes }) => {
    console.log(themes);
    const el = useRef(null);
    const typed = useRef(null);

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

    return (
        <main>
            <div className="grid">
                <div className="grid__main">
                    <div className="workflow">
                        <div className="typ">
                            <span ref={el}></span>
                        </div>
                    </div>
                    <h2 className="kryexx">Kryex Themes</h2>
                    <p className="dev">Wordpress Developer</p>
                    <p className="desc">
                        Bir temada, arayüz tasarımı, sitenin estetiği, içerik yönetimi, gezinme,
                        seo, site hızı gibi çok fazla önemli faktörler vardır. Tüm bu faktörleri göz
                        önünde bulundurularak temaları kodluyoruz. Temalarımızın sade, kafa
                        karıştırmayan, basit ve kullanışlı olmasına özen gösteriyoruz.
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
                <div className="grid__slider">
                    <ReactCarousel class="slider" options={{ Dots: false,slidesPerPage: 1 }}>
                        {themes &&
                            themes.length > 0 &&
                            themes.map((theme) => {
                                const srcNode = theme.featuredImage.node;
                                return (
                                    <div
                                        key={theme.temalarId}
                                        className="carousel__slide slider__item"
                                    >
                                        <Image
                                            className="slider__img"
                                            src={srcNode.sourceUrl}
                                            height={srcNode.mediaDetails.height}
                                            width={srcNode.mediaDetails.width}
                                            alt={theme.title}
                                        />
                                        <h2>{theme.title}</h2>
                                    </div>
                                );
                            })}
                    </ReactCarousel>
                </div>
            </div>
        </main>
    );
};

export default Main;
