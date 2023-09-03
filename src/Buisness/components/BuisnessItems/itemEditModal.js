import React, { useEffect, useState } from 'react';
import '../../../bootstrap/css/bootstrap.css'
import '../../style/App.css';
import { useSelector, useDispatch } from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useBetween } from 'use-between';
import Axios from 'axios'

function ItemEditModal(props) {

    // HOOKS
    const st = useSelector((state) => state.dataB);
    const dispatch = useDispatch();
    // const [item, setItem] = useState((businessWorkType === 'مطاعم') ? (st.items[props.itemId - 1]) : (st.clothesItems[props.itemId - 1]));

    const { item, setItem } = useBetween(st.useSharingFilters);

    // business work type
    const { businessWorkType, setBusinessWorkType } = useBetween(st.useSharingFilters);

    // Access Token
    const { accessToken, setAccessToken } = useBetween(st.useSharingFilters);

    const types = (businessWorkType === 'مطاعم') ? (st.restaurantTypes) : (st.clothesTypes);
    const categories = (businessWorkType === 'مطاعم') ? (st.filters) : (st.filtersClothes);
    const sizes = (businessWorkType === 'مطاعم') ? (0) : (st.clothesSizes);

    const { TypesUp, setTypesUp } = useBetween(st.useSharingFilters);
    const { categoriesDropdown, setCategoriesDropdown } = useBetween(st.useSharingFilters);

    // Constants And Variables
    // state for editing product (item)
    var editedItem = item;

    // refresh img
    const [refImg, setRefImg] = useState(false);

    // MODAL SHOW FUNCTIONS
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleEditItem = () => {
        // dispatch({
        //     type: 'edit-item',
        //     state: {
        //         itemId: props.itemId - 1,
        //         value: editedItem
        //     }
        // });

        const data = {
            "name": editedItem.itemName,
            "price": Number(editedItem.itemPrice),
            "description": editedItem.itemText,
            "categoriesId": editedItem.itemCategoryId,
            "typesId": editedItem.itemTypeId
        };
        Axios.patch(`https://tajwal2.herokuapp.com/api/products/${item.itemId}`, data, {
            headers: {
                'Authorization': 'Bearer ' + accessToken,
                "Content-Type": "application/json;charset=UTF-8"
            }
        }
        )
            .then(res => {
                console.log("Edit Product :::: ", res.data);
            })
            .catch((err) => { console.log(err) });
        setItem(editedItem);
        setRefImg(!refImg);
        handleClose();
    }

    useEffect(() => {
    }, [st]);

    const changeField = (event, id) => {
        if (id === 'name-edit-item') {
            editedItem.itemName = event.target.value;
        }
        else if (id === 'price-edit-item') {
            editedItem.itemPrice = event.target.value;
        }
        else if (id === 'desc-edit-item') {
            editedItem.itemText = event.target.value;
        }
        else if (id === 'select-category-edit-item') {
            editedItem.itemCategoryId = event.target.value;
            for (let i = 0; i < categoriesDropdown.length; i++) {
                if (event.target.value === categoriesDropdown[i].busTypeId) {
                    editedItem.itemCategory = categoriesDropdown[i].name
                }
            }
        }
        else if (id === "veg-or-not") {
            editedItem.itemTypeId = event.target.value;
            for (let i = 0; i < TypesUp.length; i++) {
                if (event.target.value === TypesUp[i].busTypeId) {
                    editedItem.itemType = TypesUp[i].name
                }
            }
        }
        else if (id === "size") {
            if (editedItem.itemSizes.includes(event.target.value)) {
                let tmpSizes = editedItem.itemSizes.filter(function (value) {
                    return value !== event.target.value;
                })
                editedItem.itemSizes = tmpSizes;
            } else {
                editedItem.itemSizes.push(event.target.value)
            }
        }
        else if (id === "add-new-img") {
            editedItem.itemPhotos.push(event.target.result);
            setRefImg(!refImg);
        }
    }

    function handleImageChange(e) {
        if (e.target.files && e.target.files[0]) {
            let reader = new FileReader();

            reader.onload = function (e) {
                changeField(e, 'add-new-img');

            };

            reader.readAsDataURL(e.target.files[0]);
        }
        document.getElementById("edit-upload-img").value = '';
    }
    const handleImageDelete = (e, id) => {
        let OldPhotos = editedItem.itemPhotos;
        editedItem.itemPhotos = OldPhotos.filter(function (value, index) {
            return (index !== id);
        })
        setRefImg(!refImg);
    }

    return (
        <div className='itemEditModal'>

            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-icons/1.7.2/font/bootstrap-icons.min.css" />
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"></link>
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css"></link>

            <Button variant="primary" onClick={handleShow} className='btn btn-edit btn-edit-item-interface'>
                تعديل المنتج
                <i className="bi bi-pen icon-me-item-interface"></i>
            </Button>



            <Modal show={show} onHide={handleClose} size='lg'>

                <Modal.Header dir="auto">
                    <Modal.Title className="modal-title-me">
                        تعديل المنتج
                        <h6 className='subheading-work-hours'>قم بإجراء التعديلات التي ترغب بها.</h6>
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body className="edit-item-modal-body">
                    <div>
                        <div className='row first-row-edit-item' dir='rtl'>
                            <div className='col edit-item-cols first-col'>
                                <ul className="list-group list-group-flush list-edit-item-step-1">
                                    {/* First List */}
                                    <li className="input-field-add-item required-input input-field-edit-item ">
                                        <label htmlFor="name-edit-item" className='label-edit-modal'>اسم المنتج:</label>
                                        <input type="text" id="name-edit-item" className='form-control font-input-edit'
                                            defaultValue={editedItem.itemName} onChange={(event) => changeField(event, 'name-edit-item')} required />

                                        <div className="invalid-feedback">يرجى إدخال اسم للمنتج</div>
                                    </li>
                                    <li className="input-field-add-item required-input input-field-edit-item">
                                        <label htmlFor="desc-edit-item" className='label-edit-modal'>وصف..:</label>
                                        <textarea rows={3} type="text" id="desc-edit-item" className='form-control font-input-edit'
                                            defaultValue={editedItem.itemText} onChange={(event) => changeField(event, 'desc-edit-item')} required />
                                        <div className="invalid-feedback">يرجى إدخال وصف للمنتج</div>
                                    </li>
                                </ul>
                            </div>


                            <div className='col edit-item-cols second-col'>

                                {/* Second List */}
                                <ul className="list-group list-group-flush list-edit-item-step-2">
                                    <li className="input-field-add-item required-input input-field-edit-item">
                                        <label htmlFor="price-edit-item" className='label-edit-modal'>السّعر:</label>
                                        <input type="text" id="price-edit-item" className='form-control font-input-edit'
                                            defaultValue={editedItem.itemPrice} onChange={(event) => changeField(event, 'price-edit-item')} required />
                                        <div className="invalid-feedback">يرجى تحديد سعر المنتج</div>
                                    </li>
                                    <li className="input-field-add-item form-control input-field-edit-item input-field-edit-item-radio" id="type-li-validation">
                                        <label htmlFor="type" className='radio-add-item'>النوع:</label>
                                        {
                                            TypesUp.length ? (TypesUp.map(type => {
                                                return (
                                                    <div key={type.id} className="form-check form-check-inline form-radio-edit-item">
                                                        <input className="form-check-input font-input-edit" type="radio" name="radio-veg-or-not" id={"inlineRadio" + type.id}
                                                            value={type.busTypeId} defaultChecked={editedItem.itemType === type.name ? true : false}
                                                            onChange={(event) => changeField(event, "veg-or-not")} />
                                                        <label className="form-check-label" htmlFor={"inlineRadio" + type.id}>{type.name}</label>
                                                    </div>
                                                );
                                            })
                                            ) : (
                                                <div>error</div>
                                            )
                                        }
                                    </li>
                                    <div className="invalid-feedback invalid-feedback-custom-font">يرجى تحديد نوع المنتج</div>

                                    <li className="input-field-add-item input-field-edit-item">
                                        <label htmlFor="type" className='radio-add-item'>التصنيف:</label>
                                        <select className="select-add-item form-select form-control " aria-label="Default select example"
                                            defaultValue={editedItem.itemCategory}
                                            id="select-category-edit-item" onChange={(event) => changeField(event, "select-category-edit-item")}
                                            required>
                                            {
                                                categoriesDropdown.length ? categoriesDropdown.map(categ => {
                                                    return (
                                                        <option key={categ.id} value={categ.busTypeId}
                                                        >{categ.name}</option>
                                                    )
                                                }
                                                )
                                                    :
                                                    (
                                                        <option key={"zero"} value="zero">لايوجد أصناف</option>
                                                    )
                                            }
                                        </select>
                                        <div className="invalid-feedback">يرجى تحديد تصنيف المنتج</div>
                                    </li>

                                    {
                                        (businessWorkType === 'ألبسة') ? (
                                            sizes.length ? (
                                                <li className="input-field-add-item form-control" id="type-li-validation">
                                                    <label htmlFor="type" className='radio-add-item'>المقاسات المتوفّرة:</label>
                                                    {
                                                        sizes.length ? sizes.map(size => {
                                                            return (
                                                                <div key={size.sizeId} className="form-check form-check-inline">
                                                                    <input className="form-check-input font-input-edit" type="checkbox" name="radio-size" id={"sizeRadio" + size.sizeId}
                                                                        value={size.sizeName} defaultChecked={(editedItem.itemSizes !== undefined) ? editedItem.itemSizes.includes(size.sizeName) : editedItem.itemSizes}
                                                                        onChange={(event) => changeField(event, "size")} />
                                                                    <label className="form-check-label" htmlFor={"sizeRadio" + size.sizeId}>{size.sizeName}</label>
                                                                </div>
                                                            )
                                                        }
                                                        )
                                                            :
                                                            (
                                                                <span key={"zero"}>لايوجد مقاسات</span>
                                                            )
                                                    }
                                                </li>
                                            ) : (
                                                <div>error</div>
                                            )
                                        )
                                            : (
                                                <div></div>
                                            )
                                    }
                                    <div className="invalid-feedback">يرجى تحديد المقاسات المتوفّرة</div>
                                </ul>
                            </div>
                        </div>
                        {/* image album */}
                        <div className="row" dir='rtl'>
                            <ul className="list-group list-group-flush image-edit-item">
                                {/* image */}
                                <li className="list-group-item prof-list-edit">
                                    {
                                        editedItem.itemPhotos !== undefined ?
                                            editedItem.itemPhotos.length ?
                                                (editedItem.itemPhotos.map((photo, index) => {
                                                    return (
                                                        <div key={index} className="item-img-square">
                                                            <span className='delete-img-icon' onClick={(event) => handleImageDelete(event, index)}><i className='bi bi-x-lg'></i></span>
                                                            <img
                                                                id='item-img-photo'
                                                                src={photo}
                                                                draggable={false}
                                                                alt="..."
                                                                className="uploaded-image"
                                                            />
                                                        </div>
                                                    )
                                                }))
                                                : (
                                                    <></>
                                                ) : (<></>)
                                    }
                                    {
                                        editedItem.itemPhotos !== undefined ?
                                            (editedItem.itemPhotos.length < 10) ? (
                                                <div className='images-step-item images-step-item-edit' >
                                                    <div className="image-upload">
                                                        <label htmlFor="edit-upload-img">
                                                            <i className='bi bi-images' style={{ width: 100, height: 100, fontSize: '15px' }}></i>
                                                        </label>

                                                        <input
                                                            id="edit-upload-img"
                                                            type="file"
                                                            accept=".jpg,.jpeg,.png"
                                                            onChange={handleImageChange}
                                                            style={{ display: 'none' }}
                                                        />
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="add-ten-img">**لقد قمت بإضافة الحد الأعلى من الصور**</div>
                                            ) : (<></>)
                                    }

                                </li>
                                <li className="list-group-item prof-list-edit subinfo-add-image">
                                    <span>
                                        <i className="bi bi-info-circle m-1"></i>
                                        قم بإضافة صور للمنتج (10 صور كحد أقصى).
                                    </span>
                                    <br />
                                    <span>
                                        <i className="bi bi-info-circle m-1"></i>
                                        حاول التقاط صور بإضاءة جيدة.
                                    </span>
                                    <br />
                                    <span>
                                        <i className="bi bi-info-circle m-1"></i>
                                        إنه الانطباع الأول عن منتجك !
                                    </span>
                                </li>
                            </ul>

                        </div>
                    </div>
                </Modal.Body>


                <Modal.Footer dir="auto">

                    <Button variant="secondary" onClick={handleClose} className="btn-add-item-modal">
                        إلغاء
                    </Button>
                    <Button variant="primary" onClick={handleEditItem} className="btn btn-edit btn-add-item-modal">
                        تأكيد
                    </Button>

                </Modal.Footer>

            </Modal>

        </div>
    )
}
export default ItemEditModal;

