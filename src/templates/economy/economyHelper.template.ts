import type { RenderContext } from '../../generator/types';

export function economyHelperTemplate(ctx: RenderContext): string {
  return `const fs = require('fs');
const path = require('path');

const DATA_PATH = path.join(__dirname, '..', 'data', 'economy.json');
const STARTING_BALANCE = ${ctx.economyConfig.startingBalance};
const CURRENCY = '${ctx.economyConfig.currencySymbol}';

function loadData() {
  try {
    if (!fs.existsSync(DATA_PATH)) {
      fs.mkdirSync(path.dirname(DATA_PATH), { recursive: true });
      fs.writeFileSync(DATA_PATH, '{}');
    }
    return JSON.parse(fs.readFileSync(DATA_PATH, 'utf8'));
  } catch {
    return {};
  }
}

function saveData(data) {
  fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2));
}

function getUser(userId) {
  const data = loadData();
  if (!data[userId]) {
    data[userId] = { balance: STARTING_BALANCE, lastDaily: 0, lastWork: 0 };
    saveData(data);
  }
  return data[userId];
}

function setBalance(userId, amount) {
  const data = loadData();
  if (!data[userId]) data[userId] = { balance: STARTING_BALANCE, lastDaily: 0, lastWork: 0 };
  data[userId].balance = Math.max(0, Math.floor(amount));
  saveData(data);
  return data[userId].balance;
}

function addBalance(userId, amount) {
  const user = getUser(userId);
  return setBalance(userId, user.balance + amount);
}

function setTimestamp(userId, field) {
  const data = loadData();
  if (!data[userId]) data[userId] = { balance: STARTING_BALANCE, lastDaily: 0, lastWork: 0 };
  data[userId][field] = Date.now();
  saveData(data);
}

function getAllUsers() {
  return loadData();
}

module.exports = { getUser, setBalance, addBalance, setTimestamp, getAllUsers, STARTING_BALANCE, CURRENCY };
`;
}
