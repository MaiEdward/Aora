import { Text, View, ScrollView, Image, Alert } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {images} from '../../constants'
import FormField from '../../components/FormField'
import { useState } from 'react'
import CustomButton from '../../components/CustomButton'
import { Link, router } from 'expo-router'
import { createUser } from '../../lib/appwrite'

const SignUp = () => {
  const [form, setform] = useState({
    username: '',
    email: '',
    password: ''
  })

  const [submitting, setsubmitting] = useState(false)

  const submit = async () => {
    if (form.username === "" || form.email === "" || form.password === "") {
      Alert.alert('Error', 'All fields are required')
    }
    setsubmitting(true);
    try {
      const result = await createUser(form.email, form.password, form.username);

      // TODO: set it to global state
      setUser(result);
      setIsLoggedIn(true);
      router.replace('/home')

    } catch (error) {
      Alert.alert('Error', error.message)
    } finally {
      setsubmitting(false);
    }
    
  }

  return (
    <SafeAreaView
      className="bg-primary h-full"
    >
      <ScrollView>
        <View className="w-full justify-center min-h-[85vh] px-4 my-6">
          <Image 
            source={images.logo}
            resizeMode='contain'
            className="w-[115px] h-[35px]"
          />

          <Text className="text-2xl text-semibold font-psemibold text-white mt-10">
            Sign Up to Aora
          </Text>

          <FormField 
            title="Username"
            value={form.username}
            handleChangeText = {(e) => setform({...form, username: e})}
            otherStyles="mt-10"
          />

          <FormField 
            title="Email"
            value={form.email}
            handleChangeText = {(e) => setform({...form, email: e})}
            otherStyles="mt-7"
            keyboardType="email-address"
          />
          <FormField 
            title="Password"
            value={form.password}
            handleChangeText = {(e) => setform({...form, password: e})}
            otherStyles="mt-7"
          />

          <CustomButton 
            title="Sign Up"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={submitting}
          />
          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100">
              Already have an account?
            </Text>
            <Link href="/sign-in" className='text-lg font-psemibold text-secondary-100'>
              Sign In
            </Link>
          </View>
        </View>
      </ScrollView>

    </SafeAreaView>
  )
}

export default SignUp
