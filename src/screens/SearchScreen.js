import React from 'react';
import { useState } from 'react';
import {View, Text, StyleSheet} from 'react-native';
import SearchBar from '../components/SeachBar'
import yelp from '../api/yelp';
import useResults from '../hooks/useResults';
import ResultsList from '../components/ResultsList';
import { ScrollView } from 'react-native-gesture-handler';


/*
DAY 4
    
    CONNECTING TO YELP API
        setup axios
            API key
            baseURL
        callback to manage states

    FLOW OF THE SEARCH SCREEN
        RENDERING FUNCTIONS
            useEffect (update e.g. when first rendered or first rendered and when value inside the array changes..)
        EXTRACT HOOKS
            "get the business logic out of the SearchScreen"
            "remove everything api related to a hook that can be added where ever the app needs api results."

            1. move the api related code to hook file
            2. update the connection of the rendered view to the hook.
                return the objects you need from the hook..
                connect the hook to the files that consume it 

    RESULTS LIST
        RYHMITTELY
            "filtteröinti hinnan mukaan props.filter...""
        
    DETAILS KOMPONENTTI
        "Täl renderöidään api:sta saadut tiedot haluttuun muotoon"
                säätele tyylit komponentissa.. älä parentissa..


*/ 

const SearchScreen = () =>{
    const [term, setTerm] = useState('');
    const [searchApi, results, errorMessage] = useResults(); //tuodaan propsit hookista


    //funktio joka filtteröi annetun hinta-parametrin mukaan.
    const filterResultsByPrice = (price) => {
        ///price === '$' || '$$'|| '$$'
        return results.filter(result => {
            return result.price === price;
        });
    }
             


    return(
    <ScrollView>    
        <View >
            <SearchBar
                term={term}
                onTermChange={(newTerm)=> setTerm(newTerm)}
                onTermSubmit={ () =>searchApi(term)}/>


            {errorMessage ? <Text>{errorMessage}</Text> : null}
            <Text>we have found {results.length} results</Text>

                <ResultsList results={filterResultsByPrice('$')} title="Cost Effective"></ResultsList>
                <ResultsList results={filterResultsByPrice('$$')} title="Bit Pricier"></ResultsList>
                <ResultsList results={filterResultsByPrice('$$$')} title="Big Spender"></ResultsList>

        </View>
    </ScrollView>
    )
};

const styles = StyleSheet.create({});

export default SearchScreen;
