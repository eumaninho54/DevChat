import React, { useContext, useState } from 'react';
import { Back, ButtonWrapper, InputWrapper, PasswordWrapper, SafeAreaView, Title, Titles, Wrapper } from './styles';
import Text from '../../../../components/text';
import Logo from '../../../../components/logo';
import LogoPng from '../../../../assets/logo/logo.png'
import { useTranslation } from 'react-i18next';
import LoginInput from '../../../../components/inputs/loginInput';
import Button from '../../../../components/button';
import Icon from '../../../../components/icon';
import { useNavigation } from '@react-navigation/native';
import { IStackNavigation } from '../../../../routes/types';
import { signUpThunk } from '../../../../store/reducers/user/thunks/signUpThunk';
import { Alert } from 'react-native';
import { useAppDispatch } from '../../../../store/hooks';
import { IError } from '../../../../services/api/types';
import { ITheme } from '../../../../styles/colors/types';
import { ThemeContext } from 'styled-components/native';
import { apiError } from '../../../../errors/apiError';
import { AxiosError } from 'axios';


const SignUp: React.FC = () => {
  const { t, i18n } = useTranslation()
  const theme = useContext<ITheme>(ThemeContext)
  const { navigate } = useNavigation<IStackNavigation>()
  const dispatch = useAppDispatch()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const verifyPassword = () => {
    if (password != confirmPassword) {
      setPassword('')
      setConfirmPassword('')
      Alert.alert(
        t('Alert.Title.Error'), 
        t('Login.Different passwords') as string,
      )
      return false
    }
    if (password.length < 8) {
      setPassword('')
      setConfirmPassword('')
      Alert.alert(
        t('Alert.Title.Error'), 
        t('Login.Password must be at least 8 characters long') as string
      )
      return false
    }
    return true
  }

  const onSignUp = async () => {
    if (verifyPassword()) {
      await dispatch(signUpThunk({ email, password }))
        .unwrap()
        .catch((err: AxiosError) => apiError({ err, t }))
    }
  }

  return (
    <SafeAreaView>
      <Back onPress={() => navigate('signIn')}>
        <SafeAreaView>
          <Icon
            color='primaryColor'
            name='angle-left'
            size='extra_big_30'
            family='FontAwesome5' />
        </SafeAreaView>
      </Back>

      <Wrapper>
        <Logo
          resizeMode='contain'
          size='giant_150'
          source={LogoPng} />

        <Titles>
          <Title>
            <Text
              text={t('Login.Welcome to DevChat!')}
              color='primaryFont'
              size='big_18'
              weight='semibold' />
          </Title>

          <Title>
            <Text
              text={t('Login.Keep your data safe!')}
              color='secundaryFont'
              size='normal_16'
              weight='regular' />
          </Title>
        </Titles>

        <InputWrapper>
          <LoginInput
            value={email}
            onChangeValue={setEmail}
            placeholder={t('Login.Email')}
            type={'email'} />

          <PasswordWrapper>
            <LoginInput
              value={password}
              onChangeValue={setPassword}
              placeholder={t('Login.Password')}
              type={'password'} />

            <LoginInput
              value={confirmPassword}
              onChangeValue={setConfirmPassword}
              placeholder={t('Login.Confirm Password')}
              type={'password'} />
          </PasswordWrapper>
        </InputWrapper>

        <ButtonWrapper>
          <Button 
            onPress={onSignUp} 
            text={t('Login.SignUp')} 
            type='solid' 
          />
        </ButtonWrapper>

      </Wrapper>
    </SafeAreaView>
  )
}

export default SignUp;
