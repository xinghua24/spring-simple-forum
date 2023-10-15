import axios from 'axios';
import { useQuery } from 'react-query'
import { NavLink } from 'react-router-dom';
import styles from './Home.module.css';
import { Button } from 'primereact/button';
import { Post } from '../../model/Post';

export default function Home() {

    const { isLoading, isError, data } = useQuery(["todos"], (): Promise<Post[]> =>
        axios.get("/api/posts")
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

            <NavLink to={"/posts/new"}>
                <Button label='Create New Post' />
            </NavLink>
            {data ? data.map((item) =>
                <NavLink to={"/posts/" + item.id}>
                    <div key={item.id} className={styles.homePostTitle}>
                        {item.title}
                    </div>
                </NavLink>
            ) : null}
        </div>
    )
}
