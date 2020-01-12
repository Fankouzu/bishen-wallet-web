import React from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogActions from '@material-ui/core/DialogActions'
import { makeStyles } from '@material-ui/core/styles'
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon'
import CopyToClipboard from 'react-copy-to-clipboard'
import Slide from '@material-ui/core/Slide'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
var QRCode = require('qrcode.react')

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />
})

const useStyles = makeStyles(theme => ({
    DialogTitle: {
        textAlign: 'center',
        '& .MuiDialog-paper': {
            overflowY: 'unset'
        },
        '& .paper': {
            position: 'absolute',
            top: '-50px',
            marginLeft: '50%!important',
            left: '-50px'
        },
        '& .MuiDialogTitle-root': {
            marginTop: 50,
        }
    },
    DialogActions: {
        width:'100%'
    }
}))

export default function Deposit(props) {
    const classes = useStyles()
    const handleDepositClose = () => {
        props.setDepositOpen(false)
    }
    const { currentAccount, address, depositOpen } = props
    return (
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
                账户 {parseInt(currentAccount) + 1}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="deposit-dialog-slide-description">
                    <QRCode value={`ethereum:` + address} size={200} />
                </DialogContentText>
                <CopyToClipboard text={address}>
                    <Button className={classes.DialogActions}>
                        <Typography noWrap>{address}</Typography>
                    </Button>
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