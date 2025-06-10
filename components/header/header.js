import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {Ionicons} from '@expo/vector-icons'
import { StatusBar } from 'react-native';


export default function Header() {
  return (
    <View style={styles.header}>
     <View style={styles.logoTitle}>
      <Image
        style={styles.logo} source={require('../../assets/logo.png')}/>
      <Text style={styles.nameApp}>BrainCard</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#355FAB',
    paddingHorizontal: 20,
    paddingTop: StatusBar.currentHeight || 20,
    paddingBottom: 14,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,

  },

  logoTitle: {
   flexDirection: "row",
   alignItems: "center",
   gap: 10,
  },

  logo: {
   width: 32,
   height: 32,
   resizeMode: 'contain',
   borderRadius: 8,
   backgroundColor: '#fff',
    
  },
  
  nameApp: {
   fontSize: 20,
   fontWeight: '600',
   color: '#FACC15',
   letterSpacing: 0.5,
  },

 
})