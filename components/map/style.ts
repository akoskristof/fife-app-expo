import { StyleSheet } from "react-native";

const circleSize = 200;

const styles = StyleSheet.create({
    search: {
        borderRadius: 20,
        margin: 10,
        color: '#000',
        borderColor: '#666',
        backgroundColor: '#FFF',
        height: 45,
        paddingHorizontal: 10,
        fontSize: 18,
        shadowOffset: {width:4,height:4},
        shadowOpacity: 1,
        shadowColor: 'black',
    },
    circleFixed: {
        left: '50%',
        backgroundColor:'rgba(253, 207, 153,0.3)',
        borderColor:'rgba(253, 207, 153,1)',
        borderWidth:3,
        zIndex:10,
        position: 'absolute',
        top: '50%',
        pointerEvents: 'none'
        
      },
      marker: {
        height: 48,
        width: 48
      },
})

export default styles;