
import {memo, useState, useCallback, useEffect} from 'react';
// import styles from './style.module.less';

const styles = require('./style.module.less');

interface IMaterialItemProps {
    prop?: string;
}

const MaterialItem = ({ prop }: IMaterialItemProps) => {
    const [tempState, setTempState] = useState(1);
    const onClick = useCallback(() => {
        setTempState(tempState => tempState + 1);
    }, []);
    useEffect(() => {
        console.log('tempState ===> ', tempState);
    }, [tempState]);

    return (
        <div className={styles.materialItem}>
            <div className={styles.txt} onClick={onClick}>MaterialItem</div>
            <div className={styles.txt}>{tempState}</div>
            <div className={styles.txt}>{prop}</div>
            <div className={styles.txt}></div>
        </div>
    );
};

export default memo(MaterialItem);
