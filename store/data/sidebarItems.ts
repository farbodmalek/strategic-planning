export default [
    [
        {
            id: 4,
            label: 'مدیریت اطلاعات پایه',
            // url: "/Users",
            icon: 'pi pi-th-large',
            img: "/icons/icon1.svg",
            color: '#63FFB4',
            subMenu: [
                {
                    id: 1,
                    label: ' تقسیمات کشوری ',
                    icon: 'pi pi-th-large',
                    img: "/icons/icon6.svg",
                    color: '#D38CFF',
                    subMenu: [
                        {
                            id: 1,
                            label: 'اطلاعات استان',
                            url: "/infrastructure-management/country-divisions/add-province",
                            icon: 'pi pi-th-large',
                            img: "/icons/icon19.svg",
                            color: '#FFF846',
                        },
                        {
                            id: 2,
                            label: 'اطلاعات شهرستان',
                            url: "/infrastructure-management/country-divisions/add-city",
                            icon: 'pi pi-th-large',
                            img: "/icons/icon20.svg",
                            color: '#FFF846',
                        },
                        {
                            id: 3,
                            label: 'اطلاعات بخش',
                            url: "/infrastructure-management/country-divisions/add-district",
                            icon: 'pi pi-th-large',
                            img: "/icons/icon21.svg",
                            color: '#FFF846',
                        },
                        {
                            id: 4,
                            label: 'اطلاعات دهستان',
                            url: "/infrastructure-management/country-divisions/add-village",
                            icon: 'pi pi-th-large',
                            img: "/icons/icon19.svg",
                            color: '#FFF846',
                        },
                        {
                            id: 5,
                            label: 'اطلاعات آبادی',
                            url: "/infrastructure-management/country-divisions/add-hamlet",
                            icon: 'pi pi-th-large',
                            img: "/icons/icon21.svg",
                            color: '#FFF846',
                        },
                    ]
                },
                {
                    id: 2,
                    label: ' اطلاعات زیرساخت ',
                    url: "/infrastructure-management/infrastructure-info",
                    icon: 'pi pi-th-large',
                    img: "/icons/icon5.svg",
                    color: '#D38CFF',
                },
                {
                    id: 3,
                    label: 'اطلاعات کسب و کار',
                    url: "/infrastructure-management/business-info",
                    icon: 'pi pi-th-large',
                    img: "/icons/icon7.svg",
                    color: '#D38CFF',
                },
                {
                    id: 3,
                    label: 'شناسنامه روستا',
                    url: "/infrastructure-management/village-certificate",
                    icon: 'pi pi-th-large',
                    img: "/icons/icon8.svg",
                    color: '#D38CFF',
                },
                {
                    id: 3,
                    label: 'ثبت اطلاعات ساکنین روستا',
                    url: "/infrastructure-management/population-info",
                    icon: 'pi pi-th-large',
                    img: "/icons/icon9.svg",
                    color: '#D38CFF',
                },
                {
                    id: 3,
                    label: 'درخواست تسهیلات ساکنین',
                    url: "/infrastructure-management/request-facilities",
                    icon: 'pi pi-th-large',
                    img: "/icons/icon7.svg",
                    color: '#D38CFF',
                },
                {
                    id: 4,
                    label: 'طرح های کاندیدی',
                    url: "/infrastructure-management/candidate-designs",
                    icon: 'pi pi-th-large',
                    img: "/icons/icon5.svg",
                    color: '#D38CFF',
                },
            ]
        },
        {
            id: 5,
            label: 'طرح های راهبردی',
            icon: 'pi pi-desktop',
            img: "/icons/icon2.svg",
            color: '#63FFB4',
            subMenu: [
                {
                    id: 1,
                    label: '  ثبت اولیه طرح های راهبردی',
                    url: "",
                    icon: 'pi pi-desktop',
                    img: "/icons/icon10.svg",
                    color: '#D38CFF',
                },
                {
                    id: 1,
                    label: 'نظارت ',
                    url: "",
                    icon: 'pi pi-desktop',
                    img: "/icons/icon11.svg",
                    color: '#D38CFF',
                },
                {
                    id: 1,
                    label: 'وضعیت طرح های راهبردی ',
                    url: "",
                    icon: 'pi pi-desktop',
                    img: "/icons/icon12.svg",
                    color: '#D38CFF',
                },
            ]
        },
        {
            id: 6,
            label: 'گزارش گیری',
            icon: 'pi pi-desktop',
            img: "/icons/icon3.svg",
            color: '#63FFB4',
            subMenu: [
                {
                    id: 2,
                    label: "داشبورد ",
                    url: "/Dashboard",
                    icon: 'pi pi-th-large',
                    img: "/icons/icon13.svg",
                    color: '#D38CFF',
                },
                {
                    id: 1,
                    label: 'گزارشات پایه',
                    url: "/reports",
                    icon: 'pi pi-desktop',
                    img: "/icons/icon14.svg",
                    color: '#D38CFF',
                },
            ]
        },
        {
            id: 3,
            label: 'امکانات عمومی',
            // url: "/Users",
            icon: 'pi pi-th-large',
            img: "/icons/icon4.svg",
            color: '#63FFB4',
            subMenu: [
                {
                    id: 1,
                    label: '  مدیریت اطلاعات کاربران',
                    icon: 'pi pi-th-large',
                    img: "/icons/icon15.svg",
                    color: '#D38CFF',
                    subMenu: [
                        {
                            id: 1,
                            label: '  مدیریت گروه های کاربران',
                            url: "/users-managment/user-groups",
                            icon: 'pi pi-th-large',
                            img: "/icons/icon22.svg",
                            color: '#FFF846',
                        },
                        {
                            id: 1,
                            label: 'لیست کاربران ',
                            url: "/users-managment/listUsers",
                            icon: 'pi pi-th-large',
                            img: "/icons/icon23.svg",
                            color: '#FFF846',
                        },
                    ]
                },
                {
                    id: 2,
                    label: 'مدیریت تیکتینگ',
                    url: "/users-managment/listUsers",
                    icon: 'pi pi-th-large',
                    img: "/icons/icon16.svg",
                    color: '#D38CFF',
                },
                {
                    id: 1,
                    label: '  مدیریت فایل ',
                    icon: 'pi pi-th-large',
                    img: "/icons/icon17.svg",
                    color: '#D38CFF',
                    subMenu: [
                        {
                            id: 1,
                            label: ' بارگزاری',
                            url: "/users-managment/user-groups",
                            icon: 'pi pi-th-large',
                            img: "/icons/icon28.svg",
                            color: '#FFF846',
                        },
                        {
                            id: 2,
                            label: 'مشاهده و دانلود ',
                            url: "/users-managment/listUsers",
                            icon: 'pi pi-th-large',
                            img: "/icons/icon27.svg",
                            color: '#FFF846',
                        },
                        {
                            id: 3,
                            label: ' تیکتینگ',
                            url: "/users-managment/listUsers",
                            icon: 'pi pi-th-large',
                            img: "/icons/icon26.svg",
                            color: '#FFF846',
                        },
                    ]
                },
                {
                    id: 1,
                    label: 'اخبار ',
                    icon: 'pi pi-th-large',
                    img: "/icons/icon18.svg",
                    color: '#D38CFF',
                    subMenu: [
                        {
                            id: 1,
                            label: ' بارگزاری خبر',
                            url: "/content-managment/add",
                            icon: 'pi pi-th-large',
                            img: "/icons/icon24.svg",
                            color: '#FFF846',
                        },
                        {
                            id: 2,
                            label: 'بارگزاری سند ',
                            url: "",
                            icon: 'pi pi-th-large',
                            img: "/icons/icon25.svg",
                            color: '#FFF846',
                        },
                    ]
                },
            ]
        },
    ]
];
