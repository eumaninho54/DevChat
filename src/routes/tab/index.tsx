import { BottomTabBar, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import React, { useContext, useRef, useState } from 'react';
import { Animated, Dimensions, TouchableOpacity, View } from 'react-native';
import { G, Path } from 'react-native-svg';
import { ThemeContext } from 'styled-components/native';
import Icon from '../../components/icon';
import Add from '../../pages/add';
import Home from '../../pages/home';
import { ITheme } from '../../styles/colors/types';
import { MenuIcon, MenuButton, AddWrapper, IconWrapper, SafeAreaView, Svg, Wrapper, ItemIcon, ItemsWrapper } from './styles';
import { TabParamList, CustomTabBarButtonProps, TabScreenNavigationProps } from './types';

const { Navigator, Screen } = createBottomTabNavigator<TabParamList>()

export const TabNav: React.FC = () => {
  const { navigate } = useNavigation<TabScreenNavigationProps>()
  const theme = useContext<ITheme>(ThemeContext)
  const animation = useRef(new Animated.Value(0)).current
  const [isOpenMenu, setIsOpenMenu] = useState(false)
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [modalType, setModalType] = useState<'User' | 'Group'>('User')


  const bottom = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 115]
  })

  const rotation = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '45deg']
  })

  const onToggleMenu = () => {
    const toValue = isOpenMenu ? 0 : 1

    Animated.spring(animation, {
      toValue,
      friction: 5,
      useNativeDriver: false
    }).start()

    setIsOpenMenu(!isOpenMenu)
  }

  const CustomTabBarButton = (props: CustomTabBarButtonProps) => {
    return (
      <>
        <Add 
          isVisible={isOpenModal} 
          setVisible={setIsOpenModal}
          type={modalType}/>

        <AddWrapper>
          <Svg
            width={97.5} height={79.3} viewBox="0 0 97.5 79.3"
            color={theme.secundaryBackground}>
            <G transform={'scale(1.3)'}>
              <Path
                d="M75.2 0v61H0V0
                c4.1 0 7.4 3.1 7.9 7.1C10 21.7 22.5 33 37.7 33
                c15.2 0 27.7-11.3 29.7-25.9.5-4 3.9-7.1 7.9-7.1
                h-.1z"
                fill={theme.secundaryBackground} />
            </G>
          </Svg>

          <MenuButton
            activeOpacity={1}
            onPress={onToggleMenu}>
            <MenuIcon
              style={{ transform: [{ rotate: rotation }] }}>
              {props.children}
            </MenuIcon>
          </MenuButton>
        </AddWrapper>

        <ItemsWrapper
          style={{
            bottom: bottom,
            transform: [
              { scale: animation }
            ]
          }}
          pointerEvents='box-none'>
          <ItemIcon
            onPress={() => { 
              onToggleMenu()
              setModalType('User')
              setIsOpenModal(true)
            }}
            style={{ elevation: 4 }}>
            <Icon
              solid
              family='FontAwesome5'
              name='user'
              color='primaryColor'
              size='normal_20' />
          </ItemIcon>

          <ItemIcon
            onPress={() => { 
              onToggleMenu()
              setModalType('Group')
              setIsOpenModal(true) 
            }}
            style={{ elevation: 4 }}>
            <Icon
              solid
              family='FontAwesome5'
              name='users'
              color='primaryColor'
              size='normal_20' />
          </ItemIcon>
        </ItemsWrapper>
      </>
    )
  }

  return (
    <SafeAreaView
      edges={['bottom']}>
      <Wrapper>
        <Navigator
          initialRouteName='Home'
          sceneContainerStyle={{ backgroundColor: theme.secundaryBackground }}
          screenOptions={{
            headerShadowVisible: false,
            headerShown: false,
            tabBarShowLabel: false,
            tabBarStyle: {
              backgroundColor: theme.secundaryBackground,
              height: 70,
              paddingBottom: 0,
              borderTopWidth: 0,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
            }
          }}>
          <Screen
            name='Home'
            component={Home}
            options={{
              tabBarIcon: ({ focused }) => (
                <View>
                  <Icon
                    family='Ionicons'
                    name={focused ? 'chatbubbles' : 'chatbubbles-outline'}
                    size={'extra_big_30'}
                    color={focused ? 'primaryColor' : 'secundaryFont'} />
                </View>
              )
            }} />

          <Screen
            name='Add'
            component={Add}
            options={{
              tabBarIcon: () => (
                <IconWrapper>
                  <Icon
                    family='Ionicons'
                    name={'add'}
                    size={'giant_35'}
                    color={'white'} />
                </IconWrapper>
              ),
              tabBarButton: (props) => (
                <CustomTabBarButton {...props} />
              )
            }} />

          <Screen
            name='Settings'
            component={Home} // Test
            options={{
              tabBarIcon: ({ focused }) => (
                <View>
                  <Icon
                    family='Ionicons'
                    name={focused ? 'settings' : 'settings-outline'}
                    size={'extra_big_30'}
                    color={focused ? 'primaryColor' : 'secundaryFont'} />
                </View>
              )
            }} />
        </Navigator>
      </Wrapper>
    </SafeAreaView>
  )
}
