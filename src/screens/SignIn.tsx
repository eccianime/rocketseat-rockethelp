import React, { useState } from 'react';
import { Heading, Icon, useTheme, VStack } from 'native-base';
import { Envelope, Key } from 'phosphor-react-native';
import auth from '@react-native-firebase/auth';

import Logo from '../assets/logo_primary.svg';
import Button from '../components/Button';
import Input from '../components/Input';
import { Alert } from 'react-native';

const SignIn = () => {
    const { colors } = useTheme();
    const [ isLoading, setLoading ] = useState(false);
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    
    const handleSignIn = () => {
        if( !email || !password ){
            return Alert.alert('Entrar', 'Informe email e senha');
        }
        setLoading(true);
        auth()
            .signInWithEmailAndPassword(email, password)
            .then( resp => {
                console.log(resp);
            } )
            .catch((error) => {
                console.log(error);
                
                setLoading(false);
                if( error.code === 'auth/invalid-email' || error.code === 'auth/wrong-password' ){
                    return Alert.alert('Entrar', 'E-mail ou senha inválida')
                }

                if( error.code === 'auth/user-not-found' ){
                    return Alert.alert('Entrar', 'Usuário não cadastrado.')
                }

                return Alert.alert('Entrar', 'Não foi possível acessar')
            })
    }
    return (
        <VStack flex={1} alignItems='center' bg='gray.600' px={8} pt={24}>
            <Logo />
            <Heading color='gray.100' fontSize='xl' mt={20} mb={6}>Acesse sua conta</Heading>
            <Input
                mb={4}
                placeholder='E-mail'
                InputLeftElement={ <Icon as={ <Envelope color={colors.gray[300]} /> } ml={4} /> }
                value={email}
                onChangeText={(text) => setEmail(text.trim())}
            />
            <Input
                mb={8}
                placeholder='Senha'
                InputLeftElement={ <Icon as={ <Key color={colors.gray[300]} /> } ml={4} /> }
                secureTextEntry
                value={password}
                onChangeText={(text) => setPassword(text.trim())}
            />
            <Button
                isLoading={isLoading}
                title='Entrar' 
                w='full' 
                onPress={handleSignIn} />
        </VStack>
    );
}

export default SignIn;