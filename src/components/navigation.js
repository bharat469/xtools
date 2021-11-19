import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../containers/login/login';
import Service from '../containers/services/service';
import { Primary } from '../helpers/color/color';
import NewCustomer from '../containers/newCustomer/newCustomer';
import Transfer from '../containers/transfer/transfer';
import TransferFind from '../containers/transfer/transferFind';
import AddMore from '../containers/addMore/addMore';
import { useSelector } from 'react-redux';

const homeStack = createNativeStackNavigator();
const authStack = createNativeStackNavigator();

const Navigation = () => {
	const { userToken } = useSelector((state) => state.user);

	console.log('UserToken: ', userToken);

	return (
		<NavigationContainer>
			{!userToken ? (
				<authStack.Navigator>
					<authStack.Screen name="Login" component={Login} options={{ headerShown: false }} />
				</authStack.Navigator>
			) : (
				<homeStack.Navigator>
					<homeStack.Screen
						name="Service"
						component={Service}
						options={{ headerStyle: { backgroundColor: Primary }, headerTintColor: '#fff' }}
					/>
					<homeStack.Screen
						name="New"
						component={NewCustomer}
						options={{ headerStyle: { backgroundColor: Primary }, headerTintColor: '#fff' }}
					/>
					<homeStack.Screen
						name="Transfer"
						component={Transfer}
						options={{ headerStyle: { backgroundColor: Primary }, headerTintColor: '#fff' }}
					/>
					<homeStack.Screen
						name="TransferFind"
						component={TransferFind}
						options={{ headerStyle: { backgroundColor: Primary }, headerTintColor: '#fff' }}
					/>
					<homeStack.Screen
						name="Search"
						component={AddMore}
						options={{ headerStyle: { backgroundColor: '#fff' }, headerTintColor: Primary }}
					/>
				</homeStack.Navigator>
			)}
		</NavigationContainer>
	);
};

export default Navigation;

const styles = StyleSheet.create({});
