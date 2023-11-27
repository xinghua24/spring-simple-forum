import axios from 'axios';
import { useQuery } from 'react-query'
import { NavLink, useNavigate } from 'react-router-dom';
import styles from './Home.module.css';
import { Button } from 'primereact/button';
import { Post } from '../../model/Post';
import Header from '../../components/Header/Header';
import Layout from '../../components/Layout/Layout';

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
