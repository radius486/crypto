import * as queries from './queries';

export async function fetchMarkets({ commit }) {
  const queryParams = {

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

export async function fetchUsdMarkets({ commit }) {
  const queryParams = {

  };

  try {
    const { markets } = await queries.getUsdMarketList(queryParams);

    commit('SET_USD_MARKET_LIST', markets);
  } catch (error) {
    // eslint-disable-next-line
    console.error(error);
  }
}
