import moment from "moment";
import axios from "axios";
import mailer from "@/lib/mailer";

import { query } from "@/lib/mysql-db";

async function sendNotification({ user, centers }) {
  // let slotDetails = JSON.stringify(centers[0], null, '\t');

  let content = "";
  let districtName = "";
  centers.forEach((center) => {
    content += `<tr> 
            <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">${center.name}</td> 
            <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">${center.address}</td>  
            <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">${center.sessions[0].date}</td> 
            <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">${center.sessions[0].available_capacity}</td> 
            <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">
            <a href="https://selfregistration.cowin.gov.in/" style="background: #059669; padding: 4px; color: #F9FAFB; text-decoration: none; font-family: Arial; border-radius: 5px ">Book Now </a>
            </td> 
        </tr>`;

    districtName = center.district_name;
  });

  const mailBody = ` 
        <br/>
        Slots are available for ${districtName} area. <br/>
        Details are as follows:<br/> 
        <table style="font-family: arial, sans-serif;border-collapse: collapse;width: 100%;">
        <tr>
            <th style="border: 1px solid #dddddd; text-align: left; padding: 8px;">Center Name</th>
            <th style="border: 1px solid #dddddd; text-align: left; padding: 8px;">Address</th>
            <th style="border: 1px solid #dddddd; text-align: left; padding: 8px;">Date</th>
            <th style="border: 1px solid #dddddd; text-align: left; padding: 8px;">Availability</th>
            <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">
                Actions
            </td> 
        </tr>
        ${content}
        </table>

        <br/>
        
        Note: We have removed your email from our list now. You can re-register at <a href="https://covidrescue.co.in/vaccine" style="background: #059669; padding: 4px; color: #F9FAFB; text-decoration: none; font-family: Arial; border-radius: 5px ">covidrescue.co.in/vaccine</a> to get availability email again.
    `;

  mailer.sendEmail(
    user.email,
    "VACCINATION SLOTS AVAILABLE",
    mailBody,
    (err, result) => {
      if (err) {
        console.error({ err });
      }
    }
  );
}

