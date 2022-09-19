import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Button, StyleSheet, Text, View} from 'react-native';
import Pets from './components/Pets';

const App = () => {
  const [petsData, setPetsData] = useState();
  const [update, setUpdate] = useState(false);
  const [state, setState] = useState(false);

  useEffect(() => {
    fetch('http://petstore-demo-endpoint.execute-api.com/petstore/pets')
      .then(res => res.json())
      .then(
        result => {
          if (!state) {
            setPetsData(result);
          }
        },
        error => {
          console.warn('Deu erro');
        },
      );
  }, [update, state]);

  const ordernar = ordem => {
    let order;
    if (ordem === 'id') {
      order = petsData.sort((a, b) => {
        return a.id < b.id ? -1 : a.id > b.id ? 1 : 0;
      });
      setPetsData(order);
      setUpdate(!update);
      setState(true);
    } else if (ordem === 'price') {
      order = petsData.sort((a, b) => {
        return a.price < b.price ? -1 : a.price > b.price ? 1 : 0;
      });
      setPetsData(order);
      setUpdate(!update);
      setState(true);
    } else {
      order = petsData.sort((a, b) => {
        return a.type < b.type ? -1 : a.type > b.type ? 1 : 0;
      });
      setPetsData(order);
      setUpdate(!update);
      setState(true);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.txtTop}>{'> Ordenação >'}</Text>
      <View style={styles.containerTop}>
        {petsData ? (
          petsData.map(item => <Pets {...item} key={String(item.id)} />)
        ) : (
          <ActivityIndicator color="#fff" size={30} />
        )}
      </View>
      <View style={styles.flex1}>
        <View style={styles.containerBottom}>
          <Text style={styles.txtBottom}>Ordenar por:</Text>
          <View style={styles.width}>
            <Button title="id" onPress={() => ordernar('id')} color="red" />
          </View>
          <View style={styles.width}>
            <Button
              title="type"
              onPress={() => ordernar('type')}
              color="green"
            />
          </View>
          <View style={styles.width}>
            <Button
              title="price"
              onPress={() => ordernar('price')}
              color="blue"
            />
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
