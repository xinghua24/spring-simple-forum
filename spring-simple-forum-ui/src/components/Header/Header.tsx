
import { Button } from 'primereact/button';
import NavBrand from '../NavBrand/NavBrand';
import styles from './Header.module.css';
import { useNavigate } from 'react-router-dom';

function Header() {
    const navigate = useNavigate();

    function navToNewPost() {
        navigate('/posts/new');
    }

    return (
        <header className={styles.headerRow}>
            <NavBrand />
            <Button link onClick={navToNewPost} className={styles.headerBtn}>
                <span style={{ fontWeight: 'bold' }}>New Post</span>
            </Button>
        </header >
    )
}

export default Header