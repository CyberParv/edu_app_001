import { ReactNode } from 'react';
import { Modal, View, TouchableWithoutFeedback } from 'react-native';

interface BottomSheetProps {
  visible: boolean;
  onClose: () => void;
  children: ReactNode;
}

export function BottomSheet({ visible, onClose, children }: BottomSheetProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)' }} />
      </TouchableWithoutFeedback>
      <View style={{ backgroundColor: 'white', padding: 16, borderTopLeftRadius: 16, borderTopRightRadius: 16 }}>
        <View style={{ alignItems: 'center', marginBottom: 8 }}>
          <View style={{ width: 40, height: 4, backgroundColor: '#ccc', borderRadius: 2 }} />
        </View>
        {children}
      </View>
    </Modal>
  );
}