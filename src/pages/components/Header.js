import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Header = ({ menus }) => {
    const [openMobile, setOpenMobile] = useState(false);
    return (
        <header>
            <div className="headFlex">
                <div className="logo">
                    <Link href="/">
                        <a>
                            <Image
                                src="/icons/logo.png"
                                height="73"
                                width="70"
                                alt="Kryex Themes Logo"
                            />
                        </a>
                    </Link>
                </div>
                <nav>
                    <ul className="menus">
                        {menus &&
                            menus.map(({ menuItemId, path, label }) => {
                                return (
                                    <li key={menuItemId}>
                                        <Link href={`/page${path}`}>
                                            <a>{label}</a>
                                        </Link>
                                    </li>
                                );
                            })}
                        <li>
                            <Link href={`/blog`}>
                                <a>Blog</a>
                            </Link>
                        </li>
                    </ul>
                </nav>
                <div className="copyright">© 2021, Kryex Themes</div>
            </div>
            <div
                className={`mobile__icon ${openMobile ? 'open' : 'close'}`}
                onClick={() => setOpenMobile(!openMobile)}
            >
                <span className="sd1"></span>
                <span className="sd2"></span>
                <span className="sd3"></span>
            </div>
        </header>
    );
};

export default Header;
