var bip39 = require('bip39')
const HDWallet = require('ethereum-hdwallet')

export function mnemonicToAddress(mnemonic,n){
    const hdwallet = HDWallet.fromMnemonic(mnemonic)
    return `0x${hdwallet.derive(`m/44'/60'/0'/0/`+n).getAddress().toString('hex')}`
}
export function jsNumberForAddress (address) {
    const addr = address.slice(2, 10);
    const seed = parseInt(addr, 16);
    return seed;
}

export function lngDetector(word){
    var regex = new RegExp("^([a-z]{0,200})$")
    return regex.test(word.replace(/ /g,''))
}

export function validateMnemonic(mnemonic){
    if(lngDetector(mnemonic)){
        return bip39.validateMnemonic(mnemonic,bip39.wordlists.english)
    }else{
        return bip39.validateMnemonic(mnemonic.replace(/ /g,'').split('').join(' '),bip39.wordlists.chinese_simplified)
    }
}
const createInfuraProvider = require('eth-json-rpc-infura/src/createProvider')
const Ethjs = require('ethjs')

const provider = createInfuraProvider({ network: 'mainnet' })
export const eth = new Ethjs(provider)