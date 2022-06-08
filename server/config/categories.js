/* eslint-disable indent */
const men = {
    id: "1",
    name: 'Men',
    children: [{
            id: "1045564",
            name: 'Jeans',
        },
        {
            id: "11",
            name: 'Jackets & Coats',
            children: [{
                    id: "2476613011",
                    name: 'Wool Coats',
                },
                {
                    id: "2476496011",
                    name: 'Fleece Jackets',
                },
                {
                    id: "2476604011",
                    name: 'Trench & Rain Coats',
                },
            ],
        },
        {
            id: "12",
            name: 'Shirts',
            children: [{
                    id: "1045630",
                    name: 'Casual Button-Down Shirts',
                },
                {
                    id: "1045626",
                    name: 'Dress Shirts',
                },
                {
                    id: "1045640",
                    name: 'Polos',
                },
            ],
        },
        {
            id: "13",
            name: 'Suits & Blazers',
            children: [{
                    id: "1045694",
                    name: 'Blazers',
                },
                {
                    id: "1045686",
                    name: 'Suits',
                },
                {
                    id: "2476514011",
                    name: 'Tuxedos',
                },
                {
                    id: "2476515011",
                    name: 'Vests',
                },
            ],
        },
    ],
};

const women = {
    id: "2",
    name: 'Women',
    children: [{
            id: "1048188",
            name: 'Jeans',
        },
        {
            id: "1258967011",
            name: 'Leggings',
        },
        {
            id: "21",
            name: 'Suits & Blazers',
            children: [{
                    id: "1045112",
                    name: 'Blazers',
                },
                {
                    id: "10344911011",
                    name: 'Suit Sets',
                },
            ],
        },
        {
            id: "22",
            name: 'Dresses',
            children: [{
                    id: "2346727011",
                    name: 'Casual',
                },
                {
                    id: "11006703011",
                    name: 'Cocktail',
                },
                {
                    id: "11006704011",
                    name: 'Formal',
                },
                {
                    id: "2346728011",
                    name: 'Work',
                },
            ],
        },
        {
            id: "23",
            name: 'Coats & Jackets ',
            children: [{
                    id: "12643253011",
                    name: 'Casual Jackets',
                },
                {
                    id: "7132357011",
                    name: 'Denim Jackets',
                },
                {
                    id: "12643250011",
                    name: 'Down Jackets & Parkas',
                },
                {
                    id: "7132359011",
                    name: 'Raincoats',
                },
                {
                    id: "7132360011",
                    name: 'Trench Coats ',
                },
            ],
        },
    ],
};

const accessories = {
    id: "3",
    name: 'Accessories',
    children: [{
            id: "31",
            name: 'Men',
            children: [{
                    id: "2474955011",
                    name: 'Neckties',
                },
                {
                    id: "2475895011",
                    name: 'Wallets',
                },
                {
                    id: "2474947011",
                    name: 'Belts',
                },
                {
                    id: "2474952011",
                    name: 'Scarves',
                },
                {
                    id: "2474995011",
                    name: 'Sunglasses',
                },
            ],
        },
        {
            id: "32",
            name: 'Women',
            children: [{
                    id: "2474940011",
                    name: 'Belts',
                },
                {
                    id: "2474963011",
                    name: 'Gloves',
                },
                {
                    id: "2478148011",
                    name: 'Mittens',
                },
                {
                    id: "2474982011",
                    name: 'Hats',
                },
                {
                    id: "2474943011",
                    name: 'Scarves',
                },
                {
                    id: "2474946011",
                    name: 'Wraps',
                },
                {
                    id: "2474971011",
                    name: 'Sunglasses',
                },
                {
                    id: "2475898011",
                    name: 'Wallets',
                },
                {
                    id: "6358544011",
                    name: 'Wrist Watches',
                },
            ],
        },
    ],
};

