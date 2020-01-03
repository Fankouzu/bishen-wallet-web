import React, { Component } from 'react'
import OpenWalletView from './components/OpenWalletView'
import cookie from 'react-cookies'
import {aesDecrypt,sha1} from './utils/Aes'
import {validateMnemonic} from './utils/Tools'

class OpenWallet extends Component {
  constructor(props) {
    super(props)
    this.state = { password:'',remember:false,error:false ,errorMsg:''}
  }
  typePassword = (event)=>{
    this.setState({
      password:event.target.value
    })
  }
  unlockWallet = () =>{
    let password = this.state.password
    if(!password){
      this.setState({error:true,errorMsg:'请输入密码'})
    }else{
      let encrypt = localStorage.getItem("encrypt")
      if(!encrypt){
        this.setState({error:true,errorMsg:'找不到本地钱包，请导入或创建钱包'})
      }else{
        console.log(encrypt)
        console.log(password)
        console.log(sha1(password))
        var mnemonic = aesDecrypt(encrypt,sha1(password))
        var bool = validateMnemonic(mnemonic)
        if(!bool){
          this.setState({error:true,errorMsg:'密码或钱包错误，请导入或创建钱包'}) 
        }else{
            var days = this.state.remember ? 7 : 1
            const expires = new Date()
            expires.setDate(Date.now() + 1000 * 60 * 60 * 24 * days)
            cookie.save('password',sha1(this.state.password).toString(),{path: '/',expires:expires})
            window.location.href="./Wallet"
        }
      }
    }
  }
  
  changeRemember = (event) =>{
    this.setState({
      remember:event.target.checked
    })
  }
  render() { 
    return ( 
        <OpenWalletView
        state={this.state}
        unlockWallet={this.unlockWallet}
        typePassword={this.typePassword}
        changeRemember={this.changeRemember}
        ></OpenWalletView>
     )
  }
}
 
export default OpenWallet
