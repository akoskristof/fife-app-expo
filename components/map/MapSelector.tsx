import React, { useEffect, useRef, useState } from 'react';
import { Text, View, TextInput, StyleProp, ViewStyle, useWindowDimensions } from 'react-native';
import MapView, { Circle, Details, LatLng, Marker, Region } from 'react-native-maps';
import styles from './style';
import { MapCircleType, MapSelectorProps } from './MapSelector.types';

const MapSelector = ({style,searchStyle,data,setData}:MapSelectorProps) => {
    const [search, setSearch] = useState<string>('');
    const [mapHeight, setMapHeight] = useState<number>(0);
    const circleSize = mapHeight/3;
    const mapRef = useRef(null);
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

    const onRegionChange: ((region: Region, details: Details) => void) | undefined = (e)=>{
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
        <View style={{ position: 'absolute', top: 10, width: '100%' }}>
            <TextInput
                style={styles.search}
                value={search}
                onChangeText={setSearch}
                placeholder={'Search'}
                placeholderTextColor={'#666'}
            />
        </View>
        <MapView style={{width:'100%',height:'100%'}}
            onLayout={(e)=>{setMapHeight(e.nativeEvent.layout.height)}}
            initialRegion={{
                latitude: 47.4979,
                longitude: 19.0402,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }}
            pitchEnabled={false}
            rotateEnabled={false}
            onRegionChange={onRegionChange}>
            </MapView>
            <View style={[styles.circleFixed,{    
                width:circleSize,
                height:circleSize,
                marginLeft:-circleSize/2,
                marginTop:-circleSize/2,
                borderRadius:circleSize
            }]}>
                <Text>Távolság: {circleRadiusText} km</Text>
            </View>
    </View>)
    
}

export default MapSelector;