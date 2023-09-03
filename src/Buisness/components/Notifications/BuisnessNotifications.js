/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import '../../../bootstrap/css/bootstrap.css';
import '../../style/App.css';
import { useSelector } from 'react-redux';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { useBetween } from 'use-between';
// import { BrowserRouter, Routes, Route, Switch, Link, NavLink } from "react-router-dom";


function BuisnessNotifications(props) {
    const st = useSelector((state) => state.dataB);
    const state = useSelector((state) => state.data);

    const { isUserOrBuisness, setisUserOrBusisness } = useBetween(state.useShareState);
    const notifications = (isUserOrBuisness === 'buisness') ? (st.notifications) : (st.notificationsForClient);
    var keyNotification = '1';
    let length = notifications.length;
    // length=0;

    // Skeleton wait load
    setTimeout(() => {
        // Comments
        var skeletonTodoLoad = document.getElementsByClassName('skeleton-notification-load');
        for (let i = 0; i < skeletonTodoLoad.length; i++) {
            skeletonTodoLoad[i].style.display = 'none'
        }

        var listItemsLoad = document.getElementsByClassName('list-notification-load');
        for (let i = 0; i < listItemsLoad.length; i++) {
            listItemsLoad[i].style.display = 'flex'
        }


    }, 3000)

    // SKELETONS
    const tempSkeletonNotifications = ['skeletonNotif1', 'skeletonNotif2', 'skeletonNotif3', 'skeletonNotif4', 'skeletonNotif5'];
    var skeletonNotifications = tempSkeletonNotifications.map(skeleton => {
        var classText = 'notification-buisness-text title-animate';
        var classImg = 'rounded-circle notification-photo skeleton';
        var classLineImg = 'notification-line-img skeleton';
        return (
            <div className='notification-buisness skeleton-notification-load' key={skeleton} dir='rtl'>
                <div className={classLineImg} style={{ borderColor: 'transparent' }}></div>
                <div className={classImg} style={{ borderColor: 'transparent' }} alt="..." />
                <div className={classText}>
                    <div className="not-text skeleton skeleton-text-notif"></div>
                    <div className="not-date skeleton skeleton-text-notif"></div>
                </div>
                <div className="not-product-photo skeleton" alt="..." />

            </div >
        )
    })

    const ListNotifications = length ? (
        notifications.map(notification => {
            var classText = 'notification-buisness-text';
            var classImg = 'rounded-circle notification-photo';
            var classLineImg = 'notification-line-img';

            var classTextAdd;
            var classImgAdd;
            var classLineImgAdd;

            // if (notification.notificationType === 'dislike') {
            //     classTextAdd = ' notification-text-' + notification.notificationType;
            //     classText = classText + classTextAdd;

            //     classImgAdd = ' notification-img-' + notification.notificationType;
            //     classImg = classImg + classImgAdd;

            //     classLineImgAdd = ' notification-line-img-' + notification.notificationType;
            //     classLineImg = classLineImg + classLineImgAdd;
            // }
            if (isUserOrBuisness === 'buisness') {
                var interactionType;
                var notificationSuffix;
                if (notification.notificationType === 'rate') {
                    interactionType = 'قيّم كلّ من ';
                    notificationSuffix = 'منتج ال';
                }
                // else if (notification.notificationType === 'dislike') interactionType = 'لم يعجب كلّ من '
                else if (notification.notificationType === 'comment') {
                    interactionType = 'علّق كلّ من ';
                    notificationSuffix = 'في منتج ال';
                }
            }
            else {
                if (notification.notificationType === 'reply') {
                    interactionType = 'قام المتجر ';
                    notificationSuffix = 'بالردّ على تعليقك على منتج ال';
                }
                // else if (notification.notificationType === 'dislike') interactionType = 'لم يعجب كلّ من '
                else if (notification.notificationType === 'post') {
                    interactionType = 'أضاف المتجر ';
                    notificationSuffix = 'منتج جديد هو ';
                }
            }




            return (
                <div className='notification-buisness list-notification-load' key={notification.notificationId}>
                    <div className={classLineImg}>
                        {
                            notification.notificationType === 'rate' ? (
                                <i className="bi bi-star"></i>
                            ) : (
                                notification.notificationType === 'dislike' ? (
                                    <i className="bi bi-hand-thumbs-down"></i>
                                ) : (
                                    notification.notificationType === 'comment' ? (
                                        <i className="bi bi-chat-square"></i>
                                    ) : (
                                        notification.notificationType === 'reply' ? (
                                            <i className="bi bi-reply"></i>
                                        ) : (
                                            notification.notificationType === 'post' ? (
                                                <i className="bi bi-cart"></i>
                                            ) : (<></>)
                                        )
                                    )
                                )
                            )
                        }
                    </div>
                    <img src={
                        isUserOrBuisness === 'buisness' ? notification.notificationClients[0].photo : notification.notificationShop.photo
                    } className={classImg} alt="..." />
                    <div className={classText}>
                        <div className="not-text">
                            {
                                interactionType
                            }
                            <span style={{ fontWeight: 'bold', marginLeft: '0.12em', marginRight: '0.12em' }}>{
                                isUserOrBuisness === 'buisness' ? notification.notificationClients[0].name : notification.notificationShop.name
                            }</span>
                            {
                                isUserOrBuisness === 'buisness' ? (
                                    <>
                                        {' و '}
                                        <span style={{ fontWeight: 'bold', marginLeft: '0.12em', marginRight: '0.12em' }}>{(notification.notificationClients.length) - 1}</span>
                                        <span style={{ fontWeight: 'bold', marginLeft: '0.12em', marginRight: '0.12em' }}> {'آخرون '} </span>
                                    </>
                                ) : (<></>)
                            }

                            {
                                notificationSuffix + notification.notificationProduct
                            }
                        </div>
                        <div className="not-date">
                            {notification.notificationDate}
                        </div>
                    </div>
                    <img src={notification.notificationPhoto} className="not-product-photo" alt="..." />

                </div >
            )
        })
    ) : (
        <div className='no-notification'>

            <div>
                <span className='count-0'>0</span>
                <i className="bi bi-bell no-notification-icon"></i>
            </div>
            <div className='no-notification-line1'>ليس لديك أي إشعارات حتى الآن.</div>
            {/* <i className="bi bi-bell"></i> */}
        </div>
    )


    return (
        <>

            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-icons/1.7.2/font/bootstrap-icons.min.css" />
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"></link>
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css"></link>

            <ul className="notification-list" dir="rtl" >
                {skeletonNotifications}
                {
                    ListNotifications.length ? (
                        ListNotifications.map(notify => {
                            return (
                                <li key={keyNotification++}>{notify}</li>
                            )
                        })
                    ) : (<></>)
                }
            </ul>
        </>

    )
}
export default BuisnessNotifications;

