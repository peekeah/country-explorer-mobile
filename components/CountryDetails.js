import { Button, Image, Text, View } from "react-native";

const CountryDetails = ({ countryDetails, setSelectedCountry }) => {
    
    const name = countryDetails.name?.common || '-';
    const region = countryDetails.region || '-';
    const capitals = countryDetails?.capital?.join(', ') || '-';
    const population = countryDetails?.population.toLocaleString('en-IN') || '-';
    const flag = countryDetails?.flags?.png;

    return (
        <View>
            <Button
                title="Back"
                style={{ width: 12 }} 
                onPress={() => setSelectedCountry(null)}
            />
             <View className="mt-8">
                <Image
                    source={{ uri: flag }}
                    style={{
                        resizeMode: 'contain',
                        height: 125,
                    }}
                />
            </View>
        </View>
    )
}

export default CountryDetails;