import './startRate.scss';
import $ from 'jquery';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useBetween } from 'use-between';
import Axios from 'axios';

function StartRate(props) {
    const state = useSelector((state) => state.data);
    const { dropdownOpenLogin, setdropdownOpenLogin, resStor, setStore } = useBetween(state.useShareState);
    const { isUserLogin, setisUserLogin, token } = useBetween(state.useShareState);
    const [rate, setrate] = useState(0);
    const stores = resStor;
    useEffect(() => {
        stores.forEach((store, i) => {
            store.ratePage=0;})
        setStore(resStor);

    }, [resStor.length])
   




    function st(item, cntStr) {
        // alert(isUserLogin)
        if (isUserLogin == false) setdropdownOpenLogin(!dropdownOpenLogin)
        if (isUserLogin == true) {
            if (item.ratePage == cntStr)
                item.ratePage = 0;
            else
                item.ratePage = cntStr;
            const data = {
                "ratingValue": cntStr
            };
            const headers = {
                'Authorization': 'Bearer ' + token,
                "content-type": "application/json;charset=UTF-8"
            };
            Axios.post(`https://tajwal2.herokuapp.com/api/business/${item._id}/rate`, data, { headers })
                .then(res => {
                    console.log(res.data)
                })
                .catch(err => console.log(err));
            setrate(item.ratePage)
        }
    }
    const starList = stores.map(item => {

        if (item._id == props.id)
            return (

                <div className="wrapper">

                    <input name="ratingRadio" type="radio" id="st1" value="1" className='star5'></input>

                    <label for="st1" className=' str star5' value="1" onClick={() => st(item, 1)}
                        style={{ color: item.ratePage >= 1 && isUserLogin == true ? '#FC0' : 'rgb(179, 178, 178)' }} >

                    </label>

                    <input name="ratingRadio" type="radio" id="st2" value="2" className='star4' />
                    <label for="st2" className='str star4' value="2" onClick={() => st(item, 2)}
                        style={{ color: item.ratePage >= 2 && isUserLogin == true ? '#FC0' : 'rgb(179, 178, 178)' }}>

                    </label>

                    <input name="ratingRadio" type="radio" id="st3" value="3" className='star3' />
                    <label for="st3" className='str star3' value="3" onClick={() => st(item, 3)}
                        style={{ color: item.ratePage >= 3 && isUserLogin == true ? '#FC0' : 'rgb(179, 178, 178)' }}>

                    </label>

                    <input name="ratingRadio" type="radio" id="st4" value="4" className='star2' />
                    <label for="st4" className='str star2' value="4" onClick={() => st(item, 4)}
                        style={{ color: item.ratePage >= 4 && isUserLogin == true ? '#FC0' : 'rgb(179, 178, 178)' }}>

                    </label>
                    <input name="ratingRadio" type="radio" id="st5" value="5" className='star1' />
                    <label for="st5" className='str star1' value="5" onClick={() => st(item, 5)}
                        style={{ color: item.ratePage >= 5 && isUserLogin == true ? '#FC0' : 'rgb(179, 178, 178)' }}>

                    </label>
                </div>
            )

    })
    return (

        <div>
            {starList}

        </div>

    )
}


export default StartRate;