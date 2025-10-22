export type MoodLevel = '행복해요' | '좋아요' | '보통이에요' | '우울해요' | '지쳤어요';

export type PrivacyLevel = '전체 공개' | '친구에게만' | '비공개';

export type MoodEntry = {
  id: string;
  mood: MoodLevel;
  reason: string;
  date: string;
  privacy: PrivacyLevel;
  reactions: {
    empathy: number;
    cheer: number;
    tips: number;
  };
};
