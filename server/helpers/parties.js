import partieslist from '../models/parties';

const parties = ((typeof (partieslist) !== 'object') ? [] : partieslist);

export default parties;