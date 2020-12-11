import { gql } from '@apollo/client';

export const ADD_DRIVER = gql`
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
