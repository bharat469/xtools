import React, { useState, useEffect } from 'react';
import { Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Image } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Primary } from '../helpers/color/color';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { Entypo } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';

import { newUser, transferOwner } from '../redux/userService';

const Forms = (props) => {
	const dispatch = useDispatch();
	const { userToken, serial_number } = useSelector((state) => state.user);
	// ...................................date setup.................................
	const [ isDatePickerVisible, setDatePickerVisibility ] = useState(false);
	const [ Date, setDate ] = useState('DD-MM-YYYY');
	const [ name, setName ] = useState('');
	const [ email, setEmail ] = useState('');
	const [ phone, setPhone ] = useState('');
	const [ address, setAddress ] = useState('');
	const [ details, setDetails ] = useState('');
	const [ GST, setGST ] = useState('');
	const [ aadhar, setAadhar ] = useState('');
	const [ pan, setPan ] = useState('');

	const submitForm = () => {
		const formData = new FormData();
		formData.append('name', name);
		formData.append('email', email);
		formData.append('phone', phone);
		formData.append('gst', GST);
		formData.append('assignDate', Date);
		formData.append('pancard', pan);
		formData.append('aadhar-number', aadhar);
		formData.append('address', address);
		formData.append('aadhar_image_front', image);
		formData.append('aadhar_image_back', Aimage);
		formData.append('live_image', lImage);

		if (props.type === 'newUser') dispatch(newUser({ formData, token: userToken }));
		else dispatch(transferOwner({ serial_number: serial_number, formData, token: userToken }));
	};

	const showDatePicker = () => {
		setDatePickerVisibility(true);
	};

	const hideDatePicker = () => {
		setDatePickerVisibility(false);
	};

	const handleConfirm = (date) => {
		setDate(moment(date).format(' Do MMMM  YYYY'));
		hideDatePicker();
	};
	// ...............................imagePickerSetup..............................................
	const [ image, setImage ] = useState(null);
	const [ Aimage, setAimage ] = useState(null);
	const [ idImage, setidImage ] = useState(null);
	const [ lImage, setlImage ] = useState(null);

	useEffect(() => {
		(async () => {
			if (Platform.OS !== 'web') {
				const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
				if (status !== 'granted') {
					alert('Sorry, we need camera roll permissions to make this work!');
				}
			}
		})();
	}, []);

	const pickImage = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			aspect: [ 4, 3 ],
			quality: 1
		});

		console.log(result);

		if (!result.cancelled) {
			setImage(result.uri);
		}
	};
	const pickImageBack = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			aspect: [ 4, 3 ],
			quality: 1
		});

		console.log(result);

		if (!result.cancelled) {
			setAimage(result.uri);
		}
	};
	const pickImageId = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			aspect: [ 4, 3 ],
			quality: 1
		});

		console.log(result);

		if (!result.cancelled) {
			setidImage(result.uri);
		}
	};
	const pickImageLive = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			aspect: [ 4, 3 ],
			quality: 1
		});

		console.log(result);

		if (!result.cancelled) {
			setlImage(result.uri);
		}
	};

	return (
		<View style={styles.formContainer}>
			<ScrollView
				style={Platform.OS === 'android' ? styles.androidScroll : styles.iosScroll}
				showsVerticalScrollIndicator={false}
				alwaysBounceVertical={false}
			>
				<Text style={styles.headerText}>Basic Detail</Text>

				<View style={styles.FormList}>
					<View style={styles.formDetail}>
						<Text style={styles.formLabel}>Full Name</Text>
						<TextInput
							placeholder="John Doe"
							style={styles.inputFormBox}
							placeholderTextColor={Primary}
							onChangeText={setName}
						/>
					</View>
					<View style={styles.formDetail}>
						<Text style={styles.formLabel}>Email</Text>
						<TextInput
							placeholder="johndoe@mail.com"
							style={styles.inputFormBox}
							placeholderTextColor={Primary}
							onChangeText={setEmail}
						/>
					</View>
					<View style={styles.formDetail}>
						<Text style={styles.formLabel}>Phone Number</Text>
						<TextInput
							placeholder="xxxxxxxxxxxxxx"
							style={styles.inputFormBox}
							placeholderTextColor={Primary}
							onChangeText={setPhone}
						/>
					</View>
					<View style={styles.formDetail}>
						<Text style={styles.formLabel}>Date of Birth</Text>
						<TouchableOpacity style={styles.inputDateBox} onPress={showDatePicker}>
							<Text style={styles.dateText}>{Date}</Text>
						</TouchableOpacity>
						<DateTimePickerModal
							isVisible={isDatePickerVisible}
							mode="date"
							onConfirm={handleConfirm}
							onCancel={hideDatePicker}
						/>
					</View>
					<Text style={styles.headerText2}>Address</Text>
					<View style={styles.formDetail}>
						<Text style={styles.formLabel}>Full Address</Text>
						<TextInput
							placeholder="United States"
							style={styles.inputFullBox}
							placeholderTextColor={Primary}
							multiline={true}
							onChangeText={setAddress}
						/>
					</View>
					<Text style={styles.headerText2}>Product Details</Text>
					<View style={styles.formDetail}>
						<Text style={styles.formLabel}>Product Detail</Text>
						<View style={styles.productBorder}>
							<TextInput
								placeholder="United States"
								style={styles.inputFullBox2}
								placeholderTextColor={Primary}
								multiline={true}
								onChangeText={setDetails}
							/>
							<Entypo name="edit" size={24} color={Primary} style={styles.iconEdit} />
						</View>
					</View>
					<TouchableOpacity style={styles.AddStyle} onPress={props.onAdd}>
						<Text style={styles.addText}>Add More</Text>
					</TouchableOpacity>
				</View>
				<Text style={styles.headerText2}>Verification Document</Text>
				<View style={styles.formDetail2}>
					<Text style={styles.formLabel}>GST Number (Optional)</Text>
					<TextInput
						placeholder="Gst number"
						style={styles.inputFormBox}
						placeholderTextColor={Primary}
						onChangeText={setGST}
					/>
				</View>
				<View style={styles.formDetail}>
					<Text style={styles.formLabel}>Aadhar Card Number </Text>
					<TextInput
						placeholder="xxxx-xxxx-xxxx"
						style={styles.inputFormBox}
						placeholderTextColor={Primary}
						onChangeText={setAadhar}
					/>
				</View>
				<View style={styles.formDetail}>
					<Text style={styles.formLabel}>Aadhar Card Image Front </Text>
					<View style={styles.aadarImage}>
						<TouchableOpacity style={styles.imageUploader} onPress={pickImage}>
							<Ionicons name="add" size={54} color={Primary} />
						</TouchableOpacity>
						<View style={styles.imageUploader}>
							{image && (
								<Image
									source={{ uri: image }}
									style={{ width: wp('30%'), height: hp('13%'), borderRadius: 8 }}
								/>
							)}
						</View>
					</View>
				</View>
				<View style={styles.formDetail}>
					<Text style={styles.formLabel}>Aadhar Card Image Back </Text>
					<View style={styles.aadarImage}>
						<TouchableOpacity style={styles.imageUploader} onPress={pickImageBack}>
							<Ionicons name="add" size={54} color={Primary} />
						</TouchableOpacity>
						<View style={styles.imageUploader}>
							{Aimage && (
								<Image
									source={{ uri: Aimage }}
									style={{ width: wp('30%'), height: hp('13%'), borderRadius: 8 }}
								/>
							)}
						</View>
					</View>
				</View>

				<View style={styles.formDetail}>
					<Text style={styles.formLabel}>PAN Card /Voter ID/License-Number</Text>
					<TextInput
						placeholder="xxxxxxxxxxxxxx"
						style={styles.inputFormBox}
						placeholderTextColor={Primary}
						onChangeText={setPan}
					/>
				</View>

				<View style={styles.formDetail}>
					<Text style={styles.formLabel}>PAN Card /Voter ID /License-Image </Text>
					<View style={styles.aadarImage}>
						<TouchableOpacity style={styles.imageUploader} onPress={pickImageId}>
							<Ionicons name="add" size={54} color={Primary} />
						</TouchableOpacity>
						<View style={styles.imageUploader}>
							{idImage && (
								<Image
									source={{ uri: idImage }}
									style={{ width: wp('30%'), height: hp('13%'), borderRadius: 8 }}
								/>
							)}
						</View>
					</View>
				</View>
				<View style={styles.formDetail}>
					<Text style={styles.formLabel}>Live Image </Text>
					<View style={styles.aadarImage}>
						<TouchableOpacity style={styles.imageUploader} onPress={pickImageLive}>
							<Ionicons name="add" size={54} color={Primary} />
						</TouchableOpacity>
						<View style={styles.imageUploader}>
							{lImage && (
								<Image
									source={{ uri: lImage }}
									style={{ width: wp('30%'), height: hp('13%'), borderRadius: 8 }}
								/>
							)}
						</View>
					</View>
				</View>
				<TouchableOpacity style={styles.AddStyle} onPress={submitForm}>
					<Text style={styles.addText}>Submit</Text>
				</TouchableOpacity>

				<View style={styles.ending} />
			</ScrollView>
		</View>
	);
};

