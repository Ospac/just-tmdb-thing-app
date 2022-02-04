import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View, Image, useColorScheme} from 'react-native';
import  AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import {useAssets } from 'expo-asset';
import { 
  NavigationContainer,
} from '@react-navigation/native';
import Root from './navigation/Root.js';
import { ThemeProvider } from 'styled-components/native';
import { DarkTheme, LightTheme } from './styled.js';


export default function App() {
  const [assets] = useAssets([require('./girl.jpg')]);
  const [loaded, error] = Font.useFonts(Ionicons.font);
  const isDark = useColorScheme() === "dark";

  if(!assets || !loaded) return <AppLoading/>
  else 
    return (
      <ThemeProvider theme={isDark? DarkTheme : LightTheme}>
        <NavigationContainer>
          <Root/>
        </NavigationContainer>
      </ThemeProvider>
    )
}
