import React, { Component } from 'react'
import ImportWalletView from './components/ImportWalletView'

class ImportWallet extends Component {
    constructor(props) {
        super(props)
        this.state = { }
    }
    render() {
        console.log("Render ImportWallet")
        return (
            <ImportWalletView></ImportWalletView>
        )
    }
}

export default ImportWallet