export default Forms;

const styles = StyleSheet.create({
	formContainer: {
		top: hp('3%'),
		flex: 1
	},
	headerText: {
		fontSize: hp('2%'),
		fontWeight: 'bold',
		color: Primary,
		textAlign: 'center'
	},
	headerText2: {
		fontSize: hp('2%'),
		fontWeight: 'bold',
		color: Primary,
		textAlign: 'center',
		top: hp('2%'),
		marginTop: hp('2%')
	},
	FormList: {
		top: hp('2%'),
		width: wp('80%')
	},
	formDetail: {
		marginTop: hp('2%')
	},
	formDetail2: {
		marginTop: hp('6%')
	},

	formLabel: {
		fontSize: hp('1.8%'),
		color: Primary,
		fontWeight: '700',
		padding: hp('1%')
	},
	inputFormBox: {
		borderWidth: 2,
		padding: 12,
		borderColor: '#A5A5A5',
		backgroundColor: '#fff',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,

		elevation: 5,
		flexDirection: 'row'
	},
	inputFullBox: {
		borderWidth: 2,
		padding: 12,
		borderColor: '#A5A5A5',
		backgroundColor: '#fff',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,

		elevation: 5,
		flexDirection: 'row',
		height: hp('14%')
	},
	inputFullBox2: {
		flex: 1,
		padding: 12,
		borderColor: '#A5A5A5',
		backgroundColor: '#fff',
		width: wp('70%'),
		flexDirection: 'row',
		height: hp('14%')
	},

	productBorder: {
		borderWidth: 2,
		padding: 12,
		borderColor: '#A5A5A5',
		backgroundColor: '#fff',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		justifyContent: 'space-between',
		elevation: 5,
		flexDirection: 'row'
	},
	inputDateBox: {
		borderWidth: 2,
		padding: 12,
		borderColor: '#A5A5A5',
		backgroundColor: '#fff',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,

		elevation: 5
	},
	androidScroll: {
		flex: 1,
		marginTop: hp('2%')
	},
	iosScroll: {
		flex: 1,
		marginTop: hp('2%')
	},
	AddStyle: {
		backgroundColor: Primary,
		padding: hp('2%'),
		borderRadius: 8,
		margin: 12,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 6
		},
		shadowOpacity: 0.39,
		shadowRadius: 8.3,
		elevation: 13,
		margin: 12
	},
	addText: {
		color: '#fff',
		fontWeight: '700',
		fontSize: hp('2.5%'),
		textAlign: 'center'
	},
	imageUploader: {
		padding: hp('2%'),
		borderRadius: 8,
		margin: 12,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 6
		},
		shadowOpacity: 0.39,
		shadowRadius: 8.3,

		margin: 12,
		borderWidth: 2,
		width: wp('30%'),
		height: hp('13%'),
		justifyContent: 'center',
		alignItems: 'center',
		borderColor: Primary
	},

	aadarImage: {
		flexDirection: 'row'
	},

	dateText: {
		fontSize: hp('1.8%'),
		color: Primary
	},

	ending: {
		height: hp('30%')
	}
});
