import ComingSoon from "@/components/ComingSoon";
import axios from "axios";
import { ca, da } from "date-fns/locale";
import moment from "moment";
import React, { useEffect, useState } from "react";

const Loader = () => {
  return (
    <div
      className="relative"
      style={{
        zIndex: 100,
      }}
    >
      <div className="absolute inset-0">
        <main className="antialiased bg-grapy-200 text-gray-900 font-sans overflow-x-hidden">
          <div className="relative px-4 min-h-screen md:flex md:items-center md:justify-center">
            <div className="bg-black opacity-25 w-full h-full absolute z-100 inset-0"></div>
            <div className="w-500 rounded-lg md:max-w-md md:mx-auto p-4 fixed inset-x-0 bottom-0 z-50 mb-4 mx-4 md:relative">
              <svg
                class="animate-spin h-20 w-20 mr-3"
                viewBox="0 0 100 100"
                enable-background="new 0 0 0 0"
              >
                <path
                  fill="#fff"
                  d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50"
                ></path>
              </svg>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

const Checkbox = ({ type = "checkbox", name, checked = false, onChange }) => {
  console.log("Checkbox: ", name, checked);

  return (
    <input
      className="ml-2 form-checkbox h-5 w-5 text-blue-600"
      type={type}
      name={name}
      checked={checked}
      onChange={onChange}
    />
  );
};

const NotfiyModal = ({ onClose, onSubmit, checkedItems, setCheckedItems }) => {
  // const [checkedItems, setCheckedItems] = useState({});

  const handleChange = (event) => {
    setCheckedItems({
      ...checkedItems,
      [event.target.name]: event.target.checked,
    });
    console.log("checkedItems: ", checkedItems);
  };

  const checkboxes = [
    {
      name: "18+",
      key: "18+",
      label: "18+",
    },
    {
      name: "45+",
      key: "45+",
      label: "45+",
    },
    {
      name: "COVISHIELD",
      key: "COVISHIELD",
      label: "COVISHIELD",
    },
    {
      name: "COVAXIN",
      key: "COVAXIN",
      label: "COVAXIN",
    },
  ];

  const [email, setEmail] = useState("");

  const handleInputChange = (e) => {
    const { value } = e.target;

    setEmail(value);
  };

  const handleSubmit = (e) => {
    onSubmit(email);
  };
  return (
    <main className="antialiased bg-grapy-200 text-gray-900 font-sans overflow-x-hidden">
      <div className="relative px-4 min-h-screen md:flex md:items-center md:justify-center">
        <div className="bg-black opacity-25 w-full h-full absolute z-10 inset-0"></div>
        <div className="bg-white w-500 rounded-lg md:max-w-md md:mx-auto p-4 fixed inset-x-0 bottom-0 z-50 mb-4 mx-4 md:relative">
          <h3 className="text-xl">
            Please enter your email to get notification whenever a slot
            available.
          </h3>
          <p className="text-xs">
            {" "}
            Note: We will not spam your email. We do not store you're email
            after sending the notification. You will get an email after a slot
            is available. After that we will remove your email from our
            database. If you want to get notified again, repeat the process.
          </p>
          <p className="font-semibold my-2">
            Select Criteria (Default: 18+ and 45+ both)
          </p>
          <div className="min-w-0 flex flex-row space-x-4">
            {checkboxes.map((item) => (
              <label key={item.key}>
                {item.name}
                <Checkbox
                  name={item.name}
                  checked={checkedItems[item.name]}
                  onChange={handleChange}
                />
              </label>
            ))}
          </div>
          <div className="min-w-0 mt-5 flex-1">
            <label for="cta_email" className="sr-only">
              Email Id
            </label>
            <input
              value={email}
              onChange={handleInputChange}
              autoFocus="true"
              id="cta_email"
              type="text"
              min="6"
              max="6"
              className="block w-full border border-transparent rounded-md px-5 py-3 text-base text-gray-900 placeholder-gray-500 shadow-sm focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600"
              placeholder="Enter email address"
            />
          </div>

          <div className="text-center md:text-right mt-4 md:flex md:justify-end">
            <button
              onClick={handleSubmit}
              className="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-green-200 text-green-700 rounded-lg font-semibold text-sm md:ml-2 md:order-2"
            >
              Submit
            </button>
            <button
              onClick={onClose}
              className="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-gray-200 rounded-lg font-semibold text-sm mt-4
              md:mt-0 md:order-1"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

const CriteriaComponent = ({ criteria, setCrieteria }) => {
  return (
    <>
      <div className="flex flex-row">
        <label className="inline-flex items-center mt-3">
          <input
            type="radio"
            className="w-5 h-5 text-yellow-600 form-radio"
            name="role"
            value="pincode"
            onChange={() => setCrieteria("pincode")}
            checked={criteria === "pincode"}
          />
          <span className="ml-2 text-gray-50">Search by Pincode</span>
        </label>

        <label className="mx-8 inline-flex items-center mt-3">
          <input
            type="radio"
            className="w-5 h-5 text-green-600 form-radio"
            name="role"
            value="district"
            onChange={() => setCrieteria("district")}
            checked={criteria === "district"}
          />
          <span className="ml-2 text-gray-50">Search by District</span>
        </label>
      </div>
    </>
  );
};

const DropDown = ({
  selectedValue,
  options,
  setSelectedValue,
  disabled = false,
  placeholder = "Select...",
}) => {
  console.log(selectedValue, options, setSelectedValue);
  return (
    <>
      <select
        disabled={disabled}
        value={selectedValue}
        onChange={setSelectedValue}
        class="block w-52 text-gray-700 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
      >
        <option value="">{placeholder}</option>
        {options &&
          options?.map((option) => {
            return <option value={option.id}>{option.name}</option>;
          })}
      </select>
    </>
  );
};

export default function vaccine() {
  const [checkedItems, setCheckedItems] = useState({});

  const [checkingAvailability, setCheckingAvailability] = useState(false);
  const [disableCheckAvailabilityBtn, setDisableCheckAvailabilityBtn] =
    useState(true);

  const [criteria, setCrieteria] = useState("pincode");

  const [isInitLoad, setInitLoad] = useState(true);

  const [pinCode, setPinCode] = useState("");

  const [covidCenters, setCovidCenters] = useState([]);

  const [weekDates, setWeekDates] = useState([]);

  const [loading, setLoading] = useState(false);

  const [openNotifyPopup, setOpenNotifyPopup] = useState(false);
  const [selectedNotfiyCenter, setSelectedNotifyCenter] = useState(false);

  const [selectedStateId, setSelectedStateId] = useState(null);
  const [states, setStates] = useState([]);

  const [selectedDistrictId, setSelectedDistrictId] = useState(null);
  const [districts, setDistricts] = useState([]);

  const [memorizedDistricts, setMemorizedDistricts] = useState({});

  useEffect(() => {
    const date = moment();
    let weekDates = [];
    weekDates.push(date.format("DD-MM-YYYY"));
    weekDates.push(date.add(1, "days").format("DD-MM-YYYY"));
    weekDates.push(date.add(1, "days").format("DD-MM-YYYY"));
    weekDates.push(date.add(1, "days").format("DD-MM-YYYY"));
    weekDates.push(date.add(1, "days").format("DD-MM-YYYY"));
    weekDates.push(date.add(1, "days").format("DD-MM-YYYY"));
    weekDates.push(date.add(1, "days").format("DD-MM-YYYY"));

    setWeekDates(weekDates);

    // setOpenNotifyPopup(true);
  }, []);

  const checkAvailability = async (e) => {
    setInitLoad(false);
    setCheckingAvailability(true);
    e.preventDefault();

    const date = moment().format("DD-MM-YYYY");
    let response;
    if (criteria === "district") {
      response = await fetch(
        `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=${selectedDistrictId}&date=${date}`
      ).catch((e) => {
        setCheckingAvailability(false);
        setCovidCenters([]);
      });
    } else {
      response = await fetch(
        `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin?pincode=${pinCode}&date=${date}`
      ).catch((e) => {
        setCheckingAvailability(false);
        setCovidCenters([]);
      });
    }

    if (response.ok) {
      response = await response.json();
      setCheckingAvailability(false);
      setCovidCenters(response?.centers);
    } else {
      setCheckingAvailability(false);
      setCovidCenters([]);
    }
  };

  const handleNotifyClick = () => {
    setSelectedNotifyCenter();
    setOpenNotifyPopup(true);
  };

  const handleInputChange = (e) => {
    setPinCode(e.target.value);
    if (e.target.value && e.target.value.length != 0)
      setDisableCheckAvailabilityBtn(false);
    else setDisableCheckAvailabilityBtn(true);
  };

  const ValidateEmail = (email) => {
    if (
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        email
      )
    ) {
      return true;
    }
    alert("You have entered an invalid email address!");
    return false;
  };

  const handleEmailSubmit = async (email) => {
    setLoading(true);
    if (ValidateEmail(email)) {
      let requestObject  = {
        district_name: covidCenters[0].district_name, 
        email: email,
        filters: checkedItems, 
      }
      if (criteria !== "district" ) { 
        requestObject.pincode = pinCode;
      }
      await axios
        .post("/api/vaccine", requestObject)
        .then((response) => {
          if (response.status === 200) {
            alert("success");
          } else {
            alert("error", response);
          }
          setOpenNotifyPopup(false);
          setLoading(false);
        })
        .catch((e) => {
          setLoading(false);
          alert("something went wrong");
          setOpenNotifyPopup(false);
        });
    } else {
      setLoading(false);
    }
    // setOpenNotifyPopup(false);
    console.log(checkedItems);

    // console.log(e)
  };

  const getStates = async () => {
    let response = await fetch(
      `https://cdn-api.co-vin.in/api/v2/admin/location/states`
    ).catch((e) => {});
    if (response.ok) {
      response = await response.json();
      return response["states"];
    } else {
      return null;
    }
  };

  const handleChangeCrieteria = async (e) => {
    if (e === "district") {
      setLoading(true);

      if (states?.length === 0) {
        const statesData = await getStates();
        if (statesData) {
          const preparedStatesData = [];
          statesData.forEach((state) => {
            const stateObject = {
              id: state.state_id,
              name: state.state_name,
            };
            preparedStatesData.push(stateObject);
          });

          setStates(preparedStatesData);
        }
      }
      setLoading(false);
    }

    setCrieteria(e);
  };

  const getDistrictsByStateId = async (stateId) => {
    let response = await fetch(
      `https://cdn-api.co-vin.in/api/v2/admin/location/districts/${stateId}`
    ).catch((e) => {});
    if (response.ok) {
      response = await response.json();
      const preparedDistrictsData = [];
      response["districts"].forEach((district) => {
        const districtObject = {
          id: district.district_id,
          name: district.district_name,
        };
        preparedDistrictsData.push(districtObject);
      });
      return preparedDistrictsData;
    } else {
      return null;
    }
  };

  const handleStateChange = async (e) => {
    setLoading(true);
    const selectedState = e.target.value;
    if (memorizedDistricts && memorizedDistricts[selectedState]) {
      const districts = memorizedDistricts[selectedState];
      setDistricts(districts);
    } else {
      const districts = await getDistrictsByStateId(selectedState);
      setDistricts(districts);
    }

    setSelectedStateId(selectedState);
    setSelectedDistrictId(null);
    setLoading(false);
  };

  const handleDistrictChange = (e) => {
    setSelectedDistrictId(e.target.value);
  };

  return (
    <div>
      {loading ? <Loader /> : null}
      {openNotifyPopup ? (
        <div className="relative">
          <div className="absolute inset-0">
            <NotfiyModal
              center={selectedNotfiyCenter}
              onClose={() => setOpenNotifyPopup(false)}
              checkedItems={checkedItems}
              setCheckedItems={setCheckedItems}
              onSubmit={handleEmailSubmit}
            />
          </div>
        </div>
      ) : null}
      <div className="bg-white">
        <div className="relative">
          <div className="mx-auto">
            <div className="relative px-6 py-10 bg-gray-600 shadow-xl sm:px-5 sm:py-10">
              <div className="relative">
                <div className="sm:text-center">
                  <h2 className="text-2xl font-extrabold text-white tracking-tight sm:text-4xl">
                    Vaccine availability
                  </h2>
                </div>
                <div className="mt-12 sm:mx-auto sm:max-w-lg sm:flex justify-center">
                  <CriteriaComponent
                    criteria={criteria}
                    setCrieteria={handleChangeCrieteria}
                  />
                </div>

                {criteria === "pincode" ? (
                  <div className="mt-12 sm:mx-auto sm:max-w-lg sm:flex">
                    <div className="min-w-0 flex-1">
                      <label for="cta_email" className="sr-only">
                        Pin Code
                      </label>
                      <input
                        onChange={handleInputChange}
                        value={pinCode}
                        id="cta_email"
                        type="text"
                        min="6"
                        max="6"
                        className="block w-full border border-transparent rounded-md px-5 py-3 text-base text-gray-900 placeholder-gray-500 shadow-sm focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600"
                        placeholder="Enter pincode"
                      />
                    </div>
                    <div className="mt-4 sm:mt-0 sm:ml-3">
                      <button
                        disabled={
                          checkingAvailability || disableCheckAvailabilityBtn
                        }
                        onClick={checkAvailability}
                        className="block w-full rounded-md border border-transparent px-5 py-3 bg-indigo-500 text-base font-medium text-white shadow hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600 sm:px-10"
                      >
                        {checkingAvailability
                          ? "Please wait..."
                          : "Check availability"}
                      </button>
                    </div>
                  </div>
                ) : null}
                {criteria === "district" ? (
                  <div className="flex space-x-4 flex-row justify-center mt-12">
                    <DropDown
                      selectedValue={selectedStateId}
                      placeholder="Select State"
                      options={states}
                      setSelectedValue={handleStateChange}
                    />

                    <DropDown
                      selectedValue={selectedDistrictId}
                      placeholder="Select District"
                      disabled={selectedStateId !== null ? false : true}
                      options={districts}
                      setSelectedValue={handleDistrictChange}
                    />

                    <div className="mt-4 sm:mt-0 sm:ml-3">
                      <button
                        disabled={
                          checkingAvailability ||
                          !selectedStateId ||
                          !selectedDistrictId
                        }
                        onClick={checkAvailability}
                        className="block w-full rounded-md border border-transparent px-5 py-3 bg-indigo-500 text-base font-medium text-white shadow hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600 sm:px-10"
                      >
                        {checkingAvailability
                          ? "Please wait..."
                          : "Check availability"}
                      </button>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="py-2 align-middle sm:px-6 lg:px-8">
            <div className="shadow overflow-scroll w-full border-b border-gray-200 sm:rounded-lg">
              {!checkingAvailability && covidCenters?.length !== 0 ? (
                <button
                  onClick={handleNotifyClick}
                  className="block m-2 w-300 mx-auto rounded-md border border-transparent px-5 py-3 bg-indigo-500 text-base font-medium text-white shadow hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600 sm:px-10"
                >
                  Get notification
                </button>
              ) : null}
              <table className="mx-auto divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  {!checkingAvailability &&
                  covidCenters &&
                  covidCenters?.length !== 0 ? (
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Center Name
                      </th>
                      {/* <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Previous
                  </th> */}
                      {weekDates.map((day) => {
                        return (
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            {day}
                          </th>
                        );
                      })}
                      {/* <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Next
                  </th> */}
                    </tr>
                  ) : null}
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {isInitLoad ? (
                    <div className="p-20">
                      Check vaccine availability in your area based on pincode.
                    </div>
                  ) : null}
                  {checkingAvailability ? (
                    <div className="p-20">Loading...</div>
                  ) : null}

                  {!checkingAvailability &&
                  !isInitLoad &&
                  covidCenters &&
                  covidCenters?.length === 0 ? (
                    <div className="p-20">No centers found.</div>
                  ) : null}
                  {!checkingAvailability &&
                    covidCenters?.map((center) => {
                      return (
                        <tr key={center.center_id}>
                          <td className="px-6 py-4 whitespace-wrap text-sm font-medium text-gray-900">
                            <div className="w-300">
                              {center.name} <br />
                              <br />
                              {center.address} <br />
                              {center.block_name} <br />
                              {center.district_name} <br />
                              {center.pincode} <br />
                            </div>
                          </td>
                          {/* <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"></td> */}
                          {weekDates.map((day) => {
                            const getDay = (day) => {
                              const dateSlot = center?.sessions.find(
                                (session) => session.date === day
                              );
                              if (dateSlot)
                                return (
                                  <div
                                    className="flex flex-col"
                                    key={dateSlot?.session_id}
                                  >
                                    <span className="mb-2">
                                      {dateSlot?.available_capacity === 0 ? (
                                        <span className="bg-red-500 p-1 text-white">
                                          SLOTS FULL
                                        </span>
                                      ) : dateSlot?.available_capacity <= 10 ? (
                                        <span className="bg-yellow-500 p-1 text-black">
                                          {dateSlot?.available_capacity}
                                        </span>
                                      ) : (
                                        <span className="bg-green-500 p-1 text-white">
                                          {dateSlot?.available_capacity}
                                        </span>
                                      )}
                                    </span>
                                    <span>{dateSlot?.vaccine}</span>
                                    <span>Age {dateSlot?.min_age_limit}+</span>
                                  </div>
                                );
                              else return null;
                            };
                            return (
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {getDay(day) ? getDay(day) : "NA"}
                              </td>
                            );
                          })}
                          {/* <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"></td> */}
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
