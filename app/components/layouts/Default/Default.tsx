import Head from 'next/head'
import Header from '@module/Header/Header';
import styles from './Default.module.scss';

type Props = {
    children: React.ReactNode;
};

const Default = ({children}: Props) => (
    <>
        <Head>
            <title>TIER MAP</title>
            <meta name="robots" content="noindex,nofollow"/>
        </Head>
        <Header/>
        <main className={styles.main}>{children}</main>
    </>
);

export default Default;
