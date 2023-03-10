import React from 'react';
import { useAppSelector } from '../../store/hooks';
import Icon from '../icon';
import { IProps } from './types';


const Check: React.FC<IProps> = (props) => {
  const { message } = props
  const user = useAppSelector((store) => store.user)

  const check = () => {
    if (message.senderId == user.id) {
      if (message?.isReceived && message?.isRead)
        return (
          <Icon
            family='Ionicons'
            color='focused'
            name='checkmark-done'
            size='normal_20' />
        )

      else if (message.isReceived)
        return (
          <Icon
            family='Ionicons'
            color='secundaryFont'
            name='checkmark-done'
            size='normal_20' />
        )

      else return (
        <Icon
          family='Ionicons'
          color='secundaryFont'
          name='checkmark'
          size='normal_20' />
      )
    }

    return <></>
  }

  return (
    <>
      {check()}
    </>
  )
}

export default Check;
