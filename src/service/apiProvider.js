import API from './axiosConfig';

export default {
   getRandomCode: async () => { 
      return API('/get-random-code', {
         method: 'GET',
         head: {
            'Content-Type': 'application/json',
         },
      }).catch(err => console.log('error', err));
   },
   postCodeScreen1: async (params) => {
      return API(`/post-screen-1`, {
         method: 'POST',
         head: {
            'Content-Type': 'application/json',
         },
         body:{
            ...params
         }
      }).catch(err => console.log('error', err))
   },
   postCodeScreen2: async (params) => {
      console.log('params', params);
      return API(`/post-screen-2`, {
         method: 'POST',
         head: {
            "Content-Type": "multipart/form-data",
         },
         body: {
            ...params
         }
      }).catch(err => console.log(JSON.parse(JSON.stringify(err)), 'error'))
   },
}