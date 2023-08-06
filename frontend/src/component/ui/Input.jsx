import React from "react";
import styled from "styled-components";

const StyledInput = styled.input`
    width: 30vw;
    height: 6vh;
    border-radius: 20px;
    border-style: hidden;
    box-shadow: 3px 4px 10px 2px #E3E3E3;
    padding: 5px 10px;
    &:focus{
        outline: none;
    }
    &:-webkit-autofill,
    &:-webkit-autofill:hover,
    &:-webkit-autofill:focus,
    &:-webkit-autofill:active {
	-webkit-text-fill-color: #000;
    transition: background-color 5000s ease-in-out 0s;
}

    &:autofill,
    &:autofill:hover,
    &:autofill:focus,
    &:autofill:active {
	-webkit-text-fill-color: #000;
    transition: background-color 5000s ease-in-out 0s;
}
`

function Input(props){
    const { type, name, defaultValue, value, onChange, readOnly } = props;

    return <StyledInput type={type} defaultValue={defaultValue} name={name} value={value} onChange={onChange} readOnly={readOnly}/>
}

export default Input;