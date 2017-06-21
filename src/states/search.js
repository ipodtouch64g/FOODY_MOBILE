import {createCommentsFromApi,listCommentsFromApi,searchFoodyFromApi, searchListFromApi} from '../api/posts.js';

/* Actions */
export function startListComments() {
  return {type: '@SEARCH/START_LIST_COMMENTS'};
}
export function endListComments(comments) {
  return {type: '@SEARCH/END_LIST_COMMENTS', comments};
}
export function startSearchFoody() {
  return {type: '@SEARCH/START_SEARCH_FOODY'};
}
export function endSearchFoody(restaurants) {
  return {type: '@SEARCH/END_SEARCH_FOODY', restaurants};
}
function startCreateComments() {
    return {
        type: '@SEARCH/START_CREATE_COMMENTS'
    };
}

function endCreateComments(comments) {
    return {
        type: '@SEARCH/END_CREATE_COMMENTS',
        comments
    };
}
export function searchFoody(lat = 120.9957, lng = 24.7884) {
  return (dispatch, getState) => {
    dispatch(startSearchFoody());
    return searchFoodyFromApi(lat, lng).then(restaurants => {
      dispatch(endSearchFoody(restaurants));
    }).catch(err => {
      dispatch(endSearchFoody());
      console.error('Error search foody!!!!!!', err);
    });
  };
};
export function listComments(id) {
  return (dispatch, getState) => {
    dispatch(startListComments());
    return listCommentsFromApi(id).then(comments => {
      dispatch(endListComments(comments));
    }).catch(err => {
      dispatch(endListComments());
      console.error('Error list comments!!!!!!', err);
    });
  };
};
export function createComments(text,id,u_id="訪客",img='-1') {
    return (dispatch, getState) => {
        dispatch(startCreateComments());

        return createCommentsFromApi(text,id,u_id,img).then(comments => {
            dispatch(endCreateComments(comments));
        }).catch(err => {
            dispatch(endCreateComments())
            console.error('Error creating comments', err);
        });
    };
};
export function setSearchText(searchText) {
  return {type: '@SEARCH/SET_SEARCH_TEXT', searchText};
}

export function toggleSearchModal() {
  return {type: '@SEARCH/TOGGLE_SEARCH_MODAL'};
}
export function setSearchCity(searchCity) {
  return {type: '@SEARCH/SET_SEARCH_CITY', searchCity};
}
export function setSearchFood(foodCat, searchFood) {
  return {type: '@SEARCH/SET_SEARCH_FOOD', foodCat, searchFood};
}
export function setSearchFoodAll(searchFood) {
  return {type: '@SEARCH/SET_SEARCH_FOOD_ALL', searchFood};
}

/* Reducer */

