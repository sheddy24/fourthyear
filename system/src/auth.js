//for supervisor
export const getToken = () => {
     const stoken=localStorage.getItem('token');
     const susername=localStorage.getItem('username')

     return {stoken,susername};
  };
  
export const getManagerDetails=()=>{
  const token = localStorage.getItem('mtoken');
  const username = localStorage.getItem('musername');
  
  return { token, username };
}

export const getWorkerDetails = () => {
  const wtoken = localStorage.getItem('wtoken');
  return wtoken;
};