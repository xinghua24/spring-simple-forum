import { useMutation } from 'react-query';
import styles from './NewPost.module.css'
import axios from 'axios';
import { useState } from 'react';

type PostInput = {
    title: string,
    content: string
}

export default function NewPost() {
    const [title, setTitle] = useState<string>("")
    const [content, setContent] = useState<string>("")


    const mutation = useMutation<PostInput>({
        mutationFn: () =>
            axios.post("/api/posts", {
                "title": title,
                "content": content
            }).then((res) => res.data)
    });

    function createPost() {
        mutation.mutate()
    }

    function handleTitleChange(e: React.FormEvent<HTMLInputElement>) {
        setTitle(e.currentTarget.value)
    }

    function handleContentChange(e: React.FormEvent<HTMLTextAreaElement>) {
        setContent(e.currentTarget.value)
    }
    return (
        <>
            <div>Create New Post</div>
            <div className={styles.row}>
                Title: <input name="title" placeholder='title' value={title} onChange={handleTitleChange}></input>
            </div>
            <div className={styles.row}>
                Content: <textarea name="content" placeholder='content' rows={10} cols={40} value={content} onChange={handleContentChange} />
            </div>
            <div className={styles.row}>
                <button onClick={createPost}>Create</button>
            </div>
            {mutation.isLoading ? <p>Loading</p> : null}
        </>
    )
}
