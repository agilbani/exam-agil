import React from 'react';
import {
  View,
  Modal,
  ActivityIndicator,
  Platform,
  SafeAreaView,
} from 'react-native';
import styles from './LoaderStyle';

const Loader = ({show, type}) => {
  return (
    <Modal visible={show} transparent={true}>
      <SafeAreaView>
        <View style={styles.container}>
          <ActivityIndicator
            size="large"
            color="red"
            style={{fontSize: 30}}
          />
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default Loader;
