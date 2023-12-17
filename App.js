import axios from 'axios';
import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, SafeAreaView, Text, View } from 'react-native';

const Country = ({ country }) => {

  const countryDetail = country.item;

  const name = countryDetail.name?.common || '-';
  const region = countryDetail.region || '-';
  const capitals = countryDetail?.capital?.join(', ') || '-';
  const population = countryDetail?.population.toLocaleString('en-IN') || '-';
  const flag = countryDetail?.flags?.png;
  console.log('flag', flag)

  return (
    <View className='flex-row bg-blue-500 m-2 px-4 py-3 rounded-lg overflow-hidden'>
      {/* Flag */}
      <View className="mr-3">
        <Image 
          source={{ uri: flag }}
          style={{ 
            flex: 1,
            resizeMode: 'contain',
            width: 90,
          }} 
          />
      </View>

      {/* Country Details */}
      <View>
        <Text className="text-2xl">{name}</Text>
        <Text>Region: {region}</Text>
        <Text>Capital: {capitals}</Text>
        <Text>Population: {population}</Text>
      </View>
    </View>
  )
}

export default function App() {

  const [isLoading, setLoading] = useState(true);
  const [countries, setCountries] = useState([]);

  const getCountries = async () => {
    try {
      const uri = 'https://restcountries.com/v3.1/all';
      const res = await axios.get(uri);
      const data = res.data.slice(0, 5);
      setCountries(data);
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getCountries();
  }, [])

  return (
    <View className="mt-5 bg-slate-300 min-h-screen">
      {isLoading ? (
        <ActivityIndicator />
      ) :
        (<SafeAreaView className="">
          <FlatList
            data={countries}
            renderItem={(country) => (
              <Country
                country={country}
              />
            )}
          />
        </SafeAreaView>)
      }
    </View>

  );
}

