import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { theme } from '../../theme/theme';
import { useAuth } from '../../context/AuthContext';

const SignupScreen: React.FC<NativeStackScreenProps<RootStackParamList, 'Signup'>> = ({
  navigation
}) => {
  const { signup } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSignup = async () => {
    if (!name || !email || !password) {
      setError('모든 필드를 입력해주세요.');
      return;
    }
    if (password !== confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      setError(null);
      await signup(name, email, password);
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.inner}>
        <Text style={styles.brand}>환영해요!</Text>
        <Text style={styles.title}>함께 감정을 나눠보아요</Text>

        <View style={styles.form}>
          <TextInput
            placeholder="닉네임"
            placeholderTextColor="#9CAFAA"
            value={name}
            onChangeText={setName}
            style={styles.input}
          />
          <TextInput
            placeholder="이메일"
            placeholderTextColor="#9CAFAA"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            placeholder="비밀번호"
            placeholderTextColor="#9CAFAA"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            style={styles.input}
          />
          <TextInput
            placeholder="비밀번호 확인"
            placeholderTextColor="#9CAFAA"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            style={styles.input}
          />
          {error ? <Text style={styles.error}>{error}</Text> : null}
          <TouchableOpacity style={styles.primaryButton} onPress={handleSignup}>
            <Text style={styles.primaryButtonText}>가입하고 시작하기</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.secondaryButton} onPress={() => navigation.goBack()}>
            <Text style={styles.secondaryText}>이미 계정이 있으신가요? 로그인</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.primaryLight
  },
  inner: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 80
  },
  brand: {
    fontSize: 34,
    fontWeight: '800',
    color: theme.colors.primaryDark
  },
  title: {
    marginTop: 12,
    fontSize: 18,
    color: theme.colors.muted
  },
  form: {
    marginTop: 40,
    gap: 16
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: theme.colors.text,
    shadowColor: '#0D473A',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 4
  },
  primaryButton: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center'
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 16
  },
  secondaryButton: {
    alignItems: 'center',
    paddingVertical: 10
  },
  secondaryText: {
    color: theme.colors.primaryDark,
    fontWeight: '600'
  },
  error: {
    color: '#F87171',
    fontSize: 13
  }
});

export default SignupScreen;
