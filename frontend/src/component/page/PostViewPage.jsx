import {React, useState, useEffect, useRef} from "react";
// import { useParams } from "react-router-dom";
import styled from "styled-components";
import Modal from 'react-modal';
import '../../style/Modal.css';
import Form from "react-validation/build/form";
import Button from "../ui/Button";

import DiaryService from "../../services/diary.service";

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

const required = (value) => {
    if (!value) {
        return (
        <div className="invalid-feedback d-block">
            This field is required!
        </div>
        );
    }
};

function PostViewPage(props){
    const form = useRef();
    // const params = useParams();
    ///const today = params.date;
    const [modalIsOpen, setModalIsOpen] = useState(false);

    //const [date, setDate] = useState("");
    const [content, setContent] = useState("");
    const [photo, setPhoto] = useState("");
    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState("");
    
    useEffect(() => {
        setModalIsOpen(true);
    }, [props.date]);

    const onChangeContent = (e) => {
        const content = e.target.value;
        setContent(content);
    };

    const handleCreate = (e) => {
        e.preventDefault();

        setMessage("");
        setSuccessful(false);

        form.current.validateAll();

        if (true) { //rewrite
            DiaryService.create(props.date, content, photo).then(
            () => {
                window.location.assign('/main');
            },
            (error) => {
                const resMessage =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

                setMessage(resMessage);
                setSuccessful(false);
            }
            );
        }
    };

    return(
        <Wrapper>
            <Modal
                isOpen={modalIsOpen}
                ariaHideApp={false}
                style={StyledModal}
                onRequestClose={() => setModalIsOpen(false)}
            >
                    <p>오느른 {props.date}</p>
                    <ContentText>작성된 게시글을 볼 수 있는 페이지입니다.</ContentText>
                    <input
                        type="text"
                        name="content"
                        id="content"
                        value={content}
                        onChange={onChangeContent}
                        validations={[required]}
                    />
            </Modal>
        </Wrapper>
    )
}

export default PostViewPage;