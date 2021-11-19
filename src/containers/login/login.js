import React, { useState } from 'react';
import {
	StyleSheet,
	Text,
	View,
	Image,
	TextInput,
	TouchableOpacity,
	TouchableWithoutFeedback,
	Keyboard
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Primary, secondary } from '../../helpers/color/color';
import { useDispatch } from 'react-redux';

import { loginUser } from '../../redux/userService';

const Login = ({ navigation }) => {
	const dispatch = useDispatch();
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');

	const loginSubmit = () => {
		dispatch(loginUser({ email: email, password: password }));
	};

	return (
		<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
			<View style={styles.loginContainer}>
				<Image source={require('../../helpers/assets/logo.png')} style={styles.logoStyle} />
				<View style={styles.inputStyle}>
					<Text style={styles.headingStyle}>Login to your account</Text>
					<TextInput
						placeholder="Email"
						style={styles.inputBox}
						value={email}
						onChangeText={(text) => setEmail(text)}
					/>
					<TextInput
						placeholder="Password"
						style={styles.inputBox}
						secureTextEntry={true}
						value={password}
						onChangeText={(text) => setPassword(text)}
					/>

					<Text style={styles.paraInput}>By Login to your account you agree to our</Text>
					<Text style={styles.paraInput}>Terms of Service and Private Policy</Text>
				</View>
				<View style={styles.footerInput}>
					<TouchableOpacity style={styles.btnTouch} onPress={loginSubmit}>
						<Text style={styles.btnTextInput}>Continue</Text>
					</TouchableOpacity>
					<Text style={styles.footerContainer}>Copyright Ⓒ 2021 All Right Reserved</Text>
				</View>
			</View>
		</TouchableWithoutFeedback>
	);
};

export default Login;

const styles = StyleSheet.create({
	loginContainer: {
		flex: 1,
		alignItems: 'center',
		top: hp('6%')
	},

	logoStyle: {
		width: wp('73%'),
		height: hp('5.8%')
	},

	inputStyle: {
		top: hp('8%'),
		alignItems: 'center'
	},
	headingStyle: {
		fontSize: hp('3.7%'),
		color: Primary,
		fontWeight: 'bold',
		padding: 12
	},

	inputBox: {
		padding: 12,
		borderWidth: 2,
		margin: 12,
		borderColor: Primary,
		width: wp('80%'),
		borderRadius: 8,
		fontSize: hp('2%')
	},
	paraInput: {
		color: Primary,
		fontSize: hp('1.6%'),
		letterSpacing: 0.4
	},
	footerInput: {
		top: hp('23%'),
		alignItems: 'center'
	},

	btnTouch: {
		backgroundColor: Primary,
		padding: 12,
		width: wp('80%'),
		height: hp('8%'),
		borderRadius: 8,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 6
		},
		shadowOpacity: 0.39,
		shadowRadius: 8.3,
		elevation: 13,
		margin: 12,
		justifyContent: 'center'
	},
	btnTextInput: {
		color: '#fff',
		textAlign: 'center',
		fontSize: hp('2.5%'),
		fontWeight: '700'
	},

	footerContainer: {
		color: secondary,
		margin: 12,
		fontSize: hp('1.6%')
	}
});
