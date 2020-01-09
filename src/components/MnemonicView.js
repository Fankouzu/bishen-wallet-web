import React from 'react'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Copyright from "./Copyright"
import CopyToClipboard from 'react-copy-to-clipboard'
import Paper from '@material-ui/core/Paper'
import { Link as RouterLink } from 'react-router-dom'
import PropTypes from 'prop-types'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import SwipeableViews from 'react-swipeable-views'
import FileCopyIcon from '@material-ui/icons/FileCopy'


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
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    copyButton: {
        width: '100%',
    },
    paper: {
        minWidth: 275,
        '& div': {
            padding: 0
        },
        '& h4': {
            letterSpacing: '3.4rem',
            lineHeight: '3rem',
            textAlign: 'end'
        },
        '& h5': {
            lineHeight: '3rem',
            margin: '0px 15px',
            wordSpacing: '15px',
            textAlign: 'justify'
        }
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
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}


export default function MnemonicView(props) {
    console.log("Render MnemonicView")
    const classes = useStyles()
    const theme = useTheme()

    const { mnemonic_zh, mnemonic_en } = props
    const [value, setValue] = React.useState(0)
    const handleChange = (event, newValue) => {
        setValue(newValue)
    }

    const [mnemonicState, setMnemonicState] = React.useState({ useMnemonic: mnemonic_zh, mnemonic_lang: 'zh' })
    React.useEffect(() => {
        setMnemonicState({
            useMnemonic: mnemonic_zh,
            mnemonic_lang: 'zh'
        })
    }, [mnemonic_zh])

    return (
        <Grid container>
            <CssBaseline />
            <Container component="main" maxWidth="xs">
                <Box className={classes.main}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        助记词
                    </Typography>
                    <Grid container spacing={4}>
                        <Grid item xs={12}>
                            <Paper elevation={3} className={classes.paper}>
                                <Tabs
                                    value={value}
                                    onChange={handleChange}
                                    indicatorColor="primary"
                                    textColor="primary"
                                    variant="fullWidth"
                                >
                                    <Tab label="中文助记词" {...a11yProps(0)} />
                                    <Tab label="英文助记词" {...a11yProps(1)} />
                                </Tabs>
                                <SwipeableViews
                                    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                                    index={value}
                                    onChangeIndex={setValue}
                                >
                                    <TabPanel value={value} index={0}>
                                        <Typography variant="h4">
                                            {mnemonic_zh.replace(/ /g, '')}
                                        </Typography>
                                        <Typography align={'center'}>
                                            <CopyToClipboard text={mnemonic_zh}>
                                                <Button
                                                    size="small"
                                                    className={classes.copyButton}
                                                    startIcon={<FileCopyIcon />}
                                                >
                                                    拷贝助记词
                                                </Button>
                                            </CopyToClipboard>
                                        </Typography>
                                    </TabPanel>
                                    <TabPanel value={value} index={1}>
                                        <Typography variant="h5">
                                            {mnemonic_en}
                                        </Typography>
                                        <Typography align={'center'}>
                                            <CopyToClipboard text={mnemonic_en}>
                                                <Button
                                                    size="small"
                                                    className={classes.copyButton}
                                                    startIcon={<FileCopyIcon />}
                                                >
                                                    拷贝助记词
                                                </Button>
                                            </CopyToClipboard>
                                        </Typography>
                                    </TabPanel>
                                </SwipeableViews>
                            </Paper>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                multiline={true}
                                id="outlined-ervror"
                                label="⚠️"
                                value="请抄写或保存助记词，然后进行下一步"
                                variant="outlined"
                                onChange={() => { return false }}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        component={RouterLink}
                        to={{
                            pathname: "./CreateWallet",
                            state: mnemonicState
                        }}
                    >
                        下一步
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item xs>
                            <Link to="./ImportWallet" component={RouterLink} variant="body2">
                                导入钱包
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link to="./" component={RouterLink} variant="body2">
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