import React, { useEffect } from 'react';
import Routes from './routes';
import { ThemeProvider } from 'styled-components';
import { StatusBar, useColorScheme } from 'react-native';
import darkMode from './styles/colors';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import './languages/i18n'
import { Provider } from 'react-redux';
import { store } from './store';
import { authUserThunk } from './store/reducers/user/thunks/authUserThunk';
import OneSignal from 'react-native-onesignal'
import { ONESIGNAL_APP_ID } from '@env'
import usePermissions from './hooks/usePermissions';
import { reactotron } from './config/reactotron';


if (__DEV__) {
  import('./config/reactotron') // Start reactotron in dev
    .then((res) => res.reactotron.log?.("Init dev"))
}

const App: React.FC = () => {
  const { notifications } = usePermissions()
  const deviceTheme = useColorScheme()
  const theme = deviceTheme != null && deviceTheme != undefined
    ? darkMode[deviceTheme]
    : darkMode['light']

  useEffect(() => {
    store.dispatch(authUserThunk())
    notifications()

    OneSignal.setAppId(ONESIGNAL_APP_ID)
    
    OneSignal.setNotificationWillShowInForegroundHandler(event => {
      reactotron.log?.("OneSignal: notification will show in foreground:", event)
      reactotron.log?.("notification: ", event.getNotification())
    })

    OneSignal.setNotificationOpenedHandler(notif => {
      reactotron.log?.(notif, '2')
    })
  }, [])

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <StatusBar animated backgroundColor={theme.primaryColor} />
        <ThemeProvider theme={theme}>
          <Routes />
        </ThemeProvider>
      </SafeAreaProvider>
    </Provider>
  )
}

export default App;
