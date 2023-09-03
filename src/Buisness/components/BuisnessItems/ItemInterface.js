import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useBetween } from 'use-between';
import { useLocation } from 'react-router-dom';
import { NavLink } from "react-router-dom";
import '../../../bootstrap/css/bootstrap.css'
import '../../style/App.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ShowMore from 'react-show-more-button';
import Slider from "react-slick";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import ItemDeleteModal from './itemDeleteModal';
import ItemEditModal from './itemEditModal';
import StarRatings from 'react-star-ratings';
import StartRate from '../../../components/map/startRate/startRate';
import Axios from 'axios'


function SampleNextArrow(props) {
    const { className, style, onClick } = props;


    return (
        // <div
        //     className={className}
        //     style={{ ...style, display: "block", background: "black", color: "black" }}
        //     onClick={onClick}
        // />
        <div
            className={className}
            style={{ display: "block", background: "green", color: "green", "borderRadius": "50%", "fontSize": "1em" }}
            onClick={onClick}
        ></div>
    );
}

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ display: "block", background: "green", color: "green", "borderRadius": "50%", "fontSize": "1em" }}
            onClick={onClick}
        ></div>
    );
}
function ItemInterface() {

    // HOOKS
    const st = useSelector((state) => state.dataB);
    const state = useSelector((state) => state.data);
    const { buisnessProfile, setBuisnessProfile } = useBetween(st.useSharingFilters);
    const [refresh, setRefresh] = useState(true);
    const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
    const dispatch = useDispatch();
    const [clickLike, setClickLike] = useState(-1);
    const [clickDislike, setClickDisLike] = useState(-1);
    const [colorLike, setColorLike] = useState(null);
    const [colorDislike, setColorDisLike] = useState(null);
    let location = useLocation();
    location = location.state.itemId;

    // business work type
    const { businessWorkType, setBusinessWorkType } = useBetween(st.useSharingFilters);

    // User Type
    const { userType, setUserType } = useBetween(st.useSharingFilters);

    // Access Token
    const { accessToken, setAccessToken } = useBetween(st.useSharingFilters);

    // All products
    const { items, setItems } = useBetween(st.useSharingFilters);

    // const [items, setItems] = useState((businessWorkType === 'مطاعم') ? (st.items) : (st.clothesItems));
    // const [item, setItem] = useState(items[location-1]);
    const { item, setItem } = useBetween(st.useSharingFilters);
    // console.log(location)

    const [comments, setComments] = useState(item.itemCommentsDetails);
    // Like / DisLike
    const { dropdownOpenLogin, setdropdownOpenLogin } = useBetween(state.useShareState);
    const { isUserOrBuisness, setisUserOrBusisness } = useBetween(state.useShareState);
    const { isUserLogin, setisUserLogin, theProd, setTheProd } = useBetween(state.useShareState);
    const { flyTo, setFlyTo } = useBetween(state.useShareState);
    var likeColor = '#1c5ee2';
    var another = "white";


    // Skeleton wait load
    setTimeout(() => {
        // Comments
        var skeletonTodoLoad = document.getElementsByClassName('skeleton-item-comments-load');
        for (let i = 0; i < skeletonTodoLoad.length; i++) {
            skeletonTodoLoad[i].style.display = 'none'
        }

        var listItemsLoad = document.getElementsByClassName('list-item-comments-load');
        for (let i = 0; i < listItemsLoad.length; i++) {
            listItemsLoad[i].style.display = 'block'
        }

        // Details
        skeletonTodoLoad = document.getElementsByClassName('skeleton-item-details-load');
        for (let i = 0; i < skeletonTodoLoad.length; i++) {
            skeletonTodoLoad[i].style.display = 'none'
        }

        listItemsLoad = document.getElementsByClassName('list-item-details-load');
        for (let i = 0; i < listItemsLoad.length; i++) {
            listItemsLoad[i].style.display = 'block'
        }

        // Album
        skeletonTodoLoad = document.getElementsByClassName('skeleton-item-album-load');
        for (let i = 0; i < skeletonTodoLoad.length; i++) {
            skeletonTodoLoad[i].style.display = 'none'
        }

        listItemsLoad = document.getElementsByClassName('list-item-album-load');
        for (let i = 0; i < listItemsLoad.length; i++) {
            listItemsLoad[i].style.display = 'flex'
        }

        // Similar Meal
        skeletonTodoLoad = document.getElementsByClassName('skeleton-similar-meal-load');
        for (let i = 0; i < skeletonTodoLoad.length; i++) {
            skeletonTodoLoad[i].style.display = 'none'
        }

        listItemsLoad = document.getElementsByClassName('list-similar-meal-load');
        for (let i = 0; i < listItemsLoad.length; i++) {
            listItemsLoad[i].style.display = 'block'
        }
    }, 5000)

    // check login
    const dropDownLogin = () => {
        if (state.isUserLogin == false)
            setdropdownOpenLogin(!dropdownOpenLogin)
    }


    // SHOW MORE
    const [btnNameComments, setbtnNameComments] = useState('عرض المزيد');
    const [btnNameProducts, setbtnNameProducts] = useState('عرض المزيد');
    const cntComments = () => {
        if (btnNameComments == 'عرض المزيد')
            setbtnNameComments('عرض الاقل')
        else
            setbtnNameComments('عرض المزيد')
    }
    const cntProducts = () => {
        if (btnNameProducts == 'عرض المزيد')
            setbtnNameProducts('عرض الاقل')
        else
            setbtnNameProducts('عرض المزيد')
    }

    const styleBtn = {
        background: '#47A851',
        color: 'white',
        width: '130px',
        border: 'none',
        borderRadius: '50px',
        paddingBottom: '6px',
    }


    useEffect(() => {
        setItem(items[location])
        console.log(items[location])
    }, [refresh, item, items]);


    // MODAL DELETE COMMENT VARIABLES
    const [commentId, setCommentId] = useState();

    // MODAL DELETE COMMENT SHOW FUNCTIONS
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = (commentId) => {
        setCommentId(commentId);
        setShow(true)
    };



    const handleDeleteComment = (itemId) => {
        // dispatch({
        //     type: 'delete-comment',
        //     state: {
        //         itemId: itemId - 1,
        //         commentId: commentId - 1
        //     }
        // });
        let lgth = st.items[itemId - 1].itemCommentsDetails.length;
        let tempCommentDetails = [];

        for (let i = 0; i < lgth; i++) {
            if ((commentId - 1) !== i) {
                tempCommentDetails.push(st.items[itemId - 1].itemCommentsDetails[i])
            }
        }
        setComments(tempCommentDetails)
        handleClose();

    }


    // MODAL DELETE REPLY VARIABLES
    const [replyId, setReplyId] = useState();

    // MODAL DELETE REPLY SHOW FUNCTIONS
    const [showDeleteReplyModal, setShowDeleteReplyModal] = useState(false);

    const handleCloseDeleteReplyModal = () => setShowDeleteReplyModal(false);
    const handleShowDeleteReplyModal = (commentId, replyId) => {
        setCommentId(commentId);
        setReplyId(replyId);

        setShowDeleteReplyModal(true);
    };



    const handleDeleteReplyModal = (itemId) => {
        // dispatch({
        //     type: 'delete-reply',
        //     state: {
        //         itemId: itemId - 1,
        //         commentId: commentId - 1,
        //         replyId: replyId - 1
        //     }
        // });
        setRefresh(!refresh);
        handleCloseDeleteReplyModal();
    }

    // Constants And Variables
    // const items = (businessWorkType === 'مطاعم') ? (st.items) : (st.clothesItems);
    // const item = items[location - 1];
    // let userType = userType; // business OR user

    var newReply = {
        id: 3, // number of replies plus one
        name: st.buisnessProfile.WorkName, // name for both (either client profile or buisness profile)
        photo: st.buisnessProfile.workPicture, // profile picture for both (either client profile or buisness profile)
        date: '28/11/2021',
        text: 'شكرا لدعمكم .. منتمنى دائما نكون عند حسن ظنك'
    }

    var newComment = {
        commentNumber: items[location].itemCommentsDetails.length,
        id: '555',
        clientName: (isUserOrBuisness === 'business') ? buisnessProfile.WorkName : state.currentUser[0].userName,
        clientPhoto: (isUserOrBuisness === 'business') ? buisnessProfile.workPicture : state.currentUser[0].userPhoto,
        date: '28/11/2021',
        text: 'شكرا لدعمكم .. منتمنى دائما نكون عند حسن ظنك',
        repliesVisibility: false,
        replies: []
    }

    const settings = {
        dots: true,
        className: "center",
        infinite: false,
        // centerPadding: "60px",
        slidesToShow: 6,
        swipeToSlide: true,
        rtl: true,
        arrows: true,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />
    };

    // Functions
    //** Replies */ 
    const showReplies = (itemId, commentId, currentVisility) => {
        // dispatch({
        //     type: 'switch-replies-visibility',
        //     state: {
        //         itemId: itemId,
        //         commentId: commentId,
        //         visibile: !currentVisibility
        //     }
        // })
        items[location].itemCommentsDetails[commentId].repliesVisibility = !currentVisility;
        setRefresh(!refresh)
    }
    const writingReply = (event) => {
        newReply.text = event.target.value;
    }
    const addNewReplyButton = (itemId, commentId) => {
        newReply.id = item.itemCommentsDetails[commentId - 1].replies.length + 1;
        dispatch({
            type: 'add-new-reply-btn',
            state: {
                itemId: itemId,
                commentId: commentId,
                newReply: newReply
            }
        })
        document.getElementById('id-reply-input' + commentId).value = '';
        setRefresh(!refresh)
    }
    //** Images Album */ 
    const toNextPhoto = () => {
        if (currentPhotoIndex === item.itemPhotos.length - 1) {
            setCurrentPhotoIndex(0);
        }
        else {
            setCurrentPhotoIndex(currentPhotoIndex + 1);
        }

    }
    const toPreviousPhoto = () => {
        if (currentPhotoIndex === 0) {
            setCurrentPhotoIndex(item.itemPhotos.length - 1);
        }
        else {
            setCurrentPhotoIndex(currentPhotoIndex - 1);
        }
    }

    //** New Comment */ 
    const writingComment = (event) => {
        newComment.text = event.target.value;
    }
    const addNewCommentButton = (itemId) => {
        if (isUserLogin == false) {
            // window.scrollTo(0, 0)
            setdropdownOpenLogin(!dropdownOpenLogin)
        }
        else {
            newComment.commentNumber = items[location].itemCommentsDetails.length + 1;
            items[location].itemCommentsDetails.push(newComment)
            setItems(items)
            // setComments(updateComments);
            // dispatch({
            //     type: 'add-new-comment-btn',
            //     state: {
            //         itemId: itemId,
            //         newComment: newComment
            //     }
            // })
            const data = {
                "productId": items[location].itemId,
                "text": newComment.text
            }
            const headers = {
                'Authorization': 'Bearer ' + accessToken,
                "content-type": "application/json;charset=UTF-8"
            };
            Axios.post(
                "https://tajwal2.herokuapp.com/api/comments",
                data,
                { headers }
            ).then(res => { console.log(res.data) })
                .catch(err => console.log(err))

            document.getElementById('comment-input').value = '';
            setRefresh(!refresh)
        }
    }

    //** Like Item */
    const likeItem = (itemId) => {
        dispatch({
            type: 'add-like',
            state: {
                itemId: itemId,
            }
        })
    }

    //** DisLike Item */
    const dislikeItem = (itemId) => {
        dispatch({
            type: 'add-dislike',
            state: {
                itemId: itemId,
            }
        })
    }

    // SKELETONS
    const tempSkeletonCommentKeys = ['skeletonComment1', 'skeletonComment2', 'skeletonComment3', 'skeletonComment4'];
    var skeletonItems = tempSkeletonCommentKeys.map(skeleton => {
        return (
            <div key={skeleton} className="comment-and-replies skeleton-item-comments-load">
                <div className='comment-box'>
                    <div className="comment-img skeleton" alt="..." style={{ border: 'none' }} />
                    <div className='comment-body' style={{ border: 'none' }}>
                        <div className="row skeleton title-animate skeleton-comment-name" style={{ width: '20%' }}>
                            <div className='comment-name col  '>
                            </div>
                        </div>
                        <div className='comment-date'></div>
                        <div className='comment-text title-animate'>
                            <div className='skeleton skeleton-text'></div>
                            <div className='skeleton skeleton-text'></div>
                            <div className='skeleton skeleton-text'></div>
                        </div>
                        <div className='comment-reply' dir='ltr'>
                        </div>
                    </div>
                </div>
            </div>
        )
    })

    const tempSkeletonItemDetails = ['skeletonDetails1'];
    var skeletonItemDetails = tempSkeletonItemDetails.map(skeleton => {
        return (
            <div className="col imgs-information-container skeleton-item-details-load" key={skeleton}>
                <div className='item-header-details d-flex justify-content-between title-animate ' dir='rtl'
                    style={{ paddingBottom: '5px' }}>
                    <span className='item-header-name skeleton skeleton-text skeleton-item-name' dir='rtl'
                        style={{ width: '30%' }}>...</span>
                    <span className='item-header-price skeleton skeleton-text skeleton-item-name'
                        style={{ width: '20%' }}>...</span>
                </div>
                <div className='item-describe-details title-animate' dir='rtl'>
                    <div className='skeleton skeleton-text skeleton-text-details'></div>
                    <div className='skeleton skeleton-text skeleton-text-details'></div>
                    <div className='skeleton skeleton-text skeleton-text-details'></div>
                    <div className='skeleton skeleton-text skeleton-text-details'></div>
                </div>

            </div>
        )
    })

    const tempSkeletonItemAlbum = ['skeletonAlbum1'];
    var skeletonItemAlbum = tempSkeletonItemAlbum.map(skeleton => {
        return (
            <div className="col imgs-container skeleton-item-album-load" key={skeleton} >
                <div className="imgs-in-album skeleton" alt="..." />
            </div>
        )
    })

    const tempSkeletonSimilarMeals = ['skeletonMeal1', 'skeletonMeal2', 'skeletonMeal3', 'skeletonMeal4'
        , 'skeletonMeal5', 'skeletonMeal6', 'skeletonMeal7'];
    var skeletonSimilarMeals = tempSkeletonSimilarMeals.map(skeleton => {
        return (
            <div key={skeleton} className='skeleton-similar-meal skeleton-similar-meal-load col-2'>
                <div className="meal-img skeleton" alt="..." />
                <div className='div-over-similar-meal skeleton'>
                    {/* <div className='skeleton skeleton-text'></div> */}
                </div>
            </div>
        )
    })
    return (
        <div className='item-interface'>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-icons/1.7.2/font/bootstrap-icons.min.css" />
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"></link>
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css"></link>

            {/* First Container ( images album & its information ) */}
            <div className='image-details-container'>
                <div className="row row-cols-1 row-cols-md-2 g-5">
                    {/* Details COLUMN*/}
                    {skeletonItemDetails}
                    <div className="col imgs-information-container list-item-details-load" key={item.itemId + 1}>
                        <div className='item-header-details d-flex justify-content-between' dir='rtl'>
                            <span className='item-header-name' dir='rtl'>{item.itemName}</span>
                            <span className='starItem'
                                style={{ display: isUserOrBuisness == 'business' ? 'none' : 'block' }}><StartRate id={0} /></span>
                            <span className='starItem'
                                style={{ display: isUserOrBuisness == 'business' ? 'block' : 'none' }}>
                                <div className='itemInf starsTop10'>
                                    <StarRatings

                                        rating={2.4}
                                        starRatedColor="#FC0"
                                        numberOfStars={5}
                                        name='rating'
                                        starDimension="20px"
                                        starSpacing="0px"
                                        direction='rtl'

                                    />
                                    <span className='rateTop10'>2.4</span>
                                </div>
                            </span>
                            <span className='item-header-price'>({item.itemPrice})ل.س</span>
                        </div>

                        <div className='item-describe-details' dir='auto' >
                            {(item.itemText !== undefined) ? item.itemText.slice(0, 300) : item.itemText}...
                        </div>
                        <div className='item-ingredients-details' dir='auto'>
                            <span>النوع:</span>
                            <span className='item-ingredients-spans'>
                                <span className='input-add-item category-item'>
                                    {
                                        item.itemType === '' ? 'غير محدد بعد!' : item.itemType
                                    }
                                </span>
                            </span>
                        </div>
                        <div className='item-categories-details' dir='rtl'>
                            <span>التّصنيف:</span>
                            <span className='item-ingredients-spans'>
                                <span className='input-add-item category-item'>
                                    {
                                        item.itemCategory === '' ? 'غير محدد بعد!' : item.itemCategory
                                    }
                                </span>
                            </span>
                        </div>
                        {
                            businessWorkType === 'مطاعم' ? (
                                <div></div>
                            ) : (
                                <div className='item-categories-details item-sizes-details' dir='rtl'>
                                    <span>المقاسات المتوفّرة:</span>
                                    <span className='item-ingredients-spans'>
                                        {
                                            item.itemSizes !== undefined ?
                                                item.itemSizes.length ? item.itemSizes.map(size => {
                                                    return (
                                                        <span key={size} className='input-add-item category-item'>{size + ' '}</span>
                                                    )
                                                }
                                                )
                                                    :
                                                    (
                                                        <span key={"no"} className='input-add-item'>لا توجد مقاسات محددة</span>
                                                    )
                                                : (<></>)
                                        }
                                    </span>
                                </div>
                            )
                        }
                        {
                            userType === 'business' ? (
                                <div className="buttons-edit-delete-item" dir='auto'>
                                    <span>هل تريد؟</span>
                                    <ItemEditModal itemId={item.itemId} />
                                    <ItemDeleteModal itemId={item.itemId} />
                                </div>
                            )
                                : (
                                    <div style={{ marginLeft: '-30px' }}>
                                        <NavLink to='/Welcome' style={{ textDecoration: 'none' }}>
                                            <div className="store-item-interface" dir="rtl" onClick={() => { setFlyTo(true) }}>
                                                <img src={item.itemStorePicture} className="store-img-item-interface" alt="...." />
                                                <span className='store-name-item-interface'>{item.itemStoreName}</span>
                                            </div>
                                        </NavLink>
                                    </div>
                                )
                        }
                    </div>

                    {/* Images Album */}
                    {skeletonItemAlbum}
                    <div className="col imgs-container list-item-album-load" key={item.itemId} style={{ display: 'none' }}>
                        <i className="fa fa-angle-left fa-5x left-arrow-album" aria-hidden="true"
                            onClick={toPreviousPhoto} ></i>

                        <img src={item.itemPhotos !== undefined ? item.itemPhotos[currentPhotoIndex] : item.itemPhotos} className="imgs-in-album" alt="..." />

                        {/* <div className='div-over-img-album d-flex'>
                            {
                                userType === 'business' ? (
                                    <div className='interaction-item'>
                                        <i className="iconProd bi bi-hand-thumbs-up"></i>
                                        <span>{item.itemLikes}</span>
                                    </div>
                                ) : (
                                    <div className='interaction-item' style={{ cursor: 'pointer' }}
                                        onClick={() => like(item)}>
                                        <i className="iconProd bi bi-hand-thumbs-up" style={{
                                            color: item.likeInt == true ? likeColor : another,
                                            transform: item.likeInt == true ? 'scale(0.9)' : 'scale(1)'
                                        }}></i>
                                        <span>{item.itemLikes}</span>
                                    </div>
                                )
                            }
                            {
                                userType === 'business' ? (
                                    <div className='interaction-item'>
                                        <i className="iconProd bi bi-hand-thumbs-down"></i>
                                        <span>{item.itemDislikes}</span>
                                    </div>
                                ) : (

                                    <div className='interaction-item' style={{ cursor: 'pointer' }}
                                        onClick={() => dislike(item)}>
                                        <i className="iconProd bi bi-hand-thumbs-down" style={{
                                            color: item.dislikeInt == true ? likeColor : another,
                                            transform: item.dislikeInt == true ? 'scale(0.9)' : 'scale(1)'
                                        }}></i>
                                        <span>{item.itemDislikes}</span>
                                    </div>
                                )
                            }
                            <div className='interaction-item' onClick={() => { window.scrollTo(0, 200) }}>
                                <i className="iconProd bi bi-chat-square "></i>
                                <span>{item.itemCommentsDetails.length}</span>
                            </div>
                        </div> */}
                        <i className="fa fa-angle-right fa-5x right-arrow-album" aria-hidden="true"
                            onClick={toNextPhoto} ></i>
                    </div>
                </div>
            </div>

            {/* Seperator */}
            <div className='seperator-between-item-container'></div>


            {/* Comments */}
            {/*{*/}
            {/*buisnessProfile.showComment ? (*/}
            <div className='item-comments-container' dir='auto' >
                <div className='comments-header-div'>التّعليقات:</div>
                <ShowMore maxHeight={280}

                    className=''
                    onChange={() => cntComments()}
                    button={
                        <button style={styleBtn} className="">{btnNameComments}</button>}
                >
                    <div className='comments-div'>
                        {skeletonItems}
                        {
                            items[location].itemCommentsDetails.length ? items[location].itemCommentsDetails.map(comment => {
                                return (
                                    <div key={comment.id} className="comment-and-replies list-item-comments-load">
                                        <div className='comment-box'>
                                            <img src={comment.clientPhoto} className="comment-img" alt="..." />
                                            <div className='comment-body'>
                                                <div className="row">
                                                    <div className='comment-name col'>{comment.clientName}</div>
                                                    {
                                                        ((isUserOrBuisness === 'business') ? (comment.clientName === st.buisnessProfile.WorkName ? true : false)
                                                            : (comment.clientName === state.currentUser[0].userName ? true : false))
                                                            ?
                                                            (
                                                                <div className="comment-delete col" dir="ltr">
                                                                    <span className="comment-delete-btn" onClick={() => handleShow(comment.id)}>
                                                                        <i className="bi bi-trash"></i>
                                                                    </span>
                                                                </div>
                                                            ) :
                                                            (
                                                                <div className="col"></div>
                                                            )
                                                    }

                                                    <Modal show={show} onHide={handleClose} size='sm'>


                                                        <Modal.Body className="add-item-modal-body">
                                                            <div className="icon-me-item-delete"><i className="bi bi-trash fa-3x "></i></div>
                                                            <div className="line-under-delete-item-icon">هل أنت متأكد من حذف هذا التعليق ؟</div>
                                                        </Modal.Body>


                                                        <Modal.Footer dir="auto">

                                                            <Button variant="secondary" onClick={handleClose} className="btn-add-item-modal">
                                                                إلغاء
                                                            </Button>
                                                            <Button variant="primary" onClick={() => handleDeleteComment(item.itemId)} className="btn btn-edit btn-add-item-modal">
                                                                تأكيد
                                                            </Button>

                                                        </Modal.Footer>

                                                    </Modal>
                                                </div>
                                                <div className='comment-date'>{comment.date}</div>
                                                <div className='comment-text'>{comment.text}</div>
                                                <div className='comment-reply' dir='ltr'>
                                                    {comment.replies.length}
                                                    <i className="bi bi-reply-fill"></i>
                                                    <span style={{ textDecoration: 'underline', cursor: 'pointer' }} onClick={() => showReplies(location, comment.commentNumber, comment.repliesVisibility)}>Reply</span>
                                                </div>
                                            </div>

                                        </div>
                                        <div className='click-reply' style={{ display: comment.repliesVisibility === false ? 'none' : 'block' }}>
                                            {
                                                comment.replies.length ? comment.replies.map(reply => {
                                                    return (
                                                        <div key={reply.id} className='comment-box reply-box'>
                                                            <img src={reply.photo} className="comment-img" alt="..." />
                                                            <div className='comment-body reply-body'>
                                                                <div className="row">
                                                                    <div className='comment-name col'>{reply.name}</div>
                                                                    {
                                                                        reply.name === st.buisnessProfile.WorkName ?
                                                                            (
                                                                                <div className="comment-delete col" dir="ltr">
                                                                                    <span className="comment-delete-btn" onClick={() => handleShowDeleteReplyModal(comment.id, reply.id)}>
                                                                                        <i className="bi bi-trash"></i>
                                                                                    </span>
                                                                                </div>
                                                                            ) :
                                                                            (
                                                                                <div className="col"></div>
                                                                            )
                                                                    }
                                                                </div>
                                                                <Modal show={showDeleteReplyModal} onHide={handleCloseDeleteReplyModal} size='sm'>


                                                                    <Modal.Body className="add-item-modal-body">
                                                                        <div className="icon-me-item-delete"><i className="bi bi-trash fa-3x "></i></div>
                                                                        <div className="line-under-delete-item-icon">هل أنت متأكد من حذف هذا الرد ؟</div>
                                                                    </Modal.Body>


                                                                    <Modal.Footer dir="auto">

                                                                        <Button variant="secondary" onClick={handleCloseDeleteReplyModal} className="btn-add-item-modal">
                                                                            إلغاء
                                                                        </Button>
                                                                        <Button variant="primary" onClick={() => handleDeleteReplyModal(item.itemId)} className="btn btn-edit btn-add-item-modal">
                                                                            تأكيد
                                                                        </Button>

                                                                    </Modal.Footer>

                                                                </Modal>
                                                                {/* <div className='comment-name'>{reply.name}</div> */}
                                                                <div className='comment-date'>{reply.date}</div>
                                                                <div className='comment-text'>{reply.text}</div>
                                                            </div>
                                                        </div>
                                                    )
                                                }
                                                )
                                                    :
                                                    (
                                                        <span key={"noComments"} className=''></span>
                                                    )
                                            }
                                            <div className='comment-box reply-box add-reply-box'>
                                                <div className='comment-body reply-body add-reply'>
                                                    <div className='comment-text add-reply-text'>
                                                        <input type="text" placeholder='اكتب رد لك..' className='reply-input'
                                                            id={'id-reply-input' + comment.id} onChange={writingReply} />
                                                        <span className="add-reply-button" onClick={() => addNewReplyButton(location, comment.id)}><i className="bi bi-send fa-lg add-reply-button"></i></span>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                                :
                                (
                                    <span>no comments</span>
                                )
                        }
                        {/* add new Comment */}
                        <div className='comment-box add-new-comment'>
                            <div className='comment-body reply-body add-reply'>
                                <div className='comment-text add-reply-text add-comment-text'>
                                    <input type="text" placeholder='اكتب تعليق..' className='reply-input add-comment-input'
                                        id='comment-input' onChange={writingComment} />
                                    <span className="add-reply-button" onClick={() => addNewCommentButton(location)}><i className="bi bi-send fa-lg add-reply-button"></i></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </ShowMore>

            </div>
            {/*) : (<></>)*/}
            {/*}*/}


            {/* Seperator */}
            <div className='seperator-between-item-container'></div>

            {/* Buisness ===> no Slider *** Client ===> Slider */}
            {
                userType === 'business' ? (
                    <div></div>
                ) : (

                    // {/* Similar Food */ }
                    <div className='item-similar-meal-container' dir='auto' >
                        <div className='meal-header-div'>أطعمة مشابهة:</div>

                        {/* <Slider {...settings} className="slider-similar-meal"> */}
                        <ShowMore maxHeight={360}

                            className=''
                            onChange={() => cntProducts()}
                            button={
                                <button style={styleBtn} className="">{btnNameProducts}</button>}
                        >
                            <div className='meals-div row g-4'>
                                {skeletonSimilarMeals}
                                {
                                    st.similarFood.length ? st.similarFood.map((item, index) => {
                                        return (
                                            <NavLink className='list-similar-meal-load col-2' to="/itemInterface" state={{ itemId: item.itemId }} key={item.itemId + 1}
                                                // onClick={() => { window.scrollTo(0, 0) }}
                                                style={{ textDecoration: 'none', color: 'inherit' }} exact="true" >
                                                <div key={item.id + 8} className='similar-meal'>
                                                    <img src={item.photo} className="meal-img" alt="..." />
                                                    <div className='div-over-similar-meal'>{item.name}</div>
                                                </div>
                                            </NavLink>

                                        )
                                    })
                                        :
                                        (
                                            <span>no similar meals</span>
                                        )
                                }
                            </div>
                        </ShowMore>

                    </div>
                )
            }







        </div>
    )
}

export default ItemInterface;
