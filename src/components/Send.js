import React from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon'
import TextField from '@material-ui/core/TextField'
import SearchIcon from '@material-ui/icons/Search'
import InputAdornment from '@material-ui/core/InputAdornment'
import DialogActions from '@material-ui/core/DialogActions'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import FormHelperText from '@material-ui/core/FormHelperText'
import Divider from '@material-ui/core/Divider'
import Slide from '@material-ui/core/Slide'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />
})

export default function Send(props) {

    const { accounts,currentAccount, address,sendOpen,classes} = props

    const handleSendClose = () => {
        props.setSendOpen(false)
    }
    
    const [sendValue, setSendValue] = React.useState(0)
    const handleSetSendValue = (event) => {
        setSendValue(event.target.value)
    }

    const [variant,setVariant] = React.useState(['outlined','contained','outlined'])
    const [gasfee,setGasfee] = React.useState(0.00006)
    const handleChoseGasfee = (event) =>{
        const variant = ['outlined','outlined','outlined']
        const index = event.currentTarget.attributes.index.nodeValue
        const value = event.currentTarget.attributes.value.nodeValue
        variant[index] = 'contained'
        setVariant(variant)
        setGasfee(value)
    }
    const [toAddress,setToAddress] = React.useState('')
    const handleTypeAddress = (event) => {
        setToAddress(event.target.value)
    }
    return (
        <Dialog
            open={sendOpen}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleSendClose}
            aria-labelledby="send-dialog-slide-title"
            aria-describedby="send-dialog-slide-description"
            className={classes.DialogTitle}
            fullWidth
        >
            <Jazzicon diameter={100} seed={jsNumberForAddress(address)} />
            <DialogTitle id="send-dialog-slide-title">
                <TextField
                    label="输入以太坊地址"
                    variant="outlined"
                    helperText="Some important text"
                    fullWidth
                    className={classes.TextField}
                    onChange={handleTypeAddress}
                    value={toAddress}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                />
            </DialogTitle>
            <DialogContent>
                <TextField
                    label="发送数量"
                    variant="outlined"
                    helperText={`余额：`+accounts[currentAccount].balance+`Ether`}
                    value={sendValue}
                    onChange={handleSetSendValue}
                    fullWidth
                    className={classes.TextField}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                Ether
                        </InputAdornment>
                        ),
                    }}
                />
            </DialogContent>
            <DialogContent>
                <FormHelperText id="my-helper-text" className={classes.selectGasfee}>选择交易费：</FormHelperText>
                <ButtonGroup color="secondary" fullWidth aria-label="large secondary button group">
                    <Button variant={variant[0]} onClick={handleChoseGasfee} value={0.00002} index={0}>慢：0.00002ETH</Button>
                    <Button variant={variant[1]} onClick={handleChoseGasfee} value={0.00006} index={1}>平均：0.00006ETH</Button>
                    <Button variant={variant[2]} onClick={handleChoseGasfee} value={0.00017} index={2}>快： 0.00017ETH </Button>
                </ButtonGroup>
            </DialogContent>
            <Divider className={classes.divider} />
            <DialogContent>
                <Grid container spacing={1}>
                    <Grid item xs={3}>
                        <Button onClick={handleSendClose} variant='outlined' fullWidth color="default" className={classes.DialogActions}>
                            关闭
                    </Button>
                    </Grid>
                    <Grid item xs={9}>
                        <Button onClick={handleSendClose} variant='contained' fullWidth color="primary" className={classes.DialogActions}>
                            下一步
                    </Button>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
            </DialogActions>
        </Dialog>
    )
}