
import Button from '@/components/core/Button';
import Input from '@/components/core/Input';
import axionsInstance from '@/config/axiosConfig';
import { useTheme } from '@/context/ThemeContext';
import axios from 'axios';
import { Link } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Image, Text, View } from 'react-native';

const Signup = () => {

    const { currentTheme } = useTheme();
    const [data, setData] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const [errors, setErrors] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (key: string, value: string) => {
        setData({ ...data, [key]: value });
    };

    const handleSignUp = async () => {
        setLoading(true);
        setErrors({
            name: '',
            email: '',
            password: '',
            password_confirmation: '',
        });

        try {
            await axionsInstance.post('/api/signup', data);
            resetForm();
            setSuccessMessage('Account created successfully! Please check your email to verify your account.')
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const responseData = error.response?.data;
                if (responseData?.errors) {
                    setErrors(responseData.errors)
                } else if (responseData?.message) {
                    Alert.alert("Error", responseData.message);
                } else {
                    Alert.alert("Error", 'An unexpected error occurred !');
                }
            } else {
                console.error("Error: ", error);
                Alert.alert("Error", 'Unable to connect to the server !');
            }
        }
        finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setData({
            name: '',
            email: '',
            password: '',
            password_confirmation: '',
        });
        setErrors({
            name: '',
            email: '',
            password: '',
            password_confirmation: '',
        });
    };

    return (
        <View className={`flex-1 justify-center items-center p-5 ${currentTheme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
            <View className='items-center mb-8'>
                <Image
                    source={require('../assets/images/react-logo.png')}
                    className="w-32 h-32   mb-4"
                    resizeMode="contain"
                />
                <Text className={`text-3xl font-bold mb-5 ${currentTheme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    Start transforming your body today</Text>
            </View>

            <Text className={`text-3xl font-bold mb-5 ${currentTheme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Sign Up</Text>

            {!!successMessage && <Text className='bg-emerald-600 text-white rounded-lg py-3 px-4 mb-4'>
                {successMessage}</Text>}

            <Input
                placeholder='Name'
                value={data.name}
                onChangeText={(value) => handleChange('name', value)}
                error={errors.name}
            />

            <Input
                placeholder='Email'
                value={data.email}
                onChangeText={(value) => handleChange('email', value)}
                error={errors.email}
                keyboardType='email-address'
            />

            <Input
                placeholder='Passowrd'
                value={data.password}
                onChangeText={(value) => handleChange('password', value)}
                secureTextEntry
                error={errors.password}
            />

            <Input
                placeholder='Confirm password'
                value={data.password_confirmation}
                onChangeText={(value) => handleChange('password_confirmation', value)}
                secureTextEntry
            />

            <Button
                className='w-full bg-primary mb-4'
                onPress={handleSignUp}
                disabled={loading}
                loading={loading}
            >
                <View className='flex-row items-center justify-center'>

                    <Text className='text-white text-center'>Sign up</Text>
                </View>
            </Button>

            <Text className={`text-lg mt-5 ${currentTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                Already have an account? {' '}
                <Link href="/sign-in">
                    <Text className='text-primary'>Sign in</Text></Link>
            </Text>
        </View>
    )
}

export default Signup
