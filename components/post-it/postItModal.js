import { Modal, View, Text, StyleSheet, Pressable, TextInput, Image } from "react-native"
import { useState, useEffect } from "react"

import FlipCard from "../flipCard"
import AutocompleteInput from "../autoCompleteInput"

function CardContent({ displayText, text, setText, close, turnCard, currentCategory, categoryList, setCategory }) {
  return (
    <View style={styles.modalContent}>

      <View style={{ flex: 1 }}>
        <Text style={{textAlign: "center"}}>{displayText}</Text>

        <Pressable style={styles.closeButton} onPress={() => close()}>
          <Text style={styles.closeText}>X</Text>
        </Pressable>

        <View style={{ flex: 1 }}>
          <TextInput
            underlineColor="transparent"
            placeholder="Digite aqui..."
            editable
            multiline
            onChangeText={setText}
            value={text}
            style={styles.textInput}
          />
        </View>

        <View style={styles.footer}>
          <AutocompleteInput
            text={currentCategory}
            data={categoryList}
            onSelect={setCategory}
          />

          <Pressable style={styles.flipButton} onPress={() => turnCard()}>
            <Image
              source={require('../../assets/flip-icon.png')}
              style={styles.flipIcon}
              resizeMode="contain"
            />
          </Pressable>
        </View>

      </View>
    </View>
  )
}


export default function App({ modalVisible, setModalVisible, card, setCard, categoryList, handleCategory }) {

  const [isFront, setIsFront] = useState(true);
  const [frontText, setFrontText] = useState("")
  const [backText, setBackText] = useState("")
  const [category, setCategory] = useState("")

  useEffect(() => {
    setFrontText(card.frontText)
    setBackText(card.backText)
    setCategory(card.category?.trim() ?? null)
  }, [card])

  function closeModal() {
    let updated = false
    if (card.frontText != frontText || card.backText != backText || card.category != category) {
      updated = true
      setCard({ id: card.id, backText: backText, frontText: frontText, updated, category })
    }
    handleCategory(category)
    setModalVisible(false)
    setIsFront(true)
  }

  function turnCard() {
    setIsFront(!isFront)
  }

  return (
    <View style={styles.container}>
      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="slide"
        onRequestClose={closeModal}
      >

        <View style={styles.modalContainer}>

          <FlipCard
            isFlipped={!isFront}
            direction="y"
            duration={500}
            RegularContent={
              <CardContent text={frontText} 
                displayText="Frente"
                setText={setFrontText} 
                close={closeModal} 
                turnCard={turnCard} 
                currentCategory={category}
                categoryList={categoryList} 
                setCategory={setCategory}  />

            }
            FlippedContent={
              <CardContent text={backText} 
                displayText="Verso"
                setText={setBackText} 
                close={closeModal} 
                turnCard={turnCard} 
                currentCategory={category}
                categoryList={categoryList} 
                setCategory={setCategory} />

            }
          />
        </View>

        
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.09)",
  },
  modalContent: {
    flex: 1,
    backgroundColor: "#F7E27A",
    minWidth: "95%",
    maxWidth: "95%",
    minHeight: "50%",
    maxHeight: "50%",
    borderRadius: 10,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  closeButton: {
    alignSelf: "flex-end",
    paddingRight: 10
  },
  closeText: {
    fontSize: 25,
    fontWeight: "800",
  },
  textInput: {
    flex: 1,
    fontWeight: "600",
    borderBottomWidth: 0,
    outlineStyle: "none",
    marginTop: 3,
    paddingHorizontal: 10,
    // backgroundColor: "yellow",
    textAlignVertical: 'top'
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  footerText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  flipButton: {
    padding: 10,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },

  flipIcon: {
    width: 25,
    height: 25,
    tintColor: 'black',
  },

});
