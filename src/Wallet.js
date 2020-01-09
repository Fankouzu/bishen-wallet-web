import React, { Component } from 'react'
import Web3 from 'web3'
import cookie from 'react-cookies'
import Toolbar from './components/Toolbar'
import MyDrawer from './components/MyDrawer'
import { networks } from './utils/networks'
import AssetDetail from './components/AssetDetail'
import CssBaseline from '@material-ui/core/CssBaseline'
import { mnemonicToAddress,getTxList } from './utils/Tools'
import { validatePasswordMnemonic, getAccounts } from './utils/Tools'

const createInfuraProvider = require('eth-json-rpc-infura/src/createProvider')
const Ethjs = require('ethjs')
const web3 = new Web3()

class Wallet extends Component {
    constructor(props) {
        super(props)
        let password = cookie.load('password')
        let encrypt = localStorage.getItem("encrypt")
        let mnemonic = validatePasswordMnemonic(password, encrypt)

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
            currentAccount: 0,
            networkId:0,
            txlist:[]
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
        let accounts = []
        let mnemonic = this.state.mnemonic
        let that = this
        let networkName = this.state.networks[networkId].nameEN
        let provider = createInfuraProvider({ network: networkName })
        let eth = new Ethjs(provider)
        this.setState({txlist:[]})
        for (let i = 0; i < 10; i++) {
            let address = mnemonicToAddress(mnemonic, i)
            eth.getBalance(address).then(function (res) {
                let balance = web3.utils.fromWei(res, 'ether').toString()
                accounts[i] = {
                    address: address,
                    balance: balance
                }
                if (accounts.length === 10) {
                    that.setState({ accounts: accounts,networkId:networkId })
                    that.getTxList(that.state.currentAccount)
                }
            })
        }
    }
    getTxList = (currentAccount) => {
        let networkName = this.state.networks[this.state.networkId].nameEN
        if(this.state.accounts[currentAccount].address!==undefined){
            let address = this.state.accounts[currentAccount].address
            let that = this
            getTxList(networkName,address).then(function(result){
                that.setState({txlist:result})
            })
        }else{
            window.location.reload()
        }
    }
    choseAccount = (event) => {
        let accountsIndex = event.currentTarget.attributes.index.nodeValue
        this.setState({ currentAccount: accountsIndex })
        this.getTxList(accountsIndex)
    }
    render() {
        console.log("Render Wallet")
        console.log(this.state.txlist)
        
        return (
            <div style={{ display: 'flex' }}>
                <CssBaseline />
                <Toolbar
                    toggleDrawer={this.toggleDrawer}
                    getBalance={this.getBalance}
                    networks={this.state.networks}
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
                    currentAccount={this.state.currentAccount}
                ></AssetDetail>
            </div>
        )
    }
}

export default Wallet;