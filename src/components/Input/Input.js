import * as React from 'react'
import { View, TextInput } from 'react-native'

import styles from './Input.style'
import colors from '../../styles/colors'

const Input = ({ placeholder, value, onType, iconName, isSecure }) => {
    return (
        <View style={styles.container}>
            <TextInput
                autoCapitalize="none"
                style={styles.input}
                placeholder={placeholder}
                placeholderTextColor={colors.darkGray}
                onChangeText={onType}
                value={value}
                secureTextEntry={isSecure}
            />
        </View>
    )
}

export default Input
