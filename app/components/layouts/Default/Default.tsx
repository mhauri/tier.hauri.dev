import Header from '@module/Header/Header';
import Footer from '@module/Footer/Footer';
import styles from './Default.module.scss';

type Props = {
    children: React.ReactNode;
};

const Default = ({children}: Props) => (
    <>
        <Header/>
        <main className={styles.main}>{children}</main>
    </>
);

export default Default;
