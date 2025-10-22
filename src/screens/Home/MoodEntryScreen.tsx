import React, { useState } from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import ScreenContainer from '../../components/ScreenContainer';
import SectionCard from '../../components/SectionCard';
import { moodOptions, privacyOptions, useMoods } from '../../context/MoodContext';
import { theme } from '../../theme/theme';

const MoodEntryScreen: React.FC = () => {
  const { addEntry } = useMoods();
  const [mood, setMood] = useState(moodOptions[0]);
  const [privacy, setPrivacy] = useState(privacyOptions[0]);
  const [reason, setReason] = useState('');

  const handleSubmit = () => {
    if (!reason.trim()) {
      Alert.alert('기록하기', '기분의 이유를 간단하게 적어주세요.');
      return;
    }

    addEntry({
      mood,
      reason,
      privacy,
      date: new Date().toISOString()
    });
    setReason('');
    Alert.alert('완료!', '기분이 기록되었습니다.');
  };

  return (
    <ScreenContainer>
      <SectionCard title="오늘의 기분" subtitle="솔직한 감정을 선택해보세요">
        <View style={styles.chipGroup}>
          {moodOptions.map((option) => (
            <TouchableOpacity
              key={option}
              style={[styles.chip, option === mood && styles.chipSelected]}
              onPress={() => setMood(option)}
            >
              <Text style={[styles.chipText, option === mood && styles.chipTextSelected]}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <TextInput
          style={styles.textArea}
          placeholder="기분이 그런 이유를 짧게 남겨보세요."
          placeholderTextColor="#A7B8B3"
          multiline
          numberOfLines={4}
          value={reason}
          onChangeText={setReason}
        />
        <Text style={styles.sectionLabel}>공개 범위</Text>
        <View style={styles.privacyGroup}>
          {privacyOptions.map((option) => (
            <TouchableOpacity
              key={option}
              style={[styles.privacyButton, option === privacy && styles.privacySelected]}
              onPress={() => setPrivacy(option)}
            >
              <Text
                style={[styles.privacyText, option === privacy && styles.privacyTextSelected]}
              >
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitText}>기분 기록하기</Text>
        </TouchableOpacity>
      </SectionCard>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  chipGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12
  },
  chip: {
    borderRadius: 999,
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#F0F7F4'
  },
  chipSelected: {
    backgroundColor: theme.colors.primary
  },
  chipText: {
    color: theme.colors.muted,
    fontWeight: '600'
  },
  chipTextSelected: {
    color: '#FFFFFF'
  },
  textArea: {
    marginTop: 16,
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
  sectionLabel: {
    marginTop: 24,
    marginBottom: 8,
    fontWeight: '700',
    color: theme.colors.text
  },
  privacyGroup: {
    flexDirection: 'row',
    gap: 10
  },
  privacyButton: {
    flex: 1,
    borderRadius: 16,
    paddingVertical: 12,
    alignItems: 'center',
    backgroundColor: '#F0F7F4'
  },
  privacySelected: {
    backgroundColor: theme.colors.primaryDark
  },
  privacyText: {
    color: theme.colors.muted,
    fontWeight: '600'
  },
  privacyTextSelected: {
    color: '#FFFFFF'
  },
  submitButton: {
    marginTop: 28,
    backgroundColor: theme.colors.primary,
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center'
  },
  submitText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700'
  }
});

export default MoodEntryScreen;
