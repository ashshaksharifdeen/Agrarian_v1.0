import React, {useContext} from 'react';
import {Text, View, Pressable, TextInput, StyleSheet} from 'react-native';
import {AppStateContext} from '../AppStateContext';

/**
 * TextInputComponent is a reusable component that renders a text input field.
 */
export default function TextInputComponent({
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
  ref
}) {
  const {colors} = useContext(AppStateContext);

  const styles = StyleSheet.create({
    container: {
      height: 50,
      width: '60%',
      marginBottom: 15,
      backgroundColor: colors.black4,
      borderRadius: 10,
      justifyContent: 'center',
      borderWidth: 2,
      borderColor: colors.black6,
    },
    textInput: {
      backgroundColor: colors.black4,
      color: colors.black1,
      fontSize: 23,
      marginLeft: 20,
    },
  });

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        placeholderTextColor={colors.black3}
        ref={ref}
      />
    </View>
  );
}
