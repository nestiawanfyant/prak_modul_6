
import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  StatusBar,
  TouchableOpacity,
  ToastAndroid
} from 'react-native'
export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      inputName: '',
      inputNim: '',
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />  

        <View style={styles.headers}>
          <Text style={styles.textHeader}>Penyimpanan Data</Text>  
        </View>

        <Text> { this.state.inputName } </Text>
        <Text> { this.state.inputNim } </Text>

        <View style={styles.formInput}>
          <TextInput
              style={styles.textInputName}    
              onChangeText={(inputName) => this.setState({inputName})}
              value={this.state.inputName}
              placeholder='Masukan Nama.'
              placeholderTextColor='grey'
              underlineColorAndroid='transparent'>
          </TextInput>
          <TextInput
              style={styles.textInputNim}    
              onChangeText={(inputNim) => this.setState({inputNim})}
              value={this.state.inputNim}
              placeholder='Masukan NIM.'
              placeholderTextColor='grey'
              underlineColorAndroid='transparent'>
          </TextInput>
          <TouchableOpacity style={styles.addButton} onPress={this.saveData.bind(this)} >
              <Text style={styles.addButtonText} >Tambah</Text>
          </TouchableOpacity>
        </View>

      </View>
    )
  }

  saveData(){

  var urlAksi = "http://192.168.1.3:1000/api/v1/save-data";

  const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        name: this.state.inputName,  
        nim: this.state.inputNim,  
      })
  };
  
  return fetch(urlAksi, requestOptions)
    .then(async response => {
        const isJson = response.headers.get('content-type')?.includes('application/json');
        const data = isJson && await response.json();

        if (!response.ok) {
            const error = (data && data.message) || response.status;
            return Promise.reject(error);
        }

        ToastAndroid.show("Berhasil Menambahkan Data", ToastAndroid.SHORT);
    })
    .catch(error => {
        ToastAndroid.show("Error : " + error.toString(), ToastAndroid.SHORT);
    });
  }
} 


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headers: {
    backgroundColor: '#CEC252',
    justifyContent: 'center',
    color: '#fff',
    textAlign: 'center',
    padding: 30
  },
  textHeader: {
    marginTop: 10,
    color: '#000',
    fontSize: 16,
  },
  textInputName: {
    margin: 30,
    borderWidth: 1,
    borderColor: '#DBD3D8',
    padding: 10,
    borderRadius: 5,
  },
  textInputNim: {
    borderWidth: 1,
    borderColor: '#DBD3D8',
    padding: 10,
    borderRadius: 5,
    marginLeft: 30,
    marginRight: 30,
  },
  addButton: {
    margin: 30,
    borderWidth: 1,
    backgroundColor: '#CEC252',
    borderColor: '#DBD3D8',
    padding: 10,
    borderRadius: 5,
    textAlign: 'center',
    justifyContent: 'center',
    display: 'flex'
  },
  addButtonText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 16,
  }
});
