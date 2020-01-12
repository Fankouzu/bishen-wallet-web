import React from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon'
import TextField from '@material-ui/core/TextField'
import SearchIcon from '@material-ui/icons/Search'
import InputAdornment from '@material-ui/core/InputAdornment'
import DialogActions from '@material-ui/core/DialogActions'
import { makeStyles } from '@material-ui/core/styles'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import FormHelperText from '@material-ui/core/FormHelperText'
import Divider from '@material-ui/core/Divider'
import Slide from '@material-ui/core/Slide'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import SwipeableViews from 'react-swipeable-views'
import PropTypes from 'prop-types'
import Box from '@material-ui/core/Box'
import { useTheme } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import isEthereumAddress from 'is-ethereum-address'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'
import { EthAlt } from 'react-cryptocoins'
import { sendTransaction, getGasfee } from '../utils/Tools'

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
            paddingBottom: 0
        }
    },
    DialogActions: {
        width: '100%'
    },
    TextField: {
        marginBottom: '10px'
    },
    selectGasfee: {
        marginBottom: '10px'
    },
    divider: {
        marginTop: '15px',
        marginBottom: '15px'
    },
    noPadding: {
        padding: '0px',
        '& .MuiBox-root': {
            padding: '0px'
        }
    },
    addressList: {
        marginTop: 40,
        padding: '8px 12px',
        '& .MuiGrid-root': {
            position: 'relative',
        },
        '& .MuiGrid-item:first-child': {
            padding: '0px 16px 0px 46px',
            '& .paper': {
                left: '10px',
            }
        },
        '& .MuiGrid-item': {
            position: 'relative',
            padding: '0px 4px 0px 56px',
            height: 44,
            '& .MuiTypography-root': {
                lineHeight: '44px'
            },
            '& .paper': {
                left: '20px',
            }
        },
        '& .MuiSvgIcon-root': {
            background: '#fff',
            border: '1px solid #999',
            borderRadius: '50px',
            width: '32px',
            height: '32px',
            color: '#999',
            position: 'absolute',
            top: '6px',
            left: '50%',
            marginLeft: '-16px'
        },
        '& .paper': {
            position: 'absolute',
            top: '6px',
            marginLeft: '0%!important'
        }
    },
    DialogContent: {
        textAlign: 'left'
    }
}))

function TabPanel(props) {
    const { children, value, index, ...other } = props

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box p={3}>{children}</Box>}
        </Typography>
    )
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
}

