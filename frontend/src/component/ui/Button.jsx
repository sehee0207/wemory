import React from "react";
import styled from "styled-components";
import { motion } from 'framer-motion';

const StyleButton = styled(motion.button)`
    font-size: 1em;
    font-weight: 800;
    border-radius: 50px;
    border: 0px;
    cursor: pointer;
    background-color: #C7DB44;
    padding: 15px;
    margin: 15px 0px;
    box-shadow: 3px 5px 10px 2px rgb(150,150,150,0.2);
`
const hoverVariants = {
    grow: {
      scale: 1.1
    },
};

function Button(props){
    const { title, onClick, disabled } = props;

    return(
        <StyleButton onClick={onClick} animate={["initial"]}
        whileHover={["grow"]} variants={hoverVariants} disabled={disabled}>
            { title || "버튼"}
        </StyleButton>
    );
}

export default Button;