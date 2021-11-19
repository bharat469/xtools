import React, { useEffect, useLayoutEffect, useState } from 'react';
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	TextInput,
	Platform,
	TouchableWithoutFeedback,
	Keyboard,
	ScrollView
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Primary, secondary } from '../../helpers/color/color';
import { useDispatch, useSelector } from 'react-redux';

import { searchSSN } from '../../redux/userService';
import { setSerial } from '../../redux/userSlice';

const TransferFind = ({ navigation }) => {
	const dispatch = useDispatch();
	const [ local, setLocal ] = useState('');
	const [ search, setSearch ] = useState('');
	const { userToken, ssnList } = useSelector((state) => state.user);

	useEffect(() => {
		dispatch(searchSSN({ token: userToken }));
	}, []);

	const searchCallback = () => {
		if (search.length >= 3) setLocal(ssnList.filter((item) => item.serial_number.includes(search)));
		else setLocal([]);
	};

	useLayoutEffect(() => {
		navigation.setOptions({
			headerBackTitle: '',
			headerTitle: '',
			headerLeft: () => (
				<View>
					<TouchableOpacity
						onPress={() => {
							navigation.goBack();
						}}
					>
						<AntDesign name="arrowleft" size={24} color="#fff" />
					</TouchableOpacity>
				</View>
			),
			headerRight: () => (
				<View>
					<TouchableOpacity>
						<FontAwesome name="user" size={24} color="#fff" />
					</TouchableOpacity>
				</View>
			)
		});
	});

	return (
		<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
			<View style={styles.transferFind}>
				<View style={styles.customerText}>
					<Text style={styles.CustomerHeading}>Transfer Ownership</Text>
					<Text style={styles.CustomerPara}>Note: All The Field are Mandatory</Text>
				</View>
				<Text style={styles.underLine} />

				<View style={styles.serachContainer}>
					<Text style={styles.searchHeader}>Find Product</Text>
					<View style={styles.formDetail}>
						<Text style={styles.formLabel}>Serial Number </Text>
						<View style={styles.searchBar}>
							<TextInput
								placeholder="xxxx-xxxx-xxxx"
								style={styles.inputFormBox}
								placeholderTextColor={Primary}
								value={search}
								onChangeText={setSearch}
							/>
							<TouchableOpacity style={styles.searchIcon} onPress={searchCallback}>
								<FontAwesome name="search" size={24} color="#fff" />
							</TouchableOpacity>
						</View>
						{local.length >= 1 &&
							local.map((item) => (
								<TouchableOpacity
									key={item.serial_number}
									onPress={() => {
										dispatch(setSerial({ serial_number: item.serial_number }));
										navigation.navigate('Transfer');
									}}
								>
									<View style={styles.ssnList}>
										<Text>{item.serial_number}</Text>
									</View>
								</TouchableOpacity>
							))}
					</View>
				</View>

				<View style={styles.detailList}>
					<Text style={styles.listheader}>Previous Owner Details</Text>
					<View style={styles.list}>
						<Text style={styles.headingList}>Serial Number</Text>
						<Text style={styles.headingPara}>XSADNXASD59</Text>
					</View>
					<View style={styles.list}>
						<Text style={styles.headingList}>Customer Care</Text>
						<Text style={styles.headingPara}>Samandeep singh</Text>
					</View>
					<View style={styles.list}>
						<Text style={styles.headingList}>Aadhar Number</Text>
						<Text style={styles.headingPara}>xxxxxxxx12132324</Text>
					</View>
					<View style={styles.list}>
						<Text style={styles.headingList}>Phone Number</Text>
						<Text style={styles.headingPara}>+91 8146937721</Text>
					</View>
				</View>
				<TouchableOpacity style={styles.AddStyle} onPress={() => navigation.navigate('Transfer')}>
					<Text style={styles.addText}>Submit</Text>
				</TouchableOpacity>
			</View>
		</TouchableWithoutFeedback>
	);
};

export default TransferFind;

const styles = StyleSheet.create({
	transferFind: {
		flex: 1,
		alignItems: 'center',
		top: hp('2%'),
		height: wp('100%')
	},
	customerText: {
		alignItems: 'center',
		padding: 12
	},
	CustomerHeading: {
		fontSize: hp('3.3%'),
		fontWeight: '700',
		color: Primary,
		padding: 12
	},
	CustomerPara: {
		fontSize: hp('2%'),
		color: Primary
	},
	ssnList: {
		padding: 20,
		margin: 10,
		elevation: 1,
		borderRadius: 5
	},
	underLine: {
		width: wp('80%'),
		height: 0.8,
		backgroundColor: secondary
	},
	formDetail: {
		marginTop: hp('2%')
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
		flexDirection: 'row',
		width: wp('75%')
	},
	searchBar: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	searchIcon: {
		borderWidth: 1,
		padding: Platform.OS === 'android' ? hp('1.7%') : hp('1.1%'),
		backgroundColor: Primary
	},
	searchHeader: {
		textAlign: 'center',
		top: hp('2%'),
		color: Primary,
		fontWeight: 'bold'
	},
	detailList: {
		marginTop: hp('3%')
	},
	listheader: {
		fontSize: hp('3%'),
		fontWeight: 'bold',
		color: Primary,
		padding: 12
	},
	list: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		margin: 5
	},
	headingList: {
		fontSize: hp('2%'),
		textAlign: 'left',
		color: Primary,
		fontWeight: 'bold'
	},
	headingPara: {
		fontSize: hp('1.9%'),
		color: Primary,
		textAlign: 'right'
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
		margin: 12,
		width: wp('80%'),
		top: hp('12%')
	},
	addText: {
		color: '#fff',
		fontWeight: '700',
		fontSize: hp('2.5%'),
		textAlign: 'center'
	}
});
