import { Header } from '@/components/Header'
import { Loading } from '@/components/Loading'
import api from '@/services/api'

import React, { useState } from 'react'
import colors from 'tailwindcss/colors'
import { Search } from 'lucide-react-native'
import { View, Text, Keyboard, TextInput, TouchableOpacity, FlatList, Image, Linking} from 'react-native'


export default function Home() {
    const [text, setText] = useState("")
    const [users, setUsers] = useState("")
    const [result,setResult] = useState([])

    const [loading,setLoading] = useState(false)

    async function searchUsers() {
        setLoading(true)
            setText("")
            Keyboard.dismiss()
                const response = await api.get(`/search/users?q=${text}`)
                setResult(response.data.items)
        
            if ( response.data.incomplete_results) {
                return
            } 
        setLoading(false)
    }

    

    const renderItems = ({ item }: { item: any }) => {
        return (
            <View className='border border-white rounded-3xl mb-5'>
                <View className='flex-row'>
                    <Image source={{ uri: item.avatar_url }} alt='' className='h-14 w-14 m-5 rounded-full' />
                    <View className='flex-1'>
                        <Text className='text-slate-200 text-xl mt-7'>{item.login}</Text>
                    </View>
                    <TouchableOpacity className='p-4 ' onPress={async () => {await Linking.openURL(item.html_url);}}>
                        <Image source={require("@/assets/logo.png")} className='h-14 w-14' />
                    </TouchableOpacity>
                </View>
            </View>
        );
    };
    

    return (
        <View className="flex-1 pt-8">
            <Header title='github-users' />
            <View className='p-3 flex-1'>
                <View className='flex-row items-center justify-between p-2'>
                    <TextInput
                        onChangeText={(text) => setText(text)}
                        value={text}
                        placeholder="Search a Github User"
                        className='h-14 bg-white rounded-2xl p-4 border w-60 ml-2'
                    />
                    <TouchableOpacity onPress={() => searchUsers()} >
                        <Search size={24} color={colors.gray[200]} />
                    </TouchableOpacity>
                </View>
                
                <View className='mb-20'>
                    { loading ? (
                        <Loading />
                        ) : (
                        <>
                            {result.length > 0 ? (
                                <>
                                    <Text className='text-white m-2 font-bold uppercase'>Results</Text>
                                        <FlatList 
                                            showsVerticalScrollIndicator={false}
                                            data={result}
                                            renderItem={renderItems}
                                            keyExtractor={(item) => item.id.toString()}
                                        />
                                    </>
                                ) : (
                                    <Image source={require('@/assets/logo.png')} className='w-64 h-64 self-center'/>
                            )}
                        </>
                    )}
                </View>
            </View>
        </View>
    )
}