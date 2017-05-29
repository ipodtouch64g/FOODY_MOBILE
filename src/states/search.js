/* Actions */

export function setSearchText(searchText) {
    return {
        type: '@SEARCH/SET_SEARCH_TEXT',
        searchText
    };
}

export function toggleSearchModal() {
    return {
        type: '@SEARCH/TOGGLE_SEARCH_MODAL'
    };
}

/* Reducer */

const initSearchState = {
    searchText: '',
    modalToggle: false
};

export function search(state = initSearchState, action) {
    switch (action.type) {
        case '@SEARCH/SET_SEARCH_TEXT':
            return {
                ...state,
                searchText: action.searchText
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
