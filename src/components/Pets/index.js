import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const Pets = ({id, type, price}) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.txt, {color: 'red'}]}>{`id: ${id}`}</Text>
      <Text style={[styles.txt, {color: 'green'}]}>{`type: ${type}`}</Text>
      <Text style={[styles.txt, {color: 'blue'}]}>{`price: ${price}`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    width: 120,
    padding: 5,
    borderRadius: 5,
  },
  txt: {
    fontSize: 18,
    fontWeight: '600',
  },
});

export default Pets;
