import styled from "styled-components";

export const DataToSaveSection = styled.section`
display: flex;
flex-direction: column;
span {
    display: flex;
    gap: 150px;
    p {
     
    }
    select {
        width: 300px;
        display: flex;
    }
}
button {
    width: 200px;
    height: 50px;
    margin: 20px auto;
    background-color: #f1f1f1;
    border: 1px solid black;
    border-radius: 5px;
    cursor: pointer;
    &:hover {
        background-color: #e1e1e1;
    }
}
`