# Chef's Menu Manager

## Project Overview

Chef's Menu Manager is a React Native mobile application developed to help restaurant owners and chefs manage their restaurant menus.

The application allows users to add, view, edit and delete menu items. It also includes search functionality, course filtering and menu statistics.

This project was developed using React Native, Expo and TypeScript.

## Technologies Used

- React Native
- Expo
- TypeScript
- Expo Router
- React Context API
- AsyncStorage
- Visual Studio Code
- Git and GitHub

## Application Features

### 1. Menu Management
- Add new menu items.
- View existing menu items.
- Edit menu item information.
- Update dish names, descriptions, courses and prices.
- Delete existing menu items.
- Save menu information locally.

### 2. Search and Filtering
- Search menu items by name.
- Filter items by Starter, Main Course and Dessert.
- Clear search terms and filters.
- Display updated search results.

### 3. Menu Statistics
- Display the total number of menu items.
- Calculate the average menu price.
- Display the number of dishes in each course.
- Present course statistics using visual progress bars.

### 4. User Experience
- Consistent application styling.
- Clear navigation.
- Input validation.
- Success and error messages.
- Empty-state messages.
- Confirmation before deleting menu items.

## Installation Instructions

1. Clone the GitHub repository.
2. Open the project folder in Visual Studio Code.
3. Open the terminal.
4. Install the dependencies:

   npm install

5. Install the storage dependency:

   npx expo install @react-native-async-storage/async-storage

6. Start the application:

   npx expo start

7. Open the application using Expo Go or the supported development environment.

## Changelog: Changes Since Part 2

The following improvements were implemented during the final development stage.

### New Functionality

- Added the ability to edit existing menu items.
- Added functionality to update menu item information.
- Added the ability to delete menu items.
- Added search functionality for menu items.
- Added filtering by course category.
- Added a clear search and filter function.
- Added menu statistics.
- Added automatic average price calculations.
- Added course-based menu item counts.
- Added local data persistence using AsyncStorage.

### User Interface Improvements

- Updated the application's colour scheme.
- Improved spacing and alignment.
- Introduced menu item cards.
- Improved the presentation of menu statistics.
- Added clearer action buttons.
- Improved navigation labels.
- Added empty-state messages.

### Validation and User Feedback

- Added required-field validation.
- Added price validation.
- Added success messages.
- Added error messages.
- Added deletion confirmation.

## Refactoring Changes

The application was reorganised to improve code readability and maintainability.

The following changes were implemented:

- Introduced a MenuContext to manage shared menu data.
- Created reusable menu management functions.
- Separated menu data management from screen presentation.
- Used meaningful variable and function names.
- Used TypeScript interfaces to define menu item structures.
- Used reusable course definitions.
- Used React hooks to manage application state.
- Used useMemo for search and filtering calculations.
- Introduced a consistent theme configuration.

## Course Categories

The application supports three menu categories:

- Starter
- Main Course
- Dessert

## Data Storage

Menu items are stored locally using AsyncStorage.

This allows menu information to remain available when the application is closed and reopened.

## Author

Chef's Menu Manager Final Portfolio of Evidence.

## Video Demonstration

YouTube demonstration link: (https://youtu.be/90UkAij4u4A)


## GitHub Repository

Repository link: https://github.com/onakosilo/CHEF-S-MENU-MANAGER.git
