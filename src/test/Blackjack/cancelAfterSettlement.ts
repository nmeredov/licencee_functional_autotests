import * as variable from '../../RBOW_UAT_API3_Games/BlackJack/_variables';
import * as body from '../../RBOW_UAT_API3_Games/BlackJack/cancelAfterSettlementBody';
import * as head from '../../util/globalVariables';
import { GetBalance } from '../../API3Methods/getBalance';
import { Withdrawal } from '../../API3Methods/withdrawal';
import { PreliminarySettlement } from '../../API3Methods/preliminarySettlement'
import { FinalSettlement } from '../../API3Methods/finalSettlement';

describe("Get balance", () => {
  let testResponse: any;
  let currentBalance: number;
  let data: any;

  beforeAll(async () => {
    testResponse = await GetBalance(body.getBalanceBody, head.headers);
    data = testResponse.data;
    currentBalance = data.balances[0].amount;
    console.log('Balance:', currentBalance);
    console.log('get_balance_request', body.getBalanceBody);
  });

  afterAll(() => {
    console.log('get_balance_response', data);
  });

  test('Current balance matches the response', () => {
    //impossible to display amount inside 'it' since currentBalance in field 'it' is undefined.
    expect(currentBalance);
  });

  test('Assert status code is 200', () => {
    expect(testResponse.status).toEqual(200);
  });

  test('Assert no error in response', () => {
    expect(testResponse.text).not.toEqual('error');
  });
});

describe("Get balance for table - Checks balance for table and if response status is successful balance", () => {
  let testResponse: any;
  let currentBalance: number;
  let data: any;

  beforeAll(async () => {
    testResponse = await GetBalance(body.getBalanceForTableBody, head.headers);
    data = testResponse.data;
    currentBalance = data.balances[0].amount;
    console.log('Balance:', currentBalance);
    console.log('get_balance_for_table_request', body.getBalanceForTableBody);
  });

  afterAll(() => {
    console.log('get_balance_for_table_response', data);
  });

  test('Current balance for table matches the response', () => {
    //impossible to display amount inside 'it' since currentBalance in field 'it' is undefined.
    expect(currentBalance);
  });

  test('Assert status code is 200', () => {
    expect(testResponse.status).toEqual(200);
  });

  test('Assert no error in response', () => {
    expect(testResponse.text).not.toEqual('error');
  });
});

describe("Withdrawal - Checks withdrawal and no error in response", () => {
  let testResponse: any;
  let currentBalance: number;
  let previousBalance: number;
  let expectedBalance: number;
  let data: any;

  beforeAll(async () => {
    testResponse = await Withdrawal(body.withdrawalBody, head.headers);
    data = testResponse.data;
    currentBalance = data.balances[0].amount;
    previousBalance = currentBalance + variable.bet;
    expectedBalance = previousBalance - variable.bet;
    console.log('Previous balance:', previousBalance);
    console.log('Bet is:', variable.bet);
    console.log('Current balance:', currentBalance);
    console.log('Expected balance:', expectedBalance);
    console.log('Withdrawal request', body.withdrawalBody);
  });

  afterAll(() => {
    console.log('Withdrawal response', data);
  });

  test('Assert no error in response', () => {
    expect(testResponse.text).not.toEqual('error');
  });

  test('Current balance is equal to Expected balance', () => {
    expect(currentBalance).toEqual(expectedBalance);
  });
});
describe("Withdrawal2 - Checks withdrawal and no error in response", () => {
  let testResponse: any;
  let currentBalance: number;
  let previousBalance: number;
  let expectedBalance: number;
  let data: any;

  beforeAll(async () => {
    testResponse = await Withdrawal(body.withdrawalBody2, head.headers);
    data = testResponse.data;
    currentBalance = data.balances[0].amount;
    previousBalance = currentBalance + variable.bet;
    expectedBalance = previousBalance - variable.bet;
    console.log('Previous balance:', previousBalance);
    console.log('Bet is:', variable.bet);
    console.log('Current balance:', currentBalance);
    console.log('Expected balance:', expectedBalance);
    console.log('Withdrawal request2', body.withdrawalBody2);
  });

  afterAll(() => {
    console.log('Withdrawal response2', data);
  });

  test('Assert no error in response', () => {
    expect(testResponse.text).not.toEqual('error');
  });

  test('Current balance is equal to Expected balance', () => {
    expect(currentBalance).toEqual(expectedBalance);
  });
});
describe("Preliminary Settlement - bet 1", async () => {
  let testResponse: any;
  let data: any;

  beforeAll(async () => {
    testResponse = await PreliminarySettlement(body.preliminarySettlementBody, head.headers);
    data = testResponse.data;
    console.log('preliminary_settlement_request', body.preliminarySettlementBody);
    console.log('Payout is:', variable.payoff1);
  });

  afterAll(() => {
    console.log('preliminary_response', data);
  });

  test('Assert status code is 202', () => {
    expect(testResponse.status).toEqual(202);

  });
});

describe("Final Settlement - cancel bet 2", async () => {
  let testResponse: any;
  let data: any;

  beforeAll(async () => {
    testResponse = await FinalSettlement(body.finalSettlementBody, head.headers);
    data = testResponse.data;
    console.log('Resolution is: GameFinished');
    console.log('Payout is:', variable.payoff1);
    console.log('final_settlement_request', body.finalSettlementBody);
  });

  afterAll(() => {
    console.log('final_settlement_response', data);
  });

  test('Assert status code is 202', () => {
    expect(testResponse.status).toEqual(202);
  });
});


describe("Get balance after game is done", () => {
  let testResponse: any;
  let currentBalance: number;
  let initialBalance: number;
  let expectedBalance: number;
  let data: any;

  beforeAll(async () => {
    testResponse = await GetBalance(body.getBalanceBody, head.headers);
    data = await testResponse.data;
    currentBalance = data.balances[0].amount;
    initialBalance = currentBalance - variable.payoff + variable.bet;
    expectedBalance = initialBalance - variable.bet + variable.payoff;
    console.log('Initial balance:', initialBalance);
    console.log('Current balance:', currentBalance);
    console.log('Expected balance:', expectedBalance);
    console.log('get_balance_request', body.getBalanceBody);
  });

  

  test('Current balance matches the response', () => {
    expect(currentBalance).toEqual(expectedBalance);
  });

  test('Assert status code is 200', () => {
    expect(testResponse.status).toEqual(200);
  });

  test('Assert no error in response', () => {
    expect(testResponse.text).not.toEqual('error');
  });
  afterAll(() => {
    console.log('get_balance_response', data);
  });
});