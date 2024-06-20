export const ALARM = 'comment_alarm/ALARM'
export const INIT = 'comment_alarm/INIT'

const initState = {
    alarm: 0
}

const reducer = (state = initState, action) => {
    switch(action.type) {
        case ALARM:
            return {
                alarm: action.alarm
            }
        case INIT:
            return initState
        default:
            return state
    }
}

export default reducer