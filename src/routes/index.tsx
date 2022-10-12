import React, { useState, useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import SignIn from '../screens/SignIn';
import AppRoutes from './app.routes'
import Loading from '../components/Loading';

const Routes = () => {
    const [ loading, setLoading ] = useState(true);
    const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null)

    useEffect( () => {
        const subscriber = auth()
            .onAuthStateChanged( (resp) => {
                setUser(resp);
                setLoading(false);
            })
        return subscriber;
    }, [user] )

    if( loading ){
        return <Loading />
    }

    return (
        <NavigationContainer>
            { user ? <AppRoutes /> : <SignIn /> }
        </NavigationContainer>
    );
}

export default Routes;