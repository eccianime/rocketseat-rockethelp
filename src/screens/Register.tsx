import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/core';
import { VStack } from 'native-base';
import React, { useState } from 'react';
import { Alert } from 'react-native';
import Button from '../components/Button';
import { Header } from '../components/Header';
import Input from '../components/Input';

const Register = () => {
  const navigation = useNavigation();
  const [ isLoading, setLoading ] = useState(false);
  const [ patrimony, setPatrimony ] = useState('');
  const [ description, setDescription ] = useState('');

  const handleNewOrderRegister = () => {
    if( !patrimony || !description ){
      return Alert.alert('Registrar', 'Preencha todos os campos');
    }
    setLoading(true);
    firestore()
      .collection('orders')
      .add({
        patrimony, description, status: 'open', created_at: firestore.FieldValue.serverTimestamp()
      })
      .then( () => {
        setLoading(false);
        Alert.alert('Solicitação', 'Solicitação registrada com sucesso.')
        navigation.goBack()
      })
      .catch( (error) => {
        console.log(error);
        setLoading(false);
        Alert.alert('Solicitação', 'Não foi possível registrar o pedido.')
      } )
  }
  return (
    <VStack flex={1} p={6} bg='gray.600'>
        <Header title='Solicitação' />
        <Input
            placeholder='Número do patrimônio'
            mt={4}
            value={patrimony}
            onChangeText={setPatrimony}
        />
        <Input
            placeholder='Descrição do Problema'
            flex={1}
            mt={5}
            multiline
            textAlignVertical='top'
            value={description}
            onChangeText={setDescription}
        />
        <Button isLoading={isLoading} onPress={handleNewOrderRegister} title={'Cadastrar'} mt={5} />
    </VStack>
  );
}

export default Register;