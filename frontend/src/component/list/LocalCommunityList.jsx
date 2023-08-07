import React, {useEffect, useState} from "react";
import styled from "styled-components";
import Select from 'react-select';
import {GiPositionMarker} from 'react-icons/gi';

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
    
    .pointer {
        padding-top: 3px;
    }
`

const StyledSelect = styled.div`
    margin: 10px 5px;
    padding: 10px;
`
let districtoptions = [
    { value: "강남구", label: "강남구" },
]

let storeoptions = [];
function LocalCommunityList(props){
    const [district, setDistrict] = useState("강남구");
    const [store, setStore] = useState("");
    
    const retrieveLocalData = () => {
        PydataService
        .findAll()
        .then((response) => {
            let line = response.data.split('\n');
            for (let i=1; i<6; i++) {
                let word = line[i].split(/\s+/g);

                if (word[3] === "...") {
                    const stores = {
                        value: word[2],
                        label: word[2] + " / " + word[4] + "명 방문, \n" + word[5] + " 점",
                    }
                    storeoptions.push(stores);
                }
                else {
                    const stores = {
                        value: word[2] + " " + word[3],
                        label: word[2] + " " + word[3] + " / " + word[5] + "명 방문, " + word[6] + " 점",
                    }
                    storeoptions.push(stores);
                }
            }
        });
    }
    
    useEffect(() => {
        retrieveLocalData();
    }, []);

    return(
        <Wrapper>
            <TitleText><GiPositionMarker className="pointer"/>&nbsp;지역 커뮤니티</TitleText>
            <hr style={{width: "90%", background: "#D9D9D9", height: "1px", border: "0"}} />
            <StyledSelect>
                <Select
                    className="react-select-container"
                    options={districtoptions}
                    onChange={(e) => {setDistrict(e.value)}}
                    placeholder="지역을 선택하세요!"
                    components={{
                        IndicatorSeparator: () => null
                    }}
                />

                <Select
                    className="react-select-container"
                    options={storeoptions}
                    onChange={(e) => {setStore(e.value)}}
                    placeholder= "강남구 음식점"
                    components={{
                        IndicatorSeparator: () => null
                    }}
                />
            </StyledSelect>
        </Wrapper>
    )
}

export default LocalCommunityList;