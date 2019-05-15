import {
  ADD_PERFUME,
  GET_ALL_PERFUME,
  GET_MALE_PERFUME,
  GET_FEMALE_PERFUME,
  GET_MALE_PERFUME_FAIL,
  GET_FEMALE_PERFUME_FAIL,
  GET_ALL_PERFUME_FAIL,
  CLEAR_PERFUME_LOADING,
  GET_PERFUME_ITEM,
  GET_PERFUME_ITEM_FAIL,
  GET_SEARCH_ITEM,
  GET_SEARCH_ITEM_FAIL
} from '../actions/types';

const initialState = {
  searchContent: '',
  isLoading: true,
  isAddSuccess: false,
  items: [],
  item: {}
};

export default function(state = initialState, action) {
  const { payload, type } = action;

  switch (type) {
    case ADD_PERFUME:
      return { ...state, isAddSuccess: true };
    case GET_ALL_PERFUME:
    case GET_MALE_PERFUME:
    case GET_FEMALE_PERFUME:
      return {
        ...state,
        isLoading: false,
        items: payload.perfumes
      };
    case GET_SEARCH_ITEM:
      console.log('result', payload);
      return {
        ...state,
        isLoading: false,
        items: payload.results
      };
    case GET_ALL_PERFUME_FAIL:
    case GET_MALE_PERFUME_FAIL:
    case GET_FEMALE_PERFUME_FAIL:
    case GET_PERFUME_ITEM_FAIL:
    case GET_SEARCH_ITEM_FAIL:
      return { ...state, isLoading: false, items: [], item: {} };
    case CLEAR_PERFUME_LOADING:
      return { ...state, isLoading: true };
    case GET_PERFUME_ITEM:
      return { ...state, isLoading: false, item: payload.perfume };
    default:
      return state;
  }
}
