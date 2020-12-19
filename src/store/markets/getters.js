export const marketList = state => state.marketList;

const market = [
  { Label: '$AAPL/BTC', Name: '$aapl', Price: 0.00032184, Volume_24h: 0.00000000, Timestamp: 1603273440 },
  { Label: 'YEET/BTC', Name: '$yeet', Price: 0.00078805, Volume_24h: 0.00000000, Timestamp: 1604353440 },
  { Label: '007/BTC', Name: '007coin', Price: 0.00003637, Volume_24h: 0.00000000, Timestamp: 1603802520 },
  { Label: 'ZOC/BTC', Name: '01coin', Price: 0.00000024, Volume_24h: 0.60164324, Timestamp: 1607776080 },
  { Label: 'ZCH/BTC', Name: '0cash', Price: 0.00000003, Volume_24h: 0.00090499, Timestamp: 1607776080 },
  { Label: 'ZCN/BTC', Name: '0chain', Price: 0.00001676, Volume_24h: 15.64889979, Timestamp: 1607776080 },
  { Label: 'ZRX/BTC', Name: '0x', Price: 0.00002098, Volume_24h: 1044.84389557, Timestamp: 1607776080 },
  { Label: '0XBTC/BTC', Name: '0xbitcoin', Price: 100, Volume_24h: 0.00000000, Timestamp: 1594143600 },
  { Label: 'ZXC/BTC', Name: '0xcert', Price: 0.00000012, Volume_24h: 0.39683969, Timestamp: 1607776080 },
  { Label: 'TSHP/BTC', Name: '12ships', Price: 0.00000018, Volume_24h: 142.15341960, Timestamp: 1607776080 },
  { Label: '1AI/BTC', Name: '1aitoken', Price: 0.00000001, Volume_24h: 0.00000000, Timestamp: 1604790180 },
  { Label: 'FST/BTC', Name: '1irstcoin', Price: 0.00004284, Volume_24h: 2.01871817, Timestamp: 1607776080 },
  { Label: '1SG/BTC', Name: '1sg', Price: 0.00000997, Volume_24h: 0.00000000, Timestamp: 1594971960 },
  { Label: '1WO/BTC', Name: '1world', Price: 0.00000434, Volume_24h: 0.52758178, Timestamp: 1607776080 },
  { Label: '1X2/BTC', Name: '1x2coin', Price: 0.00000353, Volume_24h: 0.00000000, Timestamp: 1576457040 },
  { Label: '2BACCO/BTC', Name: '2bacco', Price: 0.00000001, Volume_24h: 0.00000000, Timestamp: 1602409440 },
  { Label: '2KEY/BTC', Name: '2keynetwork', Price: 0.00000093, Volume_24h: 11.93537347, Timestamp: 1607776080 },
  { Label: '2X2/BTC', Name: '2x2', Price: 0.00000002, Volume_24h: 0.00180445, Timestamp: 1607776080 },
  { Label: '300/BTC', Name: '300token', Price: 0.05503372, Volume_24h: 0.00000000, Timestamp: 1547246940 },
  { Label: '3DC/BTC', Name: '3dcoin', Price: 0.00000028, Volume_24h: 0.00000000, Timestamp: 1589355840 },
  { Label: '404/BTC', Name: '404coin', Price: 0.00000032, Volume_24h: 0.00489172, Timestamp: 1607776080 },
  { Label: '42/BTC', Name: '42Coin', Price: 2.85000000, Volume_24h: 0.00000000, Timestamp: 1597098000 },
  { Label: '4ART/BTC', Name: '4art-coin', Price: 0.00000071, Volume_24h: 0.06034359, Timestamp: 1607776080 },
  { Label: 'HIPHOP/BTC', Name: '4hiphop', Price: 0.00000001, Volume_24h: 0.00000000, Timestamp: 1567901880 },
  { Label: 'KWATT/BTC', Name: '4new', Price: 0.00000001, Volume_24h: 0.00000000, Timestamp: 1607758860 },
  { Label: '7E/BTC', Name: '7eleven', Price: 0.00000001, Volume_24h: 0.00000000, Timestamp: 1606756440 },
  { Label: 'SVN/BTC', Name: '7finance', Price: 0.00003858, Volume_24h: 0.00000000, Timestamp: 1607015340 },
  { Label: 'MPH/BTC', Name: '88mph', Price: 0.00198699, Volume_24h: 51.91921620, Timestamp: 1607776080 },
  { Label: '8BIT/BTC', Name: '8bit', Price: 0.00000299, Volume_24h: 0.00000000, Timestamp: 1547448780 },
  { Label: 'NMN/BTC', Name: '99masternodes', Price: 0.00000010, Volume_24h: 0.00005000, Timestamp: 1607776080 },
  { Label: 'AAVE/BTC', Name: 'Aave', Price: 0.00430396, Volume_24h: 5433.56834127, Timestamp: 1607776080 },
];

export const mainMarket = () => market;
// export const mainMarket = (state, getters) => getters.marketList && getters.marketList[0];

export const error = state => state.error;
