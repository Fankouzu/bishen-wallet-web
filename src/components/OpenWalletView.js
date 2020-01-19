import React from 'react'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormHelperText from '@material-ui/core/FormHelperText'
import Checkbox from '@material-ui/core/Checkbox'
import Link from '@material-ui/core/Link'
import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Copyright from "./Copyright"
import { Link as RouterLink } from 'react-router-dom'
import bgImg from '../assets/images/bgImg.jpg'
import cookie from 'react-cookies'
import { aesDecrypt, sha1 } from '../utils/Aes'
import { validateMnemonic } from '../utils/Tools'

const useStyles = makeStyles(theme => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: 'url(' + bgImg + ')',
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'dark' ? theme.palette.grey[900] : theme.palette.grey[50],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}))

export default function OpenWalletView() {
    const classes = useStyles()

    const [remember, setRemember] = React.useState(false)
    const changeRemember = event => {
        setRemember(event.target.checked)
    }

    const [password, setPassword] = React.useState('')
    const typePassword = event => {
        setPassword(event.target.value)
    }

    const [errorState, setError] = React.useState({ error: false, errorMsg: '' })
    const unlockWallet = () => {
        if (password === '') {
            setError({ error: true, errorMsg: '请输入密码' })
        } else {
            let encrypt = localStorage.getItem("encrypt")
            if (!encrypt) {
                setError({ error: true, errorMsg: '找不到本地钱包，请导入或创建钱包' })
            } else {
                var mnemonic = aesDecrypt(encrypt, sha1(password))
                var bool = validateMnemonic(mnemonic)
                if (!bool) {
                    setError({ error: true, errorMsg: '密码或钱包错误，请导入或创建钱包' })
                } else {
                    var days = remember ? 7 : 1
                    const expires = new Date()
                    expires.setDate(Date.now() + 1000 * 60 * 60 * 24 * days)
                    cookie.save('password', sha1(password).toString(), { path: '/', expires: expires })
                    window.location.href = "./Wallet"
                }
            }
        }
    }
    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={7} className={classes.image} />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        打开钱包
                    </Typography>
                    <form className={classes.form} noValidate>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="密码"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={typePassword}
                            value={password}
                            error={errorState.error}
                        />
                        <FormHelperText id="component-error-text" error={errorState.error}>{errorState.errorMsg}</FormHelperText>
                        <FormControlLabel
                            control={<Checkbox value={remember} checked={remember} onChange={changeRemember} color="primary" />}
                            label="记住密码"
                        />
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={unlockWallet}
                        >
                            打开
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link to="/ImportWallet" component={RouterLink} variant="body2">
                                    导入钱包
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link to="/Mnemonic" component={RouterLink} variant="body2">
                                    创建钱包
                                </Link>
                            </Grid>
                        </Grid>
                        <Box mt={5}>
                            <Copyright />
                        </Box>
                    </form>
                </div>
            </Grid>
        </Grid>
    )
}