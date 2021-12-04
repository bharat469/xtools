import React from 'react'
import { StyleSheet, Text, View,Modal, TouchableOpacity } from 'react-native'

const modal = (props) => {
    
    return (
      <Modal
      animationType="slide"
      transparent={true}
      visible={props.visible}
onRequestClose={props.close}
>

<View style={styles.Logout}>
    <TouchableOpacity style={styles.logoutBtn}>
        <Text style={styles.logoutText}>Logout</Text>
    </TouchableOpacity>
</View>
      </Modal>
    )
}

export default modal

const styles = StyleSheet.create({})
