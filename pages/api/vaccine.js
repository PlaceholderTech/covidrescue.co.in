// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import districts from '@/data/districts';

import { query } from '@/lib/mysql-db';

function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export default async (req, res) => {
  const { district_name, pincode, email, filters } = req.body;

  if (districts[district_name] && validateEmail(email)) {
    let userObject = {
      pincode: '',
      district_id: districts[district_name],
      email: email,
      filters: filters
    }

    if ( pincode && pincode.toString().length === 6 ) {
      userObject.pincode = pincode;
    }
   
    try {

      const results = await query(
        `
        INSERT INTO users (email, district_id, pincode, filters)
        VALUES (?, ?, ?, ?)
        `,
        [userObject.email, userObject.district_id, userObject.pincode, JSON.stringify(userObject.filters)]
      )  

      console.log(results)
      
      res.statusCode = 200; 
      res.json({
        "message": "record created"  
      }); 
      
    } catch(e) {
      res.statusCode = 500; 
      res.json({
        "error": e, 
      });
    }
  } else {
    res.statusCode = 500; 
    res.json({
      "error": "something went wrong"
    });
  }
  // const usersData = await fire.firestore().collection('users').get().then((querySnapshot) => {
  //   return querySnapshot.docs.map((doc) => {
  //     return doc.data()
  //   })
  // })

  
};
