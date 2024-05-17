import { createSlice } from '@reduxjs/toolkit'
import { genshinApi } from '../../utils/api'

const initialState = {
  list: [],
  detail: {}
}


const characterSlice = createSlice({
  name: "character",
  initialState,
  reducers: {
    setFetchCharacters: (state, { payload }) => {
      state.list = payload
    },
    setFetchCharacterDetail: (state, { payload }) => {
      state.list = payload
    }
  }
})

export const { setFetchCharacters } = characterSlice.actions;

export const fetchCharacters = () => {
  return async (dispatch) => {
    let { data } = await genshinApi({
      method: 'get',
      url: '/characters'
    })
    dispatch(setFetchCharacters(data))
  }
}

export const { setFetchCharacterDetail } = characterSlice.actions;

export const fetchCharacterDetail = (character) => {
  return async (dispatch) => {
      let { data } = await genshinApi({
          method: 'get',
          url: '/characters/' + character
      })
      dispatch(setFetchCharacterDetail(data))
  }
}

export default characterSlice.reducer