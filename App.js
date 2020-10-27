/* eslint-disable prettier/prettier */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  TextInput,
} from 'react-native';

import firestore, { firebase } from '@react-native-firebase/firestore';

function updateMoney(exp) {
  var num = parseInt(exp, 10);
  //console.log(num);
  const increment = firebase.firestore.FieldValue.increment(num);
  const decrement = firebase.firestore.FieldValue.increment(-num);
  firestore().collection('money').doc('ACGn32ikUPseHiUkj3i1').update({ budget: decrement, expense: increment });
}

export default function App() {
  const [curr_exp, setCurr] = useState('0');
  const [expenditure, setExp] = useState('0');
  const [left_budget, setBud] = useState('0');
  firestore().collection('money').doc('ACGn32ikUPseHiUkj3i1').onSnapshot(doc => {
    setExp(doc.data().expense);
    setBud(doc.data().budget);
  });
  return (
    <View style={styles.container}>

      <Text>
        Enter current expense:
      </Text>
      <TextInput
        style={styles.input}
        onChangeText={(value) => setCurr(value)} />
      <Button
        title="Go"
        onPress={() => updateMoney(curr_exp)} />
      <Text>Total expenditure: {expenditure}</Text>
      <Text>Leftover budget: {left_budget}</Text>
      {/* <Text style={styles.result}>name: {name}, age: {age}</Text> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#777',
    padding: 8,
    margin: 10,
    width: 200,
  }
});