import * as validations from './validations';
import * as request from './request';

const delay = (time) => new Promise((res) => setTimeout(res, time));

export { delay, request, validations };
