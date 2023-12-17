import axios from 'axios';
import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, SafeAreaView, Text, View } from 'react-native';

const Country = ({ country }) => {
  console.log('country', country.item.name?.common)
  const countryDetail = country.item;

  const name = countryDetail.name?.common;
  
  return (
    <View>
      <Text>{name}</Text>
      {/* <Text>{name}</Text>
      <Text>{capital}</Text>
      <Text>{region}</Text> */}
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
      setCountries(res.data);
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
    <View>
      {isLoading ? (
        <ActivityIndicator />
      ) :
        (<SafeAreaView className="">
          <FlatList
            data={countries}
            renderItem={(country) => (
              <Country
                country={country}
              // keyExtractor={item => item.id}
              // extraData={selectedId}
              />)}
          />
        </SafeAreaView>)
      }
    </View>

  );
}

