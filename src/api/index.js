import fetch from '@/utils/fetch'

export const personalApproval = data => fetch('get', '/getStaffCode?code=', data);