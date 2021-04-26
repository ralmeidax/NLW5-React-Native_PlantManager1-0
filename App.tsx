import React, { useEffect } from 'react';
import AppLoading from 'expo-app-loading';
import * as Notifications from 'expo-notifications';

// import { Welcome } from './src/pages/Welcome';
//import { UserIdentification } from './src/pages/UserIdentification';
import Routes from './src/routes';
import { PlantProps } from './src/libs/storage';

import {
  useFonts,
  Poppins_400Regular,
  Poppins_600SemiBold
} from '@expo-google-fonts/poppins';



export default function App() {
  const [ fontsLoaded ] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold
  });

  useEffect(() => {
    const subscription = Notifications.addNotificationReceivedListener(
      async notification => {
        const data = notification.request.content.data.plant as PlantProps;
        console.log(data);
      });

      return () => subscription.remove();

    //async function notifications() {
      //await Notifications.cancelAllScheduledNotificationsAsync();
      // const data = await Notifications.getAllScheduledNotificationsAsync();
      // console.log("####### NOTIFICACÕES AGENDADAS");
      // console.log(data);

     // console.log('Meu App');
    //}
  },[])


  if(!fontsLoaded)
    return <AppLoading />


  return (
   <Routes />
  )
}

