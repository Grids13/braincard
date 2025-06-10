import { StyleSheet, FlatList, View, Pressable, Dimensions, Image } from 'react-native'
import { useState, useEffect } from "react"

import PostItCard from './postItCard'
import PostItModal from './postItModal'
import PostItHeader from './PostItHeader'


const numColumns = 2;
const screenWidth = Dimensions.get('window').width
const itemWidth = screenWidth / (numColumns + 0.2)

export default function PostItList() {
  const [selectionMode, setSelectionMode] = useState(false)
  const [selectedCards, setSelectedCards] = useState([])
  const [newCardId, setNewCardId] = useState(null);
  const [modalVisible, setModalVisible] = useState(false)
  const [currentCard, setCurrentCard] = useState({ id: "", backText: "", frontText: "", updated: false, category: null })
  const [categoryList, setCategoryList] = useState(["História", "Astronomia"])
  const [currentCategories, setcurrentCategories] = useState([])
  const [cardListToView, setCardListToView] = useState([])
  const [cardList, setCardList] = useState([
    {
      id: "a1f9d3b2-9c45-4d21-a6e47-f9275a82b1ec",
      frontText: "Quem descobriu o Brasil?",
      backText: "Pedro Álvares Cabral",
      category: "História"
    },
    {
      id: "a1f9d3b2-9c45-4d21-a3847-f9275a82b1ec",
      frontText: "Qual é o maior planeta do sistema solar?",
      backText: "Júpiter",
      category: "Astronomia"
    },
  ])

  function ToUpdateCardList(card) {
    let cardListToChange = [...cardList];
    let index = cardListToChange.findIndex(c => c.id == card.id);
    let cardToSave = { id: card.id, backText: card.backText, frontText: card.frontText, category: card.category?.trim() ?? null, updated: card.updated };
    cardListToChange.splice(index, 1, cardToSave);
    setCardList(cardListToChange);

    const usedCategories = [...new Set(cardListToChange.map(c => c.category).filter(Boolean))];

    setCategoryList(prev => {
      const novasCategorias = [...new Set([...usedCategories, ...currentCategories])];
      return prev.filter(cat => novasCategorias.includes(cat));
    });
  }

  function toggleSelectionMode() {
    if (selectionMode && selectedCards.length > 0) {
      const updatedCardList = cardList.filter(c => !selectedCards.includes(c.id));
      const usedCategories = [...new Set(updatedCardList.map(c => c.category).filter(Boolean))];

      setCategoryList(prev => {
        const novasCategorias = [...new Set([...usedCategories, ...currentCategories])];
        return prev.filter(cat => novasCategorias.includes(cat));
      });

      setCardList(updatedCardList);
      setSelectedCards([]);
    }
    setSelectionMode(prev => !prev);
  }

  function toggleCardSelection(id) {
    if (selectedCards.includes(id)) {
      setSelectedCards(prev => prev.filter(cid => cid !== id))
    } else {
      setSelectedCards(prev => [...prev, id])
    }
  }

  useEffect(() => {
    if (currentCard.updated) {
      ToUpdateCardList(currentCard)
    }
  }, [currentCard])

  useEffect(() => {
    if (newCardId) {
      openModal(newCardId)
      setNewCardId(null)
    }
    updateCardListToView()
  }, [cardList, currentCategories])

  useEffect(() => {
    const usedCategories = [...new Set(cardList.map(c => c.category).filter(Boolean))];
    const combinedCategories = [...new Set([...usedCategories, ...currentCategories])];
    
    setCategoryList(prev => prev.filter(cat => combinedCategories.includes(cat)));
  }, [cardList, currentCategories]);

  function openModal(cardId) {
    let card = cardList.find(c => c.id == cardId)
    setCurrentCard(card)
    setModalVisible(true)
  }

  function gerarId() {
    return Math.random().toString(36).substr(2, 9);
  }

  function addNewPostIt() {
    const emptyCard = cardList.find(card => card.frontText.trim() === "");
    if (emptyCard) {
      openModal(emptyCard.id);
      return;
    }

    let card = { id: gerarId(), backText: "", frontText: "", updated: false, category: "" };
    setCardList(prevList => [...prevList, card]);
    setNewCardId(card.id);
  }

  function handleCategory(category) {
    const trimmed = category?.trim()
    if (trimmed && !categoryList.includes(trimmed)) {
      setCategoryList(prev => [...prev, trimmed])
    }
  }

  function updateCardListToView() {
    let list = []
    if (currentCategories?.length != 0) {
      list = cardList.filter(c => currentCategories.indexOf(c.category) != -1)
    } else {
      list = cardList
    }

    setCardListToView(list)
  }

  return (
    <View style={{ flex: 1, paddingBottom: 50 }}>
      <PostItHeader onTrashPress={toggleSelectionMode} categoryList={categoryList} setcurrentCategories={setcurrentCategories} />

      <FlatList
        contentContainerStyle={styles.postItList}
        columnWrapperStyle={{ height: 170 }}
        numColumns={2}
        data={cardListToView}
        renderItem={({ item }) => {
            const isSelected = selectedCards.includes(item.id)
            return (
              <Pressable
                style={({ pressed }) => [{ transform: [{ scale: pressed ? 0.95 : 1 }] }]}
                onPress={() => {
                  if (selectionMode) toggleCardSelection(item.id)
                  else openModal(item.id)
                }}
              >
                <PostItCard
                  frontText={item.frontText}
                  width={itemWidth}
                  selectionMode={selectionMode}
                  selected={isSelected}
                />
              </Pressable>
            )
          }
        }
        keyExtractor={item => item.id}
      />

      <PostItModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        card={currentCard}
        setCard={setCurrentCard} 
        categoryList={categoryList}
        handleCategory={handleCategory}  />


      <View style={styles.footer}>
        <Pressable 
          style={({ pressed }) => [styles.addButton, { transform: [{ scale: pressed ? 0.95 : 1 }] },]} 
          onPress={() => addNewPostIt()}>
          <Image
            source={require('../../assets/add-icon.png')}
            style={styles.addIcon}
            resizeMode="contain"
          />
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  postItList: {
    marginTop: 20,
    alignItems: "center",
    paddingBottom: 15
  },

  footer: {
    position: "absolute",
    bottom: 50,
    right: 20,
    padding: 10,
    borderRadius: 30,
    zIndex: 1,
  },
 
  addButton: {
    padding: 14,
    borderRadius: 50,
    backgroundColor: '#93C5FD', 
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  
  addIcon: {
    width: 24,
    height: 24,
    tintColor: 'white',
  },

})