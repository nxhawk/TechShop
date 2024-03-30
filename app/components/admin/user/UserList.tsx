import { listUsers } from '@/models/user';
import React from 'react'
import UserSearchBar from './UserSearchBar';
import UserPagination from './UserPagination';

interface Props {
  totalUsers: number;
  perPage: number;
  page: number;
}

const UserList = async (props: Props) => {
  const usersList = await listUsers(props.page, props.perPage);
  return (
    <>
      <div className='flex flex-col min-w-full justify-between mb-16'>
        <div className='flex items-center justify-between'>
          <div>
            <div className='flex items-center gap-x-3'>
              <h2 className='text-lg font-medium text-gray-800 dark:text-white'>
                  Quản lý tài khoản
              </h2>
              <span className='px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-blue-400'>
                  {props.totalUsers} tài khoản
              </span>
            </div>
          </div>
        </div>

        <UserSearchBar/>

        <UserPagination usersList={usersList}/>

        
      </div>
    </>
  )
}

export default UserList