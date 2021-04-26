import React, { useEffect, useState } from 'react';
import { 
    View,
    Text,
    StyleSheet,
    FlatList,
    ActivityIndicator
} from 'react-native';
import { useNavigation } from '@react-navigation/core';

import { EnviromentButton } from '../components/EnviromentButton';
import { PlantCardPrimary } from '../components/PlantCardPrimary';
import { Load } from '../components/Load';

import { Header } from '../components/Header';
import api from '../services/api';

import colors from '../styles/colors';
import fonts from '../styles/fonts';
import { PlantProps } from '../libs/storage';


interface EnviromentProps {
    key: string;
    title: string;
};


export function PlantSelect(){
    const [enviroments, setEnviroments] = useState<EnviromentProps[]>([]);
    const [plants, setPlants] = useState<PlantProps[]>([]);
    const [filteredPlants, setFilteredPlants] = useState<PlantProps[]>([]);
    const [enviromentSelected, setEnviromentSelected] = useState<string>('all');
    const [loading, setLoading] = useState(true);

    // Controle de paginação:
    const [page, setPage] = useState(1);
    const [loadingMore, setLoadingMore] = useState(false);

    const navigation = useNavigation();
  
    function handleEnviromentSelected(environment: string){
        setEnviromentSelected(environment);

        if(environment === 'all')
            return setFilteredPlants(plants);

        const filtered = plants?.filter(plant =>
            plant.environments.includes(environment)
        );

        setFilteredPlants(filtered);
    }

    function handleFecthMore(distance: number){
        if(distance < 1)
            return;

        setLoadingMore(true);
        setPage(oldValue => oldValue + 1);
        fetchPlants();
    }

    function handlePlantSelect(plant: PlantProps){
        navigation.navigate('PlantSave', { plant });

    }

    async function fetchPlants() {
        const { data } = await api
            .get(`plants?_sort=name&_order=asc&_page=${page}&_limit=8`);

        if(!data)
            return setLoading(true);

        if(page > 1){
            setPlants(oldValue => [...oldValue, ...data]);
            setFilteredPlants(oldValue => [...oldValue, ...data]);
        }else {
            setPlants(data);
            setFilteredPlants(data);
        }
        
        setLoading(false);
        setLoadingMore(false);
    }

    useEffect(() => {
        async function fetchEnvironment() {
            const { data } = await api
                .get('plants_environments?_sort=title&_order=asc'); 
            setEnviroments([
                {
                    key: 'all',
                    title: 'Todos',
                },
                ... data
            ]);
        }

        fetchEnvironment();

    },[])


    useEffect(() => {
        fetchPlants();
    },[])



    if(loading)
        return <Load />
    return (
        <View style={styles.container}> 
            <View style={styles.header}>
                <Header />
                <Text style={styles.title}>
                    Em qual ambiente
                </Text>
                <Text style={styles.subtitle}>
                    você quer colocar sua planta?
                </Text>

            </View>

            <View style={styles.viewEnviroments}>
                <FlatList 
                    data={enviroments}
                    keyExtractor={(item) => String(item.key)}
                    renderItem={( { item } ) => (
                        <EnviromentButton 
                            title= {item.title} 
                            active={item.key === enviromentSelected}
                            onPress={() => handleEnviromentSelected(item.key)}
                        />
                    )}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.enviromentList}
                />
            </View>

            <View style ={styles.plants}>
                <FlatList 
                    data={filteredPlants} 
                    keyExtractor={(item) => String(item.id)}
                    renderItem={ ( { item } ) => (
                        <PlantCardPrimary 
                            data={item}
                            onPress={()=>handlePlantSelect(item) }
                        />
                    )}
                    showsVerticalScrollIndicator={false}
                    numColumns={2}
                    onEndReachedThreshold={0.1} //quando chegar a 10% da tela
                    onEndReached={( { distanceFromEnd } ) =>
                        handleFecthMore(distanceFromEnd)
                    }
                    ListFooterComponent={
                        loadingMore
                        ? <ActivityIndicator color={colors.green} />
                        : <></>
                    }
                />

               
            </View>
            

        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: colors.background,
        // alignItems: 'center',
        //justifyContent: 'space-between',
        // textAlign: 'center'
    },
    header: {
        paddingHorizontal: 30
    },
    title:{
        fontFamily: fonts.heading,
        fontSize: 17,
        color: colors.heading,
        lineHeight: 24,
        marginTop: 10,
    },
    subtitle: {
        fontFamily: fonts.text,
        fontSize: 17,
        color: colors.heading,
        lineHeight: 24,
    },
    viewEnviroments:{
        borderBottomColor: colors.green,
        borderBottomWidth: 0.7,
    },
    enviromentList:{
        height: 42,
        justifyContent: 'center',
        paddingBottom: 5,
        marginLeft: 40,
        marginVertical: 30,
    },
    plants:{
        flex: 1,
        paddingHorizontal: 32,
        justifyContent: 'center'
    }
})