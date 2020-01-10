import React from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogActions from '@material-ui/core/DialogActions'
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon'
import CopyToClipboard from 'react-copy-to-clipboard'
import Slide from '@material-ui/core/Slide'
import Button from '@material-ui/core/Button'
var QRCode = require('qrcode.react')

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />
})

export default function Deposit(props) {
    const handleDepositClose = () => {
        props.setDepositOpen(false)
    }
    const { currentAccount, address,depositOpen,classes} = props
    return(
        <Dialog
                open={depositOpen}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleDepositClose}
                aria-labelledby="deposit-dialog-slide-title"
                aria-describedby="deposit-dialog-slide-description"
                className={classes.DialogTitle}
                fullWidth
            >
                <Jazzicon diameter={100} seed={jsNumberForAddress(address)} />
                <DialogTitle id="deposit-dialog-slide-title">
                    账户 {currentAccount + 1}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="deposit-dialog-slide-description">
                        <QRCode value={`ethereum:` + address} size={256} />
                    </DialogContentText>
                    <CopyToClipboard text={address}>
                        <Button className={classes.DialogActions}>{address}</Button>
                    </CopyToClipboard>
                </DialogContent>
                <DialogContent>
                    <Button onClick={handleDepositClose} color="primary" fullWidth variant='outlined'>
                        关闭
                    </Button>
                </DialogContent>
                <DialogActions>
                </DialogActions>
            </Dialog>
    )
}