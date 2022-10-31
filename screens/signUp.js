import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {useState} from 'react';
import {initializeApp} from 'firebase/app';
import {firebaseConfig} from '../firebase';
import {getFirestore, setDoc, doc} from 'firebase/firestore';
import {useMemo} from 'react';
import {OutlinedTextField} from 'rn-material-ui-textfield';
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from 'firebase/auth';
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  Pressable,
} from 'react-native';
import ArrowLeft from 'react-native-vector-icons/Ionicons';
import ModalError from '../modals/modalError';

function SignUp() {
  const navigation = useNavigation();
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmedPass, setConfirmedPass] = useState('');
  const [authError, setAuthError] = useState('');
  const [fillModal, setFillModal] = useState(false);

  const ImageSrc = useMemo(() => {
    return require('../assets/backgrounds/fwalls3-min.jpg');
  });
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore();
  const handleCreateAccount = async () => {
    if (!userName.length || !password.length) {
      setFillModal('Please fill out all empty required fields');
    } else if (password !== confirmedPass) {
      return setError('Passwords do not match');
    } else {
      let userInfo = {
        email: userName,
        password: password,
      };

      createUserWithEmailAndPassword(auth, userName, password)
        .then(async userCredential => {
          sendEmailVerification(auth.currentUser)
            .then(() => {
              console.log('verification');
              navigation.navigate('MyPage');
            })
            .catch(err => {
              console.log('verification error - ' + err);
            });
          await AsyncStorage.setItem('user', JSON.stringify(userInfo))
            .then(() => console.log('AsyncStorage added'))
            .catch(err => console.log('auth error: ' + err));
          setDb();
          navigation.navigate('GenderPage');
        })
        .catch(error => {
          console.log('error code: ' + error.code);
          setAuthError(error.code);
        });
    }
  };
  async function setDb() {
    try {
      await setDoc(doc(db, 'users', auth.currentUser.uid), {
        userInfo: {
          email: userName,
        },
      });
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  }
  return (
    <>
      <ModalError
        alertText={authError}
        clear={() => {
          setAuthError(null);
        }}
        error={true}
      />

      <ModalError
        alertText={fillModal}
        clear={() => {
          setFillModal(null);
        }}
      />
      <TouchableWithoutFeedback
        onPress={() => Keyboard.dismiss()}
        accessible={true}>
        <ImageBackground source={ImageSrc} style={styles.mainContainer}>
          <View style={styles.backBtnView}>
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
              <Text style={styles.welcome}>Sign up</Text>
            </View>
            <View style={styles.inputsView}>
              <View style={styles.eachInput}>
                <OutlinedTextField
                  label="Enter email"
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
                  onChangeText={email => setUserName(email)}
                />
              </View>
              <View style={styles.eachInput}>
                <OutlinedTextField
                  label="Enter password"
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
              <View style={styles.eachInput}>
                <OutlinedTextField
                  label="Confirm password"
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
                  value={confirmedPass}
                  onChangeText={pass => setConfirmedPass(pass)}
                />
              </View>
            </View>
            <View style={styles.haveView}>
              <Text style={{fontSize: 17, color: '#fff'}}>
                Have an account?
              </Text>
              <Pressable>
                <Text
                  style={{color: '#2cb9b0', fontSize: 17}}
                  onPress={() => navigation.navigate('Login')}>
                  Login here
                </Text>
              </Pressable>
            </View>
            <View style={styles.createBtnView}>
              <Pressable style={styles.createBtn}>
                <Text
                  style={styles.createBtnText}
                  onPress={() => {
                    handleCreateAccount();
                  }}>
                  Create your account
                </Text>
              </Pressable>
            </View>
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
    padding: '3%',
    top: '-30%',
    opacity: 0.7,
    borderRadius: 10,
    color: '#fff',
    letterSpacing: 0.5,
    fontFamily: 'Montserrat-Medium',
  },
  eachInput: {
    marginVertical: '2%',
  },
  inputsView: {
    width: '80%',
  },
  backBtnView: {
    flexDirection: 'row',
    position: 'absolute',
    width: '85%',
    top: '5%',
    alignSelf: 'center',
    justifyContent: 'space-between',
  },
  createBtnView: {width: '65%', height: 40, justifyContent: 'center'},
  createBtn: {
    backgroundColor: '#fff',
    height: '100%',
    width: '100%',
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  createBtnText: {
    color: 'black',
    fontSize: 16,
    fontFamily: 'SFProDisplay-Medium',
  },
  haveView: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '90%',
    marginVertical: '3%',
    alignSelf: 'center',
    textAlign: 'center',
  },
});
export default SignUp;
