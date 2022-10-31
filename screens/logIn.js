import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Pressable,
  Keyboard,
  AsyncStorage,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useMemo} from 'react';
import {OutlinedTextField} from 'rn-material-ui-textfield';
import {useState} from 'react';
import {initializeApp} from 'firebase/app';
import {firebaseConfig} from '../firebase';
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth';
import ModalError from '../modals/modalError';
import ArrowLeft from 'react-native-vector-icons/Ionicons';

const Login = () => {
  const navigation = useNavigation();
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState(false);
  const ImageSrc = useMemo(() => {
    return require('../assets/backgrounds/fwalls-min.jpg');
  });
  const handleLogIn = () => {
    let userInfo = {
      email: userName,
      password: password,
    };
    signInWithEmailAndPassword(auth, userName, password)
      .then(async () => {
        await AsyncStorage.setItem('user', JSON.stringify(userInfo))
          .then(() => console.log('AsyncStorage added'))
          .catch(err => console.log('AsyncStorage' + err));

        navigation.navigate('MyPage');
      })
      .catch(error => {
        console.log('Auth error: ' + error);
        setAuthError('Invalid username or Password');
      });
  };
  return (
    <>
      <ModalError alertText={authError} clear={() => setAuthError(null)} />
      <TouchableWithoutFeedback
        onPress={() => Keyboard.dismiss()}
        accessible={false}>
        <ImageBackground source={ImageSrc} style={styles.mainContainer}>
          <View style={styles.backBtnContainer}>
            <Text>
              <ArrowLeft
                name="arrow-back-circle-outline"
                size={38}
                color="#fff"
                onPress={() => navigation.navigate('Intro')}
              />
            </Text>
          </View>
          <View style={styles.container}>
            <View>
              <Text style={styles.welcome}>Welcome Back</Text>
            </View>
            <View style={styles.inputsView}>
              <OutlinedTextField
                label="Enter your email"
                multiline={false}
                labelFontSize={13}
                textColor="#fff"
                tintColor="#fff"
                fontSize={14}
                lineWidth={1}
                baseColor={'#fff'}
                labelTextStyle={{
                  fontFamily: 'SFProDisplay-Medium',
                }}
                value={userName}
                onChangeText={text => setUserName(text)}
              />
              <OutlinedTextField
                label="Enter your password"
                secureTextEntry={true}
                multiline={false}
                labelFontSize={13}
                textColor="#fff"
                tintColor="#fff"
                fontSize={14}
                lineWidth={1}
                baseColor={'#fff'}
                labelTextStyle={{
                  fontFamily: 'SFProDisplay-Medium',
                }}
                value={password}
                onChangeText={text => setPassword(text)}
              />
            </View>
            <View style={styles.helperView}>
              <Text style={{fontSize: 17, color: '#fff'}}>
                Need an account?
              </Text>
              <Pressable>
                <Text
                  style={{color: '#2cb9b0', fontSize: 17}}
                  onPress={() => navigation.navigate('SignUp')}>
                  Sign up here
                </Text>
              </Pressable>
            </View>
            <View style={styles.loginBtnContainer}>
              <Pressable style={styles.loginBtn}>
                <Text style={styles.loginBtnText} onPress={() => handleLogIn()}>
                  Login into your account
                </Text>
              </Pressable>
            </View>
          </View>
        </ImageBackground>
      </TouchableWithoutFeedback>
    </>
  );
};
export default Login;
const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    height: '100%',
  },
  container: {
    width: '80%',
    height: '60%',
    alignItems: 'center',
    top: '20%',
    alignSelf: 'center',
    borderRadius: 40,
    justifyContent: 'center',
  },
  welcome: {
    fontSize: 30,
    color: '#fff',
    letterSpacing: 0.3,
    paddingBottom:10,
    fontFamily: 'SFProDisplay-Regular',
  },
  inputsView: {
    width: '80%',
    height: '52%',
    justifyContent: 'space-evenly',
  },
  loginBtn: {
    backgroundColor: '#fff',
    height: '100%',
    width: '100%',
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginBtnText: {
    color: 'black',
    fontSize: 16,
    fontFamily: 'SFProDisplay-Medium',
  },
  loginBtnContainer: {width: '65%', height: 40, justifyContent: 'center'},
  helperView: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '87%',
    height: '7%',
    top: '-5%',
    alignSelf: 'center',
    textAlign: 'center',
  },
  backBtnContainer: {
    flexDirection: 'row',
    position: 'absolute',
    width: '85%',
    top: '5%',
    alignSelf: 'center',
    justifyContent: 'space-between',
  },
});
