import {React, useState, useEffect} from "react";
// import { useParams } from "react-router-dom";
import styled from "styled-components";
import Modal from 'react-modal';
import '../../style/Modal.css';

const Wrapper = styled.div`
`

const ContentText = styled.div`
`

const StyledModal = {
    overlay: {
		position: "fixed",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		backgroundColor: "rgba(255, 255, 255, 0.45)",
		zIndex: 10,
	},
// 	content: {
// 		display: "flex",
//         flexDirection: "column",
// 		background: "#ffdfe7",
// 		overflow: "auto",
// 		WebkitOverflowScrolling: "touch",
// 		borderRadius: "14px",
// 		outline: "none",
// 		zIndex: 10,
// 	},
}


function PostWritePage(props){
    // const params = useParams();
    ///const today = params.date;
    const [modalIsOpen, setModalIsOpen] = useState(false);
    
    useEffect(() => {
        setModalIsOpen(true);
    }, [props.date]);

    return(
        <Wrapper>
            <Modal
                isOpen={modalIsOpen}
                ariaHideApp={false}
                style={StyledModal}
                onRequestClose={() => setModalIsOpen(false)}
            >
                <p>오느른 {props.date}</p>
                <ContentText>게시글 작성 페이지입니다.</ContentText>
            </Modal>
        </Wrapper>
    )
}

export default PostWritePage;