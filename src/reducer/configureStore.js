import { createStore, compose, applyMiddleware } from 'redux'
import { createLogger } from "redux-logger"
import reducer from 'reducer'
import { createWrapper } from "next-redux-wrapper"
import { composeWithDevTools } from 'redux-devtools-extension'

const configureStore = () => {
    const logger = createLogger()
    const middlewares = [] // 미들웨어들을 넣으면 된다.
    const enhancer = process.env.NODE_ENV === 'production' ? (
        compose(applyMiddleware(...middlewares))
    ) : (
        composeWithDevTools(
            applyMiddleware(...middlewares)
        )
    )
        
    return createStore(reducer, enhancer)

}


const wrapper = createWrapper(configureStore, { debug: true });

export default wrapper