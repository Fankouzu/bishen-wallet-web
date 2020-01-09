import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import OpenWallet from './OpenWallet'
import CreateWallet from './CreateWallet'
import Mnemonic from './Mnemonic'
import ImportWallet from './ImportWallet'
import Wallet from './Wallet'

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    static getDerivedStateFromProps(props, state) { // 组件每次被rerender的时候，包括在组件构建之后(虚拟dom之后，实际dom挂载之前)，每次获取新的props或state之后；; 
        return true
    }
    componentDidCatch(error, info) { // 获取到javascript错误
    }

    render() {
        let pathname = window.location.pathname.split("/")
        return (
            <Router basename={pathname[1]}>
                <div>
                    <Route exact path="/" component={OpenWallet} />
                    <Route path="/Mnemonic" component={Mnemonic} />
                    <Route path="/CreateWallet" component={CreateWallet} />
                    <Route path="/ImportWallet" component={ImportWallet} />
                    <Route path="/Wallet" component={Wallet} />
                </div>
            </Router>
        )
    }
    componentDidMount() { // 挂载后

    }
    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.accounts !== this.state.accounts
    }
    getSnapshotBeforeUpdate(prevProps, prevState) { // 组件更新前触发
        return null
    }
    componentDidUpdate(prevProps, prevState) {

    }
    componentWillUnmount() { // 组件卸载时触发

    }
}

export default App
