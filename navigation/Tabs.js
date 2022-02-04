import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useColorScheme } from 'react-native';
import  {colors} from './colors.js';
import { Ionicons } from '@expo/vector-icons';
import Movie from '../screens/Movie.tsx';
import Search from '../screens/Search';
import Tv from "../screens/Tv";
import React from 'react';

const Tab = createBottomTabNavigator();
const Tabs = () => {
    const isDark = useColorScheme() === "dark";
    return(
        <Tab.Navigator 
            sceneContainerStyle={{
                backgroundColor: isDark? colors.DarkBlack : "white"
            }}
            screenOptions={{
                unmountOnBlur : true,
                tabBarStyle:{
                    backgroundColor: isDark? colors.DarkBlack : "white"
                },
                tabBarLabelStyle:{
                    marginTop: -5,
                    fontSize: 11    ,
                    fontWeight: "400",
                },
                tabBarActiveTintColor: isDark? colors.LightBlue : colors.Darkblue,
                tabBarInactiveTintColor: isDark? colors.LightGray : colors.DarkGray,
                headerStyle:{
                    backgroundColor: isDark? colors.DarkBlack : "white"
                },
                headerTitleStyle:{
                    color: isDark? colors.LightGray : colors.DarkBlack
                },
            }}>
            <Tab.Screen name="Movie" component={Movie} options={{
                tabBarIcon : ({focused, color, size}) => (
                     <Ionicons
                        name= {focused? "film" : "film-outline"}
                        color={color }
                        size={size} />
                )
            }}/>
            <Tab.Screen name="TV" component={Tv} options={{
                tabBarIcon : ({focused, color, size}) => 
                    <Ionicons 
                        name= {focused?  "tv" : "tv-outline"}
                        color={color}
                        size={size} />
                
            }}/>
            <Tab.Screen name="Search" component={Search} options={{
                tabBarIcon : ({focused, color, size}) => 
                    <Ionicons 
                        name= {focused? "search" : "search-outline"}
                        color={color}
                        size={size} />
                
            }}/>
        </Tab.Navigator>
    )
}
export default Tabs 