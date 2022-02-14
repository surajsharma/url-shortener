/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';

import Navbar from './Navbar';
import UrlCard from './UrlCard';
import Loader from './Loader';

function Shortener({ loginData, setLoginData, apiKey, setApiKey }) {
  const [url, setUrl] = useState('');

  const [urls, setUrls] = useState([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let Authorization = loginData.googleUser
      ? `Google ${loginData.token}`
      : `Bearer ${loginData.token}`;

    let api_url = `/api/urls/?user=${loginData.email}`;

    let headers = {
      'Content-Type': 'application/json',
      Authorization,
    };

    setLoading(true);

    fetch(api_url, {
      method: 'GET',
      headers,
    })
      .then((response) => response.json())
      .then((json) => {
        setUrls(json.reverse());
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const generateKey = (length) => {
    let result = '';
    let characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0987654321';
    let charlen = characters.length;

    for (let index = 0; index < length; index++) {
      result += characters.charAt(Math.floor(Math.random() * charlen));
    }
    return result;
  };

  const handleApiKey = () => {
    let key = generateKey(12);
    alert(
      `🚀 Your Api Key is ${key} please save it somewhere. URLs shortened with this key may only be decrypted with it.`
    );
    setApiKey(key);
  };

  const handleShortenWithKey = () => {
    let expression =
      // eslint-disable-next-line no-useless-escape
      /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;

    let regex = new RegExp(expression);

    let Authorization = loginData.googleUser
      ? `Google ${loginData.token}`
      : `Bearer ${loginData.token}`;

    if (url.match(regex)) {
      let api_url = `/api/urls/encrypt/`;

      let headers = {
        'Content-Type': 'application/json',
        Authorization,
      };

      setLoading(true);

      fetch(api_url, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          user: loginData.email,
          url: url,
          key: apiKey,
        }),
      })
        .then((response) => response.json())
        .then((json) => {
          console.log(json);
          setUrls([...urls, json].reverse());
          setUrl('');
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    } else {
      alert('Please enter a valid URL');
      setUrl('');
    }
  };

  const handleShorten = () => {
    let expression =
      // eslint-disable-next-line no-useless-escape
      /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;

    let regex = new RegExp(expression);

    let Authorization = loginData.googleUser
      ? `Google ${loginData.token}`
      : `Bearer ${loginData.token}`;

    if (url.match(regex)) {
      let api_url = `/api/urls/`;

      let headers = {
        'Content-Type': 'application/json',
        Authorization,
      };
      setLoading(true);
      fetch(api_url, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          user: loginData.email,
          url: url,
        }),
      })
        .then((response) => response.json())
        .then((json) => {
          console.log(json);
          setUrls([...urls, json].reverse());
          setUrl('');
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    } else {
      alert('Please enter a valid URL');
      setUrl('');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('loginData');
    setLoginData(null);
  };

  return (
    <>
      <Navbar
        loginData={loginData}
        handleApiKey={handleApiKey}
        handleLogout={handleLogout}
        setApiKey={setApiKey}
      />
      {loading ? (
        <div className="flex justify-center w-full mt-5">
          <Loader />
        </div>
      ) : (
        <>
          <div className="flex justify-center w-full">
            <div className="mb-3">
              <br />
              <input
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                type="url"
                className="
            form-control
            block
            w-full
            px-3
            py-1.5
            text-base
            font-normal
            text-gray-700
            bg-white bg-clip-padding
            border border-solid border-gray-300
            rounded
            transition
            ease-in-out
            m-0
            focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
          "
                id="exampleURL0"
                placeholder="URL input"
              />
              <div className="flex space-x-2 justify-center mt-5">
                <div>
                  <button
                    type="button"
                    onClick={handleShorten}
                    className="inline-block px-6 py-2.5 bg-blue-800 text-white font-medium text-xs leading-tight uppercase rounded shadow-lg hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                  >
                    Shorten
                  </button>
                </div>
                <div>
                  {apiKey.length === 12 ? (
                    <button
                      type="button"
                      onClick={handleShortenWithKey}
                      className="inline-block px-6 py-2.5 bg-pink-800 text-white font-medium text-xs leading-tight uppercase rounded shadow-lg hover:bg-pink-700 hover:shadow-lg focus:bg-pink-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-pink-800 active:shadow-lg transition duration-150 ease-in-out"
                    >
                      Shorten with API Key
                    </button>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      {urls.map((url) => (
        <UrlCard key={url._id} URL={url} />
      ))}
    </>
  );
}

export default Shortener;
