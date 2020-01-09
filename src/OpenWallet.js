import React, { Component } from 'react'
import OpenWalletView from './components/OpenWalletView'

class OpenWallet extends Component {
    constructor(props) {
        super(props)
        this.state = {  }
    }
    render() {
        console.log("Render OpenWallet")
        return (
            <OpenWalletView></OpenWalletView>
        )
    }
}

export default OpenWallet
