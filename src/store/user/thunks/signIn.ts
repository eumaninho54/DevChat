import { initialState } from './../initialState';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ActionReducerMapBuilder} from '@reduxjs/toolkit';
import {createAsyncThunk} from '@reduxjs/toolkit';
import { Api } from '../../../services/api';
import { GetUserProps } from '../../../services/api/types';
import { IUser } from '../types';
import axios from 'axios';

export const signIn = createAsyncThunk('signIn', async (props: GetUserProps) => {
  try {
    const req = await new Api().getUser(props)

    await AsyncStorage.setItem('refreshToken', req.refreshToken)

    return req
  } 
  catch (err) {
    if(axios.isAxiosError(err)){
      throw err.response?.data['message']
    }
    throw ''
  }
});

export const signInBuilder = (builder: ActionReducerMapBuilder<IUser>) => {
  builder
    .addCase(signIn.fulfilled, (state, action) => {
      return action.payload
    })

    .addCase(signIn.rejected, (state, action) => {
      return initialState
    });
};
