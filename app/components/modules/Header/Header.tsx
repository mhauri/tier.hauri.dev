import styles from './Header.module.scss';
import Link from 'next/link'

const Header = () => (
  <header className={styles.header}>
    <div>
        <h1><Link href={'/'}>TIER MAP</Link></h1>
    </div>
  </header>
);

export default Header;
