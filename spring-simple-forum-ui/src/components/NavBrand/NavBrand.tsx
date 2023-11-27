import { Button } from 'primereact/button'
import { useNavigate } from 'react-router-dom';
import styles from './NavBrand.module.css';

function NavBrand() {
    const navigate = useNavigate();

    function navHome() {
        return navigate("/")
    }

    return (
        <Button link style={{ marginLeft: 0, paddingLeft: 0 }} className={styles.headerBtn} onClick={navHome}>
            <i className="pi pi-home" style={{ fontSize: '1.5rem' }} />
            <span style={{ fontWeight: 'bold' }} className='font-bold text-xl'>&nbsp;Spring Simple Forum</span>
        </Button>
    )
}

export default NavBrand