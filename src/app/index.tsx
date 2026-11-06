import { useState } from 'react';

import {
  ActivityIndicator,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';

import {
  Course,
  MenuItem,
  useMenu,
} from '@/context/MenuContext';

import { Colors } from '@/constants/theme';
import { useColorScheme } from 'react-native';

const courses: Course[] = [
  'Starter',
  'Main Course',
  'Dessert',
];

export default function HomeScreen() {
  const {
    menuItems,
    isLoaded,
    addMenuItem,
    updateMenuItem,
    deleteMenuItem,
  } = useMenu();

  const scheme = useColorScheme();

  const colors = Colors[
    scheme === 'dark' ? 'dark' : 'light'
  ];

  const [modalVisible, setModalVisible] = useState(false);

  const [editingItem, setEditingItem] =
    useState<MenuItem | null>(null);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [course, setCourse] = useState<Course>('Starter');
  const [price, setPrice] = useState('');

  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [pendingDelete, setPendingDelete] = useState<string | null>(null);

  function openAddModal() {
    setEditingItem(null);

    setName('');
    setDescription('');
    setCourse('Starter');
    setPrice('');

    setError('');
    setModalVisible(true);
  }

  function openEditModal(item: MenuItem) {
    setEditingItem(item);

    setName(item.name);
    setDescription(item.description);
    setCourse(item.course);
    setPrice(item.price.toString());

    setError('');
    setModalVisible(true);
  }

  function handleSave() {
    if (!name.trim()) {
      setError('Please enter a dish name.');
      return;
    }

    if (!description.trim()) {
      setError('Please enter a dish description.');
      return;
    }

    const numericPrice = Number(price);

    if (
      !price.trim() ||
      !Number.isFinite(numericPrice) ||
      numericPrice <= 0
    ) {
      setError('Please enter a valid price greater than zero.');
      return;
    }

    const itemData = {
      name: name.trim(),
      description: description.trim(),
      course,
      price: numericPrice,
    };

    if (editingItem) {
      updateMenuItem(editingItem.id, itemData);
      setMessage('Menu item updated successfully!');
    } else {
      addMenuItem(itemData);
      setMessage('New menu item added successfully!');
    }

    setError('');
    setModalVisible(false);
  }

  function handleDelete(id: string) {
    if (pendingDelete === id) {
      deleteMenuItem(id);
      setPendingDelete(null);
      setMessage('Menu item deleted successfully!');
    } else {
      setPendingDelete(id);
    }
  }

  function formatPrice(value: number) {
    return `R${value.toFixed(2)}`;
  }

  if (!isLoaded) {
    return (
      <View style={[styles.loading, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={{ color: colors.text }}>
          Loading menu...
        </Text>
      </View>
    );
  }

  return (
    <View
      style={[
        styles.screen,
        { backgroundColor: colors.background },
      ]}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}

        <View style={styles.header}>
          <View>
            <Text style={[styles.eyebrow, { color: colors.primary }]}>
              RESTAURANT MANAGEMENT
            </Text>

            <Text style={[styles.heading, { color: colors.text }]}>
              Chef's Menu Manager
            </Text>

            <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
              Manage your restaurant's menu with ease.
            </Text>
          </View>

          <Text style={styles.chefIcon}>🍽️</Text>
        </View>

        {/* Welcome card */}

        <View
          style={[
            styles.heroCard,
            { backgroundColor: colors.primary },
          ]}
        >
          <Text style={styles.heroLabel}>
            YOUR MENU AT A GLANCE
          </Text>

          <Text style={styles.heroNumber}>
            {menuItems.length}
          </Text>

          <Text style={styles.heroText}>
            Total menu items
          </Text>

          <Text style={styles.heroDescription}>
            Keep your restaurant menu organised and up to date.
          </Text>
        </View>

        {/* Menu section */}

        <View style={styles.sectionHeader}>
          <View>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Your Menu
            </Text>

            <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
              Add, update or remove dishes.
            </Text>
          </View>

          <Pressable
            style={[
              styles.addButton,
              { backgroundColor: colors.primary },
            ]}
            onPress={openAddModal}
          >
            <Text style={styles.addButtonText}>
              + Add Dish
            </Text>
          </Pressable>
        </View>

        {message !== '' && (
          <View
            style={[
              styles.messageBox,
              { backgroundColor: colors.secondary },
            ]}
          >
            <Text style={{ color: colors.text }}>
              {message}
            </Text>
          </View>
        )}

        {/* Menu cards */}

        {menuItems.length === 0 ? (
          <View
            style={[
              styles.emptyCard,
              {
                backgroundColor: colors.backgroundElement,
                borderColor: colors.border,
              },
            ]}
          >
            <Text style={styles.emptyIcon}>🥗</Text>

            <Text style={[styles.emptyTitle, { color: colors.text }]}>
              Your menu is empty
            </Text>

            <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
              Start by adding your first delicious dish.
            </Text>

            <Pressable
              style={[
                styles.addButton,
                { backgroundColor: colors.primary },
              ]}
              onPress={openAddModal}
            >
              <Text style={styles.addButtonText}>
                Add Your First Dish
              </Text>
            </Pressable>
          </View>
        ) : (
          menuItems.map((item) => (
            <View
              key={item.id}
              style={[
                styles.menuCard,
                {
                  backgroundColor: colors.backgroundElement,
                  borderColor: colors.border,
                },
              ]}
            >
              <View style={styles.cardTop}>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.dishName, { color: colors.text }]}>
                    {item.name}
                  </Text>

                  <Text style={[styles.courseLabel, { color: colors.primary }]}>
                    {item.course}
                  </Text>
                </View>

                <Text style={[styles.price, { color: colors.primary }]}>
                  {formatPrice(item.price)}
                </Text>
              </View>

              <Text style={[styles.description, { color: colors.textSecondary }]}>
                {item.description}
              </Text>

              <View style={styles.cardActions}>
                <Pressable
                  style={[
                    styles.editButton,
                    { backgroundColor: colors.secondary },
                  ]}
                  onPress={() => openEditModal(item)}
                >
                  <Text style={[styles.editButtonText, { color: colors.primary }]}>
                    Edit
                  </Text>
                </Pressable>

                <Pressable
                  style={[
                    styles.deleteButton,
                    { borderColor: colors.danger },
                  ]}
                  onPress={() => handleDelete(item.id)}
                >
                  <Text style={{ color: colors.danger }}>
                    {pendingDelete === item.id ? 'Confirm Delete' : 'Delete'}
                  </Text>
                </Pressable>

                {pendingDelete === item.id && (
                  <Pressable
                    onPress={() => setPendingDelete(null)}
                    style={styles.cancelButton}
                  >
                    <Text style={{ color: colors.textSecondary }}>
                      Cancel
                    </Text>
                  </Pressable>
                )}
              </View>
            </View>
          ))
        )}

        <Text style={[styles.footer, { color: colors.textSecondary }]}>
          Chef's Menu Manager • Restaurant Management
        </Text>
      </ScrollView>

      {/* Add/Edit modal */}

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View
            style={[
              styles.modalCard,
              { backgroundColor: colors.background },
            ]}
          >
            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={[styles.modalTitle, { color: colors.text }]}>
                {editingItem ? 'Edit Menu Item' : 'Add New Dish'}
              </Text>

              <Text style={[styles.inputLabel, { color: colors.text }]}>
                Dish Name
              </Text>

              <TextInput
                style={[
                  styles.input,
                  {
                    color: colors.text,
                    borderColor: colors.border,
                    backgroundColor: colors.backgroundElement,
                  },
                ]}
                placeholder="Enter dish name"
                placeholderTextColor={colors.textSecondary}
                value={name}
                onChangeText={setName}
              />

              <Text style={[styles.inputLabel, { color: colors.text }]}>
                Description
              </Text>

              <TextInput
                style={[
                  styles.input,
                  styles.descriptionInput,
                  {
                    color: colors.text,
                    borderColor: colors.border,
                    backgroundColor: colors.backgroundElement,
                  },
                ]}
                placeholder="Describe the dish"
                placeholderTextColor={colors.textSecondary}
                value={description}
                onChangeText={setDescription}
                multiline
              />

              <Text style={[styles.inputLabel, { color: colors.text }]}>
                Course
              </Text>

              <View style={styles.courseOptions}>
                {courses.map((option) => (
                  <Pressable
                    key={option}
                    onPress={() => setCourse(option)}
                    style={[
                      styles.courseOption,
                      {
                        backgroundColor:
                          course === option
                            ? colors.primary
                            : colors.backgroundElement,
                        borderColor: colors.border,
                      },
                    ]}
                  >
                    <Text
                      style={{
                        color:
                          course === option
                            ? '#FFFFFF'
                            : colors.text,
                        fontSize: 12,
                        fontWeight: '600',
                      }}
                    >
                      {option}
                    </Text>
                  </Pressable>
                ))}
              </View>

              <Text style={[styles.inputLabel, { color: colors.text }]}>
                Price (R)
              </Text>

              <TextInput
                style={[
                  styles.input,
                  {
                    color: colors.text,
                    borderColor: colors.border,
                    backgroundColor: colors.backgroundElement,
                  },
                ]}
                placeholder="e.g. 85.00"
                placeholderTextColor={colors.textSecondary}
                keyboardType="decimal-pad"
                value={price}
                onChangeText={setPrice}
              />

              {error !== '' && (
                <Text style={styles.errorText}>
                  {error}
                </Text>
              )}

              <Pressable
                style={[
                  styles.saveButton,
                  { backgroundColor: colors.primary },
                ]}
                onPress={handleSave}
              >
                <Text style={styles.saveButtonText}>
                  {editingItem ? 'Save Changes' : 'Add Menu Item'}
                </Text>
              </Pressable>

              <Pressable
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={{ color: colors.textSecondary }}>
                  Cancel
                </Text>
              </Pressable>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },

  scrollContent: {
    padding: 22,
    paddingBottom: 100,
    maxWidth: 800,
    width: '100%',
    alignSelf: 'center',
  },

  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
  },

  eyebrow: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 2,
    marginBottom: 8,
  },

  heading: {
    fontSize: 27,
    fontWeight: '800',
  },

  subtitle: {
    fontSize: 13,
    marginTop: 6,
  },

  chefIcon: {
    fontSize: 38,
  },

  heroCard: {
    borderRadius: 20,
    padding: 24,
    marginBottom: 30,
  },

  heroLabel: {
    color: '#E4EDE3',
    fontSize: 11,
    letterSpacing: 2,
    fontWeight: '700',
  },

  heroNumber: {
    color: '#FFFFFF',
    fontSize: 48,
    fontWeight: '800',
    marginTop: 12,
  },

  heroText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
  },

  heroDescription: {
    color: '#E4EDE3',
    fontSize: 12,
    marginTop: 12,
  },

  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 18,
    gap: 10,
  },

  sectionTitle: {
    fontSize: 21,
    fontWeight: '800',
  },

  addButton: {
    paddingHorizontal: 17,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },

  addButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },

  messageBox: {
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
  },

  emptyCard: {
    borderWidth: 1,
    borderRadius: 18,
    padding: 30,
    alignItems: 'center',
    gap: 12,
  },

  emptyIcon: {
    fontSize: 40,
  },

  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
  },

  menuCard: {
    borderWidth: 1,
    padding: 18,
    borderRadius: 16,
    marginBottom: 14,
  },

  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },

  dishName: {
    fontSize: 17,
    fontWeight: '800',
  },

  courseLabel: {
    fontSize: 11,
    fontWeight: '700',
    marginTop: 5,
  },

  price: {
    fontSize: 17,
    fontWeight: '800',
  },

  description: {
    fontSize: 13,
    lineHeight: 20,
    marginTop: 12,
  },

  cardActions: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 9,
    marginTop: 18,
  },

  editButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },

  editButtonText: {
    fontSize: 12,
    fontWeight: '700',
  },

  deleteButton: {
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },

  cancelButton: {
    padding: 8,
  },

  footer: {
    textAlign: 'center',
    fontSize: 11,
    marginTop: 35,
  },

  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.55)',
    justifyContent: 'center',
    padding: 18,
  },

  modalCard: {
    width: '100%',
    maxWidth: 500,
    maxHeight: '90%',
    alignSelf: 'center',
    padding: 23,
    borderRadius: 20,
  },

  modalTitle: {
    fontSize: 23,
    fontWeight: '800',
    marginBottom: 22,
  },

  inputLabel: {
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 8,
    marginTop: 13,
  },

  input: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 13,
    fontSize: 14,
  },

  descriptionInput: {
    minHeight: 90,
    textAlignVertical: 'top',
  },

  courseOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 7,
  },

  courseOption: {
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 11,
    borderRadius: 9,
  },

  errorText: {
    color: '#D74747',
    fontSize: 12,
    marginTop: 12,
  },

  saveButton: {
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 25,
  },

  saveButtonText: {
    color: '#FFFFFF',
    fontWeight: '800',
  },

  closeButton: {
    alignItems: 'center',
    padding: 15,
  },
});