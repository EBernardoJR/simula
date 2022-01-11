import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { AntDesign } from '@expo/vector-icons'; 
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TextInput, TouchableOpacity } from 'react-native';

export default function App() {

  const debt = 0.025
  const credit = [ 0.034, 0.042, 0.0455, 0.0493, 0.054, 0.06, 0.07, 0.08, 0.09, 0.1, 0.105, 0.11]
  const credit2 = [ 0.044, 0.052, 0.0555, 0.0593, 0.064, 0.07, 0.08, 0.09, 0.10, 0.109, 0.115, 0.12]
  const [value, setValue] = useState('')
  const [valuesFinal, setValuesFinal] = useState([])
  const [debtValue, setDebtValue] = useState(0)

  function handleValue(){
    if(value == '') return false
    var values = []
    if(parseFloat(value.replace(',', '.')) > 500) values = credit.map(v => ((v * parseFloat(value.replace(',', '.'))) + parseFloat(value.replace(',', '.'))).toFixed(2))
    else values = credit2.map(v => ((v * parseFloat(value.replace(',', '.'))) + parseFloat(value.replace(',', '.'))).toFixed(2))
    setValuesFinal(values)
    setDebtValue(((debt * parseFloat(value.replace(',', '.'))) + parseFloat(value.replace(',', '.'))).toFixed(2).replace('.', ','))
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.inputBar}> 
          <TextInput placeholder='Digite um valor' style={{ flex: 1, padding: 10, fontSize: 16}} placeholderTextColor='#4b4b4b' keyboardType='numeric' value={value} onChangeText={ text => setValue(text)}/>
          <TouchableOpacity onPress={e => {
            setValue('')
            setValuesFinal([])
          }}>
            <AntDesign name="close" size={24} color="black" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleValue}>
          <Text style={{ fontSize: 20, color: '#fff'}}>Simular</Text>
        </TouchableOpacity>

        {
          valuesFinal.length>0 ?
          <View style={styles.content}>
          <View style={styles.debtBar}>
            <Text style={{ fontSize: 18, fontWeight: 'bold'}}>Débito</Text>
            <View style={styles.debtItem}>
                <Text style={{ fontSize: 16 }}>Valor Total:</Text>
                <Text style={{ fontSize: 16, fontWeight: 'bold'}}>R$ {debtValue}</Text>
            </View>
          </View>
          <View style={styles.creditBar}>
            <Text style={{ fontSize: 18, fontWeight: 'bold'}}>Crédito</Text>
            <View style={styles.creditHeader}> 
              <Text style={{ fontSize: 16 }}>Parcelas</Text>
              <Text style={{ fontSize: 16 }}>Valor Total</Text>
            </View>
            {
              valuesFinal.length > 0? valuesFinal.map((item, index)=> (
                <View style={styles.creditItem} key={index}>
                  <Text style={{ fontSize: 16 }}>{index + 1} X {(item / (index + 1)).toFixed(2).replace('.', ',')}</Text>
                  <Text style={{ fontSize: 16, fontWeight: 'bold'}}>R$ {parseFloat(item).toFixed(2).replace('.', ',')}</Text>
                </View>)):false
            }
          </View>
        </View>: false}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  inputBar: {
    width: '85%',
    height: 60,
    backgroundColor: '#e8e8e8',
    alignSelf: 'center',
    borderRadius: 10,
    marginTop: 20,
    //ios
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 4,
      height: 4
    },
    //android
    elevation: 2,
    opacity: 0.8,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10
  },
  button: {
    width: '85%',
    height: 60,
    backgroundColor: '#26F3F3',
    alignSelf:'center',
    marginTop: 30,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  content: {
    flex: 1,
    alignItems: 'center',
    marginTop: 20
  },
  debtBar: {
    width: '85%',
  },
  debtItem: {
    width: '100%',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: '#4B4B4B',
    borderBottomWidth: 1
  },
  creditBar: {
    width: '85%',
    marginTop: 15,
    marginBottom: 15
  },
  creditHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginTop: 10,
    marginBottom: 10
  },
  creditItem: {
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: '#828282',
    borderBottomWidth: StyleSheet.hairlineWidth
  },
});
