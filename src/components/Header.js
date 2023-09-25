import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <>
            <section>
                    <Link to="add_invoice" >dodaj fakturę</Link>
                    <Link to="list_invoices" >lista faktur</Link>
                    <Link to="/" >strona główna</Link>
            </section>
        </>
    );
    }

export default Header;
