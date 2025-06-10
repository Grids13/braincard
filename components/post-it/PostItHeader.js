import { useState, useEffect } from "react"
import { View, Text, StyleSheet, Pressable } from 'react-native';

import { MultiSelect } from 'react-native-element-dropdown';

import { Feather } from '@expo/vector-icons';

export default function PostItHeader({ onTrashPress, categoryList, setcurrentCategories }) {

  const [selected, setSelected] = useState([]);
  const [dropdownData, setDropdownData] = useState([{}])

  useEffect(() => {
    setDropdownData([])
    categoryList.forEach(element => {
      setDropdownData(prev => [...prev, { "value": element, "label": element }])
    });
  }, [categoryList])


  return (
   <View style={styles.postItHeader}>

  <View style={styles.postItIcons}>
    <Pressable
      onPress={onTrashPress}
      style={({ pressed }) => [
        styles.iconButton,
        pressed && styles.pressedIcon
      ]}
    >
      <Feather name="trash-2" size={20} color="#FFFFFF" />
    </Pressable>
    <View style={styles.dropdownContainer}>
    <MultiSelect
      style={styles.dropdown}
      selectedTextStyle={styles.selectedTextStyle}
      inputSearchStyle={{ display: "none" }}
      maxSelect={dropdownData.length}
      data={dropdownData}
      maxHeight={300}
      labelField="label"
      valueField="value"
      placeholder="Categorias"
      value={selected}
      onChange={item => {
        setSelected(item);
        setcurrentCategories?.(item);
      }}
      renderLeftIcon={() => (
        <Feather name="filter" size={20} color="#355FAB" />
      )}
      renderItem={(item, selected) => (
        <View
          style={{
            paddingHorizontal: 16,
            paddingVertical: 14,
            backgroundColor: selected ? '#FCD34D' : '#fff',
            borderBottomWidth: 1,
            borderBottomColor: '#eee',
          }}
        >
          <Text style={{ fontSize: 16, color: selected ? '#111' : '#333' }}>
            {item.label}
          </Text>
        </View>
      )}
      renderSelectedItem={() => <View />}
    />
    </View>
  </View>
</View>
  );
}

const styles = StyleSheet.create({
  postItHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#355FAB',
    paddingHorizontal: 16,
    paddingVertical: 10,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3

  },
 
  postItIcons: {
   flexDirection: "row",
   alignItems: "center", 
   gap: 12 
  
  },
  
  postItTitle: {
   fontSize: 18,
   fontWeight: "bold",
   color: "#FACC15",
   alignSelf: "center" 
  },
  
  iconButton: {
    padding: 10,
    backgroundColor: '#1E3A8A',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  pressedIcon: {
    opacity: 0.8,
    backgroundColor: '#2C4374', 
    transform: [{ scale: 0.95 }],
  },
  
  dropdownContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
 
  dropdown: {
    width: '100%',
    maxWidth: 280,
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
    flexDirection: 'row',
    alignItems: 'center',
},

selectedTextStyle: {
    fontSize: 14,
    color: '#111',
    marginLeft: 6,
}
  
});
