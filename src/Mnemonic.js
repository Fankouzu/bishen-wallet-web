import React, { Component } from 'react'
import MnemonicView from './components/MnemonicView'
var bip39 = require('bip39')

class Mnemonic extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            mnemonic_zh: bip39.generateMnemonic(128, null, bip39.wordlists.chinese_simplified), 
            mnemonic_en: bip39.generateMnemonic(128, null, bip39.wordlists.english) 
        }
    }

    render() {
        console.log("Render Mnemonic")
        return (
            <MnemonicView
                mnemonic_zh={this.state.mnemonic_zh}
                mnemonic_en={this.state.mnemonic_en}
                switchLang={this.switchLang}
            ></MnemonicView>
        )
    }
}

export default Mnemonic
