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
                            menus.map((menu) => {
                                return (
                                    <li key={menu.menuItemId}>
                                        <Link href={`${menu.path}`}>
                                            <a>{menu.label}</a>
                                        </Link>
                                    </li>
                                );
                            })}
                    </ul>
                </nav>
                <div className="copyright">© 2021, Kryex Themes</div>
            </div>
        </header>
    );
};

export default Header;
