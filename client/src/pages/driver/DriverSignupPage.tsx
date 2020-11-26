import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { gql, useMutation } from '@apollo/client';
import { Modal } from 'antd-mobile';
import DriverSignupForm from '@components/driverSignup/DriverSignupForm';

const ADD_DRIVER = gql`
  mutation DriverSignup(
    $id: String!
    $password: String!
    $name: String!
    $phone: String!
    $licenseNumber: String!
    $carModel: String!
    $plateNumber: String!
    $carColor: String!
  ) {
    driverSignup(
      id: $id
      password: $password
      name: $name
      phone: $phone
      licenseNumber: $licenseNumber
      carModel: $carModel
      plateNumber: $plateNumber
      carColor: $carColor
    ) {
      success
      message
    }
  }
`;

const DriverSignupPage: React.FC = () => {
  const [modalStatus, setModalStatus] = useState({ visible: false, message: '' });
  const [addDriver] = useMutation(ADD_DRIVER);
  const history = useHistory();

  const showAlert = (message: string) => {
    setModalStatus({ visible: true, message });
  };

  const closeAlert = () => {
    setModalStatus({ visible: false, message: '' });
  };

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
