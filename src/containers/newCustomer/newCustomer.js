import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { useLayoutEffect } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { AntDesign } from '@expo/vector-icons';
import { Primary } from '../../helpers/color/color';
import Forms from '../../components/forms';
import { secondary } from '../../helpers/color/color';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { nonAllocatedSearch } from '../../redux/userService';

const NewCustomer = ({ navigation }) => {
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
		<View style={styles.newCustStyle}>
			<View style={styles.customerText}>
				<Text style={styles.CustomerHeading}>Add New Customer</Text>
				<Text style={styles.CustomerPara}>Note: All The Field are Mandatory</Text>
			</View>
			<Text style={styles.underLine} />
			<View style={styles.FormData}>
				<Forms type="newOwner" onPress={() => {}} onAdd={() => navigation.navigate('Search')} />
			</View>
		</View>
	);
};

export default NewCustomer;

const styles = StyleSheet.create({
	newCustStyle: {
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
	FormData: {
		height: hp('80%'),
		// width:hp('45%')
},
	underLine: {
		width: wp('80%'),
		height: 0.8,
		backgroundColor: secondary
	}
});
