import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useLayoutEffect } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { AntDesign } from '@expo/vector-icons';
import { Primary } from '../../helpers/color/color';
import { secondary } from '../../helpers/color/color';
import { useSelector, useDispatch } from 'react-redux';

import { nonAllocatedSearch } from '../../redux/userService';

const AddMore = ({ navigation }) => {
	const dispatch = useDispatch();
	const [ search, setSearch ] = useState('');
	const [ local, setLocal ] = useState([]);
	const { ssnList } = useSelector((state) => state.user);
	const { userToken } = useSelector((state) => state.user);

	useEffect(() => {
		dispatch(nonAllocatedSearch({ token: userToken }));
	}, []);

	useEffect(() => {
		setLocal(ssnList);
	}, []);

	useLayoutEffect(() => {
		navigation.setOptions({
			headerBackTitle: '',
			headerTitle: 'Search',
			headerLeft: () => (
				<View>
					<TouchableOpacity
						onPress={() => {
							navigation.goBack();
						}}
					>
						<AntDesign name="arrowleft" size={24} color={Primary} />
					</TouchableOpacity>
				</View>
			),
			headerRight: () => (
				<View>
					<TouchableOpacity>
						<FontAwesome name="user" size={24} color={Primary} />
					</TouchableOpacity>
				</View>
			)
		});
	});

	return (
		<TouchableWithoutFeedback
			onPress={() => {
				Keyboard.dismiss();
			}}
		>
			<View style={styles.addMoreStyle}>
				<View style={styles.searchBar}>
					<TouchableOpacity style={styles.searchIcon}>
						<FontAwesome name="search" size={24} color={Primary} />
					</TouchableOpacity>
					<TextInput
						placeholder="xxxx-xxxx-xxxx"
						style={styles.inputFormBox}
						placeholderTextColor={Primary}
						value={search}
						onChangeText={setSearch}
					/>
				</View>
				{search.length >= 3 &&
					(local.filter((item) => item.serial_number.includes(search)).length > 0 ? (
						local.filter((item) => item.serial_number.includes(search)).map((item) => (
							<View style={styles.ssnList} key={item.serial_number}>
								<Text>{item.serial_number}</Text>
							</View>
						))
					) : (
						<View style={styles.ssnList}>
							<Text>No results found</Text>
						</View>
					))}
			</View>
		</TouchableWithoutFeedback>
	);
};

export default AddMore;

const styles = StyleSheet.create({
	addMoreStyle: {
		flex: 1,
		marginTop: hp('3%'),
		alignItems: 'center'
	},
	searchBar: {
		flexDirection: 'row',
		borderWidth: 1,
		padding: 12,
		width: wp('80%'),
		borderRadius: 22,
		borderColor: Primary,
		alignItems: 'center'
	},
	inputFormBox: {
		width: wp('70%'),
		padding: 12,
		fontSize: hp('2%')
	},
	ssnList: {
		padding: 20,
		margin: 10,
		elevation: 1,
		borderRadius: 5
	}
});
