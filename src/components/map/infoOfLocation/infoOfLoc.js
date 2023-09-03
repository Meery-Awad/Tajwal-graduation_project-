/* eslint-disable no-unused-vars */
import './infOfLoc.css'
import StartRate from '../startRate/startRate'
import { connect, useSelector } from 'react-redux';
import { useState } from 'react';
import { useBetween } from 'use-between';

function InfoOfLoc() {

    const state = useSelector((state) => state.data);
    const [follow, setFollow] = useState(false);
    const {dropdownOpenLogin,setdropdownOpenLogin } = useBetween(state.useShareState);
    const {isUserLogin, setisUserLogin } = useBetween(state.useShareState);
   
    function foll() {
       
        if(isUserLogin==false)
        setdropdownOpenLogin(!dropdownOpenLogin)
        else{
        state.follow = !state.follow;
        setFollow(state.follow);
        if (follow == false) {
            let currentYear = new Date().getFullYear();
            let currentMonth = new Date().getMonth() + 1;
            state.numOfFollower += 1;
            // alert(state.numOfFollower);
            //backend
        }
        else {
            state.numOfFollower -= 1;
               //backend
        //    alert(state.numOfFollower);
        }

    }
    }
    const [cnt, setCnt] = useState(false)
    var wordInLine = (state.placeOfLocLen) / 38;
    wordInLine = parseInt(wordInLine);

    var marginTop = 60 - (62 + ((wordInLine + 1) * 20));
    var marginTopInPex = marginTop.toString() + 'px';
    // when length is 57 the place word will use ...


    function displyPlaceOfLoc() {

        document.querySelector(".placeOfLocHover").style.display = 'block';
        document.querySelector(".placeOfLocHover").style.marginTop = marginTopInPex;

    }
    function hidPlaceOfLoc() {
        if (!cnt) {
            document.querySelector(".placeOfLocHover").style.display = 'none';

        }
    }

    function displyPlaceOfLoc1() {
        if (!cnt) {
            document.querySelector(".placeOfLocHover").style.display = 'block';
            document.querySelector(".placeOfLocHover").style.marginTop = marginTopInPex;
            setCnt(true);
        }
        else {
            document.querySelector(".placeOfLocHover").style.display = 'none';
            setCnt(false);
        }

    }
    const style = {
        color: state.colorStateOfLoc
    }
    return (
        <div>
            {/* <div className='results'><bdi>النتائج:</bdi></div> */}
            <div className='infoOfLoc'>

                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"></link>
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css"></link>
                <div className='img'>
                    <div className='circle'></div>
                    <img src={state.photoOfLoc} className='infoLoc photoOfLoc' ></img>
                </div>
                <div className='infoLoc nameOfLoc'><bdi>{state.nameOfLoc}</bdi></div>
                <div className='infoLoc typeOfLoc'><bdi>{state.typeOfLoc}</bdi><i className="info fa fa-cutlery" aria-hidden="true"></i></div>
                {/* <div className='infoLoc placeOfLocHover' ><bdi>{state.placeOfLoc}</bdi></div> */}
                <span> <div className='infoLoc placeOfLoc'><bdi>{state.placeOfLoc}</bdi></div><i className="infoLoc info fa fa-map-marker" aria-hidden="true"></i> </span>
                {/* onMouseOver={displyPlaceOfLoc} onMouseLeave={hidPlaceOfLoc}
                    onClick={displyPlaceOfLoc1} > */}
                <div className='infoLoc stateOfLoc'><bdi ><b><span style={style}>{state.stateOfLoc}</span></b></bdi><i className="info fa fa-clock-o"></i></div>
                <div className='Follow' onClick={foll} 
                    style={{
                        color: state.follow == true && isUserLogin == true ? '#FFFFFF' : '#525151',
                        backgroundColor: state.follow == true && isUserLogin == true ? '#47A851' : '#FFFFFF'
                    }}><bdi>متابعة</bdi></div>
                <StartRate />


            </div>
        </div>
    )


}

export default InfoOfLoc;