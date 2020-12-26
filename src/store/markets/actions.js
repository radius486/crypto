import * as queries from './queries';

export async function fetchMarkets({ commit, rootGetters }) {
  const { key } = rootGetters['users/activeUser'];

  const queryParams = {
    key,
    fiat: 'btc',
  };

  try {
    const { Markets, error } = await queries.getMarketList(queryParams);

    if (error) {
      commit('SET_MARKET_ERROR', error);
    }

    commit('SET_MARKET_LIST', Markets);
  } catch (error) {
    // eslint-disable-next-line
    console.error(error);
  }
}

export async function fetchUsdMarkets({ commit, rootGetters }) {
  const { key } = rootGetters['users/activeUser'];

  const queryParams = {
    key,
    fiat: 'usd',
  };

  try {
    const { Markets, error } = await queries.getUsdMarketList(queryParams);

    if (error) {
      commit('SET_MARKET_ERROR', error);
    }

    commit('SET_USD_MARKET_LIST', Markets);
  } catch (error) {
    // eslint-disable-next-line
    console.error(error);
  }
}
