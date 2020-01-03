import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import FormControl from '@material-ui/core/FormControl'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider'
import Fade from '@material-ui/core/Fade'
import Typography from '@material-ui/core/Typography'

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
      height:40,
      marginLeft:'-75px',
      position: 'absolute',
      top: '0px',
      left: '50%',
      '& .MuiSelect-filled.MuiSelect-filled':{
        padding:12
      }
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    right:{
      position: 'absolute',
      right:10,
      padding: 0,
      border: '2px solid'
    },
    menu:{
      '& .MuiMenu-paper':{
        background:'#000',
        opacity:'0.8!important',
        color:'#aaa',
        width:260
      }
    },
    divider:{
      background:"#999"
    },
    firstItem:{
      paddingTop:0,
      minHeight: 30
    },
    itemicon:{
      minWidth:30,
      margin:5
    }
}))
const MenuProps = {
  PaperProps: {
    style: {
      background:'#000',
      opacity:'0.8',
      color:'#aaa'
    }
  }
}
export default function Dashboard(props) {
    const classes = useStyles()
    const [anchorEl, setAnchorEl] = React.useState(null)
    const handleClick = event => {
      setAnchorEl(event.currentTarget)
    }
  
    const handleClose = () => {
      setAnchorEl(null)
    }
    return (
        <AppBar position="absolute" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={props.toggleDrawer()}
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
              value={props.state.network}
              defaultValue={props.state.network}
              onChange={props.handleChange}
            >
              {props.state.networks.map((item,index)=>{
                return(
                  <MenuItem className={classes.menuitem} key={index} value={index}>{item}</MenuItem>
                )
              })}
            </Select>
          </FormControl>
          <IconButton 
            color="inherit" 
            className={classes.right} 
            aria-haspopup="true"
            aria-controls="simple-menu"
            onClick={handleClick}
          >
            <Jazzicon diameter={35} seed= {jsNumberForAddress(props.state.accounts[0] || '0x0')}/>
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
            {props.state.accounts.map((item,index)=>{
              return(
              <MenuItem onClick={handleClose} key={index}>
                
                <Grid container spacing={1}>  
                  <Grid item xs={2}>
                    <ListItemIcon className={classes.itemicon}>
                      <Jazzicon diameter={24} seed= {jsNumberForAddress(item || '0x0')}/>
                    </ListItemIcon>
                  </Grid>
                  <Grid item xs={10}>
                    <Grid container spacing={0}>  
                      <Grid item xs={12}>
                        Account {index+1}
                      </Grid>
                      <Grid item xs={12}>
                        <Typography noWrap>{item}</Typography>
                      </Grid>
                    </Grid>
                  </Grid>
              </Grid>
              </MenuItem>
              )
            })}
          </Menu>
        </Toolbar>
      </AppBar>
    )
}