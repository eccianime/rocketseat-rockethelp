import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from "../screens/Home";
import Details from "../screens/Details";
import Register from "../screens/Register";

const { Navigator, Screen } = createNativeStackNavigator();

const AppRoutes = () => {
    return (
        <Navigator screenOptions={{
            headerShown: false
        }}>
            <Screen name={'Home'} component={Home} />
            <Screen name={'Register'} component={Register} />
            <Screen name={'Details'} component={Details} />
        </Navigator>
    );
}

export default AppRoutes;