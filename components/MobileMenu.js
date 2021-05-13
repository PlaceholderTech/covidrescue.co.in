import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import resources from '@/data/resources';
import CitiesJson from '../data/cities.json';

const SearchComponent = ({
  setSearch,
  search,
  searchResults,
  location,
  preference,
}) => {
  return (
    <>
      <div className="relative ">
        <label
          htmlFor="moblocation"
          className="text-xl font-bold text-gray-700"
        >
          Select Your Location
          <span className="text-red-500 required-dot"></span>
        </label>
        <input
          type="text"
          id="moblocation"
          className="flex-1 w-full px-4 py-2 mt-2 text-base text-gray-700 placeholder-gray-400 bg-white border border-transparent border-gray-300 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
          placeholder="Search specific location"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="mt-2 cities">
        <div className="">
          {searchResults.map(
            (city, idx) =>
              idx < 12 && (
                <Link href={`/${city.toLowerCase()}?p=${preference}`} key={idx}>
                  <a
                    className={`bg-gray-800 text-white rounded-md shadow-md mx-1 my-1 px-4 py-1 hover:bg-gray-600 inline-block ${
                      location === city.toLowerCase() ? 'bg-blue-500' : null
                    }`}
                  >
                    {city}
                  </a>
                </Link>
              )
          )}
        </div>
      </div>
    </>
  );
};

const RoleComponent = ({ preference, setPrefernce }) => {
  return (
    <>
      <div className="flex flex-col">
        <h1 className="text-xl font-bold text-gray-700">
          Select your preference
        </h1>
        <label className="inline-flex items-center mt-3">
          <input
            type="radio"
            className="w-5 h-5 text-yellow-600 form-radio"
            name="role"
            value="get"
            onChange={() => setPrefernce('get')}
            checked={preference === 'get'}
          />
          <span className="ml-2 text-gray-700">Get Help</span>
        </label>

        <label className="inline-flex items-center mt-3">
          <input
            type="radio"
            className="w-5 h-5 text-green-600 form-radio"
            name="role"
            value="give"
            onChange={() => setPrefernce('give')}
            checked={preference === 'give'}
          />
          <span className="ml-2 text-gray-700">Offer Help</span>
        </label>
      </div>
    </>
  );
};

const ResourceComponent = ({
  location,
  preference,
  currentResource,
  resources,
}) => {
  console.log('CURRENT RESOURCE', currentResource);
  return (
    <>
      <h1 className="text-xl font-bold text-gray-700">
        Select Resource Required
        <span className="text-red-500 required-dot"></span>
      </h1>
      <div className="mt-2 cities">
        <div className="">
          <Link href={`/${location}?p=${preference}`}>
            <a
              className={`text-gray-50 rounded-md shadow-md bg-green-500 mx-1 my-1 px-4 py-1 hover:bg-green-800 inline-block ${
                !currentResource && 'bg-blue-500'
              }`}
            >
              All
            </a>
          </Link>

          {resources.map((resource, idx) => (
            <Link
              href={`/${location}/${resource.toLowerCase()}?p=${preference}`}
              key={idx}
            >
              <a
                className={`bg-green-500 text-gray-50 rounded-md shadow-md mx-1 my-1 px-4 py-1 hover:bg-green-800 inline-block ${
                  currentResource === resource.toLowerCase()
                    ? 'bg-blue-500'
                    : null
                }`}
              >
                {resource}
              </a>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default function MobileMenu() {
  const defaultCities = [
    'Delhi',
    'Bangalore',
    'Hyderabad',
    'Jaipur',
    'Mumbai',
    'Pune',
    'Chennai',
    'Kolkata',
    'Gurugram',
    'Noida',
  ];

  const router = useRouter();
  const location = router.query.location;
  const currentResource = router.query.resource;

  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState(defaultCities);
  const [preference, setPrefernce] = useState('get');

  useEffect(() => {
    const results = CitiesJson.filter((city) =>
      city.toLowerCase().includes(search.toLowerCase())
    );
    setSearchResults(results);
  }, [search]);

  useEffect(() => {
    if (currentResource)
      router.push({
        pathname: '/' + location + '/' + currentResource,
        query: { p: preference },
      });
    else router.push({ pathname: '/' + location, query: { p: preference } });
  }, [preference]);
  return (
    <div className="md:hidden">
      <div className="p-4 my-2 border rounded-md shadow-lg">
        <SearchComponent
          setSearch={setSearch}
          location={location}
          preference={preference}
          search={search}
          searchResults={searchResults}
        />
      </div>
      {/* <hr className="my-4 font-bold" /> */}
      <div className="p-4 my-2 border rounded-md shadow-lg">
        <ResourceComponent
          location={location}
          resources={resources}
          preference={preference}
          currentResource={currentResource}
        />
      </div>
      {/* <hr className="my-4 font-bold" /> */}
      <div className="hidden p-4 my-2 border rounded-md shadow-lg">
        <RoleComponent setPrefernce={setPrefernce} preference={preference} />
      </div>
      {/* <hr className="my-4 font-bold" /> */}
    </div>
  );
}
