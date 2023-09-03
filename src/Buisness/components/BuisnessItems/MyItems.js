import React, { useEffect } from 'react';
import '../../../bootstrap/css/bootstrap.css'
import '../../style/App.css';
import { useSelector } from 'react-redux';
import { useBetween } from 'use-between';
import { NavLink, useLocation } from "react-router-dom";
import TodoItems from './TodoItems';
import FilterItems from './FilterItems';
import Axios from 'axios'

function MyItems(props) {

    // HOOKS
    const st = useSelector((state) => state.dataB);
    const state = useSelector((state) => state.data);

    const { TypesUp, setTypesUp } = useBetween(st.useSharingFilters);
    const { categoriesDropdown, setCategoriesDropdown } = useBetween(st.useSharingFilters);
    const { buisnessProfile, setBuisnessProfile } = useBetween(st.useSharingFilters);
    const { isUserOrBuisness, setisUserOrBusisness } = useBetween(state.useShareState);
    // Access Token
    const { accessToken, setAccessToken } = useBetween(st.useSharingFilters);
    
    const { items, setItems } = useBetween(st.useSharingFilters);

    const { workTypeId, setWorkTypeId, deletedItem, setDeletedItem } = useBetween(st.useSharingFilters);
    const { addedPhotos, setAddedPhotos } = useBetween(st.useSharingFilters);

    let location = useLocation();
    var itemsFromClient = [];
    var workTypeIdForClient = '';


    useEffect(() => {

        if (isUserOrBuisness === 'user') {
            itemsFromClient = location.state.items;
            workTypeIdForClient = location.state.workTypeId;

            var itemsArray = [];
            for (let i = 0; i < itemsFromClient.length; i++) {
                const item = itemsFromClient[i];
                console.log(item)
                var imagesArray = [];
                // get images of item
                for (let j = 0; j < item.images.length; j++) {
                    const img = item.images[j].url;
                    imagesArray.push(img);
                }
                var commentsArray = [];
                // get comments of item
                for (let j = 0; j < item.comments.length; j++) {
                    const comment = item.comments[j];
                    var commentInfo = {
                        commentNumber: j,
                        id: comment.id,
                        clientName: comment.userName,
                        clientPhoto: comment.userImage,
                        date: '27/11/2021',
                        text: comment.text,
                        repliesVisibility: false,
                        replies: [
                            {
                                id: 1,
                                name: buisnessProfile.WorkName,
                                photo: buisnessProfile.workPicture,
                                date: '28/11/2021',
                                text: 'شكرا لدعمكم .. منتمنى دائما نكون عند حسن ظنك'
                            }
                        ]
                    }
                    commentsArray.push(commentInfo);
                }

                itemsArray.push({
                    itemNumber: i,
                    itemId: item.id,
                    itemStoreName: item.businessName,
                    itemStorePicture: item.images[0].url,// channnnnnge
                    itemName: item.name,
                    itemPhotos: imagesArray,
                    itemCategory: (item.categories.length > 0) ? item.categories[0].categoryName : [],
                    itemType: (item.types.length > 0) ? item.types[0].typeName : [],
                    itemText: item.description,
                    itemPrice: item.price,
                    itemRate: (item.rateValue !== undefined) ? item.rateValue.toFixed(1) : -1,
                    itemDate: item.createdAt,
                    itemCommentsDetails: commentsArray
                })

            }
            setItems(itemsArray);

            const headers = {
                // 'Authorization': 'Bearer '+ accessToken,
                "content-type": "application/json;charset=UTF-8"
            };
            Axios.get(`https://tajwal2.herokuapp.com/api/businessType/${workTypeIdForClient}/categories`,
                { headers })
                .then(res => {
                    // setTypesUp(res.data.data.types)
                    var t = 'filter-by-id'
                    // welady rgaly neswany
                    var tempCategoriesDropdown = [categoriesDropdown[0]];
                    for (var i = 2; i < res.data.data.categories.length + 2; i++) {
                        tempCategoriesDropdown.push({
                            id: t + i,
                            name: res.data.data.categories[i - 2].name,
                            busTypeId: res.data.data.categories[i - 2].businessTypeId
                        })
                    }
                    setCategoriesDropdown(tempCategoriesDropdown)
                })
                .catch(err => console.log(err))

            Axios.get(`https://tajwal2.herokuapp.com/api/businessType/${workTypeIdForClient}/types`,
                { headers })
                .then(res => {
                    var tempTypesUp = [];
                    for (var i = 1; i < res.data.data.types.length + 1; i++) {
                        tempTypesUp.push({
                            id: i,
                            name: res.data.data.types[i - 1].name,
                            busTypeId: res.data.data.types[i - 1].businessTypeId
                        })
                    }
                    setTypesUp(tempTypesUp)
                })
                .catch(err => console.log(err))
        }
        else if (isUserOrBuisness === 'business') {
            // console.log(workTypeId)

            const headers = {
                // 'Authorization': 'Bearer '+ accessToken,
                "content-type": "application/json;charset=UTF-8"
            };
            Axios.get(`https://tajwal2.herokuapp.com/api/businessType/${workTypeId}/categories`,
                { headers })
                .then(res => {
                    // setTypesUp(res.data.data.types)
                    var t = 'filter-by-id'
                    // welady rgaly neswany
                    var tempCategoriesDropdown = [categoriesDropdown[0]];
                    for (var i = 2; i < res.data.data.categories.length + 2; i++) {
                        tempCategoriesDropdown.push({
                            id: t + i,
                            name: res.data.data.categories[i - 2].name,
                            busTypeId: res.data.data.categories[i - 2]._id
                        })
                    }
                    setCategoriesDropdown(tempCategoriesDropdown)
                })
                .catch(err => console.log(err))

            Axios.get(`https://tajwal2.herokuapp.com/api/businessType/${workTypeId}/types`,
                { headers })
                .then(res => {
                    var tempTypesUp = [];
                    // console.log(res.data.data.types)
                    for (var i = 1; i < res.data.data.types.length + 1; i++) {
                        tempTypesUp.push({
                            id: i,
                            name: res.data.data.types[i - 1].name,
                            busTypeId: res.data.data.types[i - 1]._id
                        })
                    }
                    setTypesUp(tempTypesUp)
                })
                .catch(err => console.log(err))

            Axios.get("https://tajwal2.herokuapp.com/api/business/me", {
                headers: {
                    'Authorization': 'Bearer ' + accessToken,
                    "Content-Type": "application/json;charset=UTF-8"
                }
            })
                .then(resBusinessMe => {
                    var itemsArray = [];
                    for (let i = 0; i < resBusinessMe.data.data.business.products.length; i++) {
                        const item = resBusinessMe.data.data.business.products[i];
                        console.log(item)
                        var imagesArray = [];
                        // get images of item
                        for (let j = 0; j < item.images.length; j++) {
                            const img = item.images[j].url;
                            imagesArray.push(img);
                        }
                        var commentsArray = [];
                        // get comments of item
                        for (let j = 0; j < item.comments.length; j++) {
                            const comment = item.comments[j];
                            var commentInfo = {
                                commentNumber: j,
                                id: comment.id,
                                clientName: comment.userName,
                                clientPhoto: comment.userImage,
                                date: '27/11/2021',
                                text: comment.text,
                                repliesVisibility: false,
                                replies: [
                                    {
                                        id: 1,
                                        name: buisnessProfile.WorkName,
                                        photo: buisnessProfile.workPicture,
                                        date: '28/11/2021',
                                        text: 'شكرا لدعمكم .. منتمنى دائما نكون عند حسن ظنك'
                                    }
                                ]
                            }
                            commentsArray.push(commentInfo);
                        }

                        itemsArray.push({
                            itemNumber: i,
                            itemId: item.id,
                            itemStoreName: item.businessName,
                            // itemStorePicture: item.images[0].url,// channnnnngehttp://localhost:1337/image_clsm3xbb4a.png
                            itemStorePicture: "http://localhost:1337/image_clsm3xbb4a.png",
                            itemName: item.name,
                            itemPhotos: imagesArray,
                            itemCategory: (item.categories.length > 0) ? item.categories[0].categoryName : [],
                            itemType: (item.types.length > 0) ? item.types[0].typeName : [],
                            itemText: item.description,
                            itemSizes: item.sizes,
                            itemPrice: item.price,
                            itemRate: item.rateValue.toFixed(1),
                            itemDate: item.createdAt,
                            itemCommentsDetails: commentsArray
                        })

                    }
                    setItems(itemsArray);
                })
                .catch(err => console.log(err))
        }


    }, [buisnessProfile, workTypeId, deletedItem, addedPhotos])
    return (
        <div className='MyItems'>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-icons/1.7.2/font/bootstrap-icons.min.css" />
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"></link>
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css"></link>

            <FilterItems />
            <TodoItems />
        </div>

    )
}
export default MyItems;

