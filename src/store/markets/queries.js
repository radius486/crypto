import axios from 'axios';

const key = '';

export async function getMarketList(params) {
  // const { data } = await api.get(COMMAND_TYPE, { params });
  const { data } = await axios.get(`https://www.worldcoinindex.com/apiservice/v2getmarkets?key=${key}&fiat=btc`);
  console.log(params);
  return data;
}

export async function getUsdMarketList(params) {
  // const { data } = await api.get(COMMAND_TYPE, { params });
  console.log(params);
  // return data;
}
