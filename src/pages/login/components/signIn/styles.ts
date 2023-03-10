import { ITheme } from './../../../../styles/colors/types';
import { SafeAreaView as safeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";
import { ISignInStyles } from "../../types";


type SafeAreaViewProps = {
  theme: ITheme
}

export const SafeAreaView = styled(safeAreaView)`
  background-color: ${({theme}: SafeAreaViewProps) => theme.primaryLoginBackground };
  flex: 1;
`

export const Wrapper = styled.KeyboardAvoidingView`
  flex: 1;
  padding: 20px;
  background-color: ${(props: ISignInStyles) => props.theme.primaryLoginBackground };  
  align-items: center;
  justify-content: center;
`

export const Titles = styled.View`
  align-items: center;
  justify-content: center;
  margin-bottom: 15px;
`

export const Title = styled.View`
  margin-bottom: 5px;
`

export const InputWrapper = styled.View`
  height: 150px;
  align-items: center;
  justify-content: space-evenly;
  margin-top: 20px;
`

export const ButtonWrapper = styled.View`
  height: 110px;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
  margin-top: 20px;
`

export const HaveAccount = styled.View`
  flex-direction: row;
  bottom: 0;
  align-items: center;
  justify-content: center;
  margin-bottom: 15px;

`

export const Register = styled.TouchableOpacity`
  margin-left: 5px;
`


