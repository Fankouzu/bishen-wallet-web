import React from 'react'
import Avatar from '@material-ui/core/Avatar'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Copyright from "./Copyright"
import PasswordView from './PasswordView'
import FormHelperText from '@material-ui/core/FormHelperText'
import { validateMnemonic } from '../utils/Tools'
import { aesEncrypt, sha1 } from '../utils/Aes'


const useStyles = makeStyles(theme => ({
    main: {
        marginTop: theme.spacing(4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& h1': {
            marginBottom: theme.spacing(2),
        }
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    card: {
        minWidth: 275,
        '& textarea': {
            fontSize: '44px',
            lineHeight: '54px',
            textAlign: 'justify',
            height: '120px',
        }
    },
    title: {
        fontSize: 14,
    },
    error: {
        color: 'rgb(220, 0, 78)!important',
        '& textarea': {
            color: 'rgb(220, 0, 78)!important'
        },
        '& label': {
            fontSize: 20
        }
    },
    mnemonic:{
        '& textarea': {
            fontSize:20,
            lineHeight:'30px',
            textAlign:'center'
        },
    }
}))

export default function ImportWalletView(props) {
    console.log("Render ImportWalletView")
    const [mnemonic, setMnemonic] = React.useState('')
    const typeMnemonic = event => {
        setMnemonic(event.target.value)
    }

    const [mnemonicErrorState, setMnemonicError] = React.useState({ error: false, errorMsg: '' })

    const Wallet = (password) => {
        var bool = validateMnemonic(mnemonic)
        if (!bool) {
            setMnemonicError({ error: true, errorMsg: '助记词不正确' })
        } else {
            var encrypt = aesEncrypt(mnemonic, sha1(password))
            localStorage.setItem("encrypt", encrypt)
            document.cookie = "password=" + sha1(password)
            window.location.href = "./Wallet"
        }
    }
    
    const classes = useStyles()
    return (
        <Grid container>
            <CssBaseline />
            <Container component="main" maxWidth="xs">
                <Box className={classes.main}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        导入钱包
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                multiline={true}
                                rows='3'
                                required
                                fullWidth
                                name="mnemonic"
                                label="输入助记词"
                                type="text"
                                id="mnemonic"
                                className={classes.mnemonic}
                                error={mnemonicErrorState.error}
                                onChange={typeMnemonic}
                                value={mnemonic}
                            />
                            <FormHelperText
                                id="component-error-text"
                                error={mnemonicErrorState.error}
                            >
                                {mnemonicErrorState.errorMsg}
                            </FormHelperText>
                        </Grid>
                        <PasswordView Wallet={Wallet} action={`导入钱包`}></PasswordView>
                    </Grid>
                    <Grid container justify="flex-end" spacing={2}>
                        <Grid item xs={12}></Grid>
                        <Grid item xs>
                            <Link href="./Mnemonic" variant="body2">
                                创建钱包
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="./" variant="body2">
                                打开钱包
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
                <Box mt={5}>
                    <Copyright />
                </Box>
            </Container>
        </Grid>
    )
}