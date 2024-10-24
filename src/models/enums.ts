import { create } from 'zustand';
import { Enums } from '@/typings/enums';

export const useEnums = create<{
  enums: Enums;
  setEnums: (data: Enums) => void;
}>((set) => ({
  enums: {
    UserFeedbackStatusEnum: [],
    UserFeedbackTypeEnum: [],
    UserTypeEnum: [],
  },
  setEnums: (data): void => set(() => ({ enums: data })),
}));
