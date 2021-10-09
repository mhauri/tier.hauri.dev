import styles from './HomePage.module.scss';
import TierMap from "@module/Map/TierMap";

const HomePage = () => {
    return (<div className={styles.content}>
        <TierMap zoneId={'BERN'}/>
    </div>);
}

export default HomePage;
