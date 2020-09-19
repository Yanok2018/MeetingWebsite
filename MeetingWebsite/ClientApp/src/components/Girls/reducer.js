import update from '../../helpers/update';
import GirlsService from './GirlsService';


export const GIRLS_STARTED = "GIRLS_STARTED";
export const GIRLS_SUCCESS = "GIRLS_SUCCESS";
export const GIRLS_FAILED = "GIRLS_FAILED";


const initialState = {
    list: {
        getListGirls: [],
        getZodiacs: [],
        getCities: [],
        currentPage: 1,
        totalCount: 0       
    },
    loading: false,
    success: false,
    failed: false 
}

export const getGirlsData = (model) => {
    console.log("SSSSS",model)
    return (dispatch) => {
        dispatch(getListActions.started());
            GirlsService.girls(model)
            .then((response) => {
                console.log("+++++++++++Response", response);
                dispatch(getListActions.success(response.data));               
            }, err=> { throw err; })
            .catch(err=> {
              dispatch(getListActions.failed(err.response));
            });
    }
}

export const getListActions = {
    started: () => {
        return {
            type: GIRLS_STARTED
        }
    },  
    success: (data) => {
    console.log("sucsess+++++++++++Data", data);
        return {
            type: GIRLS_SUCCESS,
            payload: data, 
        }
    },  
    failed: (response) => {
        console.log("failed: (response)", response);
        return {           
            type: GIRLS_FAILED,
            //errors: response.data
        }
    }
  }

export const girlsReducer = (state = initialState, action) => { 
  let newState = state;
  console.log(action.type);
 
  switch (action.type) {
      case GIRLS_STARTED: {
          newState = update.set(state, 'list.loading', true);
          newState = update.set(newState, 'list.success', false);
          newState = update.set(newState, 'list.failed', false);
          break;
      }
      case GIRLS_SUCCESS: {
        console.log("GIRLS_SUCCESS_PAyload)", action.payload);
          newState = update.set(state, 'loading', false);
          newState = update.set(newState, 'failed', false);
          newState = update.set(newState, 'success', true);
          newState = update.set(newState, 'list.getListGirls', action.payload.getListGirls);
          newState = update.set(newState, 'list.getCities', action.payload.getCities);
          newState = update.set(newState, 'list.getZodiacs', action.payload.getZodiacs);
          newState = update.set(newState, 'list.totalCount', action.payload.totalCount);
          newState = update.set(newState, 'list.currentPage', action.payload.currentPage);

          break;
      }
      case GIRLS_FAILED: {
          newState = update.set(state, 'list.loading', false);
          newState = update.set(newState, 'list.success', false);
          newState = update.set(newState, 'list.failed', true);
          break;
      }
      default: {
          return newState;
      }
  }
  return newState;
}