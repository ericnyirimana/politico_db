import officeslist from '../models/offices';

const offices = ((typeof (officeslist) !== 'object') ? [] : officeslist);

export default offices;