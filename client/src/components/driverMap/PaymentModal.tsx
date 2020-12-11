import React, { useCallback } from 'react';
import { Modal } from 'antd-mobile';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { ARRIVE_DESTINATION } from '@queries/driver/driverMatching';
import { useMutation } from '@apollo/client';
import { Toast } from 'antd-mobile';
import { DriverMatchingInfo } from '@custom-types';

interface PaymentModalPropsType {
  visible: boolean;
}

const PaymentModal: React.FC<PaymentModalPropsType> = ({ visible }) => {
  const history = useHistory();
  const [arriveDestination] = useMutation(ARRIVE_DESTINATION);
  const { uid } = useSelector((state: { driverMatchingInfo: DriverMatchingInfo }) => state.driverMatchingInfo);

  const arrive = useCallback(async () => {
    const {
      data: {
        arriveDestination: { success, message },
      },
    } = await arriveDestination({ variables: { uid } });

    if (success) {
      Toast.info('메인 페이지로 이동합니다.', 2, () => {
        history.push('/driver/main');
      });
    } else
      Toast.fail(`${message} 메인 페이지로 이동합니다.`, 2, () => {
        history.push('/driver/main');
      });
  }, [uid]);

  return (
    <Modal
      visible={visible}
      transparent
      maskClosable={false}
      title="승객에게 결제를 요청하세요."
      footer={[
        {
          text: '결제 완료',
          onPress: () => arrive(),
        },
      ]}
    />
  );
};

export default PaymentModal;
