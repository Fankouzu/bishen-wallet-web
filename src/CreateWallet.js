import React, { Component } from 'react'
import CreateWalletView from './components/CreateWalletView'
import cookie from 'react-cookies'
import { aesEncrypt, sha1 } from './utils/Aes'
import { randMnemonic } from './utils/Tools'

class CreateWallet extends Component {
    constructor(props) {
        super(props);
        this.state = {
            randMnemonic: randMnemonic(this.props.location.state.useMnemonic),
            mnemonic: [],
            important: false,
            wordDisplay: [],
            CardActionsError: false,
            mnemonic_lang: this.props.location.state.mnemonic_lang,
            useMnemonic: this.props.location.state.useMnemonic
        }
        if (!this.props.location.state) {
            window.location.href = "./"
        }
    }
    componentDidMount() {
        //console.log(this.state.useMnemonic)
    }
    Wallet = (password) => {
        const encrypt = aesEncrypt(this.state.useMnemonic, sha1(password))
        localStorage.setItem("encrypt", encrypt)
        const days = 1
        const expires = new Date()
        expires.setDate(Date.now() + 1000 * 60 * 60 * 24 * days)
        cookie.save('password', sha1(password).toString(), { path: '/', expires: expires })
        window.location.href = "./Wallet"
    }
    render() {
        console.log("Render CreateWallet")
        return (
            <CreateWalletView
                randMnemonic={this.state.randMnemonic}
                useMnemonic={this.state.useMnemonic}
                mnemonic_lang={this.state.mnemonic_lang}
                Wallet={this.Wallet}
                choseWord={this.choseWord}
                removeWord={this.removeWord}
            ></CreateWalletView>
        )
    }
}

export default CreateWallet;
