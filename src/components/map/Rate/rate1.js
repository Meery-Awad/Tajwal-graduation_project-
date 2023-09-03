import { useSelector } from 'react-redux';
import Rate from './rate'
import '../Rate/rate1.scss'
import BarChart from './BarChart';
import StarRatings from 'react-star-ratings';
import { useEffect, useRef, useState } from 'react';
import StarImg from '../../photo/starImg.jpg'
import BarChartImg from '../../photo/followImg.jpg'
import { useLocation, useParams } from 'react-router-dom';
import { useBetween } from 'use-between';
import { NavItem } from 'reactstrap';

function Rate1(props) {
    const st = useSelector((state) => state.data);
    const loc = useLocation();
    const idS = useRef(0);
    const { idStore, setidStore } = useBetween(st.useShareState);
     const {rateBusi, setRateBusi } = useBetween(st.useShareState);
    const name = loc.pathname;

    useEffect(() => {
        if (name == '/Rate2') {
            starAndBar('.barCh1', '.stars1Cont', '.rate1.Follower', '.rate1.Rating');
        }
        else {
            starAndBar('.stars1Cont', '.barCh1', '.rate1.Rating', '.rate1.Follower');
        }
        
    }, [])
    var cnt=0;
    
    
       
    const starAndBar = (show, hid, withBg, withoutBg) => {
        document.querySelector(show).style.display = 'block';
        document.querySelector(hid).style.display = 'none';
        document.querySelector(withBg).style.background = "linear-gradient(to right, "
            + 'rgb(233, 232, 232)' + ", "
            + 'rgb(161, 202, 165)' + ","
            + 'rgb(231, 228, 228)' + ")";
        document.querySelector(withoutBg).style.background = 'white';
    }

  var str1=0,str2=0,str3=0,str4=0,str5=0;
  rateBusi.RatePerValueCount.map(item=>{
    if(item.rateValue==1)
    str1=rateBusi.rateCount/item.count;
    if(item.rateValue==2)
    str2=rateBusi.rateCount/item.count;
    if(item.rateValue==3)
    str3=rateBusi.rateCount/item.count;
    if(item.rateValue==4)
    str4=rateBusi.rateCount/item.count;
    if(item.rateValue==5)
    str5=rateBusi.rateCount/item.count;

  }

  )
    // const hid = () => {

    //     document.querySelector('.Rate').style.display = 'none'
    // }
   
    return (

        <div className='Rates1'>
            {/* <div className='close' onClick={hid}>&times;</div> */}
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"></link>
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css"></link>
            <div className='rates1'>
                <div className='rate1 Follower bg-blur'
                    onClick={() => starAndBar('.barCh1', '.stars1Cont', '.rate1.Follower', '.rate1.Rating')}>المتابعيين
                </div>
                <div className='rate1 Rating'
                    onClick={() => starAndBar('.stars1Cont', '.barCh1', '.rate1.Rating', '.rate1.Follower')}>التّقييمات
                </div>
            </div>
            <div className='stars1Cont' style={{ display: name == '/Rate1' ? 'block' : 'none' }} >
                <img src={StarImg} className=' col-lg-6 starImg'></img>
                <div className='contS'>
                    <div className=' stars1' >
                        <StarRatings

                            rating={rateBusi.rateValue}
                            starRatedColor="#FC0"
                            numberOfStars={5}
                            name='rating'
                            starDimension="32px"
                            starSpacing="1px"

                        />
                        <div className=' col-lg-6 rates of5'><h4>{rateBusi.rateValue.toFixed(1)}/5</h4><span className=' rates allnum '>({rateBusi.rateCount})</span></div>
                    </div>
                 
                </div>

                <div className='stars2'>

                    <div className='Flex'>
                        <div className="fas fa-star" ></div><span className='num num1'>5</span>
                        <div className="progress str5">
                            <div className="progress-bar bg-darkopacity " role="progressbar"
                                style={{ width: `${str5}%` }} aria-valuenow={str5} aria-valuemin="0" aria-valuemax="100">{str5}%</div>
                        </div></div>

                    <div className='Flex'>
                        <div className="fas fa-star" ></div><span className='num num2'>4</span>
                        <div className="progress str4 ">
                            <div className="progress-bar bg-darkopacity " role="progressbar"
                                style={{ width: `${str4}%` }} aria-valuenow={str4} aria-valuemin="0" aria-valuemax="100">{str4}%</div>
                        </div></div>

                    <div className='Flex'>
                        <div className="fas fa-star" ></div><span className='num num2'>3</span>
                        <div className="progress str3 ">
                            <div className="progress-bar bg-darkopacity" role="progressbar"
                                style={{ width: `${str3}%` }} aria-valuenow={str3} aria-valuemin="0" aria-valuemax="100">{str3}%</div>
                        </div></div>

                    <div className='Flex'>
                        <div className="fas fa-star" ></div><span className='num num2'>2</span>
                        <div className="progress str2 ">
                            <div className="progress-bar bg-darkopacity" role="progressbar"
                                style={{ width: `${str2}%` }} aria-valuenow={str2} aria-valuemin="0" aria-valuemax="100">{str2}%</div>
                        </div></div>

                    <div className='Flex'>
                        <div className="fas fa-star" ></div><span className='num num2'>1</span>
                        <div className="progress str1">
                            <div className="progress-bar bg-darkopacity" role="progressbar"
                                style={{ width: `${str1}%` }} aria-valuenow={str1} aria-valuemin="0" aria-valuemax="100">{str1}%</div>
                        </div></div>

                </div>


            </div>
            <div className='barCh1' style={{ display: name == '/Rate2' ? 'block' : 'none' }} >
                <img src={BarChartImg} className='BarChartImg'></img>
                
                <BarChart
                    selectYear={0}
                    w={490}
                    h={190}
                    svgMt={'110px'}
                    svgMr={'-20px'}
                    paddongXscale={0.3}
                    XAxisFontS={'13.5px'}
                    colorText={'black'}
                    textMt={205}
                    textFontS={'14.5px'}
                    display={true}
                />
            </div>
        </div>
    )
}
export default Rate1;
