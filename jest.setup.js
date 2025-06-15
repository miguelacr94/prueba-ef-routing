// jest.setup.js

// Mock para @expo/vector-icons
jest.mock('@expo/vector-icons', () => {
  return {
    Ionicons: 'IoniconsMock', // Mock de Ionicons
  };
});

// Mock para expo-font (si lo necesitas)
jest.mock('expo-font', () => {
  return {
    useFonts: jest.fn().mockReturnValue([true]),
  };
});

// Mock para react-native-actions-sheet
jest.mock('react-native-actions-sheet', () => {
  return {
    ActionSheet: 'ActionSheetMock', // Mock de ActionSheet
  };
});
