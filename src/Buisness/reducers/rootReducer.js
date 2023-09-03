import { useState } from 'react';

// shop photos
import BuisnessPicture from '../images/NewMoon.jpg';
import NewMoon from '../images/NewMoon.jpg';
import Cranshy from '../../components/photo/cranshe.jpg';
import Gusto from '../../components/photo/Gosto.jpg';
import She from '../../components/photo/she.jpg';
import Bordo from '../../components/photo/bordo.jpg';


// profile photos :
import Jewel from '../images/Jewel.jpg';
import Meery from '../images/Meery.jpg';
import Mary from '../images/Jewel.jpg';
import Laith from '../images/Meery.jpg';

// Clothes photo
import Dr1 from '../../components/photo/dr1.jpg';
import Dr2 from '../../components/photo/dr2.jpg';
import Dr3 from '../../components/photo/dr3.jpg';

// item photos :

//      Crispy
import Crispy1 from '../images/Food/Chicken/Crispy1.jpg';
import Crispy2 from '../images/Food/Chicken/Crispy2.jpg';
import Crispy3 from '../images/Food/Chicken/Crispy3.jpg';
//      Hamburger
import Hamburger1 from '../images/Food/Hamburger/Hamburger1.jpg';
import Hamburger2 from '../images/Food/Hamburger/Hamburger2.jpg';
import Hamburger3 from '../images/Food/Hamburger/Hamburger3.jpeg';
//      Kabab
import Kabab1 from '../images/Food/Kabab/Kabab1.jpg';
import Kabab2 from '../images/Food/Kabab/Kabab2.jpg';
import Kabab3 from '../images/Food/Kabab/Kabab3.jpg';
//      Pizza
import Pizza1 from '../images/Food/Pizza/Pizza1.jpg';
import Pizza2 from '../images/Food/Pizza/Pizza2.jpg';
import Pizza3 from '../images/Food/Pizza/Pizza3.jpg';
import Pizza4 from '../images/Food/Pizza/Pizza4.jpeg';
import Pizza5 from '../images/Food/Pizza/Pizza5.jpg';
import Pizza6 from '../images/Food/Pizza/Pizza6.jpg';
//      Salad
import Salad1 from '../images/Food/Salad/Salad1.jpg';
import Salad2 from '../images/Food/Salad/Salad2.jpg';
import Salad3 from '../images/Food/Salad/Salad3.jpg';
//      Shawarma
import Shawarma1 from '../images/Food/Shawarma/Shawarma1.jpg';
import Shawarma2 from '../images/Food/Shawarma/Shawarma2.jpg';
import Shawarma3 from '../images/Food/Shawarma/Shawarma3.jpg';
import Shawarma4 from '../images/Food/Shawarma/Shawarma4.jpg';
//      Falafel
import Falafel1 from '../images/Food/Falafel/Falafel1.jpg';
import Falafel2 from '../images/Food/Falafel/Falafel2.jpg';
import Falafel3 from '../images/Food/Falafel/Falafel3.jpg';
import Falafel4 from '../images/Food/Falafel/Falafel4.png';


