import React, { useEffect, useRef, useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import { MapView, Details, Region, Marker, Camera } from './mapView';
import { MapCircleType, MapSelectorProps } from './MapSelector.types';
import styles from './style';
import * as Location from 'expo-location';
import { LocationObject } from 'expo-location';
import MyLocationIcon from '../../assets/images/myLocationIcon'
import { Button, FAB, IconButton, SegmentedButtons } from 'react-native-paper';


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
    const [myLocation, setMyLocation] = useState<LocationObject|null>(null);
    const [errorMsg, setErrorMsg] = useState<string|null>();
    const mapRef = useRef<any>(null);

    useEffect(() => {
      (async () => {
        
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          return;
        }
  
        let location = await Location.getCurrentPositionAsync({});
        console.log(location);
        
        setMyLocation(location);
      })();
    }, []);

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

    const panToMyLocation = () => {
        if (!mapRef.current || !myLocation) return;
        const region = {
            latitude: myLocation.coords.latitude,
            longitude: myLocation.coords.longitude,
            latitudeDelta: 0.0043,
            longitudeDelta: 0.0034
          };
        mapRef.current.animateToRegion(region, 1000);
    }

    const zoom =  (zoomTo:number) => {
        if (!mapRef.current) return;
        mapRef?.current?.getCamera().then((cam: Camera) => {
            if (cam.zoom)
            cam.zoom += zoomTo;
            mapRef?.current?.animateCamera(cam);
        });
    }

    const onSubmit = () => {
        
    }
    
    return (
    <View style={[{flex:1},style]} >
        {false && <View style={{ width: '100%' }}>
            <TextInput
                style={styles.search}
                value={search}
                onChangeText={setSearch}
                placeholder={'Keress a térképen'}
                placeholderTextColor={'#666'}
            />
        </View>}
        <View style={{width:'100%',height:'100%'}}>
        <View style={{width:'100%',height:'100%'}}
            onLayout={(e)=>{setMapHeight(e.nativeEvent.layout.height)}}>
            <MapView 
                ref={mapRef}
                options={{
                    mapTypeControl: false,
                    fullscreenControl:false,
                    streetViewControl:false,
                    zoomControl:false
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
                    {myLocation&&<Marker
                    centerOffset={{x:10,y:10}}
                    coordinate={myLocation?.coords} style={{justifyContent:"center", alignItems:"center"}}>
                        <MyLocationIcon style={{width:20,height:20}}/>
                    </Marker>}
            </MapView>
        </View>
        
        {!!myLocation && <FAB
            icon="map-marker"
            style={styles.myLocationButton}
            onPress={panToMyLocation}
        />}

        <View style={styles.zoom}>
            <IconButton icon="plus" style={{borderBottomLeftRadius:0,borderBottomRightRadius:0,margin:0}} onPress={()=>zoom(1)} mode='contained-tonal'/>
            <IconButton icon="minus" style={{borderTopLeftRadius:0,borderTopRightRadius:0,margin:0}} onPress={()=>zoom(-1)} mode='contained-tonal'/>
        </View>
        <View style={{width:'100%',alignItems:'center'}}>
            <Button mode='contained' style={styles.submit} onPress={onSubmit}>
                <Text>Helyzet mentése</Text>
            </Button>
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
        </View>

    </View>)
    
}

export default MapSelector;