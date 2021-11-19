import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Platform, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Navigation from './src/components/navigation';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Provider } from 'react-redux';
import { store, persistor } from './src/redux';
import { PersistGate } from 'redux-persist/integration/react';

export default function App() {
	return (
		<SafeAreaView style={Platform.OS === 'android' ? styles.androidStyle : styles.container}>
			<StatusBar style="auto" />
			<Provider store={store}>
				<PersistGate loading={null} persistor={persistor}>
					<Navigation />
				</PersistGate>
			</Provider>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	},

	androidStyle: {
		flex: 1,
		top: hp('5%')
	}
});
