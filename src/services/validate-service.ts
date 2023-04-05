import apiClient from "./api-client";

const checkValidate = async () => {
  try {
    const res = await apiClient.get('api')
    if (res.status === 200) return res.data.answer === 'yes'
    else return false
  }
  catch {
    return false
  }
}

export default { checkValidate }