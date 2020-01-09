import React, { Fragment } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider'
import Fade from '@material-ui/core/Fade'
import Typography from '@material-ui/core/Typography'
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon'
import IconButton from '@material-ui/core/IconButton'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'

const useStyles = makeStyles({
    right: {
        position: 'absolute',
        right: 10,
        padding: 0,
        border: '2px solid'
    },
    menu: {
        '& .MuiMenu-paper': {
            background: '#000',
            opacity: '0.8!important',
            color: '#aaa',
            width: 260
        }
    },
    divider: {
        background: "#999"
    },
    firstItem: {
        paddingTop: 0,
        minHeight: 30
    },
    itemicon: {
        minWidth: 30,
        margin: 5
    }
})

export default function AccountMenu(props) {
    console.log("Render AccountMenu")
    const classes = useStyles()
    const [anchorEl, setAnchorEl] = React.useState(null)
    const handleClick = event => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }
    const {accounts,currentAccount} = props
    const choseAccount = (event) =>{
        setAnchorEl(null)
        props.choseAccount(event)
    }
    return (
        <Fragment>
            <IconButton
                color="inherit"
                className={classes.right}
                aria-haspopup="true"
                aria-controls="simple-menu"
                onClick={handleClick}
            >
                {
                    props.accounts[0].address !== '0x0' ?
                        <Jazzicon diameter={35} seed={jsNumberForAddress(accounts[currentAccount].address)} />
                        :
                        <AccountCircleIcon style={{ fontSize: 35 }} />
                }
            </IconButton>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                className={classes.menu}
                TransitionComponent={Fade}
            >
                <MenuItem onClick={handleClose} className={classes.firstItem}>
                    我的账户
            </MenuItem>
                <Divider className={classes.divider} />
                {accounts.map((item, index) => {
                    return (
                        <MenuItem onClick={choseAccount} key={index} index={index}>
                            <Grid container spacing={1}>
                                <Grid item xs={2}>
                                    <ListItemIcon className={classes.itemicon}>
                                        <Jazzicon diameter={24} seed={jsNumberForAddress(item.address || '0x0')} />
                                    </ListItemIcon>
                                </Grid>
                                <Grid item xs={10}>
                                    <Grid container spacing={0}>
                                        <Grid item xs={12}>
                                            <Typography noWrap>账户 {index + 1}&nbsp;&nbsp;<small><em>余额：{item.balance}</em></small></Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Typography noWrap>{item.address}</Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </MenuItem>
                    )
                })}
            </Menu>
        </Fragment>
    )
}