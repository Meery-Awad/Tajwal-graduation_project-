import React, { useEffect, useState } from 'react';
import '../../../bootstrap/css/bootstrap.css'
import '../../style/App.css';
import { useSelector, useDispatch } from 'react-redux';
import { useBetween } from 'use-between';
import { NavLink } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Axios from 'axios'

function ItemDeleteModal(props) {

    // HOOKS
    const st = useSelector((state) => state.dataB);
    const [addItem, setAddItem] = useState('2');
    const dispatch = useDispatch();

    // Constants And Variables

    // Access Token
    const { accessToken, setAccessToken } = useBetween(st.useSharingFilters);

    const { businessMe, setBusinessMe, deletedItem, setDeletedItem } = useBetween(st.useSharingFilters);
    const { items, setItems } = useBetween(st.useSharingFilters);
    const { buisnessProfile, setBuisnessProfile } = useBetween(st.useSharingFilters);

    // MODAL SHOW FUNCTIONS
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleDeleteItem = () => {
        // dispatch({
        //     type: 'delete-item',
        //     state: props.itemId - 1
        // });
        // 
        Axios.delete(`https://tajwal2.herokuapp.com/api/products/${props.itemId}`, {
            headers: {
                'Authorization': 'Bearer ' + accessToken,
                "Content-Type": "application/json;charset=UTF-8"
            }
        })
            .then((res) => {
                // var itemsArray = [];
                // for (let i = 0; i < businessMe.products.length; i++) {
                //     const item = businessMe.products[i];
                //     console.log(item)
                //     var imagesArray = [];
                //     // get images of item
                //     for (let j = 0; j < item.images.length; j++) {
                //         const img = item.images[j].url;
                //         imagesArray.push(img);
                //     }
                //     var commentsArray = [];
                //     // get comments of item
                //     for (let j = 0; j < item.comments.length; j++) {
                //         const comment = item.comments[j];
                //         var commentInfo = {
                //             commentNumber: j,
                //             id: comment.id,
                //             clientName: comment.userName,
                //             clientPhoto: comment.userImage,
                //             date: '27/11/2021',
                //             text: comment.text,
                //             repliesVisibility: false,
                //             replies: [
                //                 {
                //                     id: 1,
                //                     name: buisnessProfile.WorkName,
                //                     photo: buisnessProfile.workPicture,
                //                     date: '28/11/2021',
                //                     text: 'شكرا لدعمكم .. منتمنى دائما نكون عند حسن ظنك'
                //                 }
                //             ]
                //         }
                //         commentsArray.push(commentInfo);
                //     }

                //     itemsArray.push({
                //         itemNumber: i,
                //         itemId: item.id,
                //         itemStoreName: item.businessName,
                //         itemStorePicture: item.images[0].url,// channnnnnge
                //         itemName: item.name,
                //         itemPhotos: imagesArray,
                //         itemCategory: (item.categories.length > 0) ? item.categories[0].categoryName : [],
                //         itemType: (item.types.length > 0) ? item.types[0].typeName : [],
                //         itemText: item.description,
                //         itemPrice: item.price,
                //         itemRate: item.rateValue.toFixed(2),
                //         itemComments: 56,
                //         itemDate: item.createdAt,
                //         itemCommentsDetails: commentsArray
                //     })

                // }
                // setItems(itemsArray);
                // console.log(res.data)
                setDeletedItem(!deletedItem)
            })
            .catch((err) => console.log(err))
        handleClose();
    }

    useEffect(() => {
    }, []);

    return (
        <div className='itemDeleteModal'>

            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-icons/1.7.2/font/bootstrap-icons.min.css" />
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"></link>
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css"></link>

            <Button variant="primary" onClick={handleShow} className='btn btn-edit btn-delete-item-interface'>
                حذف المنتج
                <i className="bi bi-trash icon-me-item-interface"></i>
            </Button>



            <Modal show={show} onHide={handleClose} size='sm'>


                <Modal.Body className="add-item-modal-body">
                    <div className="icon-me-item-delete"><i className="bi bi-trash fa-3x "></i></div>
                    <div className="line-under-delete-item-icon">هل أنت متأكد من حذف هذا المنتج ؟</div>
                </Modal.Body>


                <Modal.Footer dir="auto">

                    <Button variant="secondary" onClick={handleClose} className="btn-add-item-modal">
                        إلغاء
                    </Button>
                    <NavLink to="/productBusi"
                        onClick={handleDeleteItem}
                        style={{ textDecoration: 'none', color: 'inherit' }} exact="true">
                        <Button variant="primary" onClick={handleDeleteItem} className="btn btn-edit btn-add-item-modal">
                            تأكيد
                        </Button>
                    </NavLink>

                </Modal.Footer>

            </Modal>

        </div>
    )
}
export default ItemDeleteModal;

