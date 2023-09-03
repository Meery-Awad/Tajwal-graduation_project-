import { useSelector } from "react-redux";
import { useEffect, useState } from 'react';
import { useBetween } from 'use-between';
import SmileSugg1 from '../photo/smiling_face_with_sunglasses.gif';
import SmileSugg2 from '../photo/smiling_face_with_halo.gif';
import ShowMore from 'react-show-more-button';
import sadSmail from '../photo/frowning_face.gif'
import WOW from 'wowjs';
import './sugg.scss'



const Sugg = () => {
    const state = useSelector((state) => state.data);
    const { token, setToken, SuggPages1, setSuggPages, SuggProductss, setSuggProuducts } = useBetween(state.useShareState);
    const SuggPag = SuggPages1;
    const SuggProducts = SuggProductss;
    const SuggProducts1 = state.SuggProducts1;
    const [btnName, setbtnName] = useState('عرض المزيد');
    const [btnName1, setbtnName1] = useState('عرض المزيد');
    const [btnName2, setbtnName2] = useState('عرض المزيد');
    
    
    setTimeout(() => {
        var skeletonTodoLoad = document.getElementsByClassName('skeleton-sugg-load');
        for (let i = 0; i < skeletonTodoLoad.length; i++) {
            skeletonTodoLoad[i].style.display = 'none'
        }

        var listItemsLoad = document.getElementsByClassName('pages-sugg-load');
        for (let i = 0; i < listItemsLoad.length; i++) {
            listItemsLoad[i].style.display = 'block'
        }

        skeletonTodoLoad = document.getElementsByClassName('skeleton-sugg-prod-load');
        for (let i = 0; i < skeletonTodoLoad.length; i++) {
            skeletonTodoLoad[i].style.display = 'none'
        }

        listItemsLoad = document.getElementsByClassName('prod-sugg-load');
        for (let i = 0; i < listItemsLoad.length; i++) {
            listItemsLoad[i].style.display = 'block'
        }
    }, 5000)

    useEffect(() => {
        // new WOW.WOW({
        //     live: false
        // }).init();
        setSuggPages(SuggPages1);
        setSuggProuducts(SuggProductss);
    }, [SuggPages1, SuggProductss])

    const cnt = () => {
        if (btnName == 'عرض المزيد')
            setbtnName('عرض الاقل')
        else
            setbtnName('عرض المزيد')
    }
    const cnt1 = () => {
        if (btnName1 == 'عرض المزيد')
            setbtnName1('عرض الاقل')
        else
            setbtnName1('عرض المزيد')
    }
    const cnt2 = () => {
        if (btnName2 == 'عرض المزيد')
            setbtnName2('عرض الاقل')
        else
            setbtnName2('عرض المزيد')
    }
    const tempSkeletonSuggKeys = ['skeletonSugg1', 'skeletonSugg2', 'skeletonSugg3', 'skeletonSugg4',
        'skeletonSugg5', 'skeletonSugg6', 'skeletonSugg7', 'skeletonSugg8'];

    var skeletonPages = tempSkeletonSuggKeys.map(skeleton => {
        return (
            <div className="SuggPages skeleton skeleton-sugg-load" key={skeleton}>
                <div className='imgPage skeleton' />
                <div className="info title-animate">
                    <div className='namePages skeleton skeleton-text skeleton-text-sugg'></div>
                    <div className='typePages skeleton skeleton-text skeleton-text-sugg'></div>
                    <div className='typePages skeleton skeleton-text skeleton-text-sugg'></div>
                </div>
            </div>
        )
    });

    const tempSkeletonProdKeys = ['skeletonProd1', 'skeletonProd2', 'skeletonProd3', 'skeletonProd4',
        'skeletonProd5', 'skeletonProd6', 'skeletonProd7', 'skeletonProd8'];

    var skeletonProd = tempSkeletonProdKeys.map(skeleton => {
        return (
            <div className="SuggProducts skeleton skeleton-sugg-prod-load" key={skeleton}>

                <div className='imgProd skeleton' />
                <div className="info title-animate">
                    <div className='nameProd skeleton skeleton-text skeleton-text-sugg' style={{ opacity: '.7' }}></div>
                    <div className='storeProd skeleton skeleton-text skeleton-text-sugg' style={{ opacity: '.7' }}></div>
                    <div className='typeProd skeleton skeleton-text skeleton-text-sugg' style={{ opacity: '.7' }}></div>
                </div>
            </div>
        )
    });
    const SuggPages =
        SuggPag.map(item => {

            return (
                <div className="SuggPages pages-sugg-load" key={item._id}>
                    <div className="ratePages">{item.rateValue.toFixed(1)} <i className='fa fa-star '></i></div>
                    <img src={item.image.url} className='imgPage'></img>
                    <div className="info">
                        <div className='namePages'>{item.name}</div>
                        <div className='typePages'> <i className={`${item.businessTypeName.name == 'مطاعم' ? "fa fa-cutlery" : "fas fa-tshirt"}`}></i>{item.businessTypeName.name}</div>
                        <div className='typePages'> <i className="fa fa-map-marker" aria-hidden="true"></i> {item.location.address} </div>
                    </div>
                </div>


            )
        })
    var type = "مطاعم";
   var restorantCnt=0, clouthCnt=0;
    const SuggProd =
        SuggProducts.map(item => {
            if (item.sizes.length == 0) {
                type = 'مطاعم'
             restorantCnt++;
            
            return (
                <div className="SuggProducts prod-sugg-load" key={item.id}>
                    <div className="ratePages">{item.rateValue.toFixed(1)} <i className='fa fa-star '></i></div>
                    <img src={item.images[0].url} className='imgProd'></img>
                    <div className="info">
                        <div className='nameProd'>{item.name}</div>
                        <div className='storeProd'>
                            {/* <i className={`${item.type == 'مطعم' ? "fa fa-cutlery" : "fas fa-tshirt"}`}></i> */}
                           {type}</div>
                        <div className='typeProd'> {item.categories[0].categoryName} </div>
                    </div>
                </div>


            )
            }
        })
       
    const SuggProd1 =
        SuggProducts.map(item => {
            if (item.sizes.length != 0) {
                type = 'ألبسة'
               clouthCnt++;
            return (
                <div className="SuggProducts prod-sugg-load" key={item.id}>
                    <div className="ratePages">{item.rateValue.toFixed(1)} <i className='fa fa-star '></i></div>
                    <img src={item.images[0].url} className='imgProd'></img>
                    <div className="info">
                        <div className='nameProd'>{item.name}</div>
                        <div className='storeProd'>
                            {/* <i className={`${item.type == 'مطعم' ? "fa fa-cutlery" : "fas fa-tshirt"}`}></i> */}
                            {type}</div>
                        <div className='typeProd'> {item.categories[0].categoryName} </div>
                    </div>
                </div>


            )
            }
        })
    const styleBtn = {

        background: '#47A851',
        color: 'white',
        width: '140px',
        border: 'none',
        borderRadius: '50px',
        paddingBottom: '6px',



    }
    return (
        <div className="ContSugg">

            <div className="suggToday"><bdi>إلى أين تريد الذهاب اليوم؟</bdi>
                <img src={SmileSugg1} className='SmileSugg'></img>
            </div>
            <div className="thingToTry"><bdi>  أماكن قد ترغب بزيارتها:</bdi> </div>
            <div style={{ display: SuggPages.length > 0 ? 'block' : 'none' }}>
                <ShowMore maxHeight={450}

                    className='ListLikeProd'
                    onChange={() => cnt()}
                    button={
                        <button style={styleBtn} className="btnSeeMore">{btnName}</button>}
                >
                    <div className="ContSuggPages col-lg-12 ">
                        {skeletonPages}
                        {SuggPages}
                    </div>
                </ShowMore>
            </div>
            <p style={{ display: SuggPages.length == 0 ? 'block' : 'none' }}> لا توجد اماكن مقترحة حتى الآن!!<img src={sadSmail} className='sadSmail'></img></p>
            {/* ---------------------------------------------------------------- */}
            <div className="suggToday SProd"><bdi> هل من منتجات تريد تجربتها اليوم؟</bdi>
                <img src={SmileSugg2} className='SmileSugg'></img>
            </div>
            <div className="thingToTry"><bdi> أطعمة قد ترغب بتجربتها: </bdi></div>
            <div style={{ display: SuggProd.length > 0 ? 'block' : 'none' }}>
                <ShowMore maxHeight={450}

                    className='ListLikeProd'
                    onChange={() => cnt1()}
                    button={
                        <button style={styleBtn} className="btnSeeMore">{btnName1}</button>}
                >
                    <div className="ContSuggProd col-lg-12">
                        {skeletonProd}
                        {SuggProd}
                    </div>
                </ShowMore>
            </div>
            <p style={{ display: restorantCnt == 0 ? 'block' : 'none' }}> لا توجد أطعمة مقترحة حتى الآن!!<img src={sadSmail} className='sadSmail'></img></p>
            <div className="thingToTry"><bdi> ألبسة قد ترغب بتجربتها: </bdi></div>
            <div style={{ display: SuggProd1.length > 0 ? 'block' : 'none' }}>
                <ShowMore maxHeight={450}

                    className='ListLikeProd'
                    onChange={() => cnt2()}
                    button={
                        <button style={styleBtn} className="btnSeeMore">{btnName2}</button>}
                >
                    <div className="ContSuggProd col-lg-12">
                        {skeletonProd}
                        {SuggProd1}
                    </div>
                </ShowMore>
            </div>
            <p style={{ display: clouthCnt == 0 ? 'block' : 'none' }}> لا توجد ألبسة مقترحة حتى الآن!!<img src={sadSmail} className='sadSmail'></img></p>
        </div>


    )
}
export default Sugg;