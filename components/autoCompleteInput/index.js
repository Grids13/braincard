import { useEffect, useState } from 'react';
import {
	View,
	TextInput,
	Text,
	FlatList,
	TouchableOpacity,
	StyleSheet
} from 'react-native';

const AutocompleteInput = ({ data = [], onSelect, text }) => {
	const [input, setInput] = useState('');
	const [filtered, setFiltered] = useState([]);

	useEffect(() => {
		setInput(text)
	}, [text])

	const handleChange = (text) => {
		setInput(text);
		onSelect?.(text);
		if (text?.trim() == "") {
			setFiltered([]);
			return
		}

		const matches = data.filter(item =>
			item.toLowerCase().includes(text.toLowerCase())
		);

		setFiltered(matches);
	};

	const handleSelect = (item) => {
		setInput(item);
		setFiltered([]);
		onSelect?.(item);
	};

	return (
		<View style={styles.wrapper}>
			<TextInput
				style={styles.input}
				placeholder="Categoria"
				value={input}
				onChangeText={handleChange}
			/>
			{filtered.length > 0 && (
				<FlatList
					data={filtered}
					keyExtractor={(item) => item}
					renderItem={({ item }) => (
						<TouchableOpacity
							onPress={() => handleSelect(item)}
							style={styles.suggestion}
						>
							<Text>{item}</Text>
						</TouchableOpacity>
					)}
					style={styles.dropdown}
				/>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	wrapper: {
		position: 'relative',
		zIndex: 999,
	},
	input: {
		width: 200,
		borderWidth: 1,
		borderColor: '#ccc',
		padding: 10,
		borderRadius: 6,
		backgroundColor: '#fff',
	},
	dropdown: {
		position: 'absolute',
		top: 45,
		width: '100%',
		backgroundColor: '#fff',
		borderWidth: 1,
		borderColor: '#ccc',
		maxHeight: 120,
		borderRadius: 6,
		zIndex: 1000,
	},
	suggestion: {
		padding: 10,
		borderBottomWidth: 1,
		borderBottomColor: '#eee',
	},
});

export default AutocompleteInput;
