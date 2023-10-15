import axios from "axios";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import styles from './Post.module.css';
import { Button } from "primereact/button";
import parse from 'html-react-parser';

function Post() {
    const navigate = useNavigate();
    const { postId } = useParams();

    const { isLoading, isError, data } = useQuery(["posts", postId], () =>
        axios.get("/api/posts/" + postId)
            .then((res) => res.data));

    if (isLoading) {
        return 'loading'
    }
    if (isError) {
        return 'error'
    }


    function discardPost() {
        return navigate("/")
    }


    return (
        <>
            <Button icon="pi pi-arrow-left" rounded text severity="secondary" aria-label="Back" onClick={discardPost} />
            <h2 className={styles.postTitle}>{data.title}</h2>
            <div>{parse(data.content)}</div>
        </>
    )
}

export default Post
