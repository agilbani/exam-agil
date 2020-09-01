import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import api from '../service/apiProvider'
import Loading from '../component/loader/Loader'
import { Actions } from 'react-native-router-flux'

const FirstScreen = () => {

   const [loading, setLoading] = useState(true)
   const [code, setCode] = useState(0)
   const [error, setError] = useState({
      isError: false,
      dataError: '',
      isExpired: false
   })
   const [state, setState] = useState({
      valueCode: ''
   })

   const getRandomCode = async () => {
      const getCode = await api.getRandomCode()
      if(getCode) {
         setLoading(false)
         setCode(getCode.code)
      } else {
         setLoading(false)
         setError({
            ...error,
            isError: true,
            dataError: "Gagal Untuk Mengambil Random Code"
         })
         setTimeout(() => {
            setError({
               ...error,
               isError: false,
               dataError: ''
            })
         }, 2500);
      }
   }

   const submitCode = async () => {
      if(state.valueCode === '') {
         setError({
            ...error,
            isError: true,
            dataError: "Silahkan Masukkan Code Terlebih Dahulu."
         })
         setTimeout(() => {
            setError({
               ...error,
               isError: false,
               dataError: ''
            })
         }, 2500);
      } else if(parseInt(state.valueCode) !== code) {
         setError({
            ...error,
            isError: true,
            dataError: "Random Code dan Code yang dimasukkan tidak sama."
         })
         setTimeout(() => {
            setError({
               ...error,
               isError: false,
               dataError: ''
            })
         }, 2500);
      } else {
         setLoading(true)
         const body = {
            code: state.valueCode
         }
         const postCode = await api.postCodeScreen1(body)
         if(postCode) {
            setLoading(false)
            Actions.second()
         } else {
            setLoading(false)
            setError({
               ...error,
               isError: true,
               isExpired: true,
               dataError: "Random Code Telah Expired."
            })
            setTimeout(() => {
               setError({
                  ...error,
                  isError: false,
                  dataError: ''
               })
            }, 2500);
         }
      }
   }

   const reGetCode = async () => {
      setError({
         ...error,
         isError: !error.isError,
         isExpired: false
      })
      setLoading(true)
      const getCode = await api.getRandomCode()
      if(getCode) {
         setLoading(false)
         setCode(getCode.code)
      } else {
         setLoading(false)
         setError({
            ...error,
            isError: true,
            dataError: "Gagal Untuk Mengambil Random Code"
         })
         setTimeout(() => {
            setError({
               ...error,
               isError: false,
               dataError: ''
            })
         }, 2500);
      }
   }

   useEffect(() => {
      if(code === 0) {
         getRandomCode()
      }
   },[error.isError])
   
   return (
      <View style={styles.container}>
         <Loading show={loading} />
         {
            error.isError && 
            <View
               style={styles.viewError}
            >
               <Text style={{color: '#FFF', fontSize: 17, fontWeight: 'bold', textAlign: 'center'}}>{error.dataError}</Text>
            </View>
         }
         <Text style={{fontSize: 20, fontWeight: '700', color: '#000'}}> Random Code </Text>
         <View style={styles.code}>
            <Text style={styles.txtCode}>{code}</Text>
         </View>
         <Text style={{fontSize: 20, fontWeight: '700'}}>Input Code</Text>
         <TextInput
            value={state.valueCode}
            keyboardType="number-pad"
            onChangeText={code => setState({...state, valueCode: code})}
            style={styles.txtInput}
         />
         {
            !error.isExpired &&
            <TouchableOpacity
               activeOpacity={0.8}
               onPress={submitCode}
               style={styles.btnSubmit}
            >
               <Text style={{color: '#FFF', fontSize: 17}}>SUBMIT</Text>
            </TouchableOpacity>
         }
         {
            error.isExpired && 
            <TouchableOpacity
               activeOpacity={0.8}
               onPress={reGetCode}
               style={styles.btnSubmit}
            >
               <Text style={{color: '#FFF', fontSize: 17}}>GET RANDOM CODE</Text>
            </TouchableOpacity>
         }
      </View>
   )
}

const styles = StyleSheet.create({
   viewError: {
      // backgroundColor: '#e4ff31', 
      backgroundColor: '#ffeb3b',
      paddingVertical: 8,
      paddingHorizontal: 10,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 8
   },
   btnSubmit: {
      width: '100%',
      marginTop: 15,
      backgroundColor: '#e74c3c',
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical:8,
      borderRadius: 10
   },
   txtInput: {
      width: "100%",
      borderRadius: 8,
      borderColor: "#0e52b1",
      borderWidth: 0.8,
      marginTop: 15
   },
   txtCode: {
      fontSize: 18,
      color: "#FFF"
   },
   code: {
      backgroundColor: "#0e52b1",
      borderRadius: 8,
      paddingVertical: 5,
      paddingHorizontal: 15,
      marginVertical: 10
   },
   container: {
      flex: 1,
      marginHorizontal: 10,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#FFF'
   }
})

export default FirstScreen;