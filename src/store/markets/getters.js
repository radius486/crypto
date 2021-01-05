export const marketList = state => state.marketList;

export const usdMarketList = state => state.usdMarketList;

// export const mainMarket = () => market;
export const mainMarket = (state, getters) => getters.marketList && getters.marketList[0];

// export const mainUsdMarket = () => usdMarket;
export const mainUsdMarket = (state, getters) => getters.usdMarketList
 && getters.usdMarketList[0];

export const error = state => state.error;
