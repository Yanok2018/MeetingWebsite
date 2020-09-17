import axios from "axios";
import {serverUrl} from '../../config';

export default class BoysService {
    static boys(model) {
        console.log("!111111111111111111111111111111111111111111111111", model);
        return axios.post(`${serverUrl}api/boys/boys`, model)
    };
}