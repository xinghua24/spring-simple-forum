import axios from "axios";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import styles from './PostScreen.module.css';
import parse from 'html-react-parser';
import { Post } from "../../model/Post";

export default function PostScreen() {
    const { postId } = useParams();

    const { isLoading, isError, error, data } = useQuery(["posts", postId],
        (): Promise<Post> =>
            axios.get("/api/posts/" + postId)
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

    return (
        <>
            {data ?
                <>
                    <h2 className={styles.postTitle}>{data?.title}</h2>
                    <div>{parse(data?.content ? data?.content : "")}</div>
                </>
                : null}
        </>
    )
}