import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Detail from '../screens/Detail';

const NativeStack = createNativeStackNavigator();
const Stacks = () => {
    return(
        <NativeStack.Navigator 
            screenOptions={{
                headerBackTitleVisible: false,
                // presentation: "modal",
            }}>
            <NativeStack.Screen name="Detail"  component={Detail}/>
        </NativeStack.Navigator>
    )
}
export default Stacks;