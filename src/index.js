import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Button, StyleSheet, Text, View} from 'react-native';
import Pets from './components/Pets';

const App = () => {
  const [petsData, setPetsData] = useState();
  const [orderId, setOrderId] = useState();
  const [orderType, setOrderType] = useState();
  const [orderPrice, setOrderPrice] = useState();
  const [state, setState] = useState(false);

  useEffect(() => {
    fetch('http://petstore-demo-endpoint.execute-api.com/petstore/pets')
      .then(res => res.json())
      .then(
        result => {
          setPetsData(result);
        },
        error => {
          console.warn('Deu erro');
        },
      );
  }, []);

  const ordernarId = () => {
    let order = petsData.sort(function (a, b) {
      return a.id < b.id ? -1 : a.id > b.id ? 1 : 0;
    });
    setOrderId(order);
    setState('id');
  };

  const ordernarType = () => {
    let order = petsData.sort(function (a, b) {
      return a.type < b.type ? -1 : a.type > b.type ? 1 : 0;
    });
    setOrderType(order);
    setState('type');
  };

  const ordernarPrice = () => {
    let order = petsData.sort(function (a, b) {
      return a.price < b.price ? -1 : a.price > b.price ? 1 : 0;
    });
    setOrderPrice(order);
    setState('price');
  };
  return (
    <View style={styles.container}>
      <Text style={styles.txtTop}>{'> Ordenação >'}</Text>
      <View style={styles.containerTop}>
        {petsData ? (
          state === 'id' ? (
            orderId?.map(item => <Pets {...item} key={String(item.id)} />)
          ) : state === 'type' ? (
            orderType?.map(item => <Pets {...item} key={String(item.id)} />)
          ) : state === 'price' ? (
            orderPrice?.map(item => <Pets {...item} key={String(item.id)} />)
          ) : (
            petsData?.map(item => <Pets {...item} key={String(item.id)} />)
          )
        ) : (
          <ActivityIndicator color="#fff" size={30} />
        )}
      </View>
      <View style={styles.flex1}>
        <View style={styles.containerBottom}>
          <Text style={styles.txtBottom}>Ordenar por:</Text>
          <View style={styles.width}>
            <Button title="id" onPress={ordernarId} color="red" />
          </View>
          <View style={styles.width}>
            <Button title="type" onPress={ordernarType} color="green" />
          </View>
          <View style={styles.width}>
            <Button title="price" onPress={ordernarPrice} color="blue" />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
  containerTop: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  txtTop: {
    color: '#fff',
    fontSize: 30,
    fontWeight: '700',
    alignSelf: 'center',
    position: 'absolute',
    top: 35,
  },
  flex1: {
    flex: 1,
  },
  containerBottom: {
    height: '60%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  txtBottom: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  width: {
    width: '60%',
  },
});

export default App;
