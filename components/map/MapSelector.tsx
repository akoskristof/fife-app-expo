import React, { useEffect, useRef, useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import { MapView, Details, Region } from './mapView';
import { MapCircleType, MapSelectorProps } from './MapSelector.types';
import styles from './style';

const MapSelector = ({style,searchEnabled,data,setData}:MapSelectorProps) => {
    const [search, setSearch] = useState<string>('');
    const [mapHeight, setMapHeight] = useState<number>(0);
    const circleSize = mapHeight/3;
    const [circle, setCircle] = useState<MapCircleType>(
        data||{
            position:{latitude:47.4979,longitude:19.0402},
            radius:300,
        });
    const [circleRadiusText, setCircleRadiusText] = useState('0 km');

    useEffect(() => {
        if (setData)
        setData(circle);
    }, [circle]);

    const onRegionChange: ((region: Region, details: Details) => void) | undefined = async (e)=>{
        if (!mapHeight) return;
        const km = e.latitudeDelta*111.32*circleSize/mapHeight;

        setCircleRadiusText(Math.round(km)+' km')
        if (km < 2) {
            setCircleRadiusText(Math.round(km*1000)+' m')
        }
        
        setCircle({
            position:{
                latitude:e.latitude,
                longitude:e.longitude
            },
            radius:km
        })
    }
    return (
    <View style={[{flex:1},style]} >
        {searchEnabled && <View style={{ width: '100%' }}>

            <TextInput
                style={styles.search}
                value={search}
                onChangeText={setSearch}
                placeholder={'Keress a térképen'}
                placeholderTextColor={'#666'}
            />
        </View>}
        <View style={{width:'100%',height:'100%'}}
            onLayout={(e)=>{setMapHeight(e.nativeEvent.layout.height)}}>
            <MapView 
                options={{
                    mapTypeControl: false,
                    fullscreenControl:false,
                    streetViewControl:false
                }}
                style={{width:'100%',height:'100%'}}
                initialCamera={{
                    altitude: 10,
                    center: {
                        latitude: 47.4979,
                        longitude: 19.0402,
                    },
                    heading: 0,
                    pitch: 0,
                    zoom: 12,
                }}
                provider="google"
                googleMapsApiKey={process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY}
                pitchEnabled={false}
                rotateEnabled={false}
                toolbarEnabled={false}
                onRegionChangeComplete={onRegionChange}>
            </MapView>
        </View>
        
        {!!circleSize && <View style={[styles.circleFixed,{    
            width:circleSize,
            height:circleSize,
            marginLeft:-circleSize/2,
            marginTop:-circleSize/2,
            borderRadius:circleSize
        }]}>
            <Text style={styles.circleText}>Átmérő: {circleRadiusText}</Text>
        </View>}
    </View>)
    
}

export default MapSelector;