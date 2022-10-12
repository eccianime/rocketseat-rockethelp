import firestore from '@react-native-firebase/firestore';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Box, HStack, ScrollView, Text, VStack } from 'native-base';
import React, { useEffect, useState } from 'react';
import { CircleWavyCheck, Hourglass, DesktopTower, ClipboardText } from 'phosphor-react-native';

import { Header } from '../components/Header';
import Loading from '../components/Loading';
import { OrderProps } from '../components/Order';
import { OrderFireStoreDTO } from '../DTOs/OrderDTO';
import { dateFormat } from '../utils/firestoreDateFormat';
import { THEME } from '../styles/theme';
import CardDetails from '../components/CardDetails';
import Input from '../components/Input';
import Button from '../components/Button';
import { Alert } from 'react-native';

type RouteParams = {
    orderId: string;
}

type OrderDetails = OrderProps & {
  description: string;
  solution: string;
  closed: string;
}

const Details = () => {
    const route = useRoute();
    const { orderId } = route.params as RouteParams;
    const [ isLoading, setLoading ] = useState(true);
    const [ order, setOrder ] = useState<OrderDetails>({} as OrderDetails);
    const [solution, setSolution] = useState('');
    const { colors } = THEME;

    const navigation = useNavigation();

    const handleOrderClose = () => {
      if( !solution ){
        return Alert.alert( 'Solicitação', 'Informe a solução para encerrar a solicitação.' );
      }
      firestore()
        .collection<OrderFireStoreDTO>('orders')
        .doc(orderId)
        .update({
          solution,
          status: 'closed',
          closed_at: firestore.FieldValue.serverTimestamp()
        })
        .then(() => {
          Alert.alert('Solicitação', 'Solicitação encerrada');
          navigation.goBack();
        })
        .catch((error) => {
          console.log(error);
          Alert.alert('Solicitação', 'Não foi possível encerrar a solicitação.');
        })
    }

    useEffect( () => {
      firestore()
      .collection<OrderFireStoreDTO>('orders')
      .doc(orderId)
      .get()
      .then( doc => {
        const { patrimony, description, status, solution, created_at, closed_at } = doc.data();  
        const closed = closed_at && dateFormat(closed_at);
        setOrder({
          id: doc.id,
          patrimony,
          description,
          status,
          solution,
          when: dateFormat(created_at),
          closed
        })
        setLoading(false);
      })
    }, [orderId] )

    if(isLoading ){
      return <Loading />
    }

    return (
      <VStack flex={1} bg='gray.700'>
          <Box px={6} bg='gray.600'>
            <Header title='Solicitação' />
          </Box>
          <HStack bg='gray.500' justifyContent='center' p={4}>
            {
              order.status === 'closed' ?
              <CircleWavyCheck size={22} color={colors.green[300]} /> :
              <Hourglass size={22} color={colors.secondary[700]} /> 
            }
            <Text
              fontSize='sm'
              color={order.status === 'closed' ? colors.green[300]: colors.secondary[700]}
              ml={2}
              textTransform='uppercase'
              >{order.status === 'closed' ? 'finalizado' : 'en andamento'}</Text>
          </HStack>
          <ScrollView mx={5} showsVerticalScrollIndicator={false}>
            <CardDetails
              title={'equipamento'}
              description={`Patrimonio ${order.patrimony}`}
              icon={DesktopTower}
            />
            <CardDetails
              title={'descrição do problema'}
              description={order.description}
              icon={ClipboardText}
              footer={`Registrado em ${order.when}`}
            />
            <CardDetails
              title={'solução'}
              description={order.solution}
              icon={CircleWavyCheck}
              footer={order.closed && `Encerrado em ${order.closed}`}
            >
              { order.status === 'open' &&
                <Input
                  placeholder='Descrição da solução'
                  value={solution}
                  onChangeText={setSolution}
                  textAlignVertical='top'
                  multiline
                  h={24}
                />
              }
            </CardDetails>
            {
              order.status === 'open' &&
              <Button title='Encerrar Solicitação' mt={5} onPress={handleOrderClose} />
            }
          </ScrollView>
      </VStack>
    );
}

export default Details;