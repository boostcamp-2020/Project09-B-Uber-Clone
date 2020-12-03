import React, { useState } from 'react';
import { Modal } from 'antd-mobile';
import { useHistory } from 'react-router-dom';

interface PaymentModalPropsType {
  visible: boolean;
  onClose: any;
}

const PaymentModal: React.FC<PaymentModalPropsType> = ({ visible, onClose }) => {
  const history = useHistory();
  const afterClose = () => {
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
          onPress: () => {
            onClose();
            afterClose();
          },
        },
      ]}
    />
  );
};

export default PaymentModal;
