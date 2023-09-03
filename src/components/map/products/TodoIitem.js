
import { render } from '@testing-library/react';
import React, { Component, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useBetween } from 'use-between';
// import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import './Todoitem.css';

function TodoItem(props) {
    const state = useSelector((state) => state.data);
    const {dropdownOpenLogin,setdropdownOpenLogin } = useBetween(state.useShareState);
    const {idItem, setidItem } = useBetween(state.useShareState);
   
    const {isUserLogin, setisUserLogin, theProd, setTheProd } = useBetween(state.useShareState);
   
 
//    alert(props.id)
  

    const [clickLike, setClickLike] = useState(-1);
    const [clickDislike, setClickDisLike] = useState(-1);
    const [colorLike, setColorLike] = useState(null);
    const [colorDislike, setColorDisLike] = useState(null);

    var wordInLine = (state.placeOfLocLen) / 38;
    wordInLine = parseInt(wordInLine);

    var marginTop = 60 - (62 + ((wordInLine + 1) * 20));
    var marginTopInPex = marginTop.toString() + 'px';
    // when length is 57 the place word will use ...

    const val = ".prodTypeHover"
    // function displyTypeOfProd() {

    //     document.querySelector(val).style.display = 'block';
    //     document.querySelector(val).style.marginTop = marginTopInPex;

    // }
    // function hidTypeOfProd() {
    //     if (!cnt1) {

    //         document.querySelector(val).style.display = 'none';

    //     }
    // }

    // function displyTypeOfProd1() {
    //     if (!cnt1) {

    //         document.querySelector(val).style.display = 'block';
    //         document.querySelector(val).style.marginTop = marginTopInPex;
    //         setCnt1(true);
    //     }
    //     else {
    //         document.querySelector(val).style.display = 'none';
    //         setCnt1(false);
    //     }

    // }
    var likeColor = '#1c5ee2';
    var another = "rgb(134, 132, 132)";
    const dropDownLogin =()=>{
        if(state.isUserLogin==false)
        setdropdownOpenLogin(!dropdownOpenLogin)
    }

    const like = (item) => {
       
      if(isUserLogin==true){
        if (item.likeInt === true) {
            item.like -= 1;
            setClickLike(item.like);
            item.likeInt = false;
            setColorLike(item.likeInt);
            //backend;
            
        }
        else {

            if (item.dislikeInt === true) {
                item.dislike -= 1;
                setClickDisLike(item.dislike);
                item.dislikeInt = false;
                setColorDisLike(item.dislikeInt);
            }

            item.like += 1;
            setClickLike(item.like);
            item.likeInt = true;
            setColorLike(item.likeInt);
            
        }
    }
    else{
        dropDownLogin()
    }

    };

    const dislike = (item) => {
         
        if(isUserLogin==true){
        if (item.dislikeInt === true) {
            item.dislike -= 1;
            setClickDisLike(item.dislike);
            item.dislikeInt = false;
            setColorDisLike(item.dislikeInt);
           
            //backend;


        }
        else {

            if (item.likeInt === true) {
                item.like -= 1;
                setClickLike(item.like);
                item.likeInt = false;
                setColorLike(item.likeInt);
            }

            item.dislike += 1;
            setClickDisLike(item.dislike);
            item.dislikeInt = true;
            setColorDisLike(item.dislikeInt);
         
        }
    }
    else{
        dropDownLogin();
    }

    };

    var mrLeftOfInfo = 0;
    var cnt = 0;

    // const prevIcon = () => {
    //     mrLeftOfInfo = mrLeftOfInfo + 4;
    //     //    alert(mrLeftOfInfo);
    //     cnt++;
    //     document.querySelector(".carousel-control-next-icon").style.display = 'block';
    //     document.querySelector(".ListItems").style.marginLeft = mrLeftOfInfo.toString() + '%';
     
    //     if (mrLeftOfInfo <= 0) {
    //         document.querySelector(".carousel-control-next-icon").style.display = 'none';
    //     }
    //     if (cnt == 6 * prod.length - 6) {
    //         document.querySelector(".carousel-control-prev-icon").style.display = 'none';

    //     }


    // }
    // const nextIcon = () => {
    //     if (mrLeftOfInfo != 0)
    //         mrLeftOfInfo = mrLeftOfInfo - 4;
    //     //  alert(mrLeftOfInfo);
    //     document.querySelector(".carousel-control-prev-icon").style.display = 'block';
    //     document.querySelector(".ListItems").style.marginLeft = mrLeftOfInfo.toString() + '%';
      
    //     if (mrLeftOfInfo <= 0) {
    //         document.querySelector(".carousel-control-next-icon").style.display = 'none';
    //     }
    //     cnt--;

    // }

    const ListItems = theProd.length ? (
        
        theProd.map(item => {
        
            return (
                <div>
                    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"></link>
                    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css"></link>
                    <div key={item.id} className="prodCont"   >
                        <img src={item.img} className="prod-list prodImg"></img><span className="prod-list prodName">{item.name}</span>
                        {/* <div className="prod-list prodTypeHover"  >{item.type}</div> */}
                        <div className="prod-list prodType">{item.type}</div>
                        {/* onMouseOver={displyTypeOfProd} onMouseLeave={hidTypeOfProd}
                            onClick={displyTypeOfProd1}> */}
                        <span className="prod-list price">السعر:</span> <span className="prod-list prodPrice">{item.price} ل.س </span>
                        <div className='item'>
                            <div className='iconInteractions'>

                                {/* <input type="checkbox" class="checkbox" /> */}
                                <div className="likeBtn" onClick={() => like(item)} >
                                    <i className="inter fa fa-thumbs-up" aria-hidden="true"
                                        style={{ color: item.likeInt == true ? likeColor : another, 
                                        transform:item.likeInt == true ? 'scale(0.9)' : 'scale(1)' }}></i>
                                </div>
                                <div className="dislikeBtn" onClick={() => dislike(item)}>
                                    <i className=" inter fa fa-thumbs-down" aria-hidden="true"
                                        style={{ color: item.dislikeInt == true ? likeColor : another,
                                            transform:item.dislikeInt == true ? 'scale(0.9)' : 'scale(1)' }}></i>
                                </div>
                               

                                <div ><i className='inter fas fa-comments' ></i>
                                </div>
                                </div>
                                <div className='prodInteractions'>
                                    <span className='prod-list inter1 comment' >{item.comment}</span>
                                    <span className=' prod-list inter1  dislike'>{item.dislike}</span>
                                    <span className='prod-list inter1 like'>{item.like}</span>

                                </div>
                           
                        </div>






                    </div>

                </div>

            )
        })
    ) : (

        <p></p>



    )


    return (

        <div className='Todo' >
            <div className="ListItemsTodo"  >
                {ListItems}
            </div>
          



        </div>
    )

}

export default TodoItem;