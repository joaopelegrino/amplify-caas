import { defineAuth } from '@aws-amplify/backend';

/**
 * Define and configure your auth resource
 * @see https://docs.amplify.aws/gen2/build-a-backend/auth
 */
export const auth = defineAuth({
  loginWith: {
    email: true,
    customAttributes: {
      'custom:crm': { required: true },
      'custom:specialty': { required: true }
    },
    passwordSettings: {
      minLength: 8,
      requireNumbers: true,
      requireSpecialCharacters: true,
      requireUppercase: true,
      requireLowercase: true
    },
    verificationMechanisms: ['email']
  },
});
