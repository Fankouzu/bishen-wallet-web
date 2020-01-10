import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import AccountMenu from './AccountMenu'


const useStyles = makeStyles(theme => ({
    toolbar: {
        paddingRight: 24,
    },
    formControl: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        minWidth: 150,
        background: '#d2d9f8',
        borderRadius: '5px',
        height: 40,
        marginLeft: '-75px',
        position: 'absolute',
        top: '0px',
        left: '50%',
        '& .MuiSelect-filled.MuiSelect-filled': {
            padding: 12
        }
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        })
    }
}))
const MenuProps = {
    PaperProps: {
        style: {
            background: '#000',
            opacity: '0.8',
            color: '#aaa'
        }
    }
}
export default function MyToolbar(props){
    console.log("Render MyToolbar")
    const classes = useStyles()
    const {networks, ...other} = props

    const [networkId,setNetworkId] = React.useState(props.networkId)
    const handleChange = (event) => {
        setNetworkId(event.target.value)
        props.getBalance(event.target.value)
    }

    return (
        <AppBar position="absolute" className={classes.appBar}>
            <Toolbar className={classes.toolbar}>
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="open drawer"
                    onClick={props.toggleDrawer(true)}
                    className={classes.menuButton}
                >
                    <MenuIcon />
                </IconButton>

                <FormControl variant="filled" size={'small'} className={classes.formControl}>
                    <Select
                        disableUnderline={true}
                        className={classes.select}
                        MenuProps={MenuProps}
                        displayEmpty
                        value={networkId}
                        defaultValue={networkId}
                        onChange={handleChange}
                    >
                        {networks.map((item, index) => {
                            return (
                                <MenuItem className={classes.menuitem} key={index} value={index}>{item.nameCN}</MenuItem>
                            )
                        })}
                    </Select>
                </FormControl>
                <AccountMenu networks={networks} {...other}></AccountMenu>
            </Toolbar>
        </AppBar>
    )
}