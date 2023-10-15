import { useMutation } from 'react-query';
import styles from './NewPost.module.css'
import axios from 'axios';
import { useRef, useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';
import { useNavigate } from 'react-router-dom';
import { Toast } from 'primereact/toast';


type PostInput = {
    title: string,
    content: string
}

export default function NewPost() {
    const [title, setTitle] = useState<string>("")
    const [content, setContent] = useState<string>("")
    const navigate = useNavigate();

    const toast = useRef(null);

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
            toast.current.show({ severity: 'warn', summary: 'Error', detail: 'Error creating Post' });
        }

    });

    function createPost() {

        if (title && content) {
            mutation.mutate()
        } else {
            toast.current.show({ severity: 'warn', summary: 'Error', detail: 'Please enter title and content' });
        }
    }

    function handleTitleChange(e: React.FormEvent<HTMLInputElement>) {
        setTitle(e.currentTarget.value)
    }

    function handleContentChange(e: React.FormEvent<HTMLTextAreaElement>) {
        setContent(e.currentTarget.value)
    }

    function goHome() {
        return navigate("/")
    }

    return (
        <>
            <h2>Create New Post</h2>
            <div className={styles.row}>
                <InputText name="title" placeholder='title' value={title} onChange={handleTitleChange} size={40} />
            </div>
            <div className={styles.row}>
                <InputTextarea name="content" placeholder='content' rows={10} cols={40} value={content} onChange={handleContentChange} />
            </div>
            <div className={styles.row}>
                <Button label="Discard" type="submit" onClick={goHome} size="small" severity="warning" />
                <Button label="Submit" type="submit" icon="pi pi-check" onClick={createPost} size="small" />
            </div>
            <Toast ref={toast} position="top-right" />

        </>
    )
}
