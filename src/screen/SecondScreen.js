import React, { useState } from 'react'
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Alert, ScrollView, Image } from 'react-native'
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'react-native-fetch-blob';
import Loading from '../component/loader/Loader';

const SecondScreen = () => {
   const [loading, setLoading] = useState(false)
   const [images, setImages] = useState([])
   const [state, setState] = useState({
      name: ''
   })

   const openImage = () => {
      let { pictures } = images
      let options = {
         title: 'Select Image',
         storageOptions: {
            skipBackup: true,
            path: 'images',
         },
      };

      ImagePicker.showImagePicker(options, (response) => {
         // console.log('Response = ', response);
 
         if (response.didCancel) {
             console.log('User cancelled image picker');
         } else if (response.error) {
             console.log('ImagePicker Error: ', response.error);
         } else if (response.customButton) {
             console.log('User tapped custom button: ', response.customButton);
         } else {
            const source = { uri: response.uri };
            const img = []
            img.push(...images, response)
            setImages(img)
            
         }
      });
   }

   const postImage = async () => {
      if(state.name === '') {
         Alert.alert("Peringatan !", "Kolom nama belum diisi.")
      } else if(images.length < 1) {
         Alert.alert("Peringatan !", "Silahkan pilih gambar terlebih dahulu.")
      } else {
         setLoading(true)
         var reqData = [
            {name: "name", data: state.name}
         ]
         var formdata = new FormData();
         formdata.append("name", state.name);
         images.forEach((item, i) => {
            reqData.push({
               name: 'images[]',
               data: RNFetchBlob.wrap(item.path),
               type: "image/jpeg",
               filename: item.fileName,
            })
         })
         RNFetchBlob.fetch('POST', "https://dev.dispenda.online/api/post-screen-2", {
            'Content-Type' : 'multipart/form-data',
         },reqData)
         .then((response) => {
            console.log("respone e", JSON.parse(JSON.stringify(response)));
            if (typeof (response.data) != 'object'){
               var cek = JSON.parse(response.data);
               Alert.alert(`${cek.status}`, `${cek.message.text[0]}`, [
                  {
                     text: "Ok",
                     onPress: () => null
                  }
               ])
            }
            setLoading(false)
         })
         .catch((error) => {
            setLoading(false),
            Alert.alert("Upload Image Gagal", "", [
               {
                  text: "Ok",
                  onPress: () => null
               }
            ])
         })
      }
   }

   console.log('images', images);
   return (
      <View style={styles.container}>
         <Loading show={loading} />
         <ScrollView 
            contentContainerStyle={styles.scroll}
            nestedScrollEnabled
         >
            <Text style={styles.txtNama}> Nama </Text>
            <TextInput
               value={state.name}
               onChangeText={name => setState({...state, name})}
               style={styles.txtInput}
            />
            <Text style={styles.txtImg}> Gambar </Text>
            <View style={styles.viewImg}>
               {
                  images.length > 0 &&
                  images.map((item, index) => {
                     return (
                        <Image
                           key={index.toString()}
                           style={[styles.img, {marginLeft: index === 0 ? 0 : 10}]}
                           source={{uri: item.uri}}
                        />
                     )
                  })
               }
               <TouchableOpacity 
                  activeOpacity={0.7}
                  onPress={()=> {
                     if(images.length < 4) {
                        openImage()
                     }
                  }}
                  style={[styles.btnPlus, {marginLeft: images.length > 0 ? 10 : 0}]}>
                  <Text style={{fontSize: 30, fontWeight: '600', color: '#FFF'}}>+</Text>
               </TouchableOpacity>
            </View>
            <TouchableOpacity
               activeOpacity={0.8}
               onPress={postImage}
               style={styles.btnSubmit}
            >
               <Text style={{color: '#FFF', fontSize: 17}}>SUBMIT</Text>
            </TouchableOpacity>
         </ScrollView>
      </View>
   )
}

const styles = StyleSheet.create({
   btnSubmit: {
      width: '100%',
      marginTop: 15,
      backgroundColor: '#e74c3c',
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical:8,
      borderRadius: 10
   },
   viewImg: {
      flexDirection: 'row', 
      alignItems: 'center', 
      alignSelf: 'flex-start'
   },
   txtImg: {
      fontSize: 18, 
      fontWeight: '700', 
      marginTop: 15, 
      alignSelf: 'flex-start'
   },
   txtNama: {
      fontSize: 18, 
      fontWeight: '700', 
      alignSelf: 'flex-start'
   },
   btnPlus: {
      width: 40, 
      height: 40, 
      marginTop: 15, 
      borderRadius: 7, 
      justifyContent: 'center', 
      alignItems: 'center', 
      backgroundColor: '#e74c3c'
   },
   img: {
      width: 40,
      height: 40,
      resizeMode: 'cover',
      marginTop: 15,
   },
   txtInput: {
      width: "100%",
      borderRadius: 8,
      borderColor: "#0e52b1",
      borderWidth: 0.8,
      marginTop: 15
   },
   scroll: {
      flex: 1, 
      justifyContent: 'center', 
      alignItems: 'center'
   },
   container: {
      flex: 1,
      marginHorizontal: 10,
   }
})

export default SecondScreen;