export default async (req, res) => {
  try {
    const usersData = await query(`
            SELECT * FROM users
        `);

    if (usersData.length === 0) {
      res.statusCode = 200;
      res.json({
        message: "no users",
      });
      return;
    }

    // getting district ids from users data
    const districtIds = [];
    usersData.forEach((user) => {
      districtIds.push(user.district_id);
    });

    // filtering unique ids from districts ids
    const uniqueDistrictIds = [...new Set(districtIds)];

    // current date
    const date = moment().format("DD-MM-YYYY");
    const nextWeekStartDate = moment().add(7, "days").format("DD-MM-YYYY");

    const distrcitsCentersData = {};

    for (const index in uniqueDistrictIds) {
      await axios({
        method: "get",
        url: `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=${uniqueDistrictIds[index]}&date=${date}`,
        headers: {
          accept: "application/json",
          "Accept-Language": "hi_IN",
          "User-Agent": "*",
        },
      })
        .then((response) => {
          distrcitsCentersData[uniqueDistrictIds[index]] = {};

          if (response?.data?.centers.length !== 0) {
            response.data.centers.forEach((center) => {
              if (
                !distrcitsCentersData[uniqueDistrictIds[index]][center.pincode]
              ) {
                distrcitsCentersData[uniqueDistrictIds[index]][center.pincode] =
                  {};
                distrcitsCentersData[uniqueDistrictIds[index]][center.pincode][
                  center.center_id
                ] = [];
                distrcitsCentersData[uniqueDistrictIds[index]][center.pincode][
                  center.center_id
                ].push(center);
              } else {
                if (
                  !distrcitsCentersData[uniqueDistrictIds[index]][
                    center.pincode
                  ][center.center_id]
                )
                  distrcitsCentersData[uniqueDistrictIds[index]][
                    center.pincode
                  ][center.center_id] = [];

                distrcitsCentersData[uniqueDistrictIds[index]][center.pincode][
                  center.center_id
                ].push(center);
              }
            });
          }
        })
        .catch((error) => {
          res.statusCode = 200;
          res.json({
            message: error,
          });
          return;
        });

      await axios({
        method: "get",
        url: `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=${uniqueDistrictIds[index]}&date=${nextWeekStartDate}`,
        headers: {
          accept: "application/json",
          "Accept-Language": "hi_IN",
          "User-Agent": "*",
        },
      })
        .then((response) => {
          if (!distrcitsCentersData[uniqueDistrictIds[index]])
            distrcitsCentersData[uniqueDistrictIds[index]] = {};

          if (response?.data?.centers.length !== 0) {
            response.data.centers.forEach((center) => {
              if (
                !distrcitsCentersData[uniqueDistrictIds[index]][center.pincode]
              ) {
                distrcitsCentersData[uniqueDistrictIds[index]][center.pincode] =
                  {};
                distrcitsCentersData[uniqueDistrictIds[index]][center.pincode][
                  center.center_id
                ] = [];
                distrcitsCentersData[uniqueDistrictIds[index]][center.pincode][
                  center.center_id
                ].push(center);
              } else {
                if (
                  !distrcitsCentersData[uniqueDistrictIds[index]][
                    center.pincode
                  ][center.center_id]
                )
                  distrcitsCentersData[uniqueDistrictIds[index]][
                    center.pincode
                  ][center.center_id] = [];

                distrcitsCentersData[uniqueDistrictIds[index]][center.pincode][
                  center.center_id
                ].push(center);
              }
            });
          }
        })
        .catch((error) => {
          res.statusCode = 200;
          res.json({
            message: error,
          });
          return;
        });
    }

    const notifyUsers = [];
    usersData.forEach((user) => {
      const availableCenterSessions = [];
      if (!distrcitsCentersData[user.district_id]) return;

      let filters = {};
      if (user.filters) filters = JSON.parse(user.filters);

      let covidCenters = {};
      if (user.pincode && user.pincode.length === 6)
        covidCenters = distrcitsCentersData[user.district_id][user.pincode];
      else
        Object.keys(distrcitsCentersData[user.district_id]).forEach(
          (pincode) => {
            covidCenters = {
              ...covidCenters,
              ...distrcitsCentersData[user.district_id][pincode],
            };
          }
        );

      let covidCentersIds = [];
      if (covidCenters) {
        covidCentersIds = Object.keys(covidCenters);
      } else {
        return;
      }

      if (covidCenters && covidCentersIds.length !== 0) {
        covidCentersIds.forEach((center_id) => {
          let sessionsAvailable = [];
          let totalAvailableCapacity = 0;
          let currentCenter = {};

          covidCenters[center_id].forEach((center) => {
            currentCenter = center;

            if (center.sessions) {
              center.sessions.forEach((session) => {
                if (session.available_capacity > 0) {
                  let doPush = false;

                  if (filters["18+"]) {
                    if (session.min_age_limit === 18) {
                      doPush = true;
                    }
                  }
                  if (filters["45+"]) {
                    if (session.min_age_limit === 45) {
                      doPush = true;
                    }
                  }

                  if (filters["COVISHIELD"]) {
                    if (session.vaccine === "COVISHIELD") {
                      doPush = true;
                    }
                  }
                  if (filters["COVAXIN"]) {
                    if (session.vaccine === "COVAXIN") {
                      doPush = true;
                    }
                  }

                  if (doPush) {
                    sessionsAvailable.push(session);
                    totalAvailableCapacity += session.available_capacity;
                  }
                }
              });
            }
          });

          if (sessionsAvailable.length !== 0) {
            currentCenter["sessions"] = sessionsAvailable;
            currentCenter["totalAvailableCapacity"] = totalAvailableCapacity;

            availableCenterSessions.push(currentCenter);
          }
        });
      }

      if (availableCenterSessions.length !== 0) {
        const notificationUserData = {
          user: user,
          centers: availableCenterSessions,
        };
        notifyUsers.push(notificationUserData);
      }
    });

    for (const index in notifyUsers) {
      await sendNotification(notifyUsers[index]);
      const results = await query(
        `
                    DELETE FROM users
                    WHERE id = ?
                `,
        notifyUsers[index].user.id
      );
      console.log("user successfully deleted!", results);
    }

    res.statusCode = 200;
    res.json({
      message: "success",
    });
  } catch (e) {
    res.statusCode = 500;
    res.json({
      message: "error",
    });
  }
};