const all = {
    "id": "0",
    "name": "All",
    "children": [{
            "id": "1",
            "name": "Men",
            "children": [{
                    "id": "1045564",
                    "name": "Jeans"
                },
                {
                    "id": "11",
                    "name": "Jackets & Coats",
                    "children": [{
                            "id": "2476613011",
                            "name": "Wool Coats"
                        },
                        {
                            "id": "2476496011",
                            "name": "Fleece Jackets"
                        },
                        {
                            "id": "2476604011",
                            "name": "Trench & Rain Coats"
                        }
                    ]
                },
                {
                    "id": "12",
                    "name": "Shirts",
                    "children": [{
                            "id": "1045630",
                            "name": "Casual Button-Down Shirts"
                        },
                        {
                            "id": "1045626",
                            "name": "Dress Shirts"
                        },
                        {
                            "id": "1045640",
                            "name": "Polos"
                        }
                    ]
                },
                {
                    "id": "13",
                    "name": "Suits & Blazers",
                    "children": [{
                            "id": "1045694",
                            "name": "Blazers"
                        },
                        {
                            "id": "1045686",
                            "name": "Suits"
                        },
                        {
                            "id": "2476514011",
                            "name": "Tuxedos"
                        },
                        {
                            "id": "2476515011",
                            "name": "Vests"
                        }
                    ]
                }
            ],
        },
        {
            "id": "2",
            "name": "Women",
            "children": [{
                    "id": "1048188",
                    "name": "Jeans"
                },
                {
                    "id": "1258967011",
                    "name": "Leggings"
                },
                {
                    "id": "21",
                    "name": "Suits & Blazers",
                    "children": [{
                            "id": "1045112",
                            "name": "Blazers"
                        },
                        {
                            "id": "10344911011",
                            "name": "Suit Sets"
                        }
                    ]
                },
                {
                    "id": "22",
                    "name": "Dresses",
                    "children": [{
                            "id": "2346727011",
                            "name": "Casual"
                        },
                        {
                            "id": "11006703011",
                            "name": "Cocktail"
                        },
                        {
                            "id": "11006704011",
                            "name": "Formal"
                        },
                        {
                            "id": "2346728011",
                            "name": "Work"
                        }
                    ]
                },
                {
                    "id": "23",
                    "name": "Coats & Jackets ",
                    "children": [{
                            "id": "12643253011",
                            "name": "Casual Jackets"
                        },
                        {
                            "id": "7132357011",
                            "name": "Denim Jackets"
                        },
                        {
                            "id": "12643250011",
                            "name": "Down Jackets & Parkas"
                        },
                        {
                            "id": "7132359011",
                            "name": "Raincoats"
                        },
                        {
                            "id": "7132360011",
                            "name": "Trench Coats "
                        }
                    ]
                }
            ],
        }, {
            "id": "3",
            "name": "Accessories",
            "children": [{
                    "id": "31",
                    "name": "Men",
                    "children": [{
                            "id": "2474955011",
                            "name": "Neckties"
                        },
                        {
                            "id": "2475895011",
                            "name": "Wallets"
                        },
                        {
                            "id": "2474947011",
                            "name": "Belts"
                        },
                        {
                            "id": "2474952011",
                            "name": "Scarves"
                        },
                        {
                            "id": "2474995011",
                            "name": "Sunglasses"
                        }
                    ]
                },
                {
                    "id": "32",
                    "name": "Women",
                    "children": [{
                            "id": "2474940011",
                            "name": "Belts"
                        },
                        {
                            "id": "2474963011",
                            "name": "Gloves"
                        },
                        {
                            "id": "2478148011",
                            "name": "Mittens"
                        },
                        {
                            "id": "2474982011",
                            "name": "Hats"
                        },
                        {
                            "id": "2474943011",
                            "name": "Scarves"
                        },
                        {
                            "id": "2474946011",
                            "name": "Wraps"
                        },
                        {
                            "id": "2474971011",
                            "name": "Sunglasses"
                        },
                        {
                            "id": "2475898011",
                            "name": "Wallets"
                        },
                        {
                            "id": "6358544011",
                            "name": "Wrist Watches"
                        }
                    ]
                }
            ]
        }
    ]
};

const childNodes = [
    { node: "0", children: ["1045564", "2476613011", "2476496011", "2476604011", "1045630", "1045626", "1045640", "1045694", "1045686", "2476514011", "2476515011", "1048188", "1258967011", "1045112", "10344911011", "2346727011", "11006703011", "11006704011", "2346728011", "12643253011", "7132357011", "12643250011", "7132359011", "7132360011", "2474955011", "2475895011", "2474947011", "2474952011", "2474995011", "2474940011", "2474963011", "2346728011", "2474982011", "2474943011", "2474946011", "2474971011", "2475898011", "6358544011"] },
    { node: "1", children: ["1045564", "2476613011", "2476496011", "2476604011", "1045630", "1045626", "1045640", "1045694", "1045686", "2476514011", "2476515011"] },
    { node: "11", children: ["2476613011", "2476496011", "2476604011", ] },
    { node: "12", children: ["1045630", "1045626", "1045640", ] },
    { node: "13", children: ["1045694", "1045686", "2476514011", "2476515011"] },
    { node: "2", children: ["1048188", "1258967011", "1045112", "10344911011", "2346727011", "11006703011", "11006704011", "2346728011", "12643253011", "7132357011", "12643250011", "7132359011", "7132360011"] },
    { node: "21", children: ["1045112", "10344911011"] },
    { node: "22", children: ["2346727011", "11006703011", "11006704011", "2346728011"] },
    { node: "23", children: ["12643253011", "7132357011", "12643250011", "7132359011", "7132360011"] },
    { node: "3", children: ["2474955011", "2475895011", "2474947011", "2474952011", "2474995011", "2474940011", "2474963011", "2346728011", "2474982011", "2474943011", "2474946011", "2474971011", "2475898011", "6358544011"] },
    { node: "31", children: ["2474955011", "2475895011", "2474947011", "2474952011", "2474995011", ] },
    { node: "32", children: ["2474940011", "2474963011", "2346728011", "2474982011", "2474943011", "2474946011", "2474971011", "2475898011", "6358544011"] },
];

module.exports = {
    men,
    women,
    accessories,
    all,
    childNodes
};