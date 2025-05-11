// ____ ____ ____ ____ ____ ____ ____ 
// ||A |||n |||t |||o |||C |||i |||c ||
// ||__|||__|||__|||__|||__|||__|||__||
// |/__\|/__\|/__\|/__\|/__\|/__\|/__\|

import { firebase } from "../utility/FIREBASE";

export const TodoType = {
  // GET: async (event, firebase)=>{},

  // POST: async (event, firebase)=>{},

  // PUT: async (event, firebase)=>{},

  // PATCH: async (event, firebase)=>{},

  DELETE: async (event) => {
    console.log(['TEST']);
    return await firebase.delete(event);
  },
};