const initState = {

    clientUser: {

    },

    // Buisness Profile Data
    buisnessProfile: {
        WorkId: 1,
        WorkName: '...',
        WorkType: 'جاري التحميل..', // ألبسة مطاعم
        openOrclose: 'مفتوح الآن',
        workTime: [{}],
        workLocation: '...',
        long: 0,
        lati: 0,
        workNumber: '...',
        WorkTypeId: 1,
        workMail: '...',
        workPassword: '........',
        workConPassword: '........',
        workDescription: '',
        workPicture: 'http://tajwal2.herokuapp.com/image_0ljq1zms6j.png',
        showComment: true,
        nFollowers: '...',
        nProducts: '...',
        nRaters: '...',
    },
    // online user
    // onlineUser: initState.buisnessProfile,
    userType: 'Buisness', // Buisness Or Client


    // Clothes item
    clothesItems: [
        {
            itemId: 1,
            itemStoreName: 'Zara',
            itemStorePicture: BuisnessPicture,
            itemName: 'بيجاما',
            itemPhotos: [Dr3, Dr3, Dr3],
            itemCategory: 'بجامات',
            itemType: 'نسواني',
            itemSizes: ['S', 'XS', 'M'],
            itemText: 'بيجاما صيفية مميزة .. وموجود ألوان مختلفة و بسعر مناسب و قماشة رائعة ومريحة',
            itemPrice: '55500',
            itemRate: 4.5,
            itemLikes: 50,
            itemDislikes: 20,
            itemComments: 10,
            itemDate: 'Mar 10 2022 10:00:00 AM',
            itemCommentsDetails: [
                {
                    id: 1,
                    clientName: 'جويل الياس',
                    clientPhoto: Jewel,
                    date: '27/11/2021',
                    text: 'مصنوعة بجودة عالية و سماكة ممتازة للبرد الشديد مصنوعة بجودة عالية و سماكة ممتازة للبرد الشديد مصنوعة بجودة عالية و سماكة ممتازة للبرد الشديد مصنوعة بجودة عالية و سماكة ممتازة للبرد الشديد',
                    repliesVisibility: false,
                    replies: [
                        {
                            id: 1,
                            name: 'New Moon',
                            photo: BuisnessPicture,
                            date: '28/11/2021',
                            text: 'شكرا لدعمكم .. منتمنى دائما نكون عند حسن ظنك'
                        },
                        {
                            id: 2,
                            name: 'جويل الياس',
                            photo: Jewel,
                            date: '28/11/2021',
                            text: 'الله يعطيكن العافية'
                        }
                    ]
                },
                {
                    id: 2,
                    clientName: 'ميري عوض',
                    clientPhoto: Jewel,
                    date: '27/11/2021',
                    text: 'مصنوعة بجودة عالية و سماكة ممتازة للبرد الشديد مصنوعة بجودة عالية و سماكة ممتازة للبرد الشديد مصنوعة بجودة عالية و سماكة ممتازة للبرد الشديد مصنوعة بجودة عالية و سماكة ممتازة للبرد الشديد',
                    repliesVisibility: false,
                    replies: []
                },
            ]
        },
        {
            itemId: 2,
            itemStoreName: 'Zara',
            itemStorePicture: BuisnessPicture,
            itemName: 'كنزة',
            itemPhotos: [Dr2, Dr2, Dr2],
            itemCategory: 'كنزات',
            itemType: 'نسواني',
            itemSizes: ['S', 'XS', 'M', 'XL'],
            itemText: 'كنزة شتوية نسوانية مريحة ويوجد منها ألوان متعددة بأقمشة مميزة لا تجدونها إلا لدينا',
            itemPrice: '25500',
            itemRate: 3.5,
            itemLikes: 50,
            itemDislikes: 20,
            itemComments: 10,
            itemDate: 'Mar 10 2022 10:00:00 AM',
            itemCommentsDetails: [
                {
                    id: 1,
                    clientName: 'جويل الياس',
                    clientPhoto: Jewel,
                    date: '27/11/2021',
                    text: 'مصنوعة بجودة عالية و سماكة ممتازة للبرد الشديد مصنوعة بجودة عالية و سماكة ممتازة للبرد الشديد مصنوعة بجودة عالية و سماكة ممتازة للبرد الشديد مصنوعة بجودة عالية و سماكة ممتازة للبرد الشديد',
                    repliesVisibility: false,
                    replies: [
                        {
                            id: 1,
                            name: 'New Moon',
                            photo: BuisnessPicture,
                            date: '28/11/2021',
                            text: 'شكرا لدعمكم .. منتمنى دائما نكون عند حسن ظنك'
                        },
                        {
                            id: 2,
                            name: 'جويل الياس',
                            photo: Jewel,
                            date: '28/11/2021',
                            text: 'الله يعطيكن العافية'
                        }
                    ]
                },
            ]
        }
    ],

    // Clothes filter by
    filtersClothes: [
        {
            filterId: 'filter-by-id1',
            filterType: 'الكل'
        },
        {
            filterId: 'filter-by-id2',
            filterType: 'بناطلين'
        },
        {
            filterId: 'filter-by-id3',
            filterType: 'جينز'
        },
        {
            filterId: 'filter-by-id4',
            filterType: 'كنزات'
        },
        {
            filterId: 'filter-by-id5',
            filterType: 'قمصان'
        },
        {
            filterId: 'filter-by-id6',
            filterType: 'جواكيت'
        },
        {
            filterId: 'filter-by-id7',
            filterType: 'فساتين'
        },
        {
            filterId: 'filter-by-id8',
            filterType: 'بجامات'
        },
        {
            filterId: 'filter-by-id9',
            filterType: 'شالات'
        },
        {
            filterId: 'filter-by-id10',
            filterType: 'حقائب'
        },
    ],

    // Clothes Types
    clothesTypes: [
        { typeId: 1, typeName: 'رجالي' },
        { typeId: 2, typeName: 'نسواني' },
        { typeId: 3, typeName: 'ولادي' },
    ],

    // Clothes Sizes
    clothesSizes: [
        { sizeId: 1, sizeName: 'XS' },
        { sizeId: 2, sizeName: 'S' },
        { sizeId: 3, sizeName: 'M' },
        { sizeId: 4, sizeName: 'L' },
        { sizeId: 5, sizeName: 'XL' },
        { sizeId: 6, sizeName: 'XXL' },
        { sizeId: 7, sizeName: 'XXXL' },
    ],

    // Buisness Products
    items: [{}],


    // Filter By
    filters: [
        {
            filterId: 'filter-by-id1',
            filterType: 'الكل'
        },
        {
            filterId: 'filter-by-id2',
            filterType: 'وجبات'
        },
        {
            filterId: 'filter-by-id3',
            filterType: 'سندويش'
        },
        {
            filterId: 'filter-by-id4',
            filterType: 'مشروبات'
        },
    ],

    // Restaurant Types
    restaurantTypes: [
        { typeId: 1, typeName: 'نباتي' },
        { typeId: 2, typeName: 'حيواني' },
    ],

    // Temporary Notifications
    notifications: [
        {
            notificationId: 1,
            notificationType: 'rate',
            notificationDate: 'just now',
            notificationProduct: 'هامبرغر',
            notificationClients: [
                {
                    name: 'جويل الياس',
                    photo: Jewel
                }, {
                    name: 'ميري عوض',
                    photo: Meery
                }, {
                    name: 'جويل الياس',
                    photo: Jewel
                }, {
                    name: 'ميري عوض',
                    photo: Meery
                }],
            notificationPhoto: Hamburger1
        },
        {
            notificationId: 2,
            notificationType: 'comment',
            notificationDate: '2h 14m',
            notificationProduct: 'كريسبي',
            notificationClients: [{
                name: 'ميري عوض',
                photo: Meery
            }, {
                name: 'جويل الياس',
                photo: Jewel
            }, {
                name: 'ميري عوض',
                photo: Meery
            }, {
                name: 'جويل الياس',
                photo: Jewel
            }],
            notificationPhoto: Crispy1
        },
        {
            notificationId: 3,
            notificationType: 'rate',
            notificationDate: '4h 36m',
            notificationProduct: 'شاورما',
            notificationClients: [
                {
                    name: 'جويل الياس',
                    photo: Jewel
                }, {
                    name: 'ميري عوض',
                    photo: Meery
                }, {
                    name: 'جويل الياس',
                    photo: Jewel
                }, {
                    name: 'ميري عوض',
                    photo: Meery
                }],
            notificationPhoto: Shawarma1
        },
        {
            notificationId: 4,
            notificationType: 'comment',
            notificationDate: '4h 36m',
            notificationProduct: 'هامبرغر',
            notificationClients: [{
                name: 'ميري عوض',
                photo: Meery
            }, {
                name: 'جويل الياس',
                photo: Jewel
            }, {
                name: 'ميري عوض',
                photo: Meery
            }, {
                name: 'جويل الياس',
                photo: Jewel
            }],
            notificationPhoto: Hamburger1
        },
        {
            notificationId: 5,
            notificationType: 'rate',
            notificationDate: '4h 36m',
            notificationProduct: 'سلطة',
            notificationClients: [
                {
                    name: 'جويل الياس',
                    photo: Jewel
                }, {
                    name: 'ميري عوض',
                    photo: Meery
                }, {
                    name: 'جويل الياس',
                    photo: Jewel
                }, {
                    name: 'ميري عوض',
                    photo: Meery
                }],
            notificationPhoto: Salad1
        },
        {
            notificationId: 6,
            notificationType: 'comment',
            notificationDate: '4h 36m',
            notificationProduct: 'كريسبي',
            notificationClients: [{
                name: 'ميري عوض',
                photo: Meery
            }, {
                name: 'جويل الياس',
                photo: Jewel
            }, {
                name: 'ميري عوض',
                photo: Meery
            }, {
                name: 'جويل الياس',
                photo: Jewel
            }],
            notificationPhoto: Crispy1
        },
    ],

    notificationsForClient: [
        {
            notificationId: 1,
            notificationType: 'post',
            notificationDate: 'just now',
            notificationProduct: 'هامبرغر',
            notificationShop: {
                name: 'New Moon',
                photo: NewMoon
            },
            notificationPhoto: Hamburger1
        },
        {
            notificationId: 2,
            notificationType: 'reply',
            notificationDate: '2h 14m',
            notificationProduct: 'كريسبي',
            notificationShop: {
                name: 'Gusto',
                photo: Gusto
            },
            notificationPhoto: Crispy1
        },
        {
            notificationId: 3,
            notificationType: 'post',
            notificationDate: '4h 36m',
            notificationProduct: 'فستان',
            notificationShop: {
                name: 'She',
                photo: She
            },
            notificationPhoto: Dr1
        },
        {
            notificationId: 4,
            notificationType: 'reply',
            notificationDate: '4h 36m',
            notificationProduct: 'هامبرغر',
            notificationShop: {
                name: 'Cranshy',
                photo: Cranshy
            },
            notificationPhoto: Hamburger1
        },
        {
            notificationId: 5,
            notificationType: 'post',
            notificationDate: '4h 36m',
            notificationProduct: 'سلطة',
            notificationShop: {
                name: 'Bordo',
                photo: Bordo
            },
            notificationPhoto: Salad1
        },
        {
            notificationId: 6,
            notificationType: 'reply',
            notificationDate: '4h 36m',
            notificationProduct: 'كريسبي',
            notificationShop: {
                name: 'Bordo',
                photo: Bordo
            },
            notificationPhoto: Crispy1
        },
    ],

    // feedbacks Or complains
    feedbacks: [
        {
            id: 1,
            text: 'الأكل جدا سيء والخدمة مو منيحة',
            date: '28/11/2021'
        },
        {
            id: 2,
            text: 'الوجبات باردة و التوابل قليلة',
            date: '10/11/2021'
        },
        {
            id: 3,
            text: 'بطيئييين كتير بتحضير الاكل',
            date: '18/10/2021'
        },
        {
            id: 4,
            text: 'خففو حر بالشاورما بتحرق',
            date: '28/09/2021'
        },
        {
            id: 5,
            text: 'الوجبات باردة و التوابل قليلة',
            date: '10/08/2021'
        },
        {
            id: 6,
            text: 'الوجبات باردة و التوابل قليلة',
            date: '24/07/2021'
        },
        {
            id: 7,
            text: 'الوجبات باردة و التوابل قليلة',
            date: '28/11/2020'
        },
    ],

    // Work hours and days
    workSchedule: [
        {
            day: 'السّبت',
            opened: 'مغلق',
            timeFrom: 'undefined',
            timeTo: 'undefined',
            timeMsFrom: 0,
            timeMsTo: 0,
            dayId: 'day1',
            timePickerFromId: 'from1',
            timePickerToId: 'to1',
            toggleId: 'toggle1',
            timePickerId: 'time1',
            openOrclose: 'close'
        },
        {
            day: 'الأحد',
            opened: 'مغلق',
            timeFrom: 'undefined',
            timeTo: 'undefined',
            timeMsFrom: 0,
            timeMsTo: 0,
            dayId: 'day2',
            timePickerFromId: 'from2',
            timePickerToId: 'to2',
            toggleId: 'toggle2',
            timePickerId: 'time2',
            openOrclose: 'close'
        },
        {
            day: 'الاثنين',
            opened: 'مغلق',
            timeFrom: 'undefined',
            timeTo: 'undefined',
            timeMsFrom: 0,
            timeMsTo: 0,
            dayId: 'day3',
            timePickerFromId: 'from3',
            timePickerToId: 'to3',
            toggleId: 'toggle3',
            timePickerId: 'time3',
            openOrclose: 'close'
        },
        {
            day: 'الثّلاثاء',
            opened: 'مغلق',
            timeFrom: 'undefined',
            timeTo: 'undefined',
            timeMsFrom: 0,
            timeMsTo: 0,
            dayId: 'day4',
            timePickerFromId: 'from4',
            timePickerToId: 'to4',
            toggleId: 'toggle4',
            timePickerId: 'time4',
            openOrclose: 'close'
        },
        {
            day: 'الأربعاء',
            opened: 'مغلق',
            timeFrom: 'undefined',
            timeTo: 'undefined',
            timeMsFrom: 0,
            timeMsTo: 0,
            dayId: 'day5',
            timePickerFromId: 'from5',
            timePickerToId: 'to5',
            toggleId: 'toggle5',
            timePickerId: 'time5',
            openOrclose: 'close'
        },
        {
            day: 'الخميس',
            opened: 'مغلق',
            timeFrom: 'undefined',
            timeTo: 'undefined',
            timeMsFrom: 0,
            timeMsTo: 0,
            dayId: 'day6',
            timePickerFromId: 'from6',
            timePickerToId: 'to6',
            toggleId: 'toggle6',
            timePickerId: 'time6',
            openOrclose: 'close'
        },
        {
            day: 'الجمعة',
            opened: 'مغلق',
            timeFrom: 'undefined',
            timeTo: 'undefined',
            timeMsFrom: 0,
            timeMsTo: 0,
            dayId: 'day7',
            timePickerFromId: 'from7',
            timePickerToId: 'to7',
            toggleId: 'toggle7',
            timePickerId: 'time7',
            openOrclose: 'close'
        }
    ],

    // Add item 
    addedItem: {
        itemId: 8,
        itemStoreName: 'New Moon',
        itemStorePicture: BuisnessPicture,
        itemName: '',
        itemPhotos: [],
        itemCategory: '',
        itemType: '',
        itemText: '',
        itemPrice: '',
        itemLikes: 83,
        itemDislikes: 10,
        itemComments: 56,
        itemDate: 'Mar 10 2022 10:00:00 AM',
        itemCommentsDetails: [
            {
                commentNumber: 0,
                id: 1,
                clientName: 'جويل الياس',
                clientPhoto: Jewel,
                date: '27/11/2021',
                text: 'أكل جدا طيب و مكونات رائعة و خدمة ممتازة,أكل جدا طيب و مكونات رائعة و خدمة ممتازة,أكل جدا طيب و مكونات رائعة و خدمة ممتازة,أكل جدا طيب و مكونات رائعة و خدمة ممتازة,',
                replies: []
            },
            {
                id: 2,
                clientName: 'ميري عوض',
                clientPhoto: Jewel,
                date: '27/11/2021',
                text: 'أكل جدا طيب و مكونات رائعة و خدمة ممتازة,أكل جدا طيب و مكونات رائعة و خدمة ممتازة,أكل جدا طيب و مكونات رائعة و خدمة ممتازة,أكل جدا طيب و مكونات رائعة و خدمة ممتازة,',
                replies: []
            },
        ]
    },
    clothesAddedItem: {
        itemId: 8,
        itemStoreName: 'New Moon',
        itemStorePicture: BuisnessPicture,
        itemName: '',
        itemPhotos: [],
        itemCategory: '',
        itemType: '',
        itemSizes: [],
        itemText: '',
        itemPrice: '',
        itemLikes: 83,
        itemDislikes: 10,
        itemComments: 56,
        itemDate: 'Mar 10 2022 10:00:00 AM',
        itemCommentsDetails: [
            {
                commentNumber: 0,
                id: 1,
                clientName: 'جويل الياس',
                clientPhoto: Jewel,
                date: '27/11/2021',
                text: 'أكل جدا طيب و مكونات رائعة و خدمة ممتازة,أكل جدا طيب و مكونات رائعة و خدمة ممتازة,أكل جدا طيب و مكونات رائعة و خدمة ممتازة,أكل جدا طيب و مكونات رائعة و خدمة ممتازة,',
                replies: []
            },
            {
                id: 2,
                clientName: 'ميري عوض',
                clientPhoto: Jewel,
                date: '27/11/2021',
                text: 'أكل جدا طيب و مكونات رائعة و خدمة ممتازة,أكل جدا طيب و مكونات رائعة و خدمة ممتازة,أكل جدا طيب و مكونات رائعة و خدمة ممتازة,أكل جدا طيب و مكونات رائعة و خدمة ممتازة,',
                replies: []
            },
        ]
    },
    similarFood: [
        {
            id: 1,
            name: 'بيتزا مارغريتا',
            photo: Pizza1
        },
        {
            id: 2,
            name: 'بيتزا مارينا',
            photo: Pizza2
        },
        {
            id: 3,
            name: 'بيتزا عائلية',
            photo: Pizza3
        },
        {
            id: 4,
            name: 'بيتزا طوشكا',
            photo: Pizza4
        },
        {
            id: 5,
            name: 'بيتزا قشقوان',
            photo: Pizza5
        },
        {
            id: 6,
            name: 'بيتزا سجق',
            photo: Pizza6
        }
    ],

    // use Between

    useSharingFilters: () => {
        // current selected category (single selected)
        const [selectedCategory, setSelectedCategory] = useState('الكل');
        // current selected filter 
        const [selectedFilterDropdown1, setSelectedFilterDropdown1] = useState({ type: [], minPrice: '0', maxPrice: '35000' });
        const [selectedFilterDropdown2, setSelectedFilterDropdown2] = useState('most-likes');
        const [selectedSizes, setSelectedSizes] = useState([]);

        // Access Token
        const [accessToken, setAccessToken] = useState('');

        // User Type
        const [userType, setUserType] = useState('business');

        // Business Profile
        const [buisnessProfile, setBuisnessProfile] = useState(initState.buisnessProfile);

        // Products or Items
        const [items, setItems] = useState(initState.items);

        // Work Schedule
        const [workSchedule, setWorkSchedule] = useState(initState.workSchedule);

        // Buisness work type
        const [businessWorkType, setBusinessWorkType] = useState('جاري التحميل...');

        // Business Me (current business)
        const [businessMe, setBusinessMe] = useState({});

        // Buisness Types
        const [buisnessTypes, setBuisnessTypes] = useState([{ _id: 'tmpIdBusinessType', name: 'جاري التحميل..' }]);


        const [oldfeedbackslength, setOldfeedbackslength] = useState(0);
        const [sizes, setSizes] = useState([
            { id: 1, name: 'XS' }, { id: 2, name: 'S' }, { id: 3, name: 'M' }, { id: 4, name: 'L' }, { id: 5, name: 'XL' },
            { id: 6, name: 'XXL' }, { id: 7, name: 'XXXL' },
        ])

        // Types up in filter
        // **ATTENTION::::REVERSED with categoriesDropdown**
        const [TypesUp, setTypesUp] = useState([]);

        // Categories in dropdown filter
        // **ATTENTION::::REVERSED with TypesUp**
        const [categoriesDropdown, setCategoriesDropdown] = useState([{ id: 'filter-by-id1', name: 'الكل', busTypeId: '1' }]);

        // Today Buisness work time
        const [todayWork, setTodayWork] = useState('مغلق اليوم');

        const [feedbacks, setFeedbacks] = useState([]);
        const [newFeedNumber, setNewFeedNumber] = useState(0);
        const [oldFeed, setOldFeed] = useState(0);

        const [flagDeleteItem, setFlagDeleteItem] = useState(false);

        const [workTypeId, setWorkTypeId] = useState('');
        const [deletedItem, setDeletedItem] = useState(false);
        const [flagEditProfileBusi, setFlagEditProfileBusi] = useState(false);
        const [addedPhotos, setAddedPhotos] = useState(false);

        // Add Item
        const [itemName, setItemName] = useState('');
        const [itemPhotos, setItemPhotos] = useState([]);
        const [imagesFormData, setImagesFormData] = useState([]);
        const [itemCategory, setItemCategory] = useState('');
        const [itemType, setItemType] = useState('');
        const [itemCategoryId, setItemCategoryId] = useState('');
        const [itemTypeId, setItemTypeId] = useState('');
        const [itemSizes, setItemSizes] = useState([]);
        const [itemText, setItemText] = useState('');
        const [itemPrice, setItemPrice] = useState('');
        const [item, setItem] = useState({});
        const [signUpWelcome, setSignUpWelcome] = useState('اكتشف الأماكن و قُم بالتسوّق و التجوّل من المنزل بكلّ بساطة.');

        return {
            selectedCategory, setSelectedCategory,
            selectedFilterDropdown1, setSelectedFilterDropdown1,
            selectedFilterDropdown2, setSelectedFilterDropdown2,
            itemName, setItemName,
            itemPhotos, setItemPhotos,
            itemCategory, setItemCategory,
            itemType, setItemType,
            itemCategoryId, setItemCategoryId,
            itemTypeId, setItemTypeId,
            itemSizes, setItemSizes,
            itemText, setItemText,
            itemPrice, setItemPrice,
            buisnessProfile, setBuisnessProfile,
            item, setItem,
            signUpWelcome, setSignUpWelcome,
            buisnessTypes, setBuisnessTypes,
            accessToken, setAccessToken,
            userType, setUserType,
            businessMe, setBusinessMe,
            todayWork, setTodayWork,
            items, setItems,
            workSchedule, setWorkSchedule,
            businessWorkType, setBusinessWorkType,
            TypesUp, setTypesUp,
            categoriesDropdown, setCategoriesDropdown,
            feedbacks, setFeedbacks,
            flagDeleteItem, setFlagDeleteItem,
            oldfeedbackslength, setOldfeedbackslength,
            workTypeId, setWorkTypeId,
            deletedItem, setDeletedItem,
            flagEditProfileBusi, setFlagEditProfileBusi,
            imagesFormData, setImagesFormData,
            newFeedNumber, setNewFeedNumber,
            oldFeed, setOldFeed,
            addedPhotos, setAddedPhotos,
            sizes, setSizes,
            selectedSizes, setSelectedSizes
        };
    },

}


