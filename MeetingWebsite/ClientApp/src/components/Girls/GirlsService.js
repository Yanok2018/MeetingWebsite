import axios from "axios";
import {serverUrl} from '../../config';

export default class GirlsService {
    static girls(model) {
        console.log("!111111111111111111111111111111111111111111111111", model);
        return axios.post(`${serverUrl}api/girls/girls`, model)
    };
}