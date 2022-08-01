export default {
  accounts: process.env.REACT_APP_API_URL + '/accounts',
  api: process.env.REACT_APP_API_URL,
  auth: process.env.REACT_APP_AUTH_URL,
  analytics: process.env.REACT_APP_API_URL + '/analytics',
  billing: process.env.REACT_APP_API_URL + '/billing',
  chat: process.env.REACT_APP_API_URL + '/chats',
  integrations: process.env.REACT_APP_API_URL + '/integrations',
  ml: process.env.REACT_APP_API_URL + '/recommend',
  rtc: process.env.REACT_APP_RTC_URL,
};
