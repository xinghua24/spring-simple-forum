import axios from 'axios';
import { useQuery } from 'react-query'
import { NavLink, useNavigate } from 'react-router-dom';
import styles from './Home.module.css';
import { Button } from 'primereact/button';
import { Post } from '../../model/Post';

export default function Home() {
    const navigate = useNavigate();

    const { isLoading, isError, error, data } = useQuery(["todos"], (): Promise<Post[]> =>
        axios.get("/api/posts")
            .then((res) => res.data));

    if (isLoading) {
        return 'loading'
    }
    if (isError) {
        if (error instanceof Error) {
            return error.message
        } else {
            return 'unknown error'
        }
    }

    function navToNewPost() {
        navigate('/posts/new')
    }
    return (
        <div className={styles.container}>
            <header className={styles.headerRow}>
                <h2 className={styles.title}>Spring Simple Forum</h2>
                <Button label='Create New Post' onClick={navToNewPost} size="small" rounded />
            </header>
            {data ? data.map((item) =>
                <NavLink to={"/posts/" + item.id} key={item.id}>
                    <div className={styles.homePostTitle}>
                        {item.title}
                    </div>
                </NavLink>
            ) : null}
        </div>
    )
}
