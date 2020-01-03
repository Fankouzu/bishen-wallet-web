import React, { Component } from 'react'
import { BrowserRouter as Router,Route} from 'react-router-dom'
import OpenWallet from './OpenWallet'
import CreateWallet from './CreateWallet'
import Mnemonic from './Mnemonic'
import ImportWallet from './ImportWallet'
import Wallet from './Wallet'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = { }
  } 
  render(){
    let pathname = window.location.pathname.split("/")
    return (
      <Router basename={pathname[1]}>
      <div>
        <Route exact path="/" component={OpenWallet} />          
        <Route path="/Mnemonic" component={Mnemonic} />
        <Route path="/CreateWallet" component={CreateWallet} /> 
        <Route path="/ImportWallet" component={ImportWallet} /> 
        <Route path="/Wallet" component={Wallet} />                                                                                                                                                                                                                                                                                                                                                                                                                       
      </div>
      </Router>
    )
  }
}

export default App
