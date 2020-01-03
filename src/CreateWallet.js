import React, { Component } from 'react'
import CreateWalletView from './components/CreateWalletView'
import cookie from 'react-cookies'
import {aesEncrypt,sha1} from './utils/Aes'

class CreateWallet extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      randMnemonic:[],
      mnemonic:[],
      important:false,
      wordDisplay:[], 
      CardActionsError:false,
      mnemonic_lang:this.props.location.state.mnemonic_lang
    }
    this.Wallet = this.Wallet.bind(this)
    this.choseWord = this.choseWord.bind(this)
    this.removeWord = this.removeWord.bind(this)
    if(!this.props.location.state){
          window.location.href="./" 
    } 
  }
  componentDidMount(){
    let randMnemonic = this.props.location.state.useMnemonic.split(' ')
    var newArr = [];
    var len = randMnemonic.length;
    for(var i=0; i<len; i++){
      var index = Math.floor(Math.random()*randMnemonic.length)
      newArr.push(randMnemonic[index])
      randMnemonic.splice(index,1)
    }
    randMnemonic =[...newArr,...randMnemonic]
    this.setState({
      randMnemonic:randMnemonic
    })
  }
  choseWord(event){
    var wordDisplay = this.state.wordDisplay
    wordDisplay[event.target.attributes.value.nodeValue] = 'none'
    var mnemonic = this.state.mnemonic
    mnemonic.push(event.target.innerHTML)
    this.setState({
      wordDisplay:wordDisplay,
      mnemonic:mnemonic
    })
  }
  removeWord(event){
    var wordDisplay = this.state.wordDisplay
    var randMnemonic = this.state.randMnemonic
    for(var i=0;i<randMnemonic.length;i++){
      if(randMnemonic[i]===event.target.innerHTML){
        wordDisplay[i] = ''
      }
    }
    var mnemonic = this.state.mnemonic
    var newArr = []
    for(var j=0;j<mnemonic.length;j++){
      if(mnemonic[j]!==event.target.innerHTML){
        newArr.push(mnemonic[j])
      }
    }
    this.setState({
      wordDisplay:wordDisplay,
      mnemonic:newArr
    })
  }
  Wallet(password){
    var mnemonic = this.state.mnemonic.join(' ')
    //助记词不相同
    if(mnemonic !== this.props.location.state.useMnemonic){
      this.setState({  
        CardActionsError:true
      })
    //助记词相同
    }else{
      this.setState({  
        CardActionsError:false
      })
      var encrypt = aesEncrypt(mnemonic,sha1(password))
      localStorage.setItem("encrypt",encrypt)
      var days = 1
      const expires = new Date()
      expires.setDate(Date.now() + 1000 * 60 * 60 * 24 * days)
      cookie.save('password',sha1(password).toString(),{path: '/',expires:expires})
      window.location.href="./Wallet"
    }
  }
  render() { 
    return ( 
      <CreateWalletView 
        state={this.state} 
        Wallet={this.Wallet} 
        choseWord={this.choseWord}
        removeWord={this.removeWord}
      ></CreateWalletView>
     )
  }
}
 
export default CreateWallet;
