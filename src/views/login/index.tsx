import React, { memo, useEffect, useState } from 'react'
import type { FC, ReactNode } from 'react'
import { Button, Form, Input, message } from 'antd'
import { Navigate, useNavigate } from 'react-router-dom'
import { getCode } from '@/api/login/login'
import { loginStore, menuStore } from '@/store/login/login'
import store, { useAppDispatch } from '@/store'

import './index.css'
import { addRoutes } from '@/router'
import Index from '../main/index'

// import { Title, Wrapper, Button, Link, StyledLink } from './style'

interface Iprops {
  children?: ReactNode
}

const login: FC<Iprops> = () => {
  const [imgData, setImgData] = useState({ url: '', uuid: '' })
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const getValidCode = () => {
    getCode().then((res) => {
      setImgData({ ...imgData, url: res.data.image, uuid: res.data.uuid })
    })
  }

  useEffect(() => {
    getValidCode()
  }, [])

  const onFinish = async (values: any) => {
    await dispatch(loginStore({ ...values, uuid: imgData.uuid }))

    const temp = store.getState().login
    if (temp.userInfo.status) {
      message.success('登录成功')
      await dispatch(menuStore(temp.userInfo.roleId))
      navigate('/main')
      addRoutes([
        {
          path: '/main',
          element: <Navigate to="/main/index7" />
        },
        { path: '/main/index7', element: <Index /> }
      ])
    } else {
      message.error('登录失败')
      getValidCode()
    }
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <div className="login">
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="verifyCode"
          label="verifyCode"
          rules={[{ required: true, message: 'Please input your verifyCode!' }]}
        >
          <div style={{ display: 'flex' }}>
            <Input type="text" placeholder="验证码" />
            <img src={imgData.url} alt="验证码" onClick={getValidCode} />
          </div>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
export default memo(login)
