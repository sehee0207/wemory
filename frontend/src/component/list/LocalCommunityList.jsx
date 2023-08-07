import React, {useEffect, useState} from "react";
import styled from "styled-components";
import Select from 'react-select';

import PydataService from "../../services/pydata.service";

const Wrapper = styled.div`
    border-radius: 30px;
    margin: 15px 0px;
    display: flex;
    flex-direction: column;
    height: 80vh;
    box-shadow: 3px 5px 10px 2px rgb(150,150,150,0.2);
    background-color: #FFFFFF;
    >hr{
        align-self: center;
    }
`

const TitleText = styled.p`
    font-size: 0.8em;
    padding: 3px 12px;
    margin-block-start: 1em;
    margin-block-end: 0.5em;
    margin-inline-start: 10px;
    margin-inline-end: 0px;
    font-weight: 800;
`

const StyledSelect = styled.div`
    margin: 10px 5px;
    padding: 5px;
`

const ContentText = styled.div`
    color: grey;
    font-size: 0.8em;
    // padding: 5px 15px;
    margin-block-start: 0.5em;
    // margin-block-end: 0.5em;
    margin-inline-start: 1.5em;
    // margin-inline-end: 1em;
`
  
let districtoptions = [
    { value: "Jongno-gu", label: "종로구" },
    { value: "Jung-gu", label: "중구" },
    { value: "Yongsan-gu", label: "용산구" },
    { value: "Seongdong-gu", label: "성동구" },
    { value: "Gwangjin-gu", label: "광진구" },
]

function LocalCommunityList(props){
    const [storeInfo, setStoreInfo] = useState([]);
    const [district, setDistrict] = useState("종로구");

    const retrieveLocalData = () => {
        PydataService
        .findAll()
        .then((response) => {
            let line = response.data.split('\n');
            let stores = [];

            for (let i=1; i<line.length-3; i++) {
                let word = line[i].split(/\s+/g);

                if (word[3] === "...") {
                    stores.push({
                        location: word[1],
                        storeName: word[2],
                        visitor: word[4],
                        score: word[5]
                    });
                }
                else {
                    stores.push({
                        location: word[1],
                        storeName: word[2] + " " + word[3],
                        visitor: word[5],
                        score: word[6]
                    });
                }

                if (i === line.length-4)    {setStoreInfo(stores); console.log(stores)}
            }
        });
    }

    useEffect(() => {
        retrieveLocalData();
    }, []);

    return(
        <Wrapper>
            <TitleText>지역 커뮤니티</TitleText>
            <hr style={{width: "90%", background: "#D9D9D9", height: "1px", border: "0"}} />
            <StyledSelect>
                <Select
                    className="react-select-container"
                    placeholder="서울"
                    components={{
                        IndicatorSeparator: () => null
                    }}
                />

                <Select
                    className="react-select-container"
                    options={districtoptions}
                    onChange={(e) => {setDistrict(e.value)}}
                    placeholder="지역을 선택해주세요"
                    components={{
                        IndicatorSeparator: () => null
                    }}
                />
            </StyledSelect>
        </Wrapper>
    )
}

export default LocalCommunityList;