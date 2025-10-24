export type ReflectionCategory = 'good' | 'bad' | 'sad';

export type ReflectionEntry = {
  id: string;
  date: string;
  good: string;
  bad: string;
  sad: string;
};

export const reflectionLabels: Record<ReflectionCategory, { title: string; description: string; emoji: string }> = {
  good: {
    title: '좋았던 일',
    description: '오늘 기분이 좋아진 순간',
    emoji: '🌟'
  },
  bad: {
    title: '아쉬웠던 일',
    description: '마음이 힘들었던 순간',
    emoji: '🌧️'
  },
  sad: {
    title: '슬펐던 일',
    description: '눈물이 날 뻔한 순간',
    emoji: '💧'
  }
};
