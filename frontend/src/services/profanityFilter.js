import filter from 'leo-profanity';

const setupProfanityFilter = () => {
  filter.clearList();
  const enDict = new Set(filter.getDictionary('en'));
  const ruDict = new Set(filter.getDictionary('ru'));
  const combinedDict = [...enDict, ...ruDict];
  filter.add(combinedDict);
  return filter;
};

export default setupProfanityFilter;