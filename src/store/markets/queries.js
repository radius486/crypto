import axios from 'axios';

export async function getMarketList(params) {
  const { data } = await axios.get('https://www.worldcoinindex.com/apiservice/v2getmarkets', { params });

  return data;
}

export async function getUsdMarketList(params) {
  const { data } = await axios.get('https://www.worldcoinindex.com/apiservice/v2getmarkets', { params });

  return data;
}
