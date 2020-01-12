import React, { Component } from 'react'
import cookie from 'react-cookies'
import Toolbar from './components/Toolbar'
import MyDrawer from './components/MyDrawer'
import { networks } from './utils/networks'
import AssetDetail from './components/AssetDetail'
import CssBaseline from '@material-ui/core/CssBaseline'
import { getTxList,getBalance } from './utils/Tools'
import { validatePasswordMnemonic, getAccounts } from './utils/Tools'


class Wallet extends Component {
    constructor(props) {
        super(props)
        let password = cookie.load('password')
        let networkId = cookie.load('networkId')
        let currentAccount = cookie.load('currentAccount')
        let encrypt = localStorage.getItem("encrypt")
        let mnemonic = validatePasswordMnemonic(password, encrypt)
        let expires = new Date()
        expires = expires.setDate(Date.now() + 1000 * 60 * 60 * 24)

        if (!mnemonic) {
            window.location.href = "./"
        }

        this.state = {
            open: false,
            password: '',
            accounts: getAccounts(mnemonic),
            networks: networks,
            avatarMenu: null,
            mnemonic: mnemonic,
            currentAccount: currentAccount || 0,
            networkId: networkId || 0,
            txlist: [],
            expires: expires
        }
    }

    toggleDrawer = () => event => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return
        }
        let open = this.state.open
        this.setState({ open: !open })
    }
    componentDidMount() {
        this.getBalance(this.state.networkId)
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextState.currentAccount !== this.state.currentAccount
            || nextState.accounts !== this.state.accounts
            || nextState.txlist !== this.state.txlist
            || nextState.open !== this.state.open
            || nextState.networkId !== this.state.networkId
    }
    getBalance = (networkId) => {
        let mnemonic = this.state.mnemonic
        let that = this
        let networkName = this.state.networks[networkId].nameEN
        if(this.state.txlist.length>0){
            this.setState({ txlist: []})
        }
        getBalance(mnemonic,networkName).then(function(accounts){
            that.setState({ accounts: accounts , networkId: networkId })
            cookie.save('networkId', networkId, { path: '/', expires: that.state.expires })
            that.getTxList(that.state.currentAccount)
        })
    }
    getTxList = (currentAccount) => {
        try {
            let networkName = this.state.networks[this.state.networkId].nameEN
            let address = this.state.accounts[currentAccount].address
            let that = this
            getTxList(networkName, address).then(function (result) {
                that.setState({ txlist: result , currentAccount: currentAccount })
            })
        } catch (e) {
            getTxList(currentAccount)
        }
    }
    choseAccount = (event) => {
        let accountsIndex = event.currentTarget.attributes.index.nodeValue
        cookie.save('currentAccount', accountsIndex, { path: '/', expires: this.state.expires })
        //this.setState({ currentAccount: accountsIndex })
        this.getTxList(accountsIndex)
    }
    render() {
        console.log("Render Wallet")
        return (
            <div style={{ display: 'flex' }}>
                <CssBaseline />
                <Toolbar
                    toggleDrawer={this.toggleDrawer}
                    getBalance={this.getBalance}
                    networks={this.state.networks}
                    networkId={this.state.networkId}
                    accounts={this.state.accounts}
                    mnemonic={this.state.mnemonic}
                    currentAccount={this.state.currentAccount}
                    choseAccount={this.choseAccount}
                ></Toolbar>
                <MyDrawer
                    toggleDrawer={this.toggleDrawer}
                    open={this.state.open}
                ></MyDrawer>
                <AssetDetail
                    txlist={this.state.txlist}
                    accounts={this.state.accounts}
                    mnemonic={this.state.mnemonic}
                    networkId={this.state.networkId}
                    networks={this.state.networks}
                    currentAccount={this.state.currentAccount}
                ></AssetDetail>
            </div>
        )
    }
}

export default Wallet