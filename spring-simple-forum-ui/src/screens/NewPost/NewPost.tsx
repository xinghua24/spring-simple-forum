import { useMutation } from 'react-query';
import styles from './NewPost.module.css'
import axios from 'axios';
import { useRef, useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import { Toast } from 'primereact/toast';

import { Editor, EditorTextChangeEvent } from 'primereact/editor';


type PostInput = {
    title: string,
    content: string
}

export default function NewPost() {
    const [title, setTitle] = useState<string>("")
    const [content, setContent] = useState<string>("")
    const navigate = useNavigate();

    const toast = useRef<Toast>(null);

    const mutation = useMutation<PostInput>({
        mutationFn: () =>
            axios.post("/api/posts", {
                "title": title,
                "content": content
            }).then((res) => res.data)
        ,
        onSuccess: () => {
            goHome()
        },
        onError: () => {
            toast.current?.show({ severity: 'warn', summary: 'Error', detail: 'Error creating Post' });
        }

    });

    function createPost() {

        if (title && content) {
            mutation.mutate()
        } else {
            toast.current?.show({ severity: 'warn', summary: 'Error', detail: 'Please enter title and content' });
        }
    }

    function handleTitleChange(e: React.FormEvent<HTMLInputElement>) {
        setTitle(e.currentTarget.value)
    }


    function goHome() {
        return navigate("/")
    }

    function handleTextChange(e: EditorTextChangeEvent) {
        return setContent(e.htmlValue ?? "");
    }

    return (
        <>
            <h2>Create New Post</h2>
            <div className={styles.row}>
                <InputText className={styles.titleInput} name="title" placeholder='title' value={title} onChange={handleTitleChange} />
            </div>
            <div className={styles.row}>
                <Editor value={content} onTextChange={e => handleTextChange(e)} style={{ height: '320px' }} />
            </div>
            <div className={styles.row}>
                <Button label="Discard" type="submit" onClick={goHome} size="small" severity="warning" />
                <Button label="Submit" type="submit" icon="pi pi-check" onClick={createPost} size="small" />
            </div>
            <Toast ref={toast} position="top-right" />

        </>
    )
}

