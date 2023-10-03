import React from 'react';
import styled from 'styled-components';

const Body = styled.div`
position: fixed;
top: 0;
left: 0;
width: 100%;
height: 100%;
background-color: transparent;
backdrop-filter: blur(10px);
`

const Success = styled.div`
position: absolute;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
width: 100px;
height: 100px;
border-radius: 50%;
background-color: ${(props) => props.success ? '#2ecc71' : '#e74c3c'};
`

const SuccessMark = styled.span`
position: absolute;
top: 25%;
left: 25%;
width: 50%;
height: 30%;
border-color: #fff;
border-style: solid;
border-width: 0 0 5px 5px;
border-radius: 5px;
transform: rotateZ(-45deg);
`

const FailMark = styled.span`
position: absolute;
top: 25%;
left: 25%;
width: 50%;
height: 50%;
&::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    width: 100%;
    height: 5px;
    background-color: #fff;
    transform: rotateZ(45deg);
}
&::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    width: 100%;
    height: 5px;
    background-color: #fff;
    transform: rotateZ(-45deg);
}
`

export const SavedSuccess = ({ success }) => {
    return (
        <Body>
        <Success success={success} >
            {success ? <SuccessMark /> : <FailMark />}
        </Success>
        </Body>
    );
}
