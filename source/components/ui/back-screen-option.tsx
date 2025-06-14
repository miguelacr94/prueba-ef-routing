import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';

interface BackScreenProps {
  color?: string;
}

const BackScreenOption = ({ color = 'white' }: BackScreenProps) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginHorizontal: 20 }}>
      <Ionicons name="chevron-back" color={color} size={30} />
    </TouchableOpacity>
  );
};

export default BackScreenOption;
