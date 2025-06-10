import { View, Text, StyleSheet } from 'react-native'
import Checkbox from 'expo-checkbox';

export default function PostItCard({ frontText, width, selectionMode, selected }) {

  return (
    <View style={[styles.postItCard, { width }]}>
      {selectionMode && (
        <Checkbox
          style={styles.checkbox}
          value={selected}
        />
      )}
      <Text style={styles.text} numberOfLines={4} ellipsizeMode="tail" >{frontText?.trim()}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  postItCard: {
    backgroundColor: "#F7E27A",
    borderRadius: 8,
    padding: 20,
    margin: 3,
    minHeight: "90%",
    maxHeight: "90%",
    textAlignVertical: "center",
    shadowColor: "#000000",
    shadowOffset: {
      width: 4,
      height: 6,
    },
    shadowOpacity: 0.15,
    shadowRadius: 15,
    elevation: 5
  },
  text: {
    fontWeight: "600",
  },
  checkbox: {
    position: 'absolute',
    top: 5,
    right: 5,
  }
})
