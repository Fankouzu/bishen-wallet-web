import React, { Component } from 'react'
import MnemonicView from './components/MnemonicView'
var bip39 = require('bip39')

class CreateWallet extends Component {
  constructor(props) {
    super(props);
    this.state = { mnemonic_zh:"",mnemonic_en:"",useMnemonic:"",mnemonic_lang:'zh' }
  }
  
  componentDidMount(){
    let mnemonic_zh = bip39.generateMnemonic(128, null, bip39.wordlists.chinese_simplified)
    let mnemonic_en = bip39.generateMnemonic(128, null, bip39.wordlists.english)
    this.setState({mnemonic_zh:mnemonic_zh,mnemonic_en:mnemonic_en,useMnemonic:mnemonic_zh,mnemonic_lang:'zh'})
  }
  switchLang = (index) =>{
    let useMnemonic = index === 0 ? this.state.mnemonic_zh : this.state.mnemonic_en
    let mnemonic_lang = index === 0 ? 'zh' : 'en'
    this.setState({useMnemonic:useMnemonic,mnemonic_lang:mnemonic_lang})
  }
  render() { 
    return ( 
      <MnemonicView 
        state={this.state} 
        switchLang={this.switchLang} 
      ></MnemonicView>
     )
  }
}
 
export default CreateWallet;
