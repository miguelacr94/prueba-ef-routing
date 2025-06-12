import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from 'source/types/navigationType';
const SearchOption = ({ size = 24, variant = 'default', disabled = false, className = '' }) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  navigator = useNavigation();

  const handleGoToLaunchSearch = () => navigation.navigate('LaunchSearchScreen');

  return (
    <TouchableOpacity
      onPress={handleGoToLaunchSearch}
      className={`${className} ${
        disabled ? 'opacity-50' : 'active:scale-95'
      } transition-all duration-150`}
      accessibilityLabel="Buscar"
      accessibilityRole="button"
      disabled={disabled}
      activeOpacity={0.7}>
      <Ionicons name="search-outline" size={size} color={'white'} />
    </TouchableOpacity>
  );
};

export default SearchOption;
