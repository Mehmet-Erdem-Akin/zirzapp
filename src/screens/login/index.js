import { Text, StyleSheet, View } from 'react-native'
import auth from '@react-native-firebase/auth'
import { useState } from 'react'
import { showMessage } from 'react-native-flash-message'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Formik } from 'formik'
import colors from '../../styles/colors'
import Input from '../../components/Input'
import Button from '../../components/Button'
import authErrorMessageParser from '../../utils/authErrorMessageParser'

const initialValues = {
    username: '',
    password: ''
}

const Login = ({ route, navigation }) => {
    const { isAuth } = route.params
    const [loading, setLoading] = useState(false)

    console.log('isAuth: ', isAuth)

    const handleRegister = () => {
        console.log('login pressed')
        navigation.navigate('Register')
    }

    async function handleFormSubmit(formValues) {
        try {
            setLoading(true)
            await auth().signInWithEmailAndPassword(
                formValues.username,
                formValues.password
            )
            showMessage({
                message: authErrorMessageParser('Oturum Açma İşlemi Başarılı'),
                type: 'success'
            })
            setLoading(false)
            navigation.navigate('Feed')
        } catch (error) {
            console.log('error: ', error.code)
            showMessage({
                message: authErrorMessageParser(error.code),
                type: 'danger'
            })
            setLoading(false)
        }
    }
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center'
        },
        textStyle: {
            padding: 8,
            margin: 16,
            marginBottom: 16,
            fontWeight: 'bold',
            textAlign: 'center',
            fontSize: 30,
            color: colors.white
        },
        btnStyle: {
            backgrounColor: colors.gray
        },
        formContainer: {
            padding: 15
        },
        input: {
            flex: 1
        },
        header: {
            color: colors.darkPurple,
            fontSize: 40,
            fontWeight: 'bold',
            margin: 5,
            textAlign: 'center',
            paddingBottom: 30
        }
    })
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.header}>Zirzapp Chat</Text>
            <Formik onSubmit={handleFormSubmit} initialValues={initialValues}>
                {({ values, handleChange, handleSubmit }) => (
                    <>
                        <View style={styles.formContainer}>
                            <Input
                                value={values.username}
                                onType={handleChange('username')}
                                placeholder="e-posta giriniz..."
                            />
                            <Input
                                isSecure
                                value={values.password}
                                onType={handleChange('password')}
                                placeholder="parola giriniz..."
                            />
                            <Button text="Giriş Yap" onPress={handleSubmit} />
                            <Button
                                text="Kayıt Ol"
                                theme="secondary"
                                onPress={handleRegister}
                            />
                        </View>
                    </>
                )}
            </Formik>
        </SafeAreaView>
    )
}

export default Login
