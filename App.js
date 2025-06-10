import {SafeAreaView, StyleSheet } from 'react-native';
import Header from './components/header/header';
import PostItList from './components/post-it/postItList'



export default function App() {  
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <PostItList />
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"#EEF7FE"
  }
});