const reducer = (state = initState, action) => {
    const newState = initState;

    if (action.type === 'edit-profile') {
        // perform edit profile data operation
        newState.buisnessProfile = action.state;
        return newState;
    }
    else if (action.type === 'edit-schedule') {
        // perform edit schedule data operation
        newState.workSchedule = action.state;
        return newState;
    }
    else if (action.type === 'add-new-item') {
        // add new item (product) by buisness
        if (newState.buisnessProfile.WorkType === 'مطعم')
            newState.items.push(action.state);
        else if (newState.buisnessProfile.WorkType === 'ملابس')
            newState.clothesItems.push(action.state);
        return newState;
    }
    else if (action.type === 'add-new-item-name') {
        // add new item (product) by buisness
        if (newState.buisnessProfile.WorkType === 'مطعم')
            newState.addedItem.itemName = action.state;
        else if (newState.buisnessProfile.WorkType === 'ملابس')
            newState.clothesAddedItem.itemName = action.state;
        return newState;
    }
    else if (action.type === 'add-new-item-price') {
        // add new item (product) by buisness
        if (newState.buisnessProfile.WorkType === 'مطعم')
            newState.addedItem.itemPrice = action.state;
        else if (newState.buisnessProfile.WorkType === 'ملابس')
            newState.clothesAddedItem.itemPrice = action.state;
        return newState;
    }
    else if (action.type === 'add-new-item-desc') {
        // add new item (product) by buisness
        if (newState.buisnessProfile.WorkType === 'مطعم')
            newState.addedItem.itemText = action.state;
        else if (newState.buisnessProfile.WorkType === 'ملابس')
            newState.clothesAddedItem.itemText = action.state;
        return newState;
    }
    else if (action.type === 'add-new-item-category') {
        // add new item (product) by buisness
        if (newState.buisnessProfile.WorkType === 'مطعم')
            newState.addedItem.itemCategory = action.state;
        else if (newState.buisnessProfile.WorkType === 'ملابس')
            newState.clothesAddedItem.itemCategory = action.state;
        return newState;
    }
    else if (action.type === 'add-new-item-type') {
        // add new item (product) by buisness
        if (newState.buisnessProfile.WorkType === 'مطعم')
            newState.addedItem.itemType = action.state;
        else if (newState.buisnessProfile.WorkType === 'ملابس')
            newState.clothesAddedItem.itemType = action.state;
        return newState;
    }
    else if (action.type === 'add-new-item-img') {
        // add new item (product) by buisness
        if (newState.buisnessProfile.WorkType === 'مطعم')
            newState.addedItem.itemPhotos.push(action.state);
        else if (newState.buisnessProfile.WorkType === 'ملابس')
            newState.clothesAddedItem.itemPhotos.push(action.state);
        return newState;
    }
    else if (action.type === 'delete-one-img-from-added-item') {
        // add new item (product) by buisness
        let tmp;
        if (newState.buisnessProfile.WorkType === 'مطعم') {
            tmp = newState.addedItem.itemPhotos.filter(function (value, index) {
                return (index !== action.state);
            });
            newState.addedItem.itemPhotos = tmp;

        }
        else if (newState.buisnessProfile.WorkType === 'ملابس') {
            tmp = newState.clothesAddedItem.itemPhotos.filter(function (value, index) {
                return (index !== action.state);
            });
            newState.clothesAddedItem.itemPhotos = tmp;
        }
        return newState;
    }
    else if (action.type === 'add-new-item-size') {
        // add new item (product) by buisness
        newState.clothesAddedItem.itemSizes.push(action.state);
        return newState;
    }
    else if (action.type === 'switch-replies-visibility') {
        // switch replies for selected comment
        if (newState.buisnessProfile.WorkType === 'مطعم')
            newState.items[action.state.itemId].itemCommentsDetails[action.state.commentId - 1].repliesVisibility = action.state.visibile;
        else if (newState.buisnessProfile.WorkType === 'ملابس')
            newState.clothesItems[action.state.itemId].itemCommentsDetails[action.state.commentId - 1].repliesVisibility = action.state.visibile;

        return newState;
    }
    else if (action.type === 'add-new-reply-btn') {
        // add new reply for selected comment
        if (newState.buisnessProfile.WorkType === 'مطعم')
            newState.items[action.state.itemId].itemCommentsDetails[action.state.commentId - 1].replies.push(action.state.newReply);
        else if (newState.buisnessProfile.WorkType === 'ملابس')
            newState.clothesItems[action.state.itemId].itemCommentsDetails[action.state.commentId - 1].replies.push(action.state.newReply);
        return newState;
    }
    else if (action.type === 'add-new-comment-btn') {
        // add new reply for selected comment
        if (newState.buisnessProfile.WorkType === 'مطعم')
            newState.items[action.state.itemId].itemCommentsDetails.push(action.state.newComment);
        else if (newState.buisnessProfile.WorkType === 'ملابس')
            newState.clothesItems[action.state.itemId].itemCommentsDetails.push(action.state.newComment);
        return newState;
    }
    else if (action.type === 'delete-item') {
        // delete an item (product) by buisness
        let newItems = [];
        if (newState.buisnessProfile.WorkType === 'مطعم') {
            for (let i = 0; i < newState.items.length; i++) {
                if (action.state !== i) {
                    newItems.push(newState.items[i])
                }
            }
            newState.items = newItems;
        }
        else if (newState.buisnessProfile.WorkType === 'ملابس') {
            for (let i = 0; i < newState.clothesItems.length; i++) {
                if (action.state !== i) {
                    newItems.push(newState.clothesItems[i])
                }
            }
            newState.clothesItems = newItems;
        }

        return newState;
    }
    else if (action.type === 'delete-comment') {
        // delete comment by buisness
        if (newState.buisnessProfile.WorkType === 'مطعم') {
            let lgth = newState.items[action.state.itemId].itemCommentsDetails.length;
            let tempCommentDetails = [];

            for (let i = 0; i < lgth; i++) {
                if (action.state.commentId !== i) {
                    tempCommentDetails.push(newState.items[action.state.itemId].itemCommentsDetails[i])
                }
            }
            newState.items[action.state.itemId].itemCommentsDetails = tempCommentDetails;
        }
        else if (newState.buisnessProfile.WorkType === 'ملابس') {
            let lgth = newState.clothesItems[action.state.itemId].itemCommentsDetails.length;
            let tempCommentDetails = [];

            for (let i = 0; i < lgth; i++) {
                if (action.state.commentId !== i) {
                    tempCommentDetails.push(newState.clothesItems[action.state.itemId].itemCommentsDetails[i])
                }
            }
            newState.clothesItems[action.state.itemId].itemCommentsDetails = tempCommentDetails;
        }
        return newState;

    }
    else if (action.type === 'delete-reply') {
        // delete reply by buisness
        if (newState.buisnessProfile.WorkType === 'مطعم') {
            let lgth = newState.items[action.state.itemId].itemCommentsDetails[action.state.commentId].replies.length;
            let tempReplies = [];

            for (let i = 0; i < lgth; i++) {
                if (action.state.replyId !== i) {
                    tempReplies.push(newState.items[action.state.itemId].itemCommentsDetails[action.state.commentId].replies[i])
                }
            }
            newState.items[action.state.itemId].itemCommentsDetails[action.state.commentId].replies = tempReplies;
        }
        else if (newState.buisnessProfile.WorkType === 'ملابس') {
            let lgth = newState.clothesItems[action.state.itemId].itemCommentsDetails[action.state.commentId].replies.length;
            let tempReplies = [];

            for (let i = 0; i < lgth; i++) {
                if (action.state.replyId !== i) {
                    tempReplies.push(newState.clothesItems[action.state.itemId].itemCommentsDetails[action.state.commentId].replies[i])
                }
            }
            newState.clothesItems[action.state.itemId].itemCommentsDetails[action.state.commentId].replies = tempReplies;
        }

        return newState;

    }
    else if (action.type === 'edit-item') {
        // edit item 
        if (newState.buisnessProfile.WorkType === 'مطعم') {
            newState.items[action.state.itemId] = action.state.value;
        }
        else if (newState.buisnessProfile.WorkType === 'ملابس') {
            newState.clothesItems[action.state.itemId] = action.state.value;
        }

        return newState;

    }
    else if (action.type === 'add-like') {
        // add like
        if (newState.buisnessProfile.WorkType === 'مطعم') {
            newState.items[action.state.itemId].itemLikes += 1;
        }
        else if (newState.buisnessProfile.WorkType === 'ملابس') {
            newState.clothesItems[action.state.itemId].itemLikes += 1;
        }

        return newState;
    }
    else if (action.type === 'add-dislike') {
        // add dislike 
        if (newState.buisnessProfile.WorkType === 'مطعم') {
            newState.items[action.state.itemId].itemDislikes += 1;
        }
        else if (newState.buisnessProfile.WorkType === 'ملابس') {
            newState.clothesItems[action.state.itemId].itemDislikes += 1;
        }

        return newState;
    }

    return state;
}
export default reducer;
