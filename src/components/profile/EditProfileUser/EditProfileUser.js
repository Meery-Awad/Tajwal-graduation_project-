import React, { useRef, useState, useEffect } from 'react';


import { useSelector, useDispatch } from 'react-redux';

import { NavLink } from "react-router-dom";
import { useBetween } from 'use-between';





function EditProfile() {
    const state = useSelector((state) => state.data);
    const { tempUser, setTempUser } = useBetween(state.useShareState);
    const currentUser=state.currentUser[0];
       // REFERENCE for input an image
       const inputRef = useRef();

    const handleChangeName = (event) => {
        currentUser.userName = event.target.value;
        setTempUser(currentUser);
    }
    const handleChangeMail = (event) => {
        currentUser.email = event.target.value;
        setTempUser(currentUser);
    }
    const handleChangePassword = (event) => {
       currentUser.password = event.target.value;
       setTempUser(currentUser);
    }
    const handleChangeConPassword = (event) => {
        // newState.workConPassword = event.target.value;
    }
    const handleChangePicture = (event) => {
        if (event.target.files && event.target.files[0]) {
            let reader = new FileReader();

            reader.onload = function (event) {
                currentUser.userPhoto = event.target.result;//the new picture
                setTempUser(currentUser);
                document.getElementById('user-picture').setAttribute('src', event.target.result);
            };

            reader.readAsDataURL(event.target.files[0]);
        }
    }
    function focusOnInput() {
        inputRef.current.click();
    }
    const saveChange=()=>{
        //backend
        document.querySelector('.EditProfUser').style.display='none'
    }
    // const uploadFile = async (e) => {
    //     const formData = new FormData();
    //     formData.append("file", file);
    //     formData.append("fileName", fileName);
    //     try {
    //       const res = await axios.post(
    //         "http://localhost:3000/upload",
    //         formData
    //       );
    //       console.log(res);
    //     } catch (ex) {
    //       console.log(ex);
    //     }
    //   };
    
   
   

    return (
        <div className='EditProfUser'>

            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-icons/1.7.2/font/bootstrap-icons.min.css" />
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"></link>
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css"></link>

            <div className="container grid-profile mt-3">
                <div className="row text-end col-profile mt-2">
                   

                    {/**  Second Col **/}
                    <div className="col-8 align-items-start left-b-edit">
                        <div>
                            {/* Head */}

                            {/* List */}
                            <ul className="listUser-group list-group-flush1">
                                <li className="list-group-item prof-list-edit">
                                    <span>
                                        <input type="text" className="form-control mx-2 buisness-label-profile-edit"
                                            defaultValue={currentUser.userName} dir="auto" onChange={handleChangeName} />
                                        <i className="bi bi-file-person icon-label-profile"></i>
                                    </span>
                                </li>
                             
                            
                            
                                <li className="list-group-item prof-list-edit">
                                    <span>
                                        <input type="text" className="form-control mx-2 buisness-label-profile-edit"
                                            defaultValue={currentUser.email} dir="auto" onChange={handleChangeMail} />
                                        <i className="fa fa-envelope icon-label-profile" aria-hidden="true"></i>
                                    </span>
                                </li>
                                <li className="list-group-item prof-list-edit">
                                    <span>
                                        <input type="password" className="form-control mx-2 buisness-label-profile-edit"
                                            defaultValue={currentUser.password} dir="auto" onChange={handleChangePassword} />
                                        <i className="bi bi-key-fill icon-label-profile" aria-hidden="true"></i>
                                    </span>
                                </li>
                                <li className="list-group-item prof-list-edit">
                                    <span>
                                        <input type="password" className="form-control mx-2 buisness-label-profile-edit"
                                            defaultValue={currentUser.password} dir="auto" onChange={handleChangeConPassword} />
                                        <i className="bi bi-key-fill icon-label-profile" aria-hidden="true"></i>
                                    </span>
                                </li>
                             
                            </ul>
                        </div>
                    </div>

                    {/** First Col **/}
                    <div className="col-2 left-b">

                        <input
                            type="file"
                            onChange={handleChangePicture}
                            ref={inputRef}
                            accept=".jpg,.jpeg,.png"
                            style={{ display: 'none' }}
                        />
                        <img src={currentUser.userPhoto} id='user-picture' className="rounded-circle bu-image" alt="..." />
                        <div className="rounded-circle green-b"></div>
                        <button className='btn btn-edit btn-edit-inf' onClick={focusOnInput}>تغيير الصورة</button>

                    </div>
                </div>

              
                    {/* <button type='button' className='btn btn-edit'
                       onClick={saveChange} >
                        حفظ التعديلات
                    </button> */}

              
            </div>




         

        </div>

    )
}
export default EditProfile;

