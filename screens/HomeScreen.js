import React, { useEffect } from 'react';
import {
View,
Text,
StyleSheet,
Image,
TouchableOpacity,
ScrollView,
SafeAreaView,
Dimensions
} from 'react-native';
import * as SplashScreen from 'expo-splash-screen';

const { width } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
// ซ่อน Splash Screen เมื่อหน้า Home โหลดเสร็จ
useEffect(() => {
async function hideSplash() {
// หากมีการโหลดข้อมูลเพิ่มเติม ทําที่นี่
await SplashScreen.hideAsync();
}
hideSplash();
}, []);

const handleLessonPress = () => {
navigation.navigate('LessonList');
};

return (
<SafeAreaView style={styles.safeArea}>
<ScrollView style={styles.container}>
{/* ส่วนหัว */}
<View style={styles.header}>
<Image
source={require('../assets/images/logo.png')}
style={styles.logo}
resizeMode="contain"
/>
<Text style={styles.appName}>ห้องเรียนวิชาภาษาอังกฤษพื้นฐาน</Text>
<Text style={styles.subtitle}>เรียนรู้ได้ทุกที่ทุกเวลา</Text>
</View>

{/* ส่วนเนื้อหา */}
<View style={styles.contentContainer}>
<View style={styles.welcomeCard}>
<Text style={styles.welcomeTitle}>ยินดีต้อนรับ!</Text>
<Text style={styles.welcomeText}>
แอปพลิเคชันนี้จะช่วยให้คุณเข้าถึงบทเรียนได้ง่ายๆ เพียงปลายนิ้ว
สามารถเรียนรู้ได้ทุกที่ทุกเวลาตามที่คุณต้องการ
</Text>

<TouchableOpacity
style={styles.lessonButton}
onPress={handleLessonPress}
>
<Text style={styles.lessonButtonText}>เข้าสู่บทเรียน</Text>
</TouchableOpacity>
</View>

{/* ส่วนแสดงฟีเจอร์ */}
<Text style={styles.sectionTitle}>ฟีเจอร์เด่น</Text>
<View style={styles.featuresContainer}>
<View style={styles.featureCard}>
<Image
source={require('../assets/images/feature1.png')}
style={styles.featureIcon}
/>
<Text style={styles.featureTitle}>เนื้อหาที่เข้าใจง่าย</Text>
<Text style={styles.featureText}>
ออกแบบมาให้เข้าใจง่ายสําหรับผู้เรียนทุกระดับ
</Text>
</View>
<View style={styles.featureCard}>
<Image
source={require('../assets/images/feature2.png')}
style={styles.featureIcon}
/>
<Text style={styles.featureTitle}>แบบทดสอบโต้ตอบ</Text>
<Text style={styles.featureText}>
ทดสอบความเข้าใจด้วยแบบทดสอบแบบโต้ตอบ
</Text>
</View>

<View style={styles.featureCard}>
<Image
source={require('../assets/images/feature3.png')}
style={styles.featureIcon}
/>
<Text style={styles.featureTitle}>ติดตามความก้าวหน้า</Text>
<Text style={styles.featureText}>
ดูความก้าวหน้าและผลการเรียนของคุณได้ตลอดเวลา
</Text>
</View>
</View>
</View>
</ScrollView>
</SafeAreaView>
);
};

const styles = StyleSheet.create({
safeArea: {
flex: 1,
backgroundColor: '#f8f9fa',
},
container: {
flex: 1,
},
header: {
backgroundColor: '#5e72e4',
padding: 20,
alignItems: 'center',
borderBottomLeftRadius: 20,
borderBottomRightRadius: 20,
},
logo: {
width: 100,
height: 100,
marginBottom: 10,
},
appName: {
fontSize: 30,
fontWeight: 'bold',
color: '#ffffff',
marginBottom: 5,
},
subtitle: {
fontSize: 16,
color: '#e6e9fc',
},
contentContainer: {
padding: 16,
},
welcomeCard: {
backgroundColor: '#ffffff',
borderRadius: 10,
padding: 20,
marginVertical: 16,
elevation: 3,
shadowColor: '#000',
shadowOffset: { width: 0, height: 2 },
shadowOpacity: 0.1,
shadowRadius: 4,
},
welcomeTitle: {
fontSize: 22,
fontWeight: 'bold',
color: '#333',
marginBottom: 10,
},
welcomeText: {
fontSize: 16,
color: '#555',
lineHeight: 24,
marginBottom: 20,
},
lessonButton: {
backgroundColor: '#5e72e4',
paddingVertical: 12,
paddingHorizontal: 24,
borderRadius: 8,
alignItems: 'center',
},
lessonButtonText: {
color: '#ffffff',
fontWeight: 'bold',
fontSize: 16,
},
sectionTitle: {
fontSize: 20,
fontWeight: 'bold',
color: '#333',
marginTop: 20,
marginBottom: 15,
},
featuresContainer: {
flexDirection: 'row',
flexWrap: 'wrap',
justifyContent: 'space-between',
},
featureCard: {
backgroundColor: '#ffffff',
borderRadius: 10,
padding: 15,
marginBottom: 15,
width: width > 600 ? (width - 48) / 3 - 8 : '100%',
elevation: 2,
shadowColor: '#000',
shadowOffset: { width: 0, height: 1 },
shadowOpacity: 0.1,
shadowRadius: 2,
},
featureIcon: {
width: 50,
height: 50,
marginBottom: 10,
},
featureTitle: {
fontSize: 18,
fontWeight: 'bold',
color: '#333',
marginBottom: 5,
},
featureText: {
fontSize: 14,
color: '#666',
lineHeight: 20,
},
});

export default HomeScreen;