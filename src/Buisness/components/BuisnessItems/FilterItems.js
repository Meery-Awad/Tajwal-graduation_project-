import React, { useEffect } from 'react';
import '../../../bootstrap/css/bootstrap.css'
import '../../style/App.css';
import { useSelector } from 'react-redux';
import { useBetween } from 'use-between';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown'
import Axios from 'axios'


function FilterItems(props) {
    // HOOKS
    const st = useSelector((state) => state.dataB);
    const state = useSelector((state) => state.data);

    const { isUserOrBuisness, setisUserOrBusisness } = useBetween(state.useShareState);

    // business work type
    const { businessWorkType, setBusinessWorkType } = useBetween(st.useSharingFilters);

    // User Type
    const { userType, setUserType } = useBetween(st.useSharingFilters);

    const { TypesUp, setTypesUp } = useBetween(st.useSharingFilters);
    var tempTypesUp = TypesUp;

    const { categoriesDropdown, setCategoriesDropdown } = useBetween(st.useSharingFilters);

    setUserType(((isUserOrBuisness === 'business') ? 'business' : 'user'));

    const { buisnessProfile, setBuisnessProfile } = useBetween(st.useSharingFilters);

    const { sizes, setSizes } = useBetween(st.useSharingFilters);
    var { selectedSizes, setSelectedSizes } = useBetween(st.useSharingFilters);

    const { setSelectedCategory, selectedFilterDropdown1, setSelectedFilterDropdown1,
        selectedFilterDropdown2, setSelectedFilterDropdown2 } = useBetween(st.useSharingFilters)

    // Constants And Variables
    const filters = categoriesDropdown;
    let length = categoriesDropdown.length;


    // Skeleton wait load
    setTimeout(() => {
        var skeletonTodoLoad = document.getElementsByClassName('skeleton-filter-by-load');
        for (let i = 0; i < skeletonTodoLoad.length; i++) {
            skeletonTodoLoad[i].style.display = 'none'
        }

        var listItemsLoad = document.getElementsByClassName('list-filter-by-load');
        for (let i = 0; i < listItemsLoad.length; i++) {
            listItemsLoad[i].style.display = 'inline'
        }
    }, 5000)

    useEffect(() => {
    }, [TypesUp, categoriesDropdown])
    // Functions
    // Hover over filter items above dropdowns 
    const mouseOverFilter = (id) => {
        var filterHover = document.getElementById(id);
        filterHover.style.borderWidth = '2px';
    }
    const mouseLeaveFilter = (id) => {
        var filterHover = document.getElementById(id);
        filterHover.style.borderWidth = '1px';
    }

    // Choose type of filtering (vegeterian or not)
    const switchType = (event) => {
        if (selectedFilterDropdown1.type === undefined) {
            selectedFilterDropdown1.type = [];
        }
        else if (selectedFilterDropdown1.type.includes(event.target.value)) {
            let y;
            let min1 = selectedFilterDropdown1.minPrice;
            let max1 = selectedFilterDropdown1.maxPrice;
            y = selectedFilterDropdown1.type.filter(function (value) {
                return (value !== event.target.value);
            });
            setSelectedFilterDropdown1({
                type: y,
                minPrice: min1,
                maxPrice: max1
            })

        }
        else {
            let x = selectedFilterDropdown1.type;
            let min1 = selectedFilterDropdown1.minPrice;
            let max1 = selectedFilterDropdown1.maxPrice;
            x.push(event.target.value)
            setSelectedFilterDropdown1({
                type: x,
                minPrice: min1,
                maxPrice: max1
            });
        }

    }


    // Filter By Price 
    const changePrice = (minORmax, id) => {
        var selectedPrice = document.getElementById(id).value;
        if (minORmax === 'min')
            setSelectedFilterDropdown1({
                type: selectedFilterDropdown1.type,
                minPrice: selectedPrice,
                maxPrice: selectedFilterDropdown1.maxPrice
            });
        else
            setSelectedFilterDropdown1({
                type: selectedFilterDropdown1.type,
                minPrice: selectedFilterDropdown1.minPrice,
                maxPrice: selectedPrice
            });

    }

    //Filter By Size
    const changeSizes = (event) => {
        if (selectedSizes === undefined) {
            // setSelectedSizes([]);
            selectedSizes = []
            // let x = [event.target.value]
            // setSelectedSizes(x)
            console.log('undefined');
            console.log(selectedSizes);
        }
        else if (selectedSizes.includes(event.target.value)) {
            let y, z
            y = selectedSizes;
            z = y.filter(function (value) {
                return (value !== event.target.value);
            });
            selectedSizes = z;
            setSelectedSizes(z);
            console.log('delete')
            console.log(selectedSizes);//بس اعمل حذف بتصير undefined 
            console.log('z: '+z);
        }
        else if (selectedSizes.length >= 0 || selectedSizes === []) {
            let x = selectedSizes;
            x.push(event.target.value)
            setSelectedSizes(x);
            console.log('add');
            console.log(selectedSizes);
        }

        // console.log(selectedSizes)
    }

    const selectDropdown2 = (event) => {
        setSelectedFilterDropdown2(event)
    }

    const switchCategory = (categId, categName) => {
        setSelectedCategory(categName);
    }

    /* click one of the filters above dropdowns ( categories ) */
    const filterClick = (id, name) => {
        switchCategory(id, name);
        for (let i = 1; i <= length; i++) {
            var idRemove = 'filter-by-id' + i;
            var filterRemove = document.getElementById(idRemove);
            filterRemove.style.backgroundColor = "#d6d3d3";
            filterRemove.style.borderWidth = "1px";
            filterRemove.style.fontWeight = "normal";
        }
        var filter = document.getElementById(id);
        filter.style.backgroundColor = "#47A851";
        filter.style.borderWidth = "2px";
        filter.style.fontWeight = "bold";
    }

    /* LIST OF FILTERS above dropdowns */
    const Listfilters = length ? (
        categoriesDropdown.map(categ => {
            return (
                <span className='filter-by list-filter-by-load' id={categ.id}
                    onMouseMove={() => mouseOverFilter(categ.id)}
                    onMouseLeave={() => mouseLeaveFilter(categ.id)}
                    onClick={() => filterClick(categ.id, categ.name)}
                    style={categ.name === 'الكل' ? { backgroundColor: "#47A851", borderWidth: "2px", fontWeight: "bold" } : {}}
                    key={categ.id}>
                    {categ.name + ' '}
                </span>
            )
        })
    ) : (
        <div className='no-filters'>

        </div>
    )
    const tempSkeletonFilterKeys = ['skeletonFilter1', 'skeletonFilter2', 'skeletonFilter3', 'skeletonFilter4',
        'skeletonFilter5', 'skeletonFilter6', 'skeletonFilter7', 'skeletonFilter8'];
    var skeletonItems = tempSkeletonFilterKeys.map(skeleton => {
        return (
            <span className='filter-by skeleton skeleton-filter-by skeleton-filter-by-load' key={skeleton} dir='rtl'
                style={{ letterSpacing: '5px', color: '#ddd' }}>
                .....
            </span>
        )
    })


    const clickFilterDropdown1 = (e) => {

        const rangeInput = document.querySelectorAll(".range-input input"),
            priceInput = document.querySelectorAll(".price-input input"),
            range = document.querySelector(".slider .progress");
        let priceGap = 1000;

        priceInput.forEach(input => {
            input.addEventListener("input", e => {
                let minPrice = parseInt(priceInput[0].value),
                    maxPrice = parseInt(priceInput[1].value);

                if ((maxPrice - minPrice >= priceGap) && maxPrice <= rangeInput[1].max) {
                    if (e.target.className === "input-min") {
                        rangeInput[0].value = minPrice;
                        range.style.left = ((minPrice / rangeInput[0].max) * 100) + "%";
                    } else {
                        rangeInput[1].value = maxPrice;
                        range.style.right = 100 - (maxPrice / rangeInput[1].max) * 100 + "%";
                    }
                }
            });
        });

        rangeInput.forEach(input => {
            input.addEventListener("input", e => {
                let minVal = parseInt(rangeInput[0].value),
                    maxVal = parseInt(rangeInput[1].value);

                if ((maxVal - minVal) < priceGap) {
                    if (e.target.className === "range-min") {
                        rangeInput[0].value = maxVal - priceGap
                    } else {
                        rangeInput[1].value = minVal + priceGap;
                    }
                } else {
                    priceInput[1].value = minVal;
                    priceInput[0].value = maxVal;
                    range.style.left = ((minVal / rangeInput[0].max) * 100) + "%";
                    range.style.right = 100 - (maxVal / rangeInput[1].max) * 100 + "%";
                }
            });
        });

    }

    // Switch comment
    const switchState = () => {
        var temp = buisnessProfile;
        temp.showComment = !temp.showComment;
        setBuisnessProfile(temp);
    }
    const switchToggle = () => {
        var temp2 = document.getElementById('commentVisibilty').defaultChecked;
        document.getElementById('commentVisibilty').defaultChecked = ((temp2 === 'checked') ? ('') : ('checked'));
    }
    return (
        <div className='filter-items-component'>

            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-icons/1.7.2/font/bootstrap-icons.min.css" />
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"></link>
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css"></link>


            <div className='row'>
                {/* Enable and Disable Comments */}
                {/*
                    st.userType === 'Buisness' ? (
                        <div className='col-4 checkbox-comment-visible'>
                        <label className="toggle-switch mx-2">
                            <input type="checkbox" className="checkbox-open-close" id='commentVisibilty'
                                onChange={() => switchToggle()}
                                defaultChecked={((buisnessProfile.showComment) ? ('checked') : (''))} />
                            <span className="switch-btn" onClick={() => switchState()}></span>
                        </label>
                        <span style={{ 'textDecoration': 'underline' }}>هل تريد السّماح للزبائن بإضافة تعليق على منتجاتك ؟</span>
                    </div>
                    ) : (<></>)
                    */}

                <div dir='auto' className='filterItems col'>
                    <div dir='rtl'>
                        {skeletonItems}
                    </div>
                    <div>
                        {Listfilters}
                    </div>
                    <div className='filter-buttons'>

                        {/* Dropdown 1 */}
                        <DropdownButton
                            align="end"
                            variant="light"
                            title={
                                <span>
                                    <i className="bi bi-filter m-1 drop-icon"></i>
                                    <span className='drop-label'>فلترة</span>
                                </span>
                            }
                            id="dropdown-variant-light dropdown1"
                            className='btn drop-button x'
                            autoClose="outside"
                            // drop = 'start'
                            onClick={clickFilterDropdown1}
                            as="div"
                        >
                            <Dropdown.Header className="dropdown-header dropdown-header-me-1">حسب السّعر:</Dropdown.Header>
                            <Dropdown.Item as="div" className="dropdown-item dropdown-item-me-1" eventKey="option-1">

                                <div className="wrapper-range">

                                    <div className="price-input">
                                        <div className="field field1">
                                            {/* <span>إلى:</span> */}
                                            <input type="number" className="input-min" defaultValue="35000" />
                                            <span>ل.س</span>
                                        </div>
                                        <div className="separator">
                                            <i className="bi bi-arrow-right"></i>
                                        </div>
                                        <div className="field field2">
                                            {/* <span>من:</span> */}
                                            <input type="number" className="input-max" defaultValue="0" />
                                            <span>ل.س</span>
                                        </div>
                                    </div>
                                    <div className="slider">
                                        {/* progress */}
                                        <div className=""></div>
                                    </div>
                                    <div className="range-input" dir='auto'>
                                        <input type="range" className="range-min" id="range-min" min="0" max="100000"
                                            defaultValue="0" step="100"
                                            onMouseUp={() => changePrice('min', 'range-min')} />
                                        <input type="range" className="range-max" id="range-max" min="0" max="100000"
                                            defaultValue="35000" step="100"
                                            onMouseUp={() => changePrice('max', 'range-max')} />
                                    </div>
                                </div>
                            </Dropdown.Item>

                            <Dropdown.Header className="dropdown-header dropdown-header-me-1">حسب التّصنيف:</Dropdown.Header>
                            <Dropdown.Item as="div" className="dropdown-item dropdown-item-me-1" eventKey="option-1">
                                {
                                    businessWorkType !== 'مطاعم' ? (
                                        <div className='row row-cols-1 row-cols-md-3 types-buttons-div'>
                                            {
                                                TypesUp.map(type => {
                                                    return (
                                                        <div key={type.id} className='col'>
                                                            <input className="form-check-input form-check-input-filter" type="checkbox" name="checkbox-type-filter"
                                                                id={"typeCheckbox" + type.id} value={type.name}
                                                                onChange={(event) => switchType(event)}
                                                            />
                                                            <label className="form-check-label" htmlFor={"typeCheckbox" + type.id}>{type.name}</label>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    ) :
                                        (
                                            <div className='row row-cols-1 row-cols-md-2 veg-buttons-div'>
                                                {
                                                    TypesUp.map(type => {
                                                        return (
                                                            <div key={type.id} className='col'>
                                                                <input className="form-check-input form-check-input-filter" type="checkbox" name="checkbox-type-filter"
                                                                    id={"typeCheckbox" + type.id} value={type.name}
                                                                    onChange={(event) => switchType(event)}
                                                                />
                                                                <label className="form-check-label" htmlFor={"typeCheckbox" + type.id}>{type.name}</label>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        )
                                }

                            </Dropdown.Item>
                            {
                                (businessWorkType !== 'مطاعم') ? (
                                    <>
                                        <Dropdown.Header className="dropdown-header dropdown-header-me-1">حسب المقاسات:</Dropdown.Header>
                                        <Dropdown.Item as="div" className="dropdown-item dropdown-item-me-1" eventKey="option-1">
                                            <div className='row row-cols-1 row-cols-md-3 '>
                                                {
                                                    sizes.map(size => {
                                                        return (
                                                            <div key={size.id} className='col'>
                                                                <input className="form-check-input form-check-input-filter" type="checkbox" name="checkbox-type-filter"
                                                                    id={"typeCheckbox" + size.id} value={size.name}
                                                                    onChange={(event) => changeSizes(event)}
                                                                />
                                                                <label className="form-check-label" htmlFor={"typeCheckbox" + size.id}>{size.name}</label>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>

                                        </Dropdown.Item>
                                    </>
                                ) : (<></>)
                            }

                        </DropdownButton>

                        <span className='seperate-filter-buttons'>
                            |
                        </span>

                        {/* Dropdown 2 */}
                        <DropdownButton
                            align="end"
                            variant="light"
                            title={
                                <span>
                                    <i className="bi bi-arrow-down-up m-1 drop-icon"></i>
                                    <span className='drop-label'>
                                        {(selectedFilterDropdown2 === 'recently') ? 'الأحدث'
                                            : (selectedFilterDropdown2 === 'most-likes') ? 'الأكثر إعجاباً'
                                                : (selectedFilterDropdown2 === 'low-to-high') ? 'السعر: من الأرخص إلى الأغلى'
                                                    : (selectedFilterDropdown2 === 'high-to-low') ? 'السعر: من الأغلى إلى الأرخص'
                                                        : 'error'
                                        }
                                    </span>
                                </span>
                            }
                            id="dropdown-variant-light"
                            className='btn drop-button'
                            onSelect={selectDropdown2}
                        >
                            <Dropdown.Header className="dropdown-header dropdown-header-me-2">ترتيب حسب</Dropdown.Header>
                            <Dropdown.Item className="dropdown-item dropdown-item-me-2" eventKey="recently">الأحدث</Dropdown.Item>
                            <Dropdown.Item className="dropdown-item dropdown-item-me-2" eventKey="most-likes">الأكثر إعجاباً</Dropdown.Item>
                            <Dropdown.Item className="dropdown-item dropdown-item-me-2" eventKey="low-to-high">السعر: من الأرخص إلى الأغلى</Dropdown.Item>
                            <Dropdown.Item className="dropdown-item dropdown-item-me-2" eventKey="high-to-low">السعر: من الأغلى إلى الأرخص</Dropdown.Item>
                        </DropdownButton>

                    </div>



                </div>
                <div className='seperate-line'></div>
            </div>
        </div>

    )
}
export default FilterItems;

