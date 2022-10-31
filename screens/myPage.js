import {
  StyleSheet,
  Text,
  View,
  Pressable,
  ScrollView,
  Dimensions,
  Image,
  ImageBackground,
  AsyncStorage,
} from 'react-native';
import React, {useState} from 'react';
import {launchImageLibrary} from 'react-native-image-picker';
import {getAuth, signOut} from 'firebase/auth';
import {useMemo} from 'react';
import {useNavigation} from '@react-navigation/native';
import {initializeApp} from 'firebase/app';
import {firebaseConfig} from '../firebase';

const MyPage = () => {
  const [images, setImages] = useState([]);
  const {width} = Dimensions.get('screen');
  const navigation = useNavigation();
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const ImageSrc = useMemo(() => {
    return require('../assets/backgrounds/fwalls4-min.jpg');
  });
  const testFunc = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      quality: 1,
      includeBase64: true,
    });
    setImages([...images, result.assets[0].uri]);
  };
  return (
    <ImageBackground source={ImageSrc} style={styles.mainContainer}>
      <View style={{height: 400, width: width}}>
        <ScrollView
          horizontal
          snapToInterval={width}
          decelerationRate="fast"
          showsHorizontalScrollIndicator={false}
          bounces={false}
          scrollEventThrottle={1}>
          {images.length !== 0 ? (
            images.map((value, index) => {
              return (
                <Image
                  key={index}
                  source={{uri: value}}
                  style={{width: width, height: '100%'}}
                  resizeMode={'cover'}
                />
              );
            })
          ) : (
            <View style={{width: width, justifyContent: 'center'}}>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 22,
                  padding: 8,
                  fontFamily: 'SFProDisplay-Medium',
                  letterSpacing: 1.1,
                  color: '#0c0d34  ',
                  backgroundColor: '#ccc',
                  borderRadius: 10,
                }}>
                Please select photo for slider
              </Text>
            </View>
          )}
        </ScrollView>
      </View>
      <Pressable
        style={styles.selectBtn}
        onPress={() => {
          testFunc();
        }}>
        <Text style={styles.selectBtnText}>
          {!images.length ? 'Select photo' : 'More photo'}
        </Text>
      </Pressable>
      {images.length ? (
        <Pressable style={styles.selectBtn} onPress={() => setImages([])}>
          <Text style={styles.selectBtnText}>Remove Photos</Text>
        </Pressable>
      ) : null}
      <Pressable
        style={styles.selectBtn}
        onPress={() => {
          signOut(auth)
            .then(() => {
              AsyncStorage.clear();
              console.log('Sign-out successful.');
              navigation.navigate('Intro');
            })
            .catch(error => {
              console.log('An error happened:' + error);
            });
        }}>
        <Text style={styles.selectBtnText}>Log out</Text>
      </Pressable>
    </ImageBackground>
  );
};

export default MyPage;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectBtn: {
    width: '70%',
    height: '6.4%',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '5%',
    backgroundColor: '#2cb9b0',
  },
  selectBtnText: {
    fontSize: 21,
    fontFamily: 'SFProDisplay-Medium',
    color: '#fff',
  },
});
