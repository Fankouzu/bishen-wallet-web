import React, { Component } from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import Toolbar from './components/Toolbar'
import MyDrawer from './components/MyDrawer'
import cookie from 'react-cookies'
import {aesDecrypt} from './utils/Aes'
import {mnemonicToAddress,validateMnemonic} from './utils/Tools'
import Web3 from 'web3'
const createInfuraProvider = require('eth-json-rpc-infura/src/createProvider')
const Ethjs = require('ethjs')
const web3 = new Web3()

const provider = createInfuraProvider({ network: 'mainnet' })
const eth = new Ethjs(provider)

class Wallet extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            open:false, 
            password:'',
            accounts:[],
            networks:[],
            network:'',
            avatarMenu:null
        }
    }
    setOpen(boolean){
        this.setState({open:boolean})
    }
    handleDrawerOpen = () =>{
        this.setOpen(true)
    }
    handleDrawerClose = () =>{
        this.setOpen(false)
    }
    lockWallet = () =>{
        cookie.remove('password', { path: '/' })
        window.location.href="/"
    }
    toggleDrawer = () => event => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
          return;
        }
        let open = this.state.open
        this.setState({open: !open });
    }
    handleChange = event => {
        this.setState({network: event.target.value });
    }
    componentDidMount(){
        let password = cookie.load('password') 
        let encrypt = localStorage.getItem("encrypt")
        if(!password || !encrypt){
            console.log("encrypt || password Error!")
            window.location.href="/"
        }else{
            var mnemonic = aesDecrypt(encrypt,password)
            console.log('mnemonic:' + mnemonic)
            var bool = validateMnemonic(mnemonic)
            if(!bool){
                console.log("Mnemonic Error!")
                window.location.href="./"
            }else{
                let accounts = []
                for(var i=0;i<10;i++){
                    accounts.push(mnemonicToAddress(mnemonic,i))
                }
                this.setState({accounts:accounts})
                console.log(accounts)
                console.log(eth)
                eth.getBalance(accounts[0]).then(function(balance){
                    console.log(balance.toString())
                    console.log(web3.utils.fromWei(balance,'ether').toString())
                })
            }
        }
        let networks = []
        networks[1] = '以太坊主网络'
        networks[3] = 'Ropsten测试网络'
        networks[4] = 'Rinkeby测试网络'
        networks[5] = 'Goeli测试网络'
        networks[42] = 'Kovan测试网络'
        this.setState({networks:networks,network:1})
    }
    render() { 
        
        return ( 
            <div style={{display:'flex'}}>
                <CssBaseline />
                <Toolbar
                    toggleDrawer={this.toggleDrawer}
                    handleChange={this.handleChange}
                    state={this.state}
                ></Toolbar>
                <MyDrawer 
                    toggleDrawer={this.toggleDrawer}
                    open={this.state.open}
                ></MyDrawer>
            </div>
        )
    }
}
 
export default Wallet;