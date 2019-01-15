import React, { Component } from "react"
import { Provider } from "react-redux"

import AsyncApp from "../components/AsyncApp"
import configureStore from "../configureStore"

const store = configureStore()

class Root extends Component{
    render(){
        return (
            <Provider store={store}>
                <AsyncApp />
            </Provider>
        )
    }
}

export default Root