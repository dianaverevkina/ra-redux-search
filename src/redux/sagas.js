import { changSearchField, searchFailure, searchRequest, searchSuccess } from "./slice"
import { take, put, spawn, takeLatest, call, retry} from 'redux-saga/effects';
import searchSlice from './slice'

async function searchItems(search) {
  const params = new URLSearchParams({q: search});
  console.log(params)
  const response = await fetch(`http://localhost:7070/api/search?${params}`);
  if (!response.ok) {
    throw new Error(response.statusText)
  }

  return await response.json();
}
function* handleSearchItemsSaga(action) {
  try {
    const retryCount = 3;
    const retryDelay = 1 * 1000;
    const data = yield retry(retryCount, retryDelay, searchItems, action.payload);
    yield put(searchSuccess(data));
  } catch (error) {
    yield put(searchFailure(error.message))
  }
}

function* watchChangeSearchSaga() {
  while(true) {
    const action = yield take('search/changSearchField');
    yield put(searchRequest(action.payload))
  }
}

function* watchSearchRequestSaga() {
  while(true) {
    yield take('search/searchRequest');
    yield takeLatest( 'search/searchRequest', handleSearchItemsSaga)
  }
}

export default function* saga() {
  yield spawn(watchChangeSearchSaga)
  yield spawn(watchSearchRequestSaga)
}