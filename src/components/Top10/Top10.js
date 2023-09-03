
import { select } from 'd3';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import StarRatings from 'react-star-ratings';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { useBetween } from 'use-between';
import './Top10.scss'

function Top10(props) {
    const state = useSelector((state) => state.data);
    const [dropdownOpen, setdropdownOpen] = useState(false);
    const [cityFil, setcityFil] = useState(false);
    const [streetFil, setstreetFil] = useState(false);
    const [storeFil, setstoreFil] = useState(false);
    const [reloadMap, setreloadMp] = useState(false);

    const [citySelect, setCitySelect] = useState('حمص');
    const [streetSelect, setStreetSelect] = useState('الحضارة-العشاق');
    const [storeSelect, setStoreSelect] = useState('مطاعم');
    const { resStor, setStore } = useBetween(state.useShareState);

    setTimeout(() => {
        var skeletonTodoLoad = document.getElementsByClassName('skeleton-top-10-load');
        for (let i = 0; i < skeletonTodoLoad.length; i++) {
            skeletonTodoLoad[i].style.display = 'none'
        }

        var listItemsLoad = document.getElementsByClassName('list-top-10-load');
        for (let i = 0; i < listItemsLoad.length; i++) {
            listItemsLoad[i].style.display = 'block'
        }

    }, 5000)
    useEffect(() => {
        
        setStore(resStor);
       
        },[resStor.length]);
    const { city, street, store } = useBetween(state.useShareState);
    var cnt = 0;
    var firstLoad = 'true';
    var widthItem = '550px';
    const cityFilter =
        city.map(item => {

            return (
                <div key={item.cityId}>
                    <DropdownItem className='menu-item'  >
                        <div onClick={() => { setCitySelect(item.cityName); setdropdownOpen(false) }}><bdi>{item.cityName}</bdi></div>
                    </DropdownItem>

                </div>
            )
        })
    const streetFilter =
        street.map(item => {

            return (
                <div key={item.streetId}>
                    <DropdownItem className='menu-item' >
                        <div onClick={() => { setStreetSelect(item.streetName); setdropdownOpen(false) }}><bdi>{item.streetName}</bdi></div>
                    </DropdownItem>

                </div>
            )
        })
    const storeFilter =
        store.map(item => {

            return (
                <div key={item.storetId}>
                    <DropdownItem className='menu-item'  >
                        <div onClick={() => { { setStoreSelect(item.storeName); setdropdownOpen(false); cnt = 0 } }}><bdi> <i className={item.storeIcon}></i> {item.storeName}</bdi></div>
                    </DropdownItem>

                </div>
            )
        })
    const Citytoggle = () => { setcityFil(!cityFil) };
    const streettoggle = () => { setstreetFil(!streetFil) };
    const storetoggle = () => { setstoreFil(!storeFil) };

    const tempSkeletonTop10 = ['skeletonTop1', 'skeletonTop2', 'skeletonTop3'];
    var skeletonTop10 = tempSkeletonTop10.map((skeleton,index) => {
        return (

            <div className='ContTop10 skeleton skeleton-top-10-load' key={skeleton} >
                <div className='idTop10 skeleton ' style={{color: '#eee'}}>{index+1}</div>
                <div className={`${index <= 2 ? "top3id skeleton" : "skeleton"}`}></div>
                <div className='imgTop10 skeleton' style={{marginTop: '-45px'}}/>
                <div className=' infoTop10 title-animate' style={{width: '25%'}}>
                    <div className='infoTop skeleton skeleton-text-top10'></div>
                    <div className='infoTop skeleton skeleton-text-top10'></div>
                    <div className='infoTop skeleton skeleton-text-top10'></div>
                </div>
            </div>
        )
    })
const stores=resStor;
    const ListItems = stores.sort((a, b) => a.rateValue - b.rateValue).reverse().map(item => {


        if (((citySelect == 'حمص')
            && (streetSelect == 'الحضارة-العشاق') &&
            (storeSelect == 'مطاعم' && item.businessTypeName.name == 'مطاعم')
        )
            ||
            ((citySelect =='حمص')
                && (streetSelect =='الحضارة-العشاق' ) &&
                (storeSelect == item.businessTypeName.name)

            )




        ) {
            cnt++;
            var classid = '';
            if (cnt == 1) { classid = 'top3Img' }
            else if (cnt == 2) { classid = 'top3Img' }
            else if (cnt == 3) { classid = 'top3Img' }
            else { classid = 'topResImg' }


            return (
                <div>
                    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-icons/1.7.2/font/bootstrap-icons.min.css" />
                    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"></link>
                    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css"></link>


                    <div className='ContTop10 list-top-10-load' key={item._id} >
                        <div className='idTop10'>{cnt}</div>
                        <div className={`${cnt <= 3 ? "top3id" : ""}`}></div>
                        <img src={item.image.url} className={`${classid} imgTop10`}></img>
                        <div className=' infoTop10'>
                            <div className='infoTop nameTop10'>{item.name}</div>
                            <div className='infoTop locTop10'><i className="fa fa-map-marker" aria-hidden="true"></i>
                                {item.location.address} </div>
                            <div className='infoTop'><bdi>

                                <i className={`${item.businessTypeName.name == 'مطاعم' ? "fa fa-cutlery" : "fas fa-tshirt"}`}></i></bdi>
                                <span>{item.businessTypeName.name }</span>
                            </div>
                            <div className='StTop10Cont'>
                                <div className='infoTop starsTop10'>
                                    <StarRatings

                                        rating={item.rateValue}
                                        starRatedColor="#FC0"
                                        numberOfStars={5}
                                        name='rating'
                                        starDimension="20px"
                                        starSpacing="0px"
                                        direction='rtl'



                                    />
                                    <span className='rateTop10'>{item.rateValue.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    </div></div>


            )

        }
        firstLoad = 'false'

    })
    function toggle() {


        setdropdownOpen(!dropdownOpen);
    }
    return (
        <div className="Top10">
            <div className='FilterTop10'>
                <i className="bi bi-filter "></i>
                <span>  <Dropdown isOpen={dropdownOpen} toggle={toggle}   >
                    <DropdownToggle caret className='dropDownFilterTop10'>

                        <span className='filtTop10' ><bdi>صنف حسب</bdi> </span>


                    </DropdownToggle>
                    <DropdownMenu className='menuFilterTop10'>

                        {/* city */}
                        <div className=' top10Filter dropDownCityItem'>
                            <span className='title'><bdi>المحافظة: </bdi></span>
                            <Dropdown isOpen={cityFil} toggle={Citytoggle}   >

                                <DropdownToggle caret className='col-lg-12 toggle cityToggle '>

                                    <div className='select' ><bdi>{citySelect}</bdi> </div>


                                </DropdownToggle>
                                <DropdownMenu className='menuFiliterTop10-2'>
                                    {cityFilter}
                                </DropdownMenu>
                            </Dropdown>
                        </div>
                        {/* street */}
                        <div className='top10Filter dropDownStreetItem'>
                            <span className='title'><bdi>الشارع: </bdi></span>
                            <Dropdown isOpen={streetFil} toggle={streettoggle}   >
                                <DropdownToggle caret className='col-lg-12 toggle storeToggle'>

                                    <div className='select'  ><bdi>{streetSelect}</bdi> </div>


                                </DropdownToggle>
                                <DropdownMenu className='menuFiliterTop10-2'>
                                    {streetFilter}
                                </DropdownMenu>
                            </Dropdown>
                        </div>
                        {/* store */}
                        <div className='top10Filter dropDownStoreItem'>
                            <span className='title'><bdi>المتجر: </bdi></span>
                            <Dropdown isOpen={storeFil} toggle={storetoggle}   >
                                <DropdownToggle caret className='col-lg-12 toggle '>

                                    <div className='select' ><bdi>{storeSelect}</bdi></div>


                                </DropdownToggle>
                                <DropdownMenu className='menuFiliterTop10-2'>
                                    {storeFilter}
                                </DropdownMenu>
                            </Dropdown>
                        </div>
                    </DropdownMenu>
                </Dropdown></span>

            </div>
            {/* <div className='filterFlex'>
                <span className='city'>المحافظة:</span>
                <span className='street'>الشارع:</span>
                <span className='store'>المتجر:</span>
            </div> */}
            {skeletonTop10}
            {ListItems}
        </div>
    )
}
export default Top10;