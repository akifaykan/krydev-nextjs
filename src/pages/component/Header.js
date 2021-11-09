import Link from 'next/link';
import Image from 'next/image';

const Header = ({}) => {
    return (
        <header>
            <div className="container">
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
                    <nav>Menus</nav>
                </div>
            </div>
        </header>
    );
};

export default Header;
