import React, { Component } from 'react'
import ImportWalletView from './components/ImportWalletView'
import {aesEncrypt,sha1} from './utils/Aes'

class CreateWallet extends Component {
  constructor(props) {
    super(props)
    this.state = { mnemonic:"",password:'',confirmPassword:'',passwordMatch:false,important:false }
    this.Wallet = this.Wallet.bind(this)
    this.typePassword = this.typePassword.bind(this)
    this.typeConfirmPassword = this.typeConfirmPassword.bind(this)
    this.typeMnemonic = this.typeMnemonic.bind(this)
  }
  
  componentDidMount(){
    
  }

  typeMnemonic(event){
    this.setState({
      mnemonic:event.target.value
    })
  }
  typePassword(event){
    this.setState({
      password:event.target.value
    })
  }
  typeConfirmPassword(event){
    this.setState({
      confirmPassword:event.target.value,      
      passwordMatch:this.state.password !== event.target.value
    })
  }
  Wallet(password){
      var encrypt = aesEncrypt(this.state.mnemonic,sha1(password))
      localStorage.setItem("encrypt",encrypt)
      document.cookie="password="+sha1(password)
      window.location.href="./Wallet"
  }
  render() { 
    return ( 
      <ImportWalletView 
        state={this.state} 
        Wallet={this.Wallet} 
        typeMnemonic={this.typeMnemonic}
      ></ImportWalletView>
     )
  }
}
 
export default CreateWallet
