import fetch from 'utils/fetch'

export const personalApproval = data => fetch('get', '/contract/personal_approval', data);