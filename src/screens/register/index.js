import React, { useEffect, useState } from 'react'
import { Text, View, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Button from '../../components/Button/Button'
import Input from '../../components/Input/Input'
import colors from '../../styles/colors'
import { Formik } from 'formik'

import auth from '@react-native-firebase/auth'
import { showMessage } from 'react-native-flash-message'
import authErrorMessageParser from '../../utils/authErrorMessageParser'
import * as yup from 'yup'
import LogoContainer from '../../components/LogoContainer'
import { authStackStyle } from '../../styles/authStackStyle'

import storage from '@react-native-firebase/storage'
import firestore from '@react-native-firebase/firestore'

const initialFormValues = {
    email: '',
    username: '',
    password: '',
    rePassword: ''
}

const signUpValidationSchema = yup.object().shape({
    email: yup
        .string()
        .email('Lütfen geçerli bir e-mail giriniz.')
        .required('E-mail alanı zorunludur'),
    username: yup.string().required('Kullanıcı adı alanı zorunludur.'),
    password: yup
        .string()
        .matches(/\w*[a-z]\w*/, 'Şifre bir küçük harf içermelidir.')
        .matches(/\w*[A-Z]\w*/, 'Şifre bir büyük harf içermelidir.')
        .matches(/\d/, 'Şifre bir sayı içermelidir.')
        .matches(
            /[!@#$%^&*()\-_"=+{}; :,<.>]/,
            'Şifre bir özel karakter içermelidir.'
        )
        .min(6, ({ min }) => `Şifreniz en az ${min} karakter olmalı`)
        .required('Parola alanı zorunludur'),
    rePassword: yup
        .string()
        .oneOf([yup.ref('password')], 'Parolalar uyuşmuyor.')
        .required('Parola tekrarı alanı zorunludur')
})

const Register = ({ navigation }) => {
    const [loading, setLoading] = useState(false)

    // çalışmıyor sanırım şuan
    function handleLogin() {
        navigation.navigate('Login')
        console.log('handle function çalıştı, register')
    }

    const handleFormSubmit = async (formValues) => {
        if (formValues.password !== formValues.rePassword) {
            showMessage({
                message: 'Şifreler uyuşmuyor',
                type: 'danger'
            })

            return
        }

        try {
            await auth()
                .createUserWithEmailAndPassword(
                    formValues.email,
                    formValues.password
                )

                .then((userCredentials) => {
                    setLoading(true)
                    if (userCredentials.user) {
                        firestore()
                            .collection('users')
                            .doc(auth().currentUser.uid)
                            .set({
                                username: formValues.username,
                                email: formValues.email
                            })
                        showMessage({
                            message: 'Kullanıcı başarıyla oluşturuldu.',
                            type: 'success'
                        })
                        setLoading(false)
                        navigation.navigate('Feed')
                    }
                })
                .catch((err) => {
                    showMessage({
                        message: authErrorMessageParser(err.code),
                        type: 'success'
                    })
                })
        } catch (error) {
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
                    initialValues={initialFormValues}
                    onSubmit={handleFormSubmit}
                    validationSchema={signUpValidationSchema}
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
                            <View style={authStackStyle.formContainer}>
                                <Input
                                    value={values.email}
                                    onType={handleChange('email')}
                                    placeholder="e-mail giriniz..."
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
                                    value={values.username}
                                    onType={handleChange('username')}
                                    placeholder="kullanıcı adı giriniz..."
                                />
                                {errors.username && touched.username && (
                                    <Text
                                        style={{
                                            paddingHorizontal: 25,
                                            fontSize: 10,
                                            color: 'red'
                                        }}
                                    >
                                        {errors.username}
                                    </Text>
                                )}
                                <Input
                                    value={values.password}
                                    onType={handleChange('password')}
                                    placeholder="parola giriniz..."
                                    isSecure
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
                                <Input
                                    placeholder="parolayı tekrar giriniz..."
                                    value={values.rePassword}
                                    onType={handleChange('rePassword')}
                                    isSecure
                                />
                                {errors.rePassword && touched.rePassword && (
                                    <Text
                                        style={{
                                            paddingHorizontal: 25,
                                            fontSize: 10,
                                            color: 'red'
                                        }}
                                    >
                                        {errors.rePassword}
                                    </Text>
                                )}
                                <Button
                                    text="Kayıt Ol"
                                    onPress={handleSubmit}
                                />
                                <Button
                                    text="Giriş Yap"
                                    theme="secondary"
                                    onPress={handleLogin}
                                />
                            </View>
                        </>
                    )}
                </Formik>
            </ScrollView>
        </SafeAreaView>
    )
}
export default Register
