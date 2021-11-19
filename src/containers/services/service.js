import React, { useEffect, useLayoutEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Primary, secondary } from '../../helpers/color/color';
import { AntDesign } from '@expo/vector-icons';

const Service = ({ navigation }) => {
	useLayoutEffect(() => {
		navigation.setOptions({
			headerBackTitle: '',
			headerTitle: 'Dashboard',
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
		<View style={styles.dashboardContainer}>
			<Text style={styles.dashboardHeading}>Choose Action</Text>
			<View style={styles.DashboardbtnContainer}>
				<TouchableOpacity style={styles.DashboardBtn} onPress={() => navigation.navigate('New')}>
					<Text style={styles.DashboardText}>New Customer</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={styles.DashboardBtn}
					onPress={() => {
						navigation.navigate('TransferFind');
					}}
				>
					<Text style={styles.DashboardText}>Transfer Ownership of Tool</Text>
				</TouchableOpacity>
			</View>
			<Text style={styles.footerText}> Copyright Ⓒ 2021 All Right Reserved</Text>
		</View>
	);
};

export default Service;

const styles = StyleSheet.create({
	dashboardContainer: {
		flex: 1
	},
	dashboardHeading: {
		fontSize: hp('3%'),
		color: secondary,
		margin: hp('4%')
	},
	DashboardbtnContainer: {
		alignItems: 'center'
	},
	DashboardBtn: {
		backgroundColor: Primary,
		margin: 12,
		padding: 12,
		width: wp('80%'),
		height: hp('8%'),
		justifyContent: 'center',
		borderRadius: 8,
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

	DashboardText: {
		color: '#fff',
		fontSize: hp('2%'),
		fontWeight: '700',
		textAlign: 'center'
	},

	footerText: {
		top: hp('40%'),
		textAlign: 'center',
		color: secondary,
		fontSize: hp('1.6%')
	}
});
