import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {useMemo} from 'react';
import {
  ImageBackground,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Text,
  Pressable,
} from 'react-native';
function Intro() {
  const navigation = useNavigation();
  const ImageSrc = useMemo(() => {
    return require('../assets/backgrounds/fwalls2-min.jpg');
  });
  return (
    <>
      <TouchableWithoutFeedback
        onPress={() => Keyboard.dismiss()}
        accessible={false}>
        <ImageBackground source={ImageSrc} style={styles.mainContainer}>
          <View style={styles.container}>
            <Text
              style={styles.welcome}
              onPress={() => {
                console.log(user);
              }}>
              Welcome to our happy app
            </Text>
          </View>
          <View style={styles.textView}>
            <Text style={styles.haveText}>Have an account?</Text>
            <Pressable
              style={styles.toLoginBtn}
              onPress={() => navigation.navigate('Login')}>
              <Text style={styles.toLoginBtnText}>Log in</Text>
            </Pressable>
          </View>
          <View style={styles.textView}>
            <Text style={styles.needText}>Need an account?</Text>
            <Pressable
              style={styles.signupBtn}
              onPress={() => navigation.navigate('SignUp')}>
              <Text style={styles.signupText}>Sign Up</Text>
            </Pressable>
          </View>
        </ImageBackground>
      </TouchableWithoutFeedback>
    </>
  );
}
const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    height: '100%',
  },
  container: {
    width: '80%',
    height: '50%',
    alignItems: 'center',
    top: '20%',
    alignSelf: 'center',
    borderRadius: 40,
    justifyContent: 'center',
  },
  welcome: {
    fontSize: 23,
    top: '-20%',
    padding: '3%',
    opacity: 0.7,
    borderRadius: 10,
    color: '#fff',
    letterSpacing: 0.5,
    fontFamily: 'SFProDisplay-Bold',
  },
  inputsView: {
    width: '80%',
    height: '55%',
    justifyContent: 'space-evenly',
  },
  haveText: {
    color: '#ccc',
    alignItems: 'center',
    fontSize: 16,
    fontFamily: 'SFProDisplay-Bold',
  },
  toLoginBtn: {
    width: '65%',
    height: 40,
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 18,
    opacity: 0.85,
    marginVertical: '2%',
  },
  toLoginBtnText: {
    textAlign: 'center',
    color: 'black',
    alignItems: 'center',
    fontSize: 16,
    fontFamily: 'SFProDisplay-Medium',
  },
  textView: {flexDirection: 'column', alignItems: 'center'},
  needText: {
    color: '#ccc',
    alignItems: 'center',
    fontSize: 16,
    fontFamily: 'SFProDisplay-Bold',
  },
  signupText: {
    textAlign: 'center',
    color: 'black',
    alignItems: 'center',
    fontSize: 16,
    fontFamily: 'SFProDisplay-Medium',
  },
  signupBtn: {
    width: '65%',
    height: 40,
    marginVertical: '4%',
    justifyContent: 'center',
    backgroundColor: '#fff',
    opacity: 0.85,
    borderRadius: 18,
  },
});
export default Intro;
