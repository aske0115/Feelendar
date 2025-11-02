import React, { useMemo, useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import ScreenContainer from '../../components/ScreenContainer';
import SectionCard from '../../components/SectionCard';
import { useReflections } from '../../context/MoodContext';
import { reflectionLabels, ReflectionCategory } from '../../types/mood';
import { theme } from '../../theme/theme';
import { HomeStackParamList } from '../../navigation/HomeStack';

const categories: ReflectionCategory[] = ['good', 'bad', 'sad'];
type MoodEntryScreenProps = NativeStackScreenProps<HomeStackParamList, 'MoodEntry'>;

const MoodEntryScreen: React.FC<MoodEntryScreenProps> = ({ navigation }) => {
  const { addEntry } = useReflections();
  const [good, setGood] = useState('');
  const [bad, setBad] = useState('');
  const [sad, setSad] = useState('');

  const values = useMemo<Record<ReflectionCategory, string>>(
    () => ({
      good,
      bad,
      sad
    }),
    [good, bad, sad]
  );

  const setters: Record<ReflectionCategory, React.Dispatch<React.SetStateAction<string>>> = {
    good: setGood,
    bad: setBad,
    sad: setSad
  };

  const handleSubmit = async () => {
    if (!good.trim() && !bad.trim() && !sad.trim()) {
      Alert.alert('기록하기', '오늘 하루의 감정을 한 가지 이상 적어주세요.');
      return;
    }

    try {
      await addEntry({
        good,
        bad,
        sad,
        date: new Date().toISOString()
      });

      setGood('');
      setBad('');
      setSad('');
      Alert.alert('저장 완료', '오늘의 감정이 기록되었어요. 좋은 꿈 꾸세요!', [
        {
          text: '확인',
          onPress: () => {
            navigation.popToTop();
            navigation.getParent()?.navigate('Moments');
          }
        }
      ]);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : '기록 저장 중 문제가 발생했어요.';
      Alert.alert('저장 실패', message);
    }
  };

  return (
    <ScreenContainer>
      <SectionCard title="자기 전 감정 기록" subtitle="각 칸에 떠오르는 순간을 가볍게 적어보세요">
        {categories.map((key) => {
          const label = reflectionLabels[key];
          return (
            <View key={key} style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionEmoji}>{label.emoji}</Text>
                <View>
                  <Text style={styles.sectionTitle}>{label.title}</Text>
                  <Text style={styles.sectionDescription}>{label.description}</Text>
                </View>
              </View>
              <TextInput
                style={styles.textArea}
                placeholder={`${label.title}을(를) 자유롭게 적어주세요.`}
                placeholderTextColor="#A7B8B3"
                multiline
                numberOfLines={4}
                value={values[key]}
                onChangeText={setters[key]}
              />
            </View>
          );
        })}
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitText}>오늘 하루 정리하기</Text>
        </TouchableOpacity>
        <Text style={styles.helperText}>* 저장된 감정은 언제든지 감정 모아보기에서 확인할 수 있어요.</Text>
      </SectionCard>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  section: {
    marginBottom: 24
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12
  },
  sectionEmoji: {
    fontSize: 28
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: theme.colors.text
  },
  sectionDescription: {
    color: theme.colors.muted,
    fontSize: 13
  },
  textArea: {
    minHeight: 120,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    textAlignVertical: 'top',
    color: theme.colors.text,
    shadowColor: '#0D473A',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 4
  },
  submitButton: {
    marginTop: 12,
    backgroundColor: theme.colors.primary,
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center'
  },
  submitText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700'
  },
  helperText: {
    marginTop: 12,
    color: theme.colors.muted,
    fontSize: 12
  }
});

export default MoodEntryScreen;
