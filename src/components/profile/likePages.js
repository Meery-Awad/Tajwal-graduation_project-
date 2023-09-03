import React, { useEffect, useState } from 'react';
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import ShowMore from 'react-show-more-button';
import './likePages.scss'
import { useSelector } from 'react-redux';
import sadSmail from '../photo/frowning_face.gif'
import WOW from 'wowjs';
import { useBetween } from 'use-between';
//  const getItems = () =>
//     Array(20)
//         .fill(0)
//         .map((_, ind) => ({ id: `element-${ind}` }));
function LikePages(props) {
  
   

    setTimeout(() => {
        var skeletonTodoLoad = document.getElementsByClassName('skeleton-sugg-load-profile');
        for (let i = 0; i < skeletonTodoLoad.length; i++) {
            skeletonTodoLoad[i].style.display = 'none'
        }

        var listItemsLoad = document.getElementsByClassName('pages-sugg-load-profile');
        for (let i = 0; i < listItemsLoad.length; i++) {
            listItemsLoad[i].style.display = 'block'
        }

    }, 5000)

    const state = useSelector((state) => state.data);
    const { profileData,setProfileData} = useBetween(state.useShareState);
    var items=profileData;
    const [btnName, setbtnName] = useState('عرض المزيد');
    const cnt = () => {
        if (btnName == 'عرض المزيد')
            setbtnName('عرض الاقل')
        else
            setbtnName('عرض المزيد')
    }
 
    const tempSkeletonLikePagesKeys = ['skeletonLikePages1', 'skeletonLikePages2', 'skeletonLikePages3', 'skeletonLikePages4',
        'skeletonLikePages5', 'skeletonLikePages6', 'skeletonLikePages7', 'skeletonLikePages8'];

    var skeletonPages = tempSkeletonLikePagesKeys.map(skeleton => {
        return (
            <div className="SuggPages skeleton skeleton-sugg-load-profile" key={skeleton}>
                <div className='imgPage skeleton' />
                <div className="info title-animate">
                    <div className='namePages skeleton skeleton-text skeleton-text-sugg'></div>
                    <div className='typePages skeleton skeleton-text skeleton-text-sugg'></div>
                    <div className='typePages skeleton skeleton-text skeleton-text-sugg'></div>
                </div>
            </div>
        )
    });

    const LikePages =items.followedBusiness.length ? (
       
        items.followedBusiness.map(item => {
           
            return (
                <div className="SuggPages pages-sugg-load-profile" key={item._id}>
                    <div className="ratePages">{item.rateValue.toFixed(1)} <i className='fa fa-star '></i></div>
                    <img src={item.image.url} className='imgPage'></img>
                    <div className="info">
                        <div className='namePages'>{item.name}</div>
                        {/* <div className='typePages'> <i className={`${item.businessTypeName.name == 'مطاعم' ? "fa fa-cutlery" : "fas fa-tshirt"}`}></i>{item.businessTypeName.name}</div> */}
                        <div className='typePages'> <i className={`${item.businessTypeName.name == 'مطاعم' ? "fa fa-cutlery" : "fas fa-tshirt"}`}></i>{item.businessTypeName.name}</div>
                        <div className='typePages'> <i className="fa fa-map-marker" aria-hidden="true"></i> {item.location.address} </div>
                    </div>
                </div>
            )

        })): (

          <p></p>
    
        )
    const styleBtn = {

        background: '#47A851',
        color: 'white',
        width: '130px',
        border: 'none',
        borderRadius: '50px',
        paddingBottom: '6px',
    }
    return (
        <div className='LikeP'>
            <div className='ContSugg'  style={{display:items.followedBusiness.length>0?'block':'none'}}>
                <ShowMore maxHeight={450}

                    className='ListLikeProd'
                    onChange={() => cnt()}
                    button={
                        <button style={styleBtn} className="btnSeeMore">{btnName}</button>}
                >
                    <div className="ContSuggPages col-lg-12">
                        {skeletonPages}
                        {LikePages}
                    </div>
                </ShowMore>
            </div>
            <p style={{display:items.followedBusiness.length==0?'block':'none'}}><bdi> لا توجد متاجر تتابعها حتى الآن!!<img src={sadSmail} className='sadSmail'></img></bdi></p>
        </div>
    )
}
export default LikePages;