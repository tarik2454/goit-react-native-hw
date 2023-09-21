import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const data = [
  { id: '1', title: 'Пост 1' },
  { id: '2', title: 'Пост 2' },
  { id: '3', title: 'Пост 3' },
  // Додайте більше даних для відображення
];

const PostsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Список постів</Text>
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.postItem}>
            <Text>{item.title}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
  },
  postItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
});

export default PostsScreen;
