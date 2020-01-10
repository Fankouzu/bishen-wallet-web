
import React from 'react'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import ethereum from '../assets/images/ethereum.png'
import Button from '@material-ui/core/Button'
import PropTypes from 'prop-types'
import TxList from './TxList'
import Copyright from "./Copyright"
import Deposit from './Deposit'
import Send from './Send'

const useStyles = makeStyles(theme => ({
    root: {
        background: props =>
            props.color === 'red'
                ? 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)'
                : 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
        border: 0,
        borderRadius: 5,
        boxShadow: props =>
            props.color === 'red'
                ? '0 3px 5px 2px rgba(255, 105, 135, .3)'
                : '0 3px 5px 2px rgba(33, 203, 243, .3)',
        color: 'white',
        height: 40,
        padding: '0 30px',
        margin: 8,
    },
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
        background: 'linear-gradient(45deg, #ffe1e0 30%, #ace8f6  90%)',
    },
    appBarSpacer: theme.mixins.toolbar,
    container: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(4),
    },
    avatarBg: {
        background: 'linear-gradient(135deg, #21CBF3 30%, #FE6B8B 90%)',
        width: theme.spacing(14),
        height: theme.spacing(14),
        boxShadow: '2px 2px 10px #666'
    },
    avatar: {
        margin: theme.spacing(1),
        background: '#fff',
        width: theme.spacing(13),
        height: theme.spacing(13),
        '& img': {
            width: theme.spacing(10),
            height: theme.spacing(10)
        }
    },
    main: {
        marginTop: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& h3': {
            marginBottom: theme.spacing(1),
        }
    },
    sendBtn: {
        paddingLeft: theme.spacing(4),
        paddingRight: theme.spacing(4),
        '& div': {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        }
    },
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
    },
    TextField: {
        marginBottom: '10px'
    },
    selectGasfee:{
        marginBottom:'10px'
    },
    divider: {
        marginTop:'15px',
        marginBottom:'15px'
    },
}))

function MyButton(props) {
    const { color, ...other } = props;
    const classes = useStyles(props);
    return <Button className={classes.root} {...other} />
}

MyButton.propTypes = {
    color: PropTypes.oneOf(['blue', 'red']).isRequired,
}


export default function AssetDetail(props) {
    console.log("Render AssetDetail")
    const classes = useStyles()
    const { accounts, currentAccount, ...other } = props
    const address = accounts[currentAccount].address

    
    const [depositOpen, setDepositOpen] = React.useState(false)
    const handleDepositOpen = () => {
        setDepositOpen(true)
    }

    const [sendOpen, setSendOpen] = React.useState(false)
    const handleSendOpen = () => {
        setSendOpen(true)
    }

    //https://faucet.ropsten.be/donate/0x319a0cfD7595b0085fF6003643C7eD685269F851
    return (
        <main className={classes.content}>
            <div className={classes.appBarSpacer} />
            <Container maxWidth="lg" className={classes.container}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Box className={classes.main}>
                            <Avatar className={classes.avatarBg}>
                                <Avatar className={classes.avatar} src={ethereum}>
                                </Avatar>
                            </Avatar>
                        </Box>
                        <Box className={classes.main}>
                            <Typography variant="h3">
                                {Math.round(accounts[currentAccount].balance * 10000) / 10000}ETH
                            </Typography>
                            <Typography variant="subtitle1">
                                {address}
                            </Typography>
                        </Box>
                        <Box className={classes.main}>
                            <Grid container className={classes.sendBtn}>
                                <Grid item xs={6}>
                                    <MyButton color="red" onClick={handleDepositOpen}>存入</MyButton>
                                </Grid>
                                <Grid item xs={6}>
                                    <MyButton color="blue" onClick={handleSendOpen}>发送</MyButton>
                                </Grid>
                            </Grid>
                        </Box>
                        <Box className={classes.main}>
                            <Grid container>
                                <TxList {...other} accounts={accounts} currentAccount={currentAccount}></TxList>
                            </Grid>
                        </Box>
                    </Grid>
                </Grid>
                <Box mt={5}>
                    <Copyright />
                </Box>
            </Container>
            <Deposit 
                {...other} 
                address={address} 
                currentAccount={currentAccount} 
                depositOpen={depositOpen} 
                setDepositOpen={setDepositOpen}
                classes={classes}
            ></Deposit>
            <Send 
                {...other} 
                address={address} 
                currentAccount={currentAccount} 
                setSendOpen={setSendOpen}
                sendOpen={sendOpen}
                accounts={accounts}
                classes={classes}
            ></Send>
        </main>
    )
}