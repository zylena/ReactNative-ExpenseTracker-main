import { View } from 'react-native';
import { GlobalStyles } from '../../constants/styles';
import Button from '../UI/Button';

export default function ActionButtons({ id, onSubmit, onDelete }) {
  return (
    <View className="w-full my-3 flex-row justify-center items-center">
      {id && (
        <Button
          style={{ backgroundColor: GlobalStyles.colors.secondaryButton }}
          classes="w-28 mx-2"
          onPress={onDelete}
        >
          Delete
        </Button>
      )}

      <Button
        style={{ backgroundColor: GlobalStyles.colors.primaryButton }}
        classes="w-28 mx-2"
        onPress={onSubmit}
      >
        {id ? 'Update' : 'Add'}
      </Button>
    </View>
  );
}