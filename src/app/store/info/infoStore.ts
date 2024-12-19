import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

export type StoolAttributes = {
  consistency: 'thin' | 'default' | 'hard';
  shapeType: 'poop-1' | 'poop-2' | 'poop-3' | 'poop-4' | 'poop-5' | 'poop-6' | 'poop-7';
};

type BowelAttributesState = {
  bowelTime: {
    hour: number;
    minute: number;
  };
  setBowelTime: (time: Partial<BowelAttributesState['bowelTime']>) => void;

  stoolAttributes: StoolAttributes;
  setStoolAttributes: (attributes: Partial<StoolAttributes>) => void;

  recordNote: string;
  setRecordNote: (note: string) => void;
};

export const useInfoStore = create<BowelAttributesState>()(
  immer((set) => ({
    bowelTime: {
      hour: 0,
      minute: 0,
    },
    setBowelTime: (time) =>
      set((draft) => {
        draft.bowelTime = {
          ...draft.bowelTime,
          ...time,
        };
      }),

    stoolAttributes: { consistency: 'thin', shapeType: 'poop-1' },
    setStoolAttributes: (attributes) =>
      set((draft) => {
        draft.stoolAttributes = { ...draft.stoolAttributes, ...attributes };
      }),

    recordNote: '',
    setRecordNote: (note) =>
      set((draft) => {
        draft.recordNote = note;
      }),
  })),
);

export default useInfoStore;
