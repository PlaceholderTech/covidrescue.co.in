import ComingSoon from "@/components/ComingSoon";
import React, { useEffect, useState } from "react";
import { getCovidData } from "@/lib/covid";

export async function getServerSideProps({ params, query }) {
  const covidData = await getCovidData();

  return {
    props: { covidData: covidData },
  };
}

import { ArrowSmDownIcon, ArrowSmUpIcon } from "@heroicons/react/solid";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function numDifferentiation(value, minimized = false) {
  var val = Math.abs(value);
  if (minimized)
    if (val >= 10000000) {
      if ((val / 10000000).toFixed(2) >= 2)
        val = (val / 10000000).toFixed(2) + " Crs";
      else val = (val / 10000000).toFixed(2) + " Cr";
    } else if (val >= 100000) {
      if ((val / 100000).toFixed(2) >= 2)
        val = (val / 100000).toFixed(2) + " Lakhs";
      else val = (val / 100000).toFixed(2) + " Lakh";
    } else {
      val = val.toLocaleString("en-IN");
    }
  else val = val.toLocaleString("en-IN");
  return val;
}

export function CovidStatsTable({ data }) {
  return (
    <div className="flex flex-col">
      <h1 className="text-center pt-10 pb-10 leading-1 text-3xl font-medium text-gray-900">
        Statewise Covid Report
      </h1>
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    State Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Total Active Cases
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Today Active Cases
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Total Discharged
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Today Discharged
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Total Deaths
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Today Deaths
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data.map((state) => (
                  <tr key={state.state_name}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {state?.state_name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {numDifferentiation(state?.new_active)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 flex">
                      <span className="text-red-500">
                        {numDifferentiation(state?.new_active - state?.active)}
                      </span>
                      <ArrowSmUpIcon
                        className="-ml-1 mr-0.5 flex-shrink-0 self-center h-5 w-5 text-red-600"
                        aria-hidden="true"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {numDifferentiation(state.new_cured)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 flex">
                      <span className="text-green-600">
                        {numDifferentiation(state?.new_cured - state?.cured)}
                      </span>
                      <ArrowSmUpIcon
                        className="-ml-1 mr-0.5 flex-shrink-0 self-center h-5 w-5 text-green-600"
                        aria-hidden="true"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {numDifferentiation(state.new_death)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex">
                      <span className="text-red-600">
                        {numDifferentiation(state?.new_death - state?.death)}
                      </span>
                      {state?.new_death - state?.death === 0 ? null : (
                        <ArrowSmUpIcon
                          className="-ml-1 mr-0.5 flex-shrink-0 self-center h-5 w-5 text-red-600"
                          aria-hidden="true"
                        />
                      )}
                    </td>
                    {/* <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <a href="#" className="text-indigo-600 hover:text-indigo-900">
                        Edit
                      </a>
                    </td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Stat({
  title,
  number,
  today,
  percentage,
  isHigh,
  inverse = false,
  minimizeNumbers = false,
}) {
  return (
    <div className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
      <dt className="text-sm font-medium text-gray-500 truncate">
        Today {title}
      </dt>
      <dd className="mt-1 text-3xl font-semibold text-gray-900">
        <div
          className={`flex items-baseline text-1xl font-semibold ${
            inverse ? "text-red-600" : "text-indigo-600"
          }`}
        >
          <span
            className={`text-1xl font-semibold ${
              inverse ? "text-red-600" : "text-indigo-600"
            }`}
          >
            {numDifferentiation(today, minimizeNumbers)}
          </span>
          <span className="ml-2 text-sm font-medium text-gray-500">total </span>
          <span className="ml-2 text-sm font-medium ${inverse ? 'text-red-600': 'text-indigo-600'}">
            {numDifferentiation(number, minimizeNumbers)}
          </span>
        </div>
        <div
          className={classNames(
            isHigh
              ? `${
                  inverse
                    ? "bg-red-100 text-red-800"
                    : "bg-green-100 text-green-800"
                }`
              : `${
                  inverse
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`,
            "inline-flex items-baseline px-2.5 py-0.5 rounded-full text-sm font-medium md:mt-2 lg:mt-0"
          )}
        >
          {isHigh ? (
            <ArrowSmUpIcon
              className={classNames(
                inverse ? "text-red-500" : "text-green-500",
                "-ml-1 mr-0.5 flex-shrink-0 self-center h-5 w-5 "
              )}
              aria-hidden="true"
            />
          ) : (
            <ArrowSmDownIcon
              className="-ml-1 mr-0.5 flex-shrink-0 self-center h-5 w-5 text-red-500"
              aria-hidden="true"
            />
          )}
          <span className="sr-only">
            {isHigh ? "Increased" : "Decreased"} by
          </span>
          {percentage}%
        </div>
      </dd>
    </div>
  );
}

export function Stats({
  positive,
  death,
  active,
  cured,
  new_positive,
  new_death,
  new_active,
  new_cured,
}) {
  return (
    <div>
      <h3 className="text-lg leading-6 font-medium text-gray-900">
        Today Covid Stats
      </h3>
      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-1">
        <Stat
          title="Active"
          number={new_active}
          today={new_active - active}
          isHigh={new_active - active > 0}
          inverse={true}
          percentage={((new_active / new_positive) * 100).toFixed(2)}
        />
        <Stat
          title="Positve"
          number={positive}
          today={new_positive - positive}
          inverse={true}
          isHigh={new_positive - positive > 0}
          percentage={((positive / new_positive) * 100).toFixed(2)}
        />
      </dl>
      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Stat
          title="Discharged"
          number={new_cured}
          today={new_cured - cured}
          isHigh={new_cured - cured > 0}
          percentage={((new_cured / new_positive) * 100).toFixed(2)}
        />
        <Stat
          title="Deaths"
          number={new_death}
          today={new_death - death}
          inverse={true}
          isHigh={new_death - death > 0}
          percentage={((new_death / new_positive) * 100).toFixed(2)}
        />
      </dl>
    </div>
  );
}

export default function statewisereports({ covidData }) {
  const [indiaStats, setIndiaStats] = useState({});
  useEffect(() => {
    google.load("visualization", "1", { packages: ["geochart"] });
    google.setOnLoadCallback(drawVisualization);

    const indiaOverallStats = covidData.filter(
      (data) => data["sno"] === "11111"
    )[0];

    setIndiaStats(indiaOverallStats);
  }, []);

  const prepareCovidData = () => {
    // setTotalCase(total);
    // const columns = ['State', 'Name of State / UT', 'Total Confirmed cases', 'Cured/Discharged/Migrated', 'Death', 'DateTime'];
    const columns = ["State", "Active Cases", "Cured Cases"];
    const preparedList = [];
    preparedList.push(columns);
    covidData?.forEach((record) => {
      const preparedRecord = [
        record["state_name"],
        // record[1],
        parseInt(record["new_active"]),
        // record[3],
        parseInt(record["new_cured"]),
        // record[6],
      ];
      preparedList.push(preparedRecord);
    });
    return preparedList;
  };

  const drawVisualization = () => {
    const getPreparedList = prepareCovidData();
    var data = google.visualization.arrayToDataTable(getPreparedList);
    var opts = {
      region: "IN",
      displayMode: "regions",
      resolution: "provinces",
      width: 720,
      height: 500,
      colorAxis: { colors: ["white", "red"] },
    };
    var geochart = new google.visualization.GeoChart(
      document.getElementById("visualization")
    );
    geochart.draw(data, opts);
  };

  return (
    <div>
      <div className="m-10 flex justify-space-between">
        <div id="visualization" className="hidden md:block"></div>
        <div className="pl-5">
          <Stats {...indiaStats} />
        </div>
      </div>
      <div className="flex flex-col m-10">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <CovidStatsTable data={covidData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
