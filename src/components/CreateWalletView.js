import React from 'react'
import Avatar from '@material-ui/core/Avatar'
import CssBaseline from '@material-ui/core/CssBaseline'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Copyright from "./Copyright"
import { Link as RouterLink } from 'react-router-dom'
import Paper from '@material-ui/core/Paper'
import PasswordView from './PasswordView'


const useStyles = makeStyles(theme => ({

  main: {
    marginTop: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& h1':{
      marginBottom:theme.spacing(2),
    }
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  CardContent:{
    minHeight:170,
    '& div':{
      width: '25%',
      height:40,
      fontSize:30,
      padding:5,
      lineHeight:'30px',
      cursor: 'pointer',
      float:'left',
      marginTop:'10px',
      textAlign:'center',
    }
  },
  CardContent_en:{
    minHeight:170,
    '& div':{
      width: '25%',
      height:40,
      fontSize:18,
      padding:5,
      lineHeight:'30px',
      cursor: 'pointer',
      float:'left',
      marginTop:'10px',
      textAlign:'center',
      fontWeight: 500
    }
  },
  CardActions:{
    margin:0,
    textAlign:'center',
    display:'block',
    fontStyle: 'italic'
  },
  CardActionsError:{
    margin:0,
    textAlign:'center',
    display:'block',
    fontStyle: 'italic',
    color:'rgb(220, 0, 78)!important'
  },
  card: {
    minWidth: 275,
    minHeight:200
  },
  CardError:{
    borderColor: 'rgb(220, 0, 78)!important',
    borderWidth: 1,
    borderStyle: 'dashed',
  },
  wordPaper_zh: {
    display:'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding:'0px!important',
    '& div':{
    },
    '& div>div':{
      width:40,
      height:40,
      fontSize:30,
      padding:5,
      lineHeight:'30px',
      cursor: 'pointer',
      margin:'0px auto',
      marginBottom:'20px'
    }
  },
  wordPaper_en: {
    display:'flex',
    justifyContent:'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingTop:'0px!important',
    paddingBottom:'0px!important',
    '& div':{
      textAlign: 'center',
    },
    '& div>div':{
      height:40,
      fontSize:18,
      padding:5,
      lineHeight:'30px',
      cursor: 'pointer',
      margin:'0px auto',
      marginBottom:'20px',
      display: 'inline-block'
    }
  },
  error:{
    color:'rgb(220, 0, 78)!important',
    '& textarea':{
      color:'rgb(220, 0, 78)!important'
    },
    '& label':{
      fontSize:20
    }
  },
  confirm:{
    paddingBottom:0
  }
}))

export default function CreateWalletView(props) {
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
            创建钱包
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <Paper elevation={3} className={props.state.CardActionsError ? classes.CardError : classes.card}>
                <Grid item xs={12} className={props.state.mnemonic_lang === 'zh' ? classes.CardContent : classes.CardContent_en}>
                {props.state.mnemonic.map((item,index)=>{
                  return(
                    <Grid item  key={index}
                      value={index}
                      onClick={props.removeWord}
                    >
                      {item}
                    </Grid>
                  )
                })}
                </Grid>
                <Typography variant="caption"
                  className={props.state.CardActionsError ? classes.CardActionsError : classes.CardActions}
                  >
                    请按照正确的顺序选择助记词
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} className={props.state.mnemonic_lang === 'zh' ? classes.wordPaper_zh : classes.wordPaper_en}>
              {props.state.randMnemonic.map((item,index)=>{
                return(
                  <Grid 
                    item 
                    xs={3}
                    key={index}
                  >
                    <Paper 
                      elevation={3} 
                      value={index}
                      onClick={props.choseWord}
                      style={{display:props.state.wordDisplay[index]}}
                    >
                      {item}
                    </Paper>
                  </Grid>
                )
              })}
            </Grid>
            <PasswordView Wallet={props.Wallet} createWallet={props.createWallet} action={`创建钱包`}></PasswordView>
          </Grid>
          <Grid container justify="flex-end" spacing={2}>
            <Grid item xs={12}></Grid>
            <Grid item xs>
              <Link to="/ImportWallet" component={RouterLink} variant="body2">
                导入钱包
              </Link>
            </Grid>
            <Grid item>
              <Link to="/" component={RouterLink} variant="body2">
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