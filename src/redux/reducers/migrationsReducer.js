/* eslint-disable import/no-anonymous-default-export */
import * as types from '../types';

const initialState = {
  isLoading: false,
  groups: {},
  wallets: {},
  members: {},
  reasons: {},
  admins: {},
  finish: {},
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case types.MIGRATION_START:
      return {
        ...state,
        isLoading: true,
      };
    case types.MIGRATE_GROUPS:
      return {
        ...state,
        isLoading: false,
        groups: payload,
      };
    case types.MIGRATE_WALLETS:
      return {
        ...state,
        isLoading: false,
        wallets: payload,
      };
    case types.MIGRATE_MEMBERS:
      return {
        ...state,
        isLoading: false,
        members: payload,
      };
    case types.MIGRATE_REASONS:
      return {
        ...state,
        isLoading: false,
        reasons: payload,
      };
    case types.MIGRATE_ADMINS:
      return {
        ...state,
        isLoading: false,
        admins: payload,
      };
    case types.COMPLETE_MIGRATIONS:
      return {
        ...state,
        isLoading: false,
        finish: payload,
      };
    default:
      return state;
  }
};
