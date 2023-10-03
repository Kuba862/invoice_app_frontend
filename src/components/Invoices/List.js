import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const ListSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 30%;
  a {
    color: #000;
    text-decoration: none;
    div {
      display: flex;
      flex-direction: column;
      gap: 10px;
      border: 2px solid;
      p {
        margin: 0;
        align-self: center;
      }
    }
  }
`;

const List = () => {
  const [invoices, setInvoices] = useState([]);

  const invoicesHandler = async () => {
    try {
      const res = await axios.get('http://localhost:3002/api/invoice/list');
      setInvoices(res.data.invoices);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    invoicesHandler();
  }, []);

  return (
    <>
      <ListSection>
        {invoices.map((invoice) => {
          return (
            <Link key={invoice._id} to={`/list_invoices/:${invoice._id}`} >
              <div>
                <img src={invoice.image} alt="zdjęcie faktury" />
                <p>{invoice.invoice_number}</p>
                <p>{invoice.invoice_date}</p>
                <p>{invoice.price}</p>
                <p>produkt: {invoice.product}</p>
                <p>{invoice.mileage}</p>
              </div>
            </Link>
          );
        })}
      </ListSection>
    </>
  );
};

export default List;
