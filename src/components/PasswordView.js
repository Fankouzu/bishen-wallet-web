import React, { Fragment } from 'react'
import Grid from '@material-ui/core/Grid'
import FormHelperText from '@material-ui/core/FormHelperText'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

export default function Password(props) {
    console.log("Render Password")
    const checkPasswordLevel = (value, level) => {
        // 0： 表示第一个级别 1：表示第二个级别 2：表示第三个级别
        // 3： 表示第四个级别 4：表示第五个级别
        var arr = [], array = [1, 2, 3, 4];
        if (value.length < 8 || value.length > 20) {//最初级别
            return 0;
        }
        if (/\d/.test(value)) {//如果用户输入的密码 包含了数字
            arr.push(1);
        }
        if (/[a-z]/.test(value)) {//如果用户输入的密码 包含了小写的a到z
            arr.push(2);
        }
        if (/[A-Z]/.test(value)) {//如果用户输入的密码 包含了大写的A到Z
            arr.push(3);
        }
        if (/\W/.test(value)) {//如果是非数字 字母 下划线
            arr.push(4);
        }
        for (var i = 0; i < level; i++) {
            if (arr.indexOf(array[i]) === -1) {
                return array[i];
            }
        }
        return level;
    }
    const [password, setPasswd] = React.useState('')
    const typePassword = (event) => {
        setPasswd(
            event.target.value
        )
        setPasswordStatus({
            passwordError: false, errorMsg: ''
        })
    }
    const [confirmPassword, setconfirmPassword] = React.useState('')
    const typeConfirmPassword = (event) => {
        setconfirmPassword(
            event.target.value
        )
        setPasswordStatus({
            passwordError: false, errorMsg: ''
        })
    }
    const [passwordStatus, setPasswordStatus] = React.useState({ passwordError: false, errorMsg: '' })
    const checkPassword = () => {
        if (password === '' && confirmPassword === '') {
            setPasswordStatus({
                passwordError: true, errorMsg: '没有密码'
            })
        } else {
            //检验密码相同 
            if (password !== confirmPassword) {
                setPasswordStatus({
                    passwordError: true, errorMsg: '密码不相同'
                })
            } else {
                setPasswordStatus({
                    passwordError: false, errorMsg: ''
                })
                const passwordLevel = 3
                const passwordTest = checkPasswordLevel(password, passwordLevel)
                if (passwordTest < passwordLevel) {
                    setPasswordStatus({
                        passwordError: true,
                        errorMsg: '密码需要最少8位，并且包含数字、大写、小写字母'
                    })
                    //密码难度达到级别
                } else {
                    setPasswordStatus({ passwordError: false, errorMsg: '' })
                    props.Wallet(password)
                }
            }
        }
    }

    return (
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
                    onChange={typePassword}
                    value={password}
                    error={(password !== confirmPassword && confirmPassword !== '') || passwordStatus.passwordError}
                />
            </Grid>
            <Grid item xs={12} style={{ paddingBottom: '0px' }}>
                <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="confirm-password"
                    label="确认密码"
                    type="password"
                    id="confirm-password"
                    autoComplete="current-password"
                    onChange={typeConfirmPassword}
                    value={confirmPassword}
                    error={(password !== confirmPassword && confirmPassword !== '') || passwordStatus.passwordError}
                />
                <FormHelperText
                    id="component-error-text"
                    error={passwordStatus.passwordError}
                >
                    {passwordStatus.errorMsg}
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
                    onChange={() => { return false }}
                />
            </Grid>
            <Grid item xs={12}>
                <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={checkPassword}
                >
                    {props.action}
                </Button>
            </Grid>
        </Fragment>
    )
}
