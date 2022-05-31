import * as Font from 'expo-font';

export default useFonts = async () =>
  await Font.loadAsync({
    Montserrat: require('../assets/fonts/Montserrat/Montserrat-Regular.ttf'),
  });
