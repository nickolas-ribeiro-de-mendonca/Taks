import React from 'react';
import {
   View,
   Text,
   StyleSheet,
   TouchableWithoutFeedback,
   TouchableOpacity,
} from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import commonStyles from '../commonStyles';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';
import 'moment/locale/pt-br';

export default props => {
   const doneOrNotStyle =
      props.doneAt != null ? {textDecorationLine: 'line-through'} : {};
   const date = props.doneAt ? props.doneAt : props.estimateAt;
   const formatedDate = moment(date).locale('pt-br').format('ddd, D [de] MMMM');
   const getRightContent = () => {
      return (
         <TouchableOpacity style={styles.right} onPress={() => props.onDelete(props.id)}>
            <Icon name="trash" size={30} color={"white"}/>
         </TouchableOpacity>
      );
   };
	const getLeftContent = () => {
      return (
         <TouchableOpacity style={styles.left} >
            <Icon name="trash" size={30} color={"white"}/>
				<Text style={styles.excludeText} >Excluir</Text>
         </TouchableOpacity>
      );
   };

   return (
      <GestureHandlerRootView>
         <Swipeable 
				renderRightActions={getRightContent}
				renderLeftActions={getLeftContent}
				onSwipeableOpen={(direction) => props.onDelete && direction==='left' && props.onDelete(props.id)}
			>
            <View style={styles.container}>
               <TouchableWithoutFeedback
                  onPress={() => props.toggleTask(props.id)}>
                  <View style={styles.checkContainer}>
                     {getCheckView(props.doneAt)}
                  </View>
               </TouchableWithoutFeedback>

               <View>
                  <Text style={[styles.desc, doneOrNotStyle]}>
                     {props.desc}
                  </Text>
                  <Text style={styles.date}>{formatedDate + ''}</Text>
               </View>
            </View>
         </Swipeable>
      </GestureHandlerRootView>
   );
};

function getCheckView(doneAt) {
   if (doneAt !== null) {
      return (
         <View style={styles.done}>
            <Icon
               name="check"
               size={13}
               color={commonStyles.colors.secondary}></Icon>
         </View>
      );
   } else {
      return <View style={styles.pending}></View>;
   }
}

const styles = StyleSheet.create({
   container: {
      flexDirection: 'row',
      borderColor: '#AAA',
      borderBottomWidth: 1,
      alignItems: 'center',
      paddingVertical: 10,
		backgroundColor:'white'
   },
   checkContainer: {
      width: '20%',
      alignItems: 'center',
      justifyContent: 'center',
   },
   pending: {
      height: 25,
      width: 25,
      borderRadius: 12.5,
      borderWidth: 1,
      borderColor: '#555',
   },
   done: {
      height: 25,
      width: 25,
      borderRadius: 12.5,
      borderWidth: 1,
      backgroundColor: '#4d7031',
      alignItems: 'center',
      justifyContent: 'center',
   },
   desc: {
      fontFamily: commonStyles.fontFamily,
      color: commonStyles.colors.mainText,
      fontSize: 15,
   },
   date: {
      fontFamily: commonStyles.fontFamily,
      color: commonStyles.colors.subText,
      fontSize: 12,
   },
	right:{
		backgroundColor: 'red',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'flex-end',
		paddingHorizontal: 20,
	},
	left:{
		flex:1,
		backgroundColor: 'red',
		flexDirection: 'row',
		alignItems:'center',
		paddingHorizontal:10
	},
	excludeText:{
		fontFamily: commonStyles.fontFamily,
		color:'white',
		fontSize: 20,
		marginLeft:5
	}
});
