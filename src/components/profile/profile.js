import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './profile.scss'
import LikePages from './likePages';
import LikeProducts from './likeProducts';
import EditProfile from './EditProfileUser/EditProfileUser';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useBetween } from 'use-between';
import { useEffect } from 'react';

function Profile(props) {
    const state = useSelector((state) => state.data);
    const { tempUser, setTempUser,profileData,setProfileData } = useBetween(state.useShareState);
    const userInfo = profileData;
   
    const dispatch = useDispatch();

    // *** Edit Profile Modal Client
    const [showEditProfile, setShowEditProfile] = useState(false);

    const handleCloseEditProfile = () => setShowEditProfile(false);
    const handleShowEditProfile = () => setShowEditProfile(true);
    const handleSaveEditProfile = () => {
        dispatch({ type: 'edit-profile-client', state: tempUser });
        handleCloseEditProfile()
    }
   

    document.body.style.background = 'none';

    return (
        <div className="profile">
            <div className='infoUser'>
                <div className='Point'>
                    <div>. . . . . . . . . .</div>
                    <div>. . . . . . . . . .</div>
                    <div>. . . . . . . . . .</div>
                    <div>. . . . . . . . . .</div>
                    <div>. . . . . . . . . .</div>
                </div>
                <div className='photoAndNameProfile'>
                    {/* <div className='circleProf'></div> */}
                    {/* <img src={state.currentUser[0].userPhoto} className=' userPhoto' ></img> */}
                    <img src={userInfo.image.url} id='user-picture' className="rounded-circle bu-image userPhoto" alt="..." />
                    <div className="rounded-circle green-b "></div>
                    <div className=' userName' >{userInfo.name}</div>
                </div>
                <div className='anotherInfo'>
                    <div className='infoP Loc'>

                        <div className='infoP Name'>
                            <bdi>
                                الاسم:    {userInfo.name}
                            </bdi> </div>
                        <div className='infoP email'>
                            <bdi>
                                البريد الالكتروني:  {userInfo.email}
                            </bdi> </div>
                    </div>
                </div>
                <div className='changeInfo' onClick={handleShowEditProfile}>
                    تعديل البيانات
                </div>
            </div>
            <div className='likePages'>
                <div className='likeP'><bdi> <i class='fas fa-store-alt'></i>متاجر تتابعها: <span className='Num'>{userInfo.followedBusiness.length}</span></bdi></div>
                <div className='ListLikeP'  >
                    <LikePages />
                </div>

                <div className='likeProducts'>

                    <div className='likePr'><bdi> <i className="fa fa-thumbs-up" aria-hidden="true"></i> منتجات قيمتها: <span className='Num'>{userInfo.ratedProducts.length} </span></bdi></div>
                    <LikeProducts />
                </div>
            </div>
            {/* <div className='EditProfUser'>
                <EditProfile />
            </div> */}

            <Modal show={showEditProfile} onHide={handleCloseEditProfile} size='lg'>

                <Modal.Body><EditProfile /></Modal.Body>
                <Modal.Footer dir="auto">
                    <Button variant="secondary" className="btn btn-calendar-modal-cancel"
                        onClick={handleCloseEditProfile}>
                        إغلاق
                    </Button>
                    <Button variant="primary" className="btn btn-calendar-modal-save"
                        onClick={handleSaveEditProfile}>
                        حفظ التعديلات
                    </Button>
                </Modal.Footer>
            </Modal>

        </div>
    )
}
export default Profile