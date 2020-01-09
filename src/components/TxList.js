import React, { Fragment } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Divider from '@material-ui/core/Divider'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Typography from '@material-ui/core/Typography'
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon'
import { Eth } from 'react-cryptocoins'
import moment from "moment"

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
        padding:0
    },
    inline: {
        display: 'inline',
    },
    mainItem:{
        paddingTop:0
    },
    topItem:{
        paddingBottom:0
    },
    listItem:{
        '& span':{
            lineHeight:'24px',
            fontSize:'1rem'
        },
        '& div':{
            width:50,
            textAlign:'center',
            fontSize:10,
            height:20,
            lineHeight:'14px',
            marginTop:'8px'
        }
    },
    status:{
        background:theme.palette.success.main,
        padding:'2px 4px',
        borderRadius: 3,
    },
    statusError:{
        background:theme.palette.error.main,
        padding:'2px 4px',
        borderRadius: 3,
    },
    listItemRight:{
        lineHeight:'24px',
        textAlign:'right'
    },
    value:{
        fontSize: '1rem',
        fontWeight:400
    },
    gasFee:{
        lineHeight:'30px'
    }
}))

export default function TxList(props) {
    console.log("Render TxList")
    const classes = useStyles()
    const { txlist } = props
    
    return (
        <List className={classes.root}>
            {txlist.map((item, index) => {
                return(
                    <Fragment key={index}>
                        <ListItem alignItems="flex-start" className={classes.topItem}>
                            <Typography
                                variant="caption"
                                color="textPrimary"
                            >
                                #{item.nonce} - {moment(parseInt(item.timeStamp)*1000).format('YYYY-MM-DD LT')}
                            </Typography>
                        </ListItem>
                        <ListItem alignItems="flex-start" className={classes.mainItem}>
                            <ListItemAvatar>
                                {item.to === '' ? 
                                    <Eth size={36}/>
                                :
                                    <Jazzicon diameter={36} seed={jsNumberForAddress(item.to)} />
                                }
                            </ListItemAvatar>
                            <ListItemText
                                primary={item.inputData}
                                className={classes.listItem}
                                secondary={
                                    <Typography
                                        component="div"
                                        className={item.isError === 1 ? classes.statusError : classes.status}
                                    >
                                        {item.isError === 1 ? `错误` : `确认`}
                                    </Typography>
                                }
                            />
                            <ListItemText
                                primary={
                                    <Typography
                                        variant="body2"
                                        className={classes.value}
                                        color="textPrimary"
                                    >
                                        {item.value}
                                    </Typography>
                                }
                                className={classes.listItemRight}
                                component="div"
                                secondary={
                                    <Typography
                                        variant="body2"
                                        className={classes.gasFee}
                                        color="textPrimary"
                                    >
                                        Gas：{item.gasFee}
                                    </Typography>
                                }
                            />
                        </ListItem>
                        <Divider component="li" />
                    </Fragment>
                )})
            }
        </List>
    )
}
