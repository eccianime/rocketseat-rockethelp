import { Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { NativeBaseProvider, StatusBar, View } from 'native-base';
import React, { useCallback, useEffect, useState } from 'react';
import Loading from './src/components/Loading';
import Routes from './src/routes';
import { THEME } from './src/styles/theme';

export default function App() {
  const [isAppReady, setAppReady] = useState(false);
  async function _loadAssetsAsync() {
    await SplashScreen.preventAutoHideAsync();
    await Font.loadAsync({
      Roboto_700Bold,
      Roboto_400Regular,
    });
    setAppReady(true);
  }
  useEffect(() => {
    _loadAssetsAsync();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (isAppReady) {
      await SplashScreen.hideAsync();
    }
  }, [isAppReady]);
  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar 
        barStyle='light-content' 
        backgroundColor='transparent'
        translucent 
      />
      {
        isAppReady ?
        <View onLayout={onLayoutRootView} style={{ flex: 1 }}>
            <Routes />
        </View>
      : <Loading />
      }
      </NativeBaseProvider>
  );
}