const food = [
  [
    "中式餐廳",
    18,
    [
      "海鮮餐廳", false
    ],
    [
      "山產野菜餐廳", false
    ],
    [
      "北京菜", false
    ],
    [
      "客家菜", false
    ],
    [
      "四川菜", false
    ],
    [
      "湘菜(湖南菜)", false
    ],
    [
      "台菜餐廳", false
    ],
    [
      "上海菜(江浙菜)", false
    ],
    [
      "粵菜", false
    ],
    [
      "港式飲茶", false
    ],
    [
      "麵食點心", false
    ],
    [
      "其他中式料理", false
    ],
    [
      "熱炒、快炒", false
    ],
    [
      "台灣原住民料理", false
    ],
    [
      "新疆菜", false
    ],
    [
      "西藏菜", false
    ],
    [
      "雲南菜", false
    ],
    ["眷村菜", false]
  ],
  [
    "日式料理",
    8,
    [
      "居酒屋", false
    ],
    [
      "日式麵食專賣", false
    ],
    [
      "日式豬排專賣", false
    ],
    [
      "綜合日式料理", false
    ],
    [
      "日式麵食專賣", false
    ],
    [
      "生魚片、壽司專賣", false
    ],
    [
      "文字燒、大阪燒", false
    ],
    [
      "懷石料理", false
    ],
    ["其他日式料理", false]
  ],
  [
    "亞洲料理",
    12,
    [
      "韓式料理", false
    ],
    [
      "泰式料理", false
    ],
    [
      "越南料理", false
    ],
    [
      "緬甸料理", false
    ],
    [
      "綜合南洋料理", false
    ],
    [
      "印尼料理", false
    ],
    [
      "土耳其料理", false
    ],
    [
      "澳門美食", false
    ],
    [
      "星馬料理", false
    ],
    [
      "印度料理", false
    ],
    [
      "中東料理", false
    ],
    ["其他亞洲料理", false]
  ],
  [
    "異國料理",
    16,
    [
      "法式料理", false
    ],
    [
      "美式料理", false
    ],
    [
      "義式料理", false
    ],
    [
      "德式料理", false
    ],
    [
      "其它異國料理", false
    ],
    [
      "非洲料理", false
    ],
    [
      "葡萄牙料理", false
    ],
    [
      "俄羅斯料理", false
    ],
    [
      "比利時料理", false
    ],
    [
      "愛爾蘭料理", false
    ],
    [
      "紐澳料理", false
    ],
    [
      "英式料理", false
    ],
    [
      "墨西哥料理", false
    ],
    [
      "西班牙料理", false
    ],
    [
      "北歐料理", false
    ],
    ["希臘料理", false]
  ],
  [
    "燒烤類",
    7,
    [
      "牛排", false
    ],
    [
      "炭烤串燒", false
    ],
    [
      "鐵板燒", false
    ],
    [
      "蒙古烤肉", false
    ],
    [
      "日式燒肉", false
    ],
    [
      "韓式燒肉", false
    ],
    ["火烤兩吃", false]
  ],
  [
    "鍋類",
    9,
    [
      "溫體牛", false
    ],
    [
      "麻辣火鍋", false
    ],
    [
      "涮涮鍋", false
    ],
    [
      "其他鍋類", false
    ],
    [
      "羊肉爐", false
    ],
    [
      "薑母鴨", false
    ],
    [
      "火烤兩吃", false
    ],
    [
      "石頭火鍋", false
    ],
    ["壽喜燒", false]
  ],
  [
    "咖啡、簡餐、茶",
    4,
    [
      "下午茶", false
    ],
    [
      "咖啡專賣", false
    ],
    [
      "複合式", false
    ],
    ["茶專賣", false]
  ],
  [
    "素食",
    3,
    [
      "小吃", false
    ],
    [
      "中式", false
    ],
    ["西式", false]
  ],
  [
    "速食料理",
    3,
    [
      "漢堡、炸雞", false
    ],
    [
      "披薩", false
    ],
    ["其他速食", false]
  ],
  [
    "早餐",
    4,
    [
      "早午餐", false
    ],
    [
      "其他類型早餐", false
    ],
    [
      "中式早餐", false
    ],
    ["西式早餐", false]
  ],
  [
    "小吃",
    24,
    [
      "碗粿", false
    ],
    [
      "其他小吃", false
    ],
    [
      "鹹酥雞、炸雞排", false
    ],
    [
      "筒仔米糕", false
    ],
    [
      "藥燉排骨", false
    ],
    [
      "控肉飯", false
    ],
    [
      "豬血糕", false
    ],
    [
      "鵝肉", false
    ],
    [
      "肉粽", false
    ],
    [
      "四神湯", false
    ],
    [
      "滷肉飯", false
    ],
    [
      "滷味", false
    ],
    [
      "鹹水雞", false
    ],
    [
      "胡椒餅", false
    ],
    [
      "米粉湯", false
    ],
    [
      "蚵仔煎", false
    ],
    [
      "臭豆腐", false
    ],
    [
      "水煎包、生煎包", false
    ],
    [
      "麵攤、麵店", false
    ],
    [
      "肉圓", false
    ],
    [
      "蔥油餅、蔥抓餅", false
    ],
    [
      "刈包", false
    ],
    [
      "麵線", false
    ],
    ["棺材板", false]
  ],
  [
    "冰品、飲料、甜湯",
    6,
    [
      "果昔", false
    ],
    [
      "果汁", false
    ],
    [
      "冰淇淋", false
    ],
    [
      "飲料專賣店", false
    ],
    [
      "剉冰、豆花", false
    ],
    ["甜品、甜湯", false]
  ]
];

const initSearchState = {
  restaurants: [],
  comments:[],
  creatingComments:false,
  listingComments: false,
  searchingFoody: false,
  searchCity: '',
  searchFood: food,
  searchText: '',
  modalToggle: false
};

export function search(state = initSearchState, action) {
  switch (action.type) {
    case '@SEARCH/START_CREATE_COMMENTS':
        return {
            ...state,
            creatingComments: true
        };
    case '@SEARCH/END_CREATE_COMMENTS':
        if (!action.comments)
            return {
                ...state,
                creatingComments: false
            };
        var newComments = state.comments.slice();
        newComments.unshift(action.comments);
        return {
            ...state,
            creatingComments: false,
            comments: newComments
        };
    case '@SEARCH/START_LIST_COMMENTS':
      return {
        ...state,
        listingComments: true
      };
    case '@SEARCH/END_LIST_COMMENTS':
      if (!action.comments)
        return {
          ...state,
          listingComments: false
        };
      return {
        ...state,
        listingComments: false,
        comments: action.comments
      };
    case '@SEARCH/START_SEARCH_FOODY':
      return {
        ...state,
        searchingFoody: true
      };
    case '@SEARCH/END_SEARCH_FOODY':
      if (!action.restaurants)
        return {
          ...state,
          searchingFoody: false
        };
      return {
        ...state,
        searchingFoody: false,
        restaurants: action.restaurants
      };
    case '@SEARCH/SET_SEARCH_TEXT':
      return {
        ...state,
        searchText: action.searchText
      };
    case '@SEARCH/SET_SEARCH_CITY':
      return {
        ...state,
        searchCity: action.searchCity
      };
    case '@SEARCH/SET_SEARCH_FOOD':
      let lenc = state.searchFood.length;
      for (let j = 0; j < lenc; j++) {
        if (state.searchFood[j][0] === action.foodCat) {

          let len = state.searchFood[j].length;
          for (let i = 2; i < len; i++) {
            if (state.searchFood[j][i][0] === action.searchFood) {
              state.searchFood[j][i][1] = !state.searchFood[j][i][1];
              break;
            }
          }
          break;
        }
      }
      return {
        ...state,
        searchFood: state.searchFood
      };
    case '@SEARCH/SET_SEARCH_FOOD_ALL':
      return {
        ...state,
        searchFood: {
          ...state.searchFood
        }
      };
    case '@SEARCH/TOGGLE_SEARCH_MODAL':
      return {
        ...state,
        modalToggle: !state.modalToggle
      };
    default:
      return state;
  }
}
