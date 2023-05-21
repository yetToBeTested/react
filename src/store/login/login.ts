import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { loginApi } from '@/api/login/login'
import { getUserMenus } from '@/api/main/main'
import { LOGIN_TOKEN } from '@/global/constants'
import { localCache } from '@/utils/cache'

export const loginStore = createAsyncThunk(
  'login',
  async (payload: any, { dispatch }) => {
    const res = await loginApi(payload)

    if (res.data.status) {
      // message.success('Click on Yes')
      dispatch(afterLogin(res.data))
      // menuStore(res.data.roleId)
    }
    return res
  }
)

export const menuStore = createAsyncThunk(
  'menu',
  async (payload: any, { dispatch }) => {
    const res = await getUserMenus(payload)

    if (res.code === 200) {
      dispatch(menuList(res.data))
    }
    return res
  }
)

export const loginSlice = createSlice({
  name: 'login',
  initialState: {
    token: '',
    userInfo: {
      avatar: '',
      username: '',
      roleName: '',
      roleId: undefined,
      status: false
    },
    menuList: undefined,
    userMenu: undefined,
    roles: undefined
  },
  reducers: {
    afterLogin: (state, { payload }) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes

      state.token = payload.token
      state.userInfo.avatar = payload.avatar
      state.userInfo.roleName = payload.roleName
      state.userInfo.status = payload.status
      state.userInfo.username = payload.username
      state.userInfo.roleId = payload.roleId

      localCache.setCache(LOGIN_TOKEN, payload.token)
    },
    menuList: (state, { payload }) => {
      console.log(payload, 'menuList')
    }
  }
})

// Action creators are generated for each case reducer function
export const { afterLogin, menuList } = loginSlice.actions

export default loginSlice.reducer
