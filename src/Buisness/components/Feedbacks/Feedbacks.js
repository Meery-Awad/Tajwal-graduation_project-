/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import '../../../bootstrap/css/bootstrap.css';
import '../../style/App.css';
import { useBetween } from 'use-between';
import { useSelector } from 'react-redux';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import Axios from 'axios'


function Feedbacks() {
    const st = useSelector((state) => state.dataB);

    // Access Token
    const { accessToken, setAccessToken } = useBetween(st.useSharingFilters);

    // Feedbacks
    const { feedbacks, setFeedbacks } = useBetween(st.useSharingFilters);
    const { newFeedNumber, setNewFeedNumber } = useBetween(st.useSharingFilters);
    const { oldFeed, setOldFeed } = useBetween(st.useSharingFilters);

    let length = feedbacks.length;
    var keyFeedbacks = '1';
    // const [newFeedNumber, setNewFeedNumber] = useState(0);
    // const [newFeed, setNewFeed] = useState(0);
    // const [oldFeed, setOldFeed] = useState(0);

    // Skeleton wait load
    setTimeout(() => {
        // Comments
        var skeletonTodoLoad = document.getElementsByClassName('skeleton-feedback-load');
        for (let i = 0; i < skeletonTodoLoad.length; i++) {
            skeletonTodoLoad[i].style.display = 'none'
        }

        var listItemsLoad = document.getElementsByClassName('list-feedback-load');
        for (let i = 0; i < listItemsLoad.length; i++) {
            listItemsLoad[i].style.display = 'flex'
        }


    }, 3000)

    useEffect(() => {

        length = feedbacks.length;

        Axios.get("https://tajwal2.herokuapp.com/api/complains", {
            headers: {
                'Authorization': 'Bearer ' + accessToken,
                "Content-Type": "application/json;charset=UTF-8"
            }
        })
            .then(res => {

                var tempFeedbacks = [];
                for (let i = 0; i < res.data.data.complains.length; i++) {
                    tempFeedbacks.push({
                        id: res.data.data.complains[i].id,
                        text: res.data.data.complains[i].text,
                        date: res.data.data.complains[i].createdAt.slice(0, 10)
                    })
                    if(res.data.data.complains[i].seen === false){
                        setNewFeedNumber(newFeedNumber+1);
                    }
                }
                console.log(res.data.data.complains)
                console.log(newFeedNumber)
                // setNewFeedNumber(res.data.data.complains.length - oldFeed)
                // setOldFeed(res.data.data.complains.length)
                setFeedbacks(tempFeedbacks.reverse())
            })
            .catch(err => { console.log("feedbacks error: " + err) })
    }, [])
    // SKELETONS
    const tempSkeletonFeedbacks = ['skeletonFeedback1', 'skeletonFeedback2', 'skeletonFeedback3', 'skeletonFeedback4', 'skeletonFeedback5'];
    var skeletonFeedbacks = tempSkeletonFeedbacks.map(skeleton => {
        var classText = 'notification-buisness-text feedback-box title-animate';
        var classLineImg = 'notification-line-img feedback-line-img skeleton';
        return (
            <div className='notification-buisness skeleton-feedback-load' key={skeleton} dir="rtl" >
                <div className={classLineImg}>
                    <i className="bi bi-exclamation-triangle" style={{ fontWeight: "bold", fontSize: "1.2em" }}></i>
                </div>
                <div className={classText}>
                    <div className="not-text skeleton skeleton-text-notif"></div>
                    <div className="not-date skeleton skeleton-text-notif"></div>
                </div>
            </div >
        )
    })


    const ListFeedbacks = length ? (
        feedbacks.map(feedback => {
            var classText = 'notification-buisness-text feedback-box';
            var classLineImg = 'notification-line-img feedback-line-img';

            return (
                <div className='notification-buisness list-feedback-load' key={feedback.id} dir="rtl">
                    <div className={classLineImg}>
                        <i className="bi bi-exclamation-triangle" style={{ fontWeight: "bold", fontSize: "1.2em" }}></i>
                    </div>
                    <div className={classText} style={{backgroundColor:feedback.seen==false?'red':'inherit'}}>
                        <div className="not-text">
                            {feedback.text}
                        </div>
                        <div className="not-date">
                            {feedback.date}
                        </div>
                    </div>
                </div >
            )
        })
    ) : (
        <></>
    )


    return (
        <>

            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-icons/1.7.2/font/bootstrap-icons.min.css" />
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"></link>
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css"></link>


            <ul className="notification-list" dir="auto" >
                {skeletonFeedbacks}
                <span className="number-feed" style={{ display: newFeedNumber > 0 ? 'block' : 'none' }}
                >هناك {newFeedNumber} شكوى جديدة</span>

                {
                    ListFeedbacks.length ? (
                        ListFeedbacks.map((notify, index) => {
                            return (
                                <li key={keyFeedbacks++} >{notify}</li>
                            )
                        })
                    ) : (
                        <div className='no-notification'>

                            {/* <div>
                                <span className='count-0'>0</span>
                                <i className="bi bi-bell no-notification-icon"></i>
                            </div>
                            <div className='no-notification-line1'>ليس لديك أي إشعارات حتى الآن.</div> */}
                            {/* <i className="bi bi-bell"></i> */}
                            <div><i className="bi bi-emoji-smile no-notification-icon"></i></div>
                            <div className='no-notification-line1'>ليس لديك أي شكاوي حتى الآن.</div>
                        </div>
                    )
                }
            </ul>

        </>

    )
}
export default Feedbacks;

