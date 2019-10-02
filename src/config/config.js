import {
  Dimensions,
  Platform
} from 'react-native';
export default {
    screenWidth: Dimensions.get('window').width,
    screenHeight: Dimensions.get('window').height,
    btnActiveOpacity: 0.5,
    // actionBar: {
    //   height: Platform.OS === 'android' ? 56 : 44,
    //   backgroundColor: '#fff',
    // },
    // barContentPad: (Platform.OS === 'android' ? 0 : (isIphoneX() ? 42 : 20)),
    // bottomPadding: isIphoneX() ? 18 : 0,
    // 常用颜色
    pageBgColor: '#efefef',
    primaryColor: '#2f9833',
    defaultColor: '#ddd',
    dangerColor: '#CC3333',
    lightGray: '#e5e5e5',
    darkGray: '#999',
    lightBlack: '#333333',
    whiteFont: '#ffffff',
    fontSizeSmaller: 12,
    fontSizeBase: 14,
    fontSizeLarge: 16,
    fontSizeTitle: 18,
    btnPrimaryColor: '#2f9833',
    btnDefaultColor: '#ddd',
    inputBackground:'#fff',
    url:'47.111.1.1:3000'
}