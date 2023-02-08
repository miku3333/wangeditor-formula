
import {memo, useState, useCallback, useEffect} from 'react';
// import styles from './style.module.less';

const styles = require('./style.module.less');

interface IBookItemProps {
    prop?: string;
}

const BookItem = ({ prop }: IBookItemProps) => {
    const [tempState, setTempState] = useState(1);
    const onClick = useCallback(() => {
        setTempState(tempState => tempState + 1);
    }, []);
    useEffect(() => {
        console.log('tempState ===> ', tempState);
    }, [tempState]);

    return (
        <div className={styles.bookItem}>
            <div className={styles.txt} onClick={onClick}>BookItem</div>
            <div className={styles.txt}>{tempState}</div>
            <div className={styles.txt}>{prop}</div>
        </div>
    );
};

export default memo(BookItem);
