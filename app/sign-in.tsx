import Button from '@/components/core/Button';
import Input from '@/components/core/Input';
import axionsInstance from '@/config/axiosConfig';
import { useSession } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import axios from 'axios';
import { Link, router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Image, Text, View } from 'react-native';

const Login = () => {

    const { signIn } = useSession();
    const { currentTheme } = useTheme();
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState({
        email: '',
        password: '',
    });

    const handleChange = async (key: string, value: string) => {
        setData({ ...data, [key]: value });
        setErrors({ ...errors, [key]: '' });
    };


    const handleLogin = async () => {
        setLoading(true);
        setErrors({
            email: '',
            password: '',
        })

        try {
            const response = await axionsInstance.post('/api/login', data);
            await signIn(response.data.token, response.data.user);
            router.replace('/');

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
                Login</Text>



            < Input
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

            <Button
                className='w-full bg-primary mb-4'
                onPress={handleLogin}
                disabled={loading}
                loading={loading}
            >
                <View className='flex-row items-center justify-center'>

                    <Text className='text-white text-center'>Login</Text>
                </View>
            </Button>

            <Text className={`text-lg mt-5 ${currentTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                Don't have an account? {' '}
                <Link href='/signup'>
                    <Text className='text-primary'>Sign up</Text></Link>
            </Text>

        </View>
    )
}

export default Login
