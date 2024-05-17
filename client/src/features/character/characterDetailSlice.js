import { createSlice } from '@reduxjs/toolkit'
import { genshinApi } from '../../utils/api';

const initialState = {
    list: {},
}

const characterDetailSlice = createSlice({
    name: "characterDetail",
    initialState,
    reducers: {
        setCharacterDetail: (state, { payload }) => {
            state.list = payload
        }
    }
})

export const { setCharacterDetail } = characterDetailSlice.actions;

export const fetchCharacterDetail = (character) => {
    return async (dispatch) => {
        let { data } = await genshinApi({
            method: 'get',
            url: '/characters/' + character
        })
        dispatch(setCharacterDetail(data))
    }
}

export default characterDetailSlice.reducer