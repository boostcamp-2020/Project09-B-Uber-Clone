import React, { useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { Modal } from 'antd-mobile';
import DriverSignupForm from '@components/driverSignup/DriverSignupForm';
import { ADD_DRIVER } from '@queries/driver/driverSignup';

const DriverSignupPage: React.FC = () => {
  const [modalStatus, setModalStatus] = useState({ visible: false, message: '' });
  const [addDriver] = useMutation(ADD_DRIVER);
  const history = useHistory();

  const showAlert = useCallback((message: string) => {
    setModalStatus({ visible: true, message });
  }, []);

  const closeAlert = useCallback(() => {
    setModalStatus({ visible: false, message: '' });
  }, []);

  return (
    <>
      <DriverSignupForm addDriver={addDriver} history={history} showAlert={showAlert} />
      <Modal
        visible={modalStatus.visible}
        transparent
        onClose={closeAlert}
        title={modalStatus.message}
        footer={[
          {
            text: '확인',
            onPress: closeAlert,
          },
        ]}
      ></Modal>
    </>
  );
};

export default DriverSignupPage;
