import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Tabs from './Tabs';
import Stacks from './Stacks';

const RootStack = createNativeStackNavigator();
const Root = () => {
    return(
        <RootStack.Navigator
            screenOptions={{
                headerShown : false,
                presentation: "modal"
            }}>
            <RootStack.Screen name='Tabs' component={Tabs}></RootStack.Screen>
            <RootStack.Screen name='Stack' component={Stacks}></RootStack.Screen>
        </RootStack.Navigator>
    )
}
export default Root