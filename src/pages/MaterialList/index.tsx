
import MaterialItem from '@/components/MaterialItem';
import {memo, useState, useCallback, useEffect} from 'react';
// import styles from './style.module.less';

const styles = require('./style.module.less');

interface IMaterialListProps {
    prop?: string;
}

const MaterialList = ({ prop }: IMaterialListProps) => {
    const [tempState, setTempState] = useState(1);
    const onClick = useCallback(() => {
        setTempState(tempState => tempState + 1);
    }, []);
    useEffect(() => {
        console.log('tempState ===> ', tempState);
    }, [tempState]);

    return (
        <div className={styles.materialList}>
            <div className={styles.txt} onClick={onClick}>MaterialList</div>
            <div className={styles.txt}>{tempState}</div>
            <div className={styles.txt}>{prop}</div>
            <div className={styles.txt}></div>
            <MaterialItem />
        </div>
    );
};

export default memo(MaterialList);
