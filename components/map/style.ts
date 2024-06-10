import { StyleSheet } from "react-native";

const circleSize = 200;

const styles = StyleSheet.create({
    search: {
        color: '#000',
        borderColor: '#666',
        backgroundColor: '#FFF',
        height: 45,
        paddingHorizontal: 20,
        fontSize: 18,
        zIndex:2,
    },
    circleFixed: {
        left: '50%',
        backgroundColor:'rgba(253, 207, 153,0.3)',
        borderColor:'rgba(253, 207, 153,1)',
        borderWidth:3,
        zIndex:10,
        position: 'absolute',
        top: '50%',
        pointerEvents: 'none',
        alignItems:'center'
        
      },
      circleText:{
        backgroundColor:'rgba(253, 207, 153,1)',
        padding:8,
        borderRadius:8,
        marginTop:-3
      },
      marker: {
        height: 48,
        width: 48
      },
})

export default styles;