import axios from "axios";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import styles from './Post.module.css';
function Post() {
    let { postId } = useParams();

    const { isLoading, isError, data } = useQuery(["posts", postId], () =>
        axios.get("/posts/" + postId)
            .then((res) => res.data));

    if (isLoading) {
        return 'loading'
    }
    if (isError) {
        return 'error'
    }

    return (
        <>
            <h2 className={styles.postTitle}>{data.title}</h2>
            <p>{data.content}</p>
        </>
    )
}

export default Post
