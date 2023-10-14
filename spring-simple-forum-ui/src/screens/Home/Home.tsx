import axios from 'axios';
import { useQuery } from 'react-query'
import { NavLink } from 'react-router-dom';
import styles from './Home.module.css';

export default function Home() {

    const { isLoading, isError, data } = useQuery(["todos"], () =>
        axios.get("/posts")
            .then((res) => res.data));

    if (isLoading) {
        return 'loading'
    }
    if (isError) {
        return 'error'
    }

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Spring Simple Forum</h2>
            {data.map((item) =>
                <div key={item.id}>
                    <NavLink to={"/posts/" + item.id}>{item.title}</NavLink>
                </div>

            )}
        </div>
    )
}
