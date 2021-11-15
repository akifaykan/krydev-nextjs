import Link from 'next/link';
import Image from 'next/image';

const Header = ({ menus }) => {
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
                                        <Link href={path}>
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
        </header>
    );
};

export default Header;
