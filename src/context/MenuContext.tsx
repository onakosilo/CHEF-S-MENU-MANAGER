import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState,
} from 'react';

export type Course = 'Starter' | 'Main Course' | 'Dessert';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  course: Course;
  price: number;
}

type NewMenuItem = Omit<MenuItem, 'id'>;

interface MenuContextType {
  menuItems: MenuItem[];
  isLoaded: boolean;

  addMenuItem: (item: NewMenuItem) => void;

  updateMenuItem: (
    id: string,
    updatedItem: NewMenuItem
  ) => void;

  deleteMenuItem: (id: string) => void;
}

const STORAGE_KEY = '@chefs_menu_items';

const MenuContext = createContext<MenuContextType | undefined>(
  undefined
);

export function MenuProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load saved menu items
  useEffect(() => {
    async function loadMenuItems() {
      try {
        const savedItems = await AsyncStorage.getItem(STORAGE_KEY);

        if (savedItems) {
          const parsedItems = JSON.parse(savedItems);

          if (Array.isArray(parsedItems)) {
            setMenuItems(parsedItems);
          }
        }
      } catch (error) {
        console.error('Error loading menu items:', error);
      } finally {
        setIsLoaded(true);
      }
    }

    loadMenuItems();
  }, []);

  // Save menu items whenever they change
  useEffect(() => {
    async function saveMenuItems() {
      if (!isLoaded) return;

      try {
        await AsyncStorage.setItem(
          STORAGE_KEY,
          JSON.stringify(menuItems)
        );
      } catch (error) {
        console.error('Error saving menu items:', error);
      }
    }

    saveMenuItems();
  }, [menuItems, isLoaded]);

  // Add a new menu item
  const addMenuItem = (item: NewMenuItem) => {
    const newItem: MenuItem = {
      ...item,
      id: `${Date.now()}-${Math.random()}`,
    };

    setMenuItems((previousItems) => [
      ...previousItems,
      newItem,
    ]);
  };

  // Update an existing menu item
  const updateMenuItem = (
    id: string,
    updatedItem: NewMenuItem
  ) => {
    setMenuItems((previousItems) =>
      previousItems.map((item) =>
        item.id === id
          ? { ...item, ...updatedItem }
          : item
      )
    );
  };

  // Delete a menu item
  const deleteMenuItem = (id: string) => {
    setMenuItems((previousItems) =>
      previousItems.filter((item) => item.id !== id)
    );
  };

  const value = useMemo(
    () => ({
      menuItems,
      isLoaded,
      addMenuItem,
      updateMenuItem,
      deleteMenuItem,
    }),
    [menuItems, isLoaded]
  );

  return (
    <MenuContext.Provider value={value}>
      {children}
    </MenuContext.Provider>
  );
}

export function useMenu() {
  const context = useContext(MenuContext);

  if (!context) {
    throw new Error(
      'useMenu must be used inside MenuProvider'
    );
  }

  return context;
}