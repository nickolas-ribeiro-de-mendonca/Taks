import React, {Component} from "react";
import { ImageBackground, Text, StyleSheet, View, TextInput, TouchableOpacity, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import backgroundImagem from '../../assets/imgs/login.jpg'
import commonStyles from "../commonStyles";
import AuthInput from "../components/AuthInput";
import {server, showError, showSuccess } from '../common'
import { CommonActions } from "@react-navigation/native";

const initialState = {
	name: '',
	email: 'nickolasrm1@hotmail.com',
	password: 'Nick3271',
	confirmPassword: '',
	stageNew: false
}

export default class Auth extends Component {

	state ={
		...initialState
	}

	signinOrSignup = () => {
		if(this.state.stageNew){
			this.signup()
		}else{
			this.signin()
		}
	}

	signup = async () => {
		try {
			await axios.post(`${server}/signup`, {
				name: this.state.name,
				email: this.state.email,
				password: this.state.password,
				confirmPassword: this.state.confirmPassword
			})

			showSuccess('Usuário cadastrado!')
			this.setState({ ...initialState })
		} catch (e) {
			showError(e)
		}
	}

	signin = async () => {
		try {
			const res = await axios.post(`${server}/signin`, {
				email: this.state.email,
				password: this.state.password,
			})
			AsyncStorage.setItem('userData', JSON.stringify(res.data))
			axios.defaults.headers.common['Authorization'] = `bearer ${res.data.token}`
			this.props.navigation.dispatch(
				CommonActions.reset({
					index: 0,
					routes: [
						{
							name: 'Home',
							params: res.data
						},
					],
				})
			)
		} catch (e) {
			showError(e)
		}
	}

	render(){

		const validations = []
		validations.push(this.state.email && this.state.email.includes('@'))
		validations.push(this.state.password && this.state.password.length >= 6)

		if(this.state.stageNew) {
			validations.push(this.state.name && this.state.name.trim().length >= 3)
			validations.push(this.state.password === this.state.confirmPassword)
		}

		const validForm = validations.reduce((t, a) => t && a)

		return(
			<ImageBackground source={backgroundImagem} style={styles.background}>
				<Text style={styles.title}>Task</Text>
				<View style={styles.formContainer} >
					<Text style={styles.subTitle} >
						{
							this.state.stageNew ? 'Crie sua conta' : 'Informe seus dados'
						}
					</Text>
					{
						this.state.stageNew &&
						<AuthInput
							icon='user' 
							placeholder="Nome" 
							value={this.state.name} 
							style={styles.input} 
							onChangeText={name => this.setState({ name })} 
						/>
					}
					
					<AuthInput
						icon='at'
						placeholder="E-mail" 
						value={this.state.email} 
						style={styles.input} 
						onChangeText={email => this.setState({ email })} 
					/>
					<AuthInput
						icon='lock' 
						placeholder="Senha" 
						value={this.state.password} 
						style={styles.input} 
						onChangeText={password => this.setState({ password })}
						secureTextEntry={true} 
					/>
					{
						this.state.stageNew &&
						<AuthInput
							icon='asterisk'
							placeholder="Confirmar senha" 
							value={this.state.confirmPassword} 
							style={styles.input} 
							onChangeText={confirmPassword => this.setState({ confirmPassword })}
							secureTextEntry={true} 
						/>
					}
					<TouchableOpacity onPress={this.signinOrSignup} disabled={!validForm}>
						<View style={[styles.button, validForm? {} : {backgroundColor: '#AAA'}]} >
							<Text style={styles.buttonText} >
								{this.state.stageNew ? 'Registrar' : 'Entrar'}
							</Text>
						</View>
					</TouchableOpacity>
					<TouchableOpacity 
						style={{ padding:10 }} 
						onPress={() => this.setState({ stageNew: !this.state.stageNew })}
					>
						<Text style={styles.buttonText}>
							{this.state.stageNew ? 'Já possui conta?' : 'Ainda não possui conta?'}
						</Text>
					</TouchableOpacity>

				</View>
			</ImageBackground>
		)
	}
}

const styles = StyleSheet.create({
	background:{
		flex:1,
		width:'100%',
		alignItems:"center",
		justifyContent:"center",
	},
	title:{
		fontFamily: commonStyles.fontFamily,
		color:commonStyles.colors.secondary,
		fontSize:70,
		marginBottom: 10,
	},
	formContainer:{
		backgroundColor: 'rgba(0,0,0,0.8)',
		alignItems:"center",
		padding:10,
		width:'90%',
		borderWidth:1,
		borderColor: 'white',
		borderRadius:10,

	},
	input:{
		width:'100%',
		marginTop: 10,
		backgroundColor: 'white',
		borderRadius:7,
	},
	button:{
		width:'50%',
		backgroundColor: '#080',
		marginTop:10,
		padding:10,
		alignItems:"center",
		borderRadius: 7,
	},
	buttonText:{
		fontFamily:commonStyles.fontFamily,
		color: 'white',
		fontSize:20
	},
	subTitle:{
		fontFamily:commonStyles.fontFamily,
		color:commonStyles.colors.secondary,
		fontSize:22,
		marginBottom:10
	}

})