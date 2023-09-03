import React, { useState, useEffect } from 'react';
import '../../../bootstrap/css/bootstrap.css'
import '../../style/App.css';
import { useSelector, useDispatch } from 'react-redux';
import { useBetween } from 'use-between';



function AddItem() {

    const st = useSelector((state) => state.dataB);
    const dispatch = useDispatch();

    // business work type
    const { businessWorkType, setBusinessWorkType } = useBetween(st.useSharingFilters);

    const types = (businessWorkType === 'مطاعم') ? (st.restaurantTypes) : (st.clothesTypes);
    const categories = (businessWorkType === 'مطاعم') ? (st.filters) : (st.filtersClothes);
    const sizes = (businessWorkType === 'مطاعم') ? (0) : (st.clothesSizes);

    const { TypesUp, setTypesUp } = useBetween(st.useSharingFilters);
    var tempTypesUp = TypesUp;

    const { categoriesDropdown, setCategoriesDropdown } = useBetween(st.useSharingFilters);

    const { itemName, setItemName } = useBetween(st.useSharingFilters);
    const { itemPhotos, setItemPhotos } = useBetween(st.useSharingFilters);
    const { imagesFormData, setImagesFormData } = useBetween(st.useSharingFilters);
    const { itemCategory, setItemCategory } = useBetween(st.useSharingFilters);
    const { itemType, setItemType } = useBetween(st.useSharingFilters);
    const { itemCategoryId, setItemCategoryId } = useBetween(st.useSharingFilters);
    const { itemTypeId, setItemTypeId } = useBetween(st.useSharingFilters);
    const { itemSizes, setItemSizes } = useBetween(st.useSharingFilters);
    const { itemText, setItemText } = useBetween(st.useSharingFilters);
    const { itemPrice, setItemPrice } = useBetween(st.useSharingFilters);



    useEffect(() => {
    }, [itemCategory]);

    const clickField = (event, id) => {
        document.getElementById(id).classList.remove('is-invalid');
    }

    const changeField = (event, id) => {

        if (id === 'name-add-item') {
            // dispatch({
            //     type: 'add-new-item-name',
            //     state: event.target.value
            // })
            setItemName(event.target.value);
        }
        else if (id === 'price-add-item') {
            // dispatch({
            //     type: 'add-new-item-price',
            //     state: event.target.value
            // })
            setItemPrice(event.target.value);
        }
        else if (id === 'desc-add-item') {
            // dispatch({
            //     type: 'add-new-item-desc',
            //     state: event.target.value
            // })
            setItemText(event.target.value);
        }
        else if (id === 'select-category-add-item') {
            // dispatch({
            //     type: 'add-new-item-category',
            //     state: event.target.value
            // })
            setItemCategoryId(event.target.value);
            for (let i = 0; i < categoriesDropdown.length; i++) {
                if (event.target.value === categoriesDropdown[i].busTypeId) {
                    setItemCategory(categoriesDropdown[i].name)
                }
            }
        }
        else if (id === "veg-or-not") {
            // dispatch({
            //     type: 'add-new-item-type',
            //     state: event.target.value
            // })
            
            for (let i = 0; i < TypesUp.length; i++) {
                if (event.target.value === TypesUp[i].busTypeId) {
                    setItemTypeId(event.target.value);
                    setItemType(TypesUp[i].name)
                }
            }
        }
        else if (id === "size") {
            if (itemSizes.includes(event.target.value)) {
                setItemSizes(itemSizes.filter(function (value) {
                    return value !== event.target.value;
                }))
            } else {
                // dispatch({
                //     type: 'add-new-item-size',
                //     state: event.target.value
                // })
                setItemSizes(oldArray => [...oldArray, event.target.value]);
            }
        }
        else if (id === "add-new-img") {
            // dispatch({
            //     type: 'add-new-item-img',
            //     state: event.target.result
            // })
        }
    }


    function handleImageChange(e) {
        if (e.target.files && e.target.files[0]) {
            let reader = new FileReader();

            reader.onload = function (e) {
                changeField(e, 'add-new-img');
                setItemPhotos(oldArray => [...oldArray, e.target.result]);
            };

            reader.readAsDataURL(e.target.files[0]);
            // console.log(e.target.files[0])
            // const formData = new FormData();
            // formData.append("image", e.target.files[0]);
            // setImagesFormData(formData);
            setImagesFormData([...imagesFormData, e.target.files[0]]);
            console.log(imagesFormData);

            // imagesFormData.append("fileName", e.target.files[0].name);
            // imagesFormData.push(formData);//Array of form data
            // setImagesFormData(imagesFormData.push(e.target.files[0]));
            // setImagesFormData([...imagesFormData, ...e.target.files[0]])

        }
        document.getElementById("upload-input").value = '';
    }
    const handleImageDelete = (e, id) => {
        setItemPhotos(itemPhotos.filter(function (value, index) {
            return (index !== id);
        }))
        dispatch({
            type: 'delete-one-img-from-added-item',
            state: id
        })
    }

    return (
        <div className='add-item-component'>

            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-icons/1.7.2/font/bootstrap-icons.min.css" />
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"></link>
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css"></link>

            <div dir="auto">
                <section className="step-wizard">
                    <ul className="step-wizard-list" dir="rtl">
                        <li className="step-wizard-item current-item" id="step-1-add-item-bar">
                            <span className="progress-count">
                                <i className="bi bi-plus progress-step-bar"></i>
                            </span>
                            <span className="progress-label">المنتج</span>
                        </li>
                        <li className="step-wizard-item" id="step-2-add-item-bar">
                            <span className="progress-count">
                                <i className="bi bi-clipboard-data progress-step-bar"></i>
                            </span>
                            <span className="progress-label">تفاصيل</span>
                        </li>
                        <li className="step-wizard-item " id="step-3-add-item-bar">
                            <span className="progress-count">
                                <i className="bi bi-images progress-step-bar"></i>
                            </span>
                            <span className="progress-label">الصور</span>
                        </li>
                        <li className="step-wizard-item" id="step-4-add-item-bar">
                            <span className="progress-count">
                                <i className="bi bi-check-lg progress-step-bar"></i>
                            </span>
                            <span className="progress-label">نشر</span>
                        </li>
                    </ul>
                </section>


                {/* List step 1 */}
                <ul className="list-group list-group-flush list-add-item current-list" id="step-1-add-item-content">
                    <li className="input-field-add-item required-input">
                        <input type="text" id="name-add-item" className='input-add-item form-control'
                            onChange={(event) => changeField(event, 'name-add-item')}
                            onClick={(event) => clickField(event, 'name-add-item')} required />
                        <label htmlFor="name-add-item" className='label-add-item'>اسم المنتج:</label>
                        <div className="invalid-feedback">يرجى إدخال اسم للمنتج</div>
                    </li>
                    <li className="input-field-add-item required-input">
                        <input type="text" id="desc-add-item" className='input-add-item form-control'
                            onChange={(event) => changeField(event, 'desc-add-item')}
                            onClick={(event) => clickField(event, 'desc-add-item')} required />
                        <label htmlFor="desc-add-item" className='label-add-item'>وصف..:</label>
                        <div className="invalid-feedback">يرجى إدخال وصف للمنتج</div>
                    </li>
                    <li className="input-field-add-item required-input">
                        <input type="text" id="price-add-item" className='input-add-item form-control'
                            onChange={(event) => changeField(event, 'price-add-item')}
                            onClick={(event) => clickField(event, 'price-add-item')} required />
                        <label htmlFor="price-add-item" className='label-add-item'>السّعر:</label>
                        <div className="invalid-feedback">يرجى تحديد سعر المنتج</div>
                    </li>
                </ul>




                {/* List step 2 */}
                <ul className="list-group list-group-flush list-add-item" id="step-2-add-item-content">
                    <li className="input-field-add-item form-control" id="type-li-validation">
                        <label htmlFor="type" className='radio-add-item'>النوع:</label>
                        {
                            TypesUp.length ? (TypesUp.map(type => {
                                return (
                                    <div key={type.id} className="form-check form-check-inline">
                                        <input className="form-check-input" type="radio" name="radio-veg-or-not" id={"inlineRadio" + type.id}
                                            value={type.busTypeId} onChange={(event) => changeField(event, "veg-or-not")}
                                            onClick={(event) => clickField(event, 'type-li-validation')} />
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

                    <li className="input-field-add-item">
                        <label htmlFor="type" className='radio-add-item'>التصنيف:</label>
                        <select className="select-add-item form-select form-control " aria-label="Default select example"
                            id="select-category-add-item"
                            onChange={(event) => changeField(event, "select-category-add-item")}
                            onClick={(event) => clickField(event, 'select-category-add-item')} required>
                            {
                                categoriesDropdown.length ? categoriesDropdown.map(categ => {
                                    return (
                                        <option key={categ.id} value={categ.busTypeId}>{categ.name}</option>
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
                                                    <input className="form-check-input" type="checkbox" name="radio-size" id={"sizeRadio" + size.sizeId}
                                                        value={size.sizeName} onChange={(event) => changeField(event, "size")}
                                                        onClick={(event) => clickField(event, 'type-li-validation')} />
                                                    <label className="form-check-label" htmlFor={"sizeRadio" + size.sizeId}>{size.sizeName}</label>
                                                </div>
                                            )
                                        }
                                        )
                                            :
                                            (
                                                <option key={"zero"} value="zero">لايوجد مقاسات</option>
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
                    {/* <div className="invalid-feedback">يرجى تحديد تصنيف المنتج</div> */}
                </ul>


                {/* List step 3 */}
                <ul className="list-group list-group-flush list-add-item" id="step-3-add-item-content">
                    {/* image */}


                    <div>
                        {
                            itemPhotos.length ? (
                                itemPhotos.map((photo, index) => {
                                    return (
                                        <div key={index} className="item-img-square">
                                            <span className='delete-img-icon' onClick={(event) => handleImageDelete(event, index)}><i className='bi bi-x-lg'></i></span>
                                            <img
                                                id="uploaded-image"
                                                src={photo}
                                                draggable={false}
                                                alt="uploaded-img"
                                                className="uploaded-image"
                                            />
                                            {
                                                (index === 4) ? (<br />) : (<></>)
                                            }
                                        </div>
                                    );

                                })
                            ) :
                                (
                                    <></>
                                )
                        }
                        {
                            (itemPhotos.length < 10) ? (
                                <div className='images-step-item' >
                                    <div className="image-upload">
                                        <label htmlFor="upload-input">
                                            <i className='bi bi-images'></i>
                                        </label>

                                        <input
                                            id="upload-input"
                                            type="file"

                                            // accept=".jpg,.jpeg,.png"
                                            onChange={handleImageChange}
                                            style={{ display: 'none' }}
                                        />
                                    </div>
                                </div>
                            ) : (
                                <div className="add-ten-img">**لقد قمت بإضافة الحد الأعلى من الصور**</div>
                            )
                        }
                    </div>



                    <li className=" prof-list-edit subinfo-add-image">
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


                {/* List step 4 */}

                <ul className="list-group list-group-flush list-add-item" id="step-4-add-item-content">
                    {/* refresh step 1 */}
                    <li className="input-field-add-item">
                        <label htmlFor="type" className='radio-add-item'>الاسم:</label>
                        <span>{itemName}</span>
                    </li>
                    <li className="input-field-add-item">
                        <label htmlFor="type" className='radio-add-item'>وصف:</label>
                        <span>{itemText}</span>
                    </li>
                    <li className="input-field-add-item">
                        <label htmlFor="type" className='radio-add-item'>السّعر:</label>
                        <span>{itemPrice}</span>
                    </li>

                    {/* refresh step 2 */}
                    <li className="input-field-add-item">
                        <label htmlFor="type" className='radio-add-item'>النوع:</label>
                        <span>{itemType}</span>
                    </li>

                    <li className="input-field-add-item">
                        <label htmlFor="type" className='radio-add-item'>التصنيف:</label>
                        {itemCategory}
                    </li>

                    {
                        (businessWorkType === 'ألبسة') ? (
                            <li className="input-field-add-item">
                                <label htmlFor="type" className='radio-add-item'>المقاسات المتوفّرة:</label>
                                {
                                    itemSizes.map(size => { return (<span key={size.sizeId}>{size + ', '}</span>) })
                                }
                            </li>
                        ) : (
                            <div></div>
                        )
                    }


                    {/* refresh step 3 */}
                    {/* image */}
                    <li className="input-field-add-item">
                        <label htmlFor="type" className='radio-add-item'>الصور:</label>
                        <span>تم إضافة
                            {itemPhotos.length} صور.</span>
                    </li>

                </ul>

            </div>

        </div>

    )

}
export default AddItem;