export default function Send(props) {
    console.log("Render Send")
    const classes = useStyles()
    const { balance, address, sendOpen, currentAccount, mnemonic, networks, networkId } = props
    const theme = useTheme()
    let networkName = networks[networkId].nameEN

    const [sendValue, setSendValue] = React.useState(0)
    const handleSetSendValue = (event) => {
        setSendValue(event.target.value)
        setTotleAmount(parseFloat(event.target.value) + parseFloat(gasfee))
    }

    const [variant, setVariant] = React.useState(['outlined', 'contained', 'outlined'])

    const [gasfee, setGasfee] = React.useState(0)
    getGasfee(networkName).then(function (res) {
        setGasfee(parseFloat(res))
    })
    React.useEffect(() => {
        setGasfee(gasfee)
        setMyGasfee(gasfee)
        setTotleAmount(parseFloat(sendValue) + gasfee)
    }, [gasfee,sendValue])


    const [myGasfee, setMyGasfee] = React.useState(gasfee)
    const handleChoseGasfee = (event) => {
        const variant = ['outlined', 'outlined', 'outlined']
        const index = event.currentTarget.attributes.index.nodeValue
        const value = event.currentTarget.attributes.value.nodeValue
        variant[index] = 'contained'
        setVariant(variant)
        setMyGasfee(parseFloat(value))
        setTotleAmount(parseFloat(sendValue) + parseFloat(value))
    }


    const [toAddress, setToAddress] = React.useState('')
    const handleTypeAddress = (event) => {
        setToAddress(event.target.value)
    }

    const [tabValue, setTabValue] = React.useState(0)
    const handleChangeTab = (event) => {
        let index = parseInt(event.currentTarget.attributes.value.nodeValue)
        switch (index) {
            case 0:
                handleSendClose()
                break
            case 1:
                if (isEthereumAddress(toAddress)) {
                    handleAddressHelper(0)
                    setTabValue(1)
                    handleActionBtn(1)
                } else {
                    handleAddressHelper(1)
                }
                break
            case 2:
                setTabValue(0)
                handleActionBtn(0)
                break
            case 3:
                sendTransaction(toAddress, networkName, mnemonic, currentAccount, sendValue,myGasfee).then(function (res) {
                    console.log("TCL: handleChangeTab -> res", res)
                })

                break
            default:
                break
        }
    }

    const [addressHelper, setAddressHelper] = React.useState({ helperText: '', error: false })
    const handleAddressHelper = (value) => {
        let addressHelper = value === 0 ? { helperText: '', error: false } : { helperText: '以太坊地址错误', error: true }
        setAddressHelper(addressHelper)
    }

    React.useEffect(() => {
        setTabValue(0)
    }, [sendOpen])

    const [actionBtn, setActionBtn] = React.useState([{ txt: '关闭', value: 0 }, { txt: '下一步', value: 1 }])
    const handleActionBtn = (index) => {
        const actionBtnState = index === 1 ? [{ txt: '返回', value: 2 }, { txt: '确认', value: 3 }] : [{ txt: '关闭', value: 0 }, { txt: '下一步', value: 1 }]
        setActionBtn(actionBtnState)
    }

    const [totleAmount, setTotleAmount] = React.useState(parseFloat(sendValue) + parseFloat(gasfee))
    const handleSendClose = () => {
        props.setSendOpen(false)
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

            <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                disabled
                index={tabValue}
                onChangeIndex={setTabValue}
            >
                <TabPanel value={tabValue} index={0} className={classes.noPadding}>
                    <DialogTitle id="send-dialog-slide-title">
                        <TextField
                            label="输入以太坊地址"
                            variant="outlined"
                            helperText={addressHelper.helperText}
                            fullWidth
                            error={addressHelper.error}
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
                            helperText={`余额：` + balance + `Ether`}
                            value={sendValue}
                            onChange={handleSetSendValue}
                            fullWidth
                            type="number"
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
                            <Button
                                variant={variant[0]}
                                onClick={handleChoseGasfee}
                                value={gasfee / 2}
                                index={0}
                            >
                                慢：{Math.round(gasfee / 2 * 1000000) / 1000000}ETH
                            </Button>
                            <Button
                                variant={variant[1]}
                                onClick={handleChoseGasfee}
                                value={gasfee}
                                index={1}
                            >
                                平均：{Math.round(gasfee * 1000000) / 1000000}ETH
                            </Button>
                            <Button 
                                variant={variant[2]} 
                                onClick={handleChoseGasfee} 
                                value={gasfee * 2} 
                                index={2}
                            >
                                快：{Math.round(gasfee * 2 * 1000000) / 1000000}ETH 
                            </Button>
                        </ButtonGroup>
                    </DialogContent>
                </TabPanel>
                <TabPanel value={tabValue} index={1} className={classes.noPadding}>
                    <DialogContent id="send-dialog-slide-title" className={classes.addressList}>
                        <Grid container spacing={1}>
                            <Grid item xs={6}>
                                <Jazzicon diameter={32} seed={jsNumberForAddress(address)} />
                                <Typography noWrap>{address}</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Jazzicon diameter={32} seed={jsNumberForAddress(toAddress)} />
                                <Typography noWrap>{toAddress}</Typography>
                            </Grid>
                            <ArrowForwardIcon />
                        </Grid>
                    </DialogContent>
                    <Divider className={classes.divider} />
                    <DialogContent className={classes.DialogContent}>
                        <Button variant='outlined' size='small'>
                            <Typography noWrap>发送以太币：</Typography>
                        </Button>
                        <Typography noWrap variant="h3">
                            <EthAlt size={30} /> {parseFloat(sendValue)}
                        </Typography>
                    </DialogContent>
                    <Divider className={classes.divider} />
                    <DialogContent>
                        <Grid container spacing={1}>
                            <Grid item xs={3}>
                                <Typography noWrap variant="subtitle1">
                                    交易费：
                                </Typography>
                            </Grid>
                            <Grid item xs={9}>
                                <Typography noWrap variant="subtitle1" align='right'>
                                    <EthAlt size={14} /> {Math.round(myGasfee * 1000000) / 1000000}
                                </Typography>
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <Divider className={classes.divider} />
                    <DialogContent>
                        <Grid container spacing={1}>
                            <Grid item xs={3}>
                                <Typography noWrap variant="subtitle1">
                                    合计：
                                </Typography>
                            </Grid>
                            <Grid item xs={9}>
                                <Typography noWrap variant="subtitle1" align='right'>
                                    <EthAlt size={14} /> {Math.round(totleAmount * 1000000) / 1000000}
                                </Typography>
                            </Grid>
                        </Grid>
                    </DialogContent>
                </TabPanel>
            </SwipeableViews>
            <Divider className={classes.divider} />
            <DialogContent>
                <Grid container spacing={1}>
                    <Grid item xs={3}>
                        <Button
                            onClick={handleChangeTab}
                            value={actionBtn[0].value}
                            variant='outlined'
                            fullWidth
                            color="default"
                            className={classes.DialogActions}
                        >
                            {actionBtn[0].txt}
                        </Button>
                    </Grid>
                    <Grid item xs={9}>
                        <Button
                            onClick={handleChangeTab}
                            value={actionBtn[1].value}
                            variant='contained'
                            fullWidth
                            color="primary"
                            className={classes.DialogActions}
                        >
                            {actionBtn[1].txt}
                        </Button>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
            </DialogActions>
        </Dialog>
    )
}