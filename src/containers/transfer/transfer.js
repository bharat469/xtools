import React, { useLayoutEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Primary, secondary } from '../../helpers/color/color';
import Forms from '../../components/forms';

const Transfer = ({ navigation }) => {
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
		<View style={styles.TransferStyle}>
			<View style={styles.customerText}>
				<Text style={styles.CustomerHeading}>Transfer Ownership</Text>
				<Text style={styles.CustomerPara}>Note: All The Field are Mandatory</Text>
			</View>
			<Text style={styles.underLine} />
			{/* <View style={styles.detailList}>
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
            </View> */}
			<Forms onPress={() => navigation.navigate('TransferFind')} />
		</View>
	);
};

export default Transfer;

const styles = StyleSheet.create({
	TransferStyle: {
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

	underLine: {
		width: wp('80%'),
		height: 0.8,
		backgroundColor: secondary
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
	}
});
