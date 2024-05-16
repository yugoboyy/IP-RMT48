import { createSlice } from '@reduxjs/toolkit'
import axios from "axios"

const initialState = {
  list: [],
}


const characterSlice = createSlice({
  name: "character",
  initialState,
  reducers: {
    setFetchCharacters: (state, { payload }) => {
      state.list = payload
    }
  }
})

export const { setFetchCharacters } = characterSlice.actions;

export const fetchCharacters = () => {
  return async (dispatch) => {
    let { data } = await axios({
      method: 'get',
      url: 'https://genshin.jmp.blue/characters'
    })
    dispatch(setFetchCharacters(data))
  }
}

export default characterSlice.reducer