import React, {useState} from 'react';
import {Alert, Image, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';
import { auth, signInWithGoogle ,signInWithFacebook} from '../../firebase/config';

import {firebase} from '../../firebase/config';

export default function RegistrationScreen({navigation}) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const onFooterLinkPress = () => {
    navigation.navigate('LoginScreen');
    
  };

  const onRegisterPress = () => {
    //process of registration
    navigation.navigate('LoginScreen');

    if (password !== confirmPassword) {
      alert('passwords dont match, try again!');
      return;

     
    
     
    }
  
    //authentication process - registration
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        console.log('hiii')
        const uid = response.user.id;
        const data = {
          id: uid,
          email,
          fullName,
        };
      

       /*  const usersRef = firebase.firestore().collection('users');
        usersRef
          .doc(uid)
          .set(data)
          .then(() => {
            navigation.navigate('HomeScreen', {user: data});
            console.log('hiii')
          })
          .catch((error) => {
            alert(error);
          })
          .catch((error) => {
            alert(error);
          });
       */});
  };

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        style={{flex: 1, width: '100%'}}
        keyboardShouldPersistTaps="always">
        
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setFullName(text)}
          value={fullName}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="E-mail"
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setEmail(text)}
          value={email}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholderTextColor="#aaaaaa"
          secureTextEntry
          placeholder="Password"
          onChangeText={(text) => setPassword(text)}
          value={password}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholderTextColor="#aaaaaa"
          secureTextEntry
          placeholder="Confirm Password"
          onChangeText={(text) => setConfirmPassword(text)}
          value={confirmPassword}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => onRegisterPress()}>
          <Text style={styles.buttonTitle}>Create account</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={signInWithGoogle} >
          <Text style={styles.buttonTitle}>SignIn with Google</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={signInWithFacebook} >
          <Text style={styles.buttonTitle}>SignIn with Facebook</Text>
        </TouchableOpacity>
        <View style={styles.footerView}>
          <Text style={styles.footerText}>
            Already got an account?{' '}
            <Text onPress={onFooterLinkPress} style={styles.footerLink}>
              Log in
            </Text>
          </Text>


        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}