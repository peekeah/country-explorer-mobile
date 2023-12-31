import axios from 'axios';
import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, SafeAreaView, Text, TextInput, TouchableHighlight, View } from 'react-native';

import CountryDetails from './CountryDetails';

const Country = ({ country, setSelectedCountry }) => {

  const countryDetail = country.item;

  const name = countryDetail.name?.common || '-';
  const region = countryDetail.region || '-';
  const capitals = countryDetail?.capital?.join(', ') || '-';
  const population = countryDetail?.population.toLocaleString('en-IN') || '-';
  const flag = countryDetail?.flags?.png;


  return (
    <TouchableHighlight onPress={() => setSelectedCountry(country.index)}>
      <View className='flex-row m-2 px-4 py-2 overflow-hidden block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700'>

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
    </TouchableHighlight>
  )
}

export default function CountriesList() {

  const [isLoading, setLoading] = useState(true);
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    getCountries();
  }, [])

  const getCountries = async () => {
    try {
      const uri = 'https://restcountries.com/v3.1/all';
      const res = await axios.get(uri);
      setCountries(res.data);
      setFilteredCountries(res.data);
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false);
    }
  }

  const searchCountries = (string) => {
    const filteredCountries = countries.filter((country) => country.name.common.toLowerCase().includes(string.toLowerCase()));
    setFilteredCountries(() => filteredCountries);
  }

  return (
    <>
      {
        selectedCountry === null ?
          (
            <View className="mt-10 bg-slate-300 min-h-screen">
              {isLoading ? (
                <ActivityIndicator />
              ) :
                (<SafeAreaView className="">
                  <View className="flex justify-center items-center mt-4 mb-3">
                    <TextInput
                      style={{ width: '94%', margin: 'auto' }}
                      className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name'
                      onChangeText={searchCountries}
                    />
                  </View>
                  <FlatList
                    onClick={() => console.log('clicked on country!')}
                    data={filteredCountries}
                    renderItem={(country) => (
                      <Country
                        country={country}
                        setSelectedCountry={setSelectedCountry}
                      />
                    )}
                  />
                </SafeAreaView>)
              }
            </View>
          ) :
          <View className="mt-10 min-h-screen bg-slate-300">
            <CountryDetails 
              countryDetails={countries[selectedCountry]} 
              setSelectedCountry={setSelectedCountry}
            />
          </View>
      }
    </>
  )

}

