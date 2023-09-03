import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { useBetween } from 'use-between';
import $ from 'jquery';
import './SearchMap.css'
const SearchMap = (props) => {
    const state = useSelector((state) => state.data);
    const { idStore, setidStore, allMess, setallMess,
        selectMessId, setSelectMessId, messStore, setMessStore, } = useBetween(state.useShareState);
    const element = $(`#${'selectMess'}`);
    element.animate({
        scrollTop: element.prop("scrollHeight")
    }, 500);
   
    useEffect(() => {
        let suggestions = [


        ];
       

        // fetch("https://vinote.herokuapp.com/users", requestOptions)
        //     .then(response => response.text())
        //     .then(result => {
        //         for (let i = 0; i < (JSON.parse(result).users).length; i++) {
        //             suggestions[i] = JSON.parse(result).users[i].userName
        //         }
        //     })
        //     .catch(error => console.log('error', error));

        for (let i = 0; i < state.stores.features.length; i++) {
            const obj = {
                'storeId': state.stores.features[i].properties.id, 'name': state.stores.features[i].properties.name,
                'photo': state.stores.features[i].properties.photo,
                'geo':state.stores.features[i]
            }
            suggestions.push(obj)
        }

        // getting all required elements
        const searchWrapper = document.querySelector(".search-input");
        const inputBox = searchWrapper.querySelector("input");
        const suggBox = searchWrapper.querySelector(".autocom-box");
        const icon = searchWrapper.querySelector(".iconSe");
        let linkTag = searchWrapper.querySelector("a");
        let webLink;

        // if user press any key and release
        inputBox.onkeyup = (e) => {

            let userData = e.target.value; //user enetered data
            // this.props.handleName(e.target.value);
            let emptyArray = [];
            if (userData) {
                icon.onclick = () => {

                    linkTag.setAttribute("href", webLink);
                    console.log(webLink);
                    linkTag.click();
                }

                emptyArray = suggestions.filter((data) => {
                    //filtering array value and user characters to lowercase and return only those words which are start with user enetered chars
                    return data.name.toLocaleLowerCase().startsWith(userData.toLocaleLowerCase());
                });
                emptyArray = emptyArray.map((data) => {
                    // passing return data inside li tag

                    return data = `<div > <img src=${data.photo}/><li><bdi>${data.name}<bdi></li></div>`

                });

                searchWrapper.classList.add("active"); //show autocomplete box
                showSuggestions(emptyArray);
                let allList = suggBox.querySelectorAll("li");

                for (let i = 0; i < allList.length; i++) {
                    //adding onclick attribute in all li tag

                    allList[i].onclick = function () { select(this);console.log(allList[i]); };
                    
                }
            } else {
                searchWrapper.classList.remove("active"); //hide autocomplete box
            }
         

        }
        const handleName1 = (selectData) => {
            // this.props.handleName(selectData);
        }

        function select(element) {
           
            let selectData = element.textContent;
            inputBox.value = selectData;
            let b = false;
            setSelectMessId(state.currentUser[0].messages.length);
            setallMess([]);
            messStore.map((item, i) => {

                if (item.storeId == idStore) {
                    setallMess(item.allMess); setSelectMessId(i);
                    b = true
                }
                // else if (item.storeId != idStore && b == false) {

                //     setallMess([]);
                //     setSelectMessId(state.currentUser[0].messages.length);



                // }


            })
            searchWrapper.classList.remove("active");
            // flyToStore([36.7542 , 34.7271])
        }

        function showSuggestions(list) {
            let listData;
            if (!list.length) {

                listData = '<li>' + inputBox.value + '</li>';
            } else {
                listData = list.join('');
            }

            suggBox.innerHTML = listData;

        }
    })
    var cnt=0;
const hidAndShowSearch=()=>{
 
    if(cnt==0)
    {
        document.querySelector('.searchInput').style.width='32%';
        document.querySelector('.searchInput').style.backgroundColor='#fff';
        document.querySelector('.searchInput').style.boxShadow= '0px 1px 5px 3px rgba(0,0,0,0.12)';
        document.querySelector('.autocom-box').style.display= 'block';
        cnt=1;
    }
    else
    {
        document.querySelector('.searchInput').style.width='0%';
        document.querySelector('.searchInput').style.backgroundColor='transparent'
        document.querySelector('.searchInput').style.boxShadow= 'none';
          document.querySelector('.autocom-box').style.display= 'none';
          cnt=0;
    }
  
}

    return (

        <div className="wrapperSe">
             <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.3.1/css/all.css" integrity="sha384-mzrmE5qonljUremFsqc01SB46JvROS7bZs3IO2EmfFsd15uHvIt+Y8vEf7N7fWAU" crossorigin="anonymous"></link>
            <div className="search-input">
               
             
                <input type="text" placeholder="...بحث" id='s' dir="right" className='searchInput'  ></input>
                <div className="autocom-box">
                    {/* <!-- here list are inserted from javascript --> */}
                </div>
                <div className="iconSe" onClick={ hidAndShowSearch}><i className="fa fa-search"></i></div>
            </div>
            
         </div>


    )

}


export default SearchMap;