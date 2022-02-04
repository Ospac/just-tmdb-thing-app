import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const ScreenOne = ({navigation : {navigate}}) => 
    <TouchableOpacity onPress={() => navigate("two")}>
        <Text>one</Text>
    </TouchableOpacity>
const ScreenTwo = ({navigation : {navigate}}) => 
    <TouchableOpacity onPress={() => navigate("thr")}>
        <Text>Two</Text>
    </TouchableOpacity>
const ScreenThr = ({navigation : {navigate}}) => 
    <TouchableOpacity>
        <Text>Thr</Text>
    </TouchableOpacity>

const NativeStack = createNativeStackNavigator();
const Stacks = () => {
    return(
        <NativeStack.Navigator 
            screenOptions={{
                headerBackTitleVisible: false,
                // presentation: "modal",
            }}>
            <NativeStack.Screen name="one"  component={ScreenOne}/>
            <NativeStack.Screen name="two"  component={ScreenTwo}/>
            <NativeStack.Screen name="thr"  component={ScreenThr}
                options={{
                    // presentation: "modal",
                }}/>
        </NativeStack.Navigator>
    )
}
export default Stacks;