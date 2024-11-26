'use strict';

const { meta: action } = require('eslint-plugin-node/lib/rules/no-sync');

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const newArray = [];
  let newState = { ...state };

  for (const action of actions) {
    if (action.type === 'addProperties') {
      newState = { ...newState, ...action.extraData };
      newArray.push({ ...newState });
    }

    if (action.type === 'removeProperties') {
      for (const key of action.keysToRemove) {
        delete newState[key];
      }
      newArray.push({ ...newState });
    }

    if (action.type === 'clear') {
      newState = {};
      newArray.push({ ...newState });
    }
  }

  return newArray;
}

module.exports = transformStateWithClones;
