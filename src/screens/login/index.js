import { ScrollView, Text, View } from 'react-native'
import auth from '@react-native-firebase/auth'
import { useState } from 'react'
import FlashMessage, { showMessage } from 'react-native-flash-message'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Formik } from 'formik'
import colors from '../../styles/colors'
import Input from '../../components/Input'
import Button from '../../components/Button'
import authErrorMessageParser from '../../utils/authErrorMessageParser'
import * as yup from 'yup'
import LogoContainer from '../../components/LogoContainer'
import { authStackStyle } from '../../styles/authStackStyle'

const initialValues = {
    email: '',
    password: ''
}

const Login = ({ route, navigation }) => {
    const { isAuth } = route.params
    const [loading, setLoading] = useState(false)

    console.log('isAuth: ', isAuth)

    const loginValidationSchema = yup.object().shape({
        email: yup
            .string()
            .email('Lütfen geçerli bir e-mail giriniz.')
            .required('E-mail alanı zorunludur'),
        password: yup
            .string()
            .min(6, ({ min }) => `Parolanız en az ${min} karakter olmalıdır.`)
            .required('Parola alanı zorunludur.')
    })

    const handleRegister = () => {
        console.log('login pressed')
        navigation.navigate('Register')
    }

    const handleFormSubmit = async (formValues) => {
        try {
            setLoading(true)
            await auth().signInWithEmailAndPassword(
                formValues.email,
                formValues.password
            )
            showMessage({
                message: authErrorMessageParser('Oturum Açma İşlemi Başarılı'),
                type: 'success'
            })
            setLoading(false)
            navigation.navigate('Register')
        } catch (error) {
            console.log('error: ', error.code)
            showMessage({
                message: authErrorMessageParser(error.code),
                type: 'danger'
            })
            setLoading(false)
        }
    }

    return (
        <SafeAreaView style={authStackStyle.container}>
            <ScrollView>
                <LogoContainer />
                <Formik
                    validationSchema={loginValidationSchema}
                    onSubmit={handleFormSubmit}
                    initialValues={initialValues}
                >
                    {({
                        values,
                        handleChange,
                        handleSubmit,
                        handleBlur,
                        errors,
                        touched
                    }) => (
                        <>
                            <FlashMessage position="top" />

                            <View style={authStackStyle.formContainer}>
                                <Input
                                    value={values.email}
                                    onType={handleChange('email')}
                                    placeholder="e-mail giriniz..."
                                    onBlur={handleBlur('password')}
                                />
                                {errors.email && touched.email && (
                                    <Text
                                        style={{
                                            paddingHorizontal: 25,
                                            fontSize: 10,
                                            color: 'red'
                                        }}
                                    >
                                        {errors.email}
                                    </Text>
                                )}
                                <Input
                                    isSecure
                                    value={values.password}
                                    onType={handleChange('password')}
                                    placeholder="parola giriniz..."
                                />
                                {errors.password && touched.password && (
                                    <Text
                                        style={{
                                            paddingHorizontal: 25,
                                            fontSize: 10,
                                            color: 'red'
                                        }}
                                    >
                                        {errors.password}
                                    </Text>
                                )}
                                <Button
                                    text="Giriş Yap"
                                    onPress={handleSubmit}
                                />
                                <Button
                                    text="Kayıt Ol"
                                    theme="secondary"
                                    onPress={handleRegister}
                                />
                            </View>
                        </>
                    )}
                </Formik>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Login
