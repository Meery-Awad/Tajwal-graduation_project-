import './shkoaNavLink.scss'
import 'bootstrap/dist/css/bootstrap.min.css';
//  import 'bootstrap/dist/js/bootstrap.bundle.min';
import '../../bootstrap/css/bootstrap.css';
import '../../bootstrap/css/animate.css';
import { useSelector } from 'react-redux';
import { useBetween } from 'use-between';
import { useEffect, useState } from 'react';
import SearchMap from '../map/SearchMap';
import Hands from '../photo/clapping_hands.gif'
import $ from 'jquery';

const ShkoaNavLink = () => {

    const state = useSelector((state) => state.data);
    const { allMess, setallMess, selectMessId, setSelectMessId
    ,idStore, setidStore,messStore, setMessStore } = useBetween(state.useShareState);

    const { isUserLogin, setisUserLogin } = useBetween(state.useShareState);

    const { dropdownOpenLogin, setdropdownOpenLogin } = useBetween(state.useShareState);
    const [value, setInputValue] = useState('');

  
    const [isFadingOut, setIsFadingOut] = useState(false);


    const fadeOut = (i) => {
        setIsFadingOut(true);
        setTimeout(() => handleRemoveItem(i), 300)
    };


    const element = $(`#${'selectMess'}`);
    element.animate({
        scrollTop: element.prop("scrollHeight")
    }, 500);
    const handleRemoveItem = i => {
        // assigning the list to temp variable
        const temp = [...messStore];

        // removing the element using splice
        messStore[i].allMess=[];
        temp.splice(i, 1);

        // updating the list
        setMessStore(temp);
        if (selectMessId == i)
            setSelectMessId(-1);
        setIsFadingOut(false);

    }
    const handleRemoveMess = id => {
        // assigning the list to temp variable
        const temp = [...allMess];

        // removing the element using splice
        temp.splice(id, 1);

        // updating the list
        setallMess(temp);



    }

    const mess = messStore.length ? (
        messStore.map((item, i) => {

            if (item.allMess.length > 0) {
                return (
                    <div>
                        <div className='fas fa-trash' title='حذف جميع الشكاوي الخاصة يهذا المتجر' onClick={() => fadeOut(i)}></div>
                        <div key={i} className={isFadingOut ? 'item-fadeout' : 'messStore'} onClick={() => { setallMess(item.allMess); setSelectMessId(i) ;setidStore(item.storeId)}}>
                            <img src={item.img} className='ImgStore'></img>
                            <span className='infoMess'>
                                <div>
                                    <span className='storName'><bdi>{item.name}</bdi></span>

                                </div>
                                <div>
                                    <span className='mess1'>{item.allMess[item.allMess.length - 1].mess}</span>
                                    < span className='messTime'><bdi>{item.allMess[item.allMess.length - 1].time}</bdi></span>
                                </div>
                            </span>
                        </div>
                    </div>
                )

            }
        }

        )
    ) : (<p className='noMess'><bdi>لا توجد اي شكوى حتى الآن !! <img src={Hands} className='handIcon'></img></bdi></p>)

    var nameStore = '';
    var ImgStore = '';
    var LocStore = '';

    var index1 = 0;
    const selectMess = selectMessId != -1 ? (

        state.stores.features.map((item, i) => {

            if (item.properties.id == idStore) index1 = i;
        }),

        nameStore = state.stores.features[index1].properties.name,
        ImgStore = state.stores.features[index1].properties.photo,
        LocStore = state.stores.features[index1].properties.street,
        allMess.map((item, id) => {


            return (
                <div className='messCont1' key={item.id}>
                    <span className='messItem' dir='auto'>{item.mess}</span>
                    <div class='far fa-trash-alt' title='حذف هذه الشكوى'
                        onClick={() => handleRemoveMess(id)}></div>
                    <div className='timeItem'>{item.time}</div>
                </div>
            )
        })
    ) : (<p><bdi>قم بتحديد شكوى!! <i class="fa fa-commenting-o"></i></bdi></p>)


    const updateValue = ({ target }) => setInputValue(target.value);



    const updateMessages = (id) => {

        const time = new Date().toLocaleTimeString();






        if (value != '' && isUserLogin == true) {
            if (allMess.length == 0) {
                const updatemess1 = [

                    ...messStore,

                    {

                        storeId: state.stores.features[index1].properties.id,

                        name: state.stores.features[index1].properties.name,

                        img: state.stores.features[index1].properties.photo,
                        loc: state.stores.features[index1].properties.street,
                        allMess:[{ idMess: allMess.length + 1, mess: value, time: time,}],

                    }
                ];

                setMessStore(updatemess1);
             
            }
            const updatemess = [

                ...allMess,

                {

                    idMess: allMess.length + 1,

                    mess: value,

                    time: time,
                }
            ];
            setInputValue('');

            setallMess(updatemess);
           
            messStore[selectMessId].allMess=allMess;
            const newMessStor=[...messStore];
            setMessStore(newMessStor);
           
         
            // messStore[messStore.length-1].allMess=allMess;

          
            const element = $(`#${id}`);
            element.animate({
                scrollTop: element.prop("scrollHeight")
            }, 500);

        }
        if (isUserLogin == false) {
            setdropdownOpenLogin(!dropdownOpenLogin)
        }
    }



    return (


        <div className="col-lg-12 shkoaNavLink">
            <script src='https://kit.fontawesome.com/a076d05399.js' crossorigin='anonymous'></script>
            <div className="col-lg-4 allShkoa">
                <div>
                    <SearchMap />
                </div>
                {mess}
            </div>
            <div className="col-lg-8 selectShkoa">

                <div className='selectMessInfo' style={{ display: selectMessId != -1 ? 'flex' : 'none' }}>

                    <img src={ImgStore} className='ImgStore'></img>

                    <span className='infoStore1'>
                        <div className='storName '>{nameStore}</div>
                        <i className="fa fa-map-marker" aria-hidden="true"></i>
                        <span className='storLoc'>{LocStore}</span>
                    </span>
                    <i className="fa fa-exclamation" title='الرجاء ارسال الشكاوي بمصداقية و بشكل واضح و دقيق'></i>
                </div>
                <div className='selectMess' id='selectMess'>
                    {selectMess}
                </div>

                <span style={{ display: selectMessId != -1 ? 'block' : 'none' }} className='sendMess'>
                    <input type='text' onChange={updateValue} placeholder="كتابة شكوى جديدة..." value={value} />
                    <button className="btn--submit" onClick={() => updateMessages('selectMess')} >ارسال</button>
                </span>

            </div>
        </div>
    )
}
export default ShkoaNavLink;