/* Actions */

export function setToast(text) {
    return {
        type: '@TOAST/SET_TOAST',
        text
    };
}

/* Reducer */

export function toast(state = '', action) {
    switch (action.type) {
        case '@TOAST/SET_TOAST':
            return action.text;
        default:
            return state;
    }
}
