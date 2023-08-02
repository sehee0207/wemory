import React from 'react';
import styled from 'styled-components';
import NoBM from "../img/no-bookmark.svg";
import YesBM from "../img/yes-bookmark.svg";

const Bm = styled.img`
    width: 35px;
    padding-top: 25px;
    cursor: pointer;
`

const Bookmark = ({ bm, onClick }) => {
    return (
        <Bm src={bm?YesBM:NoBM} onClick={onClick}></Bm>
    );
};

export default Bookmark;