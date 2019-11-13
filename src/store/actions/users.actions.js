export const SIGN_IN = 'SIGN_IN';
export const SIGN_UP = 'SIGN_UP';
export const SIGN_OUT = 'SIGN_OUT';
export const USER_UPDATED = 'USER_UPDATED';

/**
 * These methods are helper funtions that creates actions
 */



export const sign_in = (user) => {
  return {
    type: SIGN_IN,
    user
  };
};

export const sign_up = (user) => {
  return {
    type: SIGN_UP,
    user
  };
};

export const user_updated = (user) => {
  return {
    type: USER_UPDATED,
    user
  };
};

export const sign_out = () => {
  return {
    type: SIGN_OUT,
  };
};
