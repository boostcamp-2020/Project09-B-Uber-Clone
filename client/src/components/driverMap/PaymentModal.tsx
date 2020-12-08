import React from 'react';
import { Modal } from 'antd-mobile';
import { useHistory } from 'react-router-dom';
import { ARRIVE_DESTINATION } from '@queries/driver/driverMatching';
import { useMutation } from '@apollo/client';

interface PaymentModalPropsType {
  visible: boolean;
}

const PaymentModal: React.FC<PaymentModalPropsType> = ({ visible }) => {
  const history = useHistory();
  const [arriveDestination] = useMutation(ARRIVE_DESTINATION);

  const arrive = () => {
    arriveDestination();
    history.push('/driver/main');
  };

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
