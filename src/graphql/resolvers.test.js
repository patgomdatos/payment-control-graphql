const test = require('node:test');
const assert = require('node:assert/strict');
const resolvers = require('./resolvers');
const payrollService = require('../services/payrollService');

test('historicos should forward funcionarioId when provided as camelCase', () => {
  const calls = [];
  const originalFindHistory = payrollService.findHistory;

  payrollService.findHistory = (filters) => {
    calls.push(filters);
    return [];
  };

  try {
    const result = resolvers.Query.historicos(
      {},
      { competencia: '08/2026', funcionarioId: '9306e41d-9936-4d7d-8d05-11fc54ff01cb' },
      { user: { id: 'user-1' } }
    );

    assert.deepEqual(calls, [{ competencia: '08/2026', funcionarioId: '9306e41d-9936-4d7d-8d05-11fc54ff01cb' }]);
    assert.deepEqual(result, []);
  } finally {
    payrollService.findHistory = originalFindHistory;
  }
});
