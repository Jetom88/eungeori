'use client';

import Button from '@/app/components/common/Button';
import Memo from '@/app/components/common/Memo';
import { flexSprinklesFc } from '@/app/components/common/utils/flex';
import { colors } from '@/app/styles/colors.css';

import useInfoStore from '@/app/store/info/infoStore';
import { usePopupStore } from '@/app/store/popup/PopupStore';
import DetailPopup from './components/popup';
import TitleText from './components/titleText';
import { infoContainer } from '../common/common.css';
import { Step, StepChangeHandler } from '../../page';
import { formatToLocalISOString, formatToLocalYYYYMMDD } from '@/app/common/utils/date';
import { useUserInfoStore } from '@/app/store/user/userStore';
import { supabaseClient } from '@/app/lib/supabaseClient';

const DetailPage = ({ onButtonClick }: { onButtonClick: StepChangeHandler }) => {
  const setRecordNoteState = useInfoStore((state) => state.setRecordNote);
  const setDetailPopupState = usePopupStore((state) => state.setOpenPopup);
  const detailPopupState = usePopupStore((state) => state.openPopup);
  const setDetailPopupMessageState = usePopupStore((state) => state.setMessage);

  const recordNoteState = useInfoStore((state) => state.recordNote);
  const stoolAttributes = useInfoStore((state) => state.stoolAttributes);
  const userId = useUserInfoStore((state) => state.userInfo.id);

  const bowelTime = useInfoStore((state) => state.bowelTime);
  const startDate = useInfoStore((state) => state.startDate);
  const time = formatToLocalISOString(bowelTime, formatToLocalYYYYMMDD(startDate));

  const handleSaveData = async () => {
    try {
      const { data, error } = await supabaseClient
        .from('bowel_attributes')
        .insert([
          {
            bowel_time: time,
            stool_attributes: stoolAttributes,
            record_note: recordNoteState,
            user_id: userId,
          },
        ])
        .select('record_note');

      if (error) {
        throw error;
      }

      if (data) {
        return true;
      }
    } catch (e) {
      setDetailPopupState(true);
      setDetailPopupMessageState('기록에 실패했습니다.');
      return false;
    }
  };

  const onSaveClick = async () => {
    if (recordNoteState.length < 3) {
      setDetailPopupState(true);
      setDetailPopupMessageState('세 글자 이상 입력해 주세요.');
      return;
    }

    if (recordNoteState.length > 250) {
      setDetailPopupState(true);
      setDetailPopupMessageState('최대 글자 수는 250자를 넘을 수 없습니다.');
      return;
    }

    const saveSuccess = await handleSaveData();

    if (saveSuccess) {
      setDetailPopupState(true);
      setDetailPopupMessageState('기록 되었습니다.');

      setTimeout(() => {
        onButtonClick(Step.STEP1);
      }, 1000); // 팝업을 닫지 않아도 이동되게
    } else {
      setDetailPopupState(true);
      setDetailPopupMessageState('기록에 실패했습니다. 다시 시도해 주세요.');
    }
    setRecordNoteState('');
  };

  return (
    <>
      {detailPopupState && <DetailPopup />}
      <article className={infoContainer}>
        <TitleText />

        <Memo text={recordNoteState} />

        <div className={flexSprinklesFc({ gap: '16px', justifyContent: 'center' })}>
          <Button
            height="59px"
            text="이전"
            borderRadius="10px"
            onClick={() => {
              onButtonClick(Step.STEP1);
            }}
          />
          <Button
            text="기록 완료"
            width="343px"
            height="59px"
            background={colors.primary}
            color={colors.white}
            borderRadius="10px"
            onClick={onSaveClick}
          />
        </div>
      </article>
    </>
  );
};

export default DetailPage;
