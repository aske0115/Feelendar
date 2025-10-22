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

const LoginScreen: React.FC<NativeStackScreenProps<RootStackParamList, 'Login'>> = ({
  navigation
}) => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    try {
      setError(null);
      await login(email, password);
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
        <Text style={styles.brand}>Feelendar</Text>
        <Text style={styles.title}>오늘의 기분을 기록해보세요</Text>

        <View style={styles.form}>
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
          {error ? <Text style={styles.error}>{error}</Text> : null}
          <TouchableOpacity style={styles.primaryButton} onPress={handleLogin}>
            <Text style={styles.primaryButtonText}>로그인</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.secondaryButton} onPress={() => navigation.navigate('Signup')}>
            <Text style={styles.secondaryText}>처음 오셨나요? 회원가입</Text>
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
    paddingTop: 120
  },
  brand: {
    fontSize: 36,
    fontWeight: '800',
    color: theme.colors.primaryDark
  },
  title: {
    marginTop: 12,
    fontSize: 18,
    color: theme.colors.muted
  },
  form: {
    marginTop: 48,
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

export default LoginScreen;
