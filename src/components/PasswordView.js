import React, { Component,Fragment } from 'react'
import Grid from '@material-ui/core/Grid'
import FormHelperText from '@material-ui/core/FormHelperText'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

class Password extends Component {
    constructor(props) {
        super(props)
        this.state = { 
            passwordError:false,
            errorMsg:'',
            password:'',
            confirmPassword:'',
            passwordMatch:false
        }
        this.props = props
        this.checkPassword = this.checkPassword.bind(this)
        this.typePassword = this.typePassword.bind(this)
        this.typeConfirmPassword = this.typeConfirmPassword.bind(this)
    }
    
    componentDidMount(){
    }

    checkPasswordLevel(value,level){
        // 0： 表示第一个级别 1：表示第二个级别 2：表示第三个级别
        // 3： 表示第四个级别 4：表示第五个级别
        var arr=[],array=[1,2,3,4];
        if(value.length < 8 || value.length > 20){//最初级别
            return 0;
        }
        if(/\d/.test(value)){//如果用户输入的密码 包含了数字
            arr.push(1);
        }
        if(/[a-z]/.test(value)){//如果用户输入的密码 包含了小写的a到z
            arr.push(2);
        }
        if(/[A-Z]/.test(value)){//如果用户输入的密码 包含了大写的A到Z
            arr.push(3);
        }
        if(/\W/.test(value)){//如果是非数字 字母 下划线
            arr.push(4);
        }
        for(var i=0;i<level;i++){
            if(arr.indexOf(array[i])===-1){
                return array[i];
            }
        }
        return level;
    }
    checkPassword(){
    //检验密码为空
        if(this.state.password!==''){
            //检验密码相同 
            if(this.state.password!==this.state.confirmPassword){
                this.setState({
                    passwordError:true,
                    errorMsg:'密码不相同'
                }) 
                //密码非空
            }else{
                this.setState({passwordError:false,errorMsg:''})
                const passwordLevel = 3
                var passwordTest = this.checkPasswordLevel(this.state.password,passwordLevel)
                //密码难度未到级别
                if(passwordTest<passwordLevel){
                    this.setState({
                        passwordError:true,
                        errorMsg:'密码需要最少8位，并且包含数字、大写、小写字母'
                    }) 
                //密码难度达到级别
                }else{
                    this.setState({passwordError:false,errorMsg:''})
                    /////////
                    this.props.Wallet(this.state.password)
                }
            }
        }
    }
    
    typePassword(event){
        this.setState({
            password:event.target.value
        })
    }
    typeConfirmPassword(event){
        this.setState({
            confirmPassword:event.target.value,      
            passwordMatch:this.state.password !== event.target.value
        })
    }
    render() { 
        return( 
            <Fragment>
                <Grid item xs={12}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        name="password"
                        label="密码"
                        type="password"
                        id="password"
                        autoComplete="current-password" 
                        onChange={this.typePassword}
                        value={this.state.password}
                        error={this.state.passwordError}
                    />
                </Grid>
                <Grid item xs={12} style={{paddingBottom:'0px'}}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        name="confirm-password"
                        label="确认密码"
                        type="password"
                        id="confirm-password"
                        autoComplete="current-password"
                        error={this.state.passwordError}
                        onChange={this.typeConfirmPassword}
                        value={this.state.confirmPassword}
                    />
                    <FormHelperText 
                        id="component-error-text" 
                        error={this.state.passwordError}
                    >
                        {this.state.errorMsg}
                    </FormHelperText>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        error
                        fullWidth
                        multiline={true}
                        id="outlined-ervror"
                        label="⚠️"
                        value="密码只保存在你的浏览器记忆中，一旦丢失无法找回，请备份或抄写下助记词，下次可以使用助记词恢复钱包"
                        variant="outlined"
                        onChange={()=>{return false}}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={this.checkPassword}
                    >
                        {this.props.action}
                    </Button>
                </Grid>
            </Fragment>
        )
    }
}
 
export default Password