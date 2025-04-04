import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, SafeAreaView, Share } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const LessonDetailScreen = ({ route, navigation }) => {
  const { content } = route.params;
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  
  // สร้างฟังก์ชันสำหรับแปลงเนื้อหาที่อยู่ในรูปแบบ Markdown อย่างง่ายให้เป็น JSX elements
  const renderMarkdown = (text) => {
    if (!text) return null;
    
    // แยกข้อความเป็นบรรทัด
    const lines = text.split('\n');
    
    return lines.map((line, index) => {
      // หัวข้อใหญ่ (h1) เริ่มต้นด้วย #
      if (line.startsWith('# ')) {
        return (
          <Text key={index} style={styles.heading1}>
            {line.substring(2)}
          </Text>
        );
      }
      // หัวข้อรอง (h2) เริ่มต้นด้วย ##
      else if (line.startsWith('## ')) {
        return (
          <Text key={index} style={styles.heading2}>
            {line.substring(3)}
          </Text>
        );
      }
      // หัวข้อย่อย (h3) เริ่มต้นด้วย ###
      else if (line.startsWith('### ')) {
        return (
          <Text key={index} style={styles.heading3}>
            {line.substring(4)}
          </Text>
        );
      }
      // รายการสัญลักษณ์ (bullet)
      else if (line.startsWith('- ')) {
        return (
          <View key={index} style={styles.bulletItem}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.bulletText}>{line.substring(2)}</Text>
          </View>
        );
      }
      // บรรทัดว่าง
      else if (line.trim() === '') {
        return <View key={index} style={styles.emptyLine} />;
      }
      // ข้อความทั่วไป
      else {
        return (
          <Text key={index} style={styles.paragraph}>
            {line}
          </Text>
        );
      }
    });
  };

  // ฟังก์ชันสำหรับแชร์บทเรียน
  const shareLesson = async () => {
    try {
      await Share.share({
        message: `เรียนรู้ "${route.params.title}" ในแอป Thai Learning App`,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  // ฟังก์ชันสำหรับบุ๊คมาร์คบทเรียน
  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    // ในสถานการณ์จริงควรจะบันทึกลงในฐานข้อมูลหรือ AsyncStorage
  };

  // แบบทดสอบจำลอง
  const quizData = [
    {
      question: 'ภาษาไทยมีวรรณยุกต์กี่เสียง?',
      options: ['3 เสียง', '4 เสียง', '5 เสียง', '6 เสียง'],
      correctAnswer: 2 // index ของคำตอบที่ถูกต้อง (5 เสียง)
    },
    {
      question: 'คำว่า "สวัสดี" ในภาษาอังกฤษคือ?',
      options: ['Thank you', 'Hello', 'Goodbye', 'Yes'],
      correctAnswer: 1 // index ของคำตอบที่ถูกต้อง (Hello)
    }
  ];

  // ฟังก์ชันแสดงแบบทดสอบ
  const renderQuiz = () => {
    if (!showQuiz) return null;

    return (
      <View style={styles.quizContainer}>
        <Text style={styles.quizTitle}>แบบทดสอบท้ายบทเรียน</Text>
        {quizData.map((quiz, index) => (
          <View key={index} style={styles.quizItem}>
            <Text style={styles.quizQuestion}>{index + 1}. {quiz.question}</Text>
            {quiz.options.map((option, optIndex) => (
              <TouchableOpacity 
                key={optIndex} 
                style={styles.quizOption}
                onPress={() => alert(optIndex === quiz.correctAnswer ? 'ถูกต้อง! 🎉' : 'ไม่ถูกต้อง ลองอีกครั้ง')}
              >
                <Text style={styles.quizOptionText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.contentContainer}>
          {renderMarkdown(content)}
          
          {renderQuiz()}
          
          <View style={styles.actionsContainer}>
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={toggleBookmark}
            >
              <Ionicons 
                name={isBookmarked ? 'bookmark' : 'bookmark-outline'} 
                size={22} 
                color="#5e72e4" 
              />
              <Text style={styles.actionText}>บุ๊คมาร์ค</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={shareLesson}
            >
              <Ionicons name="share-social-outline" size={22} color="#5e72e4" />
              <Text style={styles.actionText}>แชร์</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => setShowQuiz(!showQuiz)}
            >
              <Ionicons name="help-circle-outline" size={22} color="#5e72e4" />
              <Text style={styles.actionText}>{showQuiz ? 'ซ่อน' : 'แสดง'}แบบทดสอบ</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      
      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.nextButton}
          onPress={() => navigation.navigate('LessonList')}
        >
          <Text style={styles.nextButtonText}>กลับสู่บทเรียนทั้งหมด</Text>
          <Ionicons name="arrow-forward" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    paddingBottom: 80, // ให้พื้นที่สำหรับ footer
  },
  contentContainer: {
    padding: 20,
  },
  heading1: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#5e72e4',
    marginBottom: 15,
    marginTop: 10,
  },
  heading2: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#525f7f',
    marginBottom: 12,
    marginTop: 20,
  },
  heading3: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#32325d',
    marginBottom: 10,
    marginTop: 15,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    color: '#525f7f',
    marginBottom: 10,
  },
  bulletItem: {
    flexDirection: 'row',
    marginBottom: 8,
    paddingLeft: 8,
  },
  bullet: {
    fontSize: 16,
    marginRight: 8,
    color: '#5e72e4',
  },
  bulletText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#525f7f',
    flex: 1,
  },
  emptyLine: {
    height: 12,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#e9ecef',
    paddingTop: 20,
    marginTop: 20,
  },
  actionButton: {
    alignItems: 'center',
  },
  actionText: {
    fontSize: 12,
    color: '#8898aa',
    marginTop: 5,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#e9ecef',
  },
  nextButton: {
    backgroundColor: '#5e72e4',
    borderRadius: 10,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#5e72e4',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6,
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
  },
  quizContainer: {
    marginTop: 30,
    marginBottom: 20,
    backgroundColor: '#f8f9fe',
    borderRadius: 15,
    padding: 20,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  quizTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#5e72e4',
    marginBottom: 20,
    textAlign: 'center',
  },
  quizItem: {
    marginBottom: 20,
  },
  quizQuestion: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#525f7f',
    marginBottom: 10,
  },
  quizOption: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e9ecef',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  quizOptionText: {
    fontSize: 14,
    color: '#525f7f',
  }
});

export default LessonDetailScreen;