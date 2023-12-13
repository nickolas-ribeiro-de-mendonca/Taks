import React from "react";
import { View, TextInput, StyleSheet} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

export default props => {
	return(
		<View style={[styles.container, props.style]}>
			<Icon name={props.icon} style={styles.icon} size={20} />
			<TextInput {...props} style={styles.iput}/>
		</View>
	)
}

const styles = StyleSheet.create({
	container:{
		width:'100%',
		height:40,
		backgroundColor:"#EEE",
		borderRadius:20,
		flexDirection:"row",
		alignItems:"center"
	},
	input:{
		color:'#333',
		marginLeft:20
	},
	icon:{
		marginLeft:20
	},
})