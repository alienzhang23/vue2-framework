import fetch from '@/utils/fetch'

export const personalApproval = data => fetch('get', '/jlxt-base/getStaffCode?code=', data);