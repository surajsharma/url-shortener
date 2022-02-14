import React from 'react';

function UrlCard({ URL }) {
  const { url, shortUrl, user, encrypted } = URL;

  const accessEncryptedUrl = () => {
    console.log(shortUrl);

    const decrypt = (salt, encoded) => {
      const textToChars = (text) => text.split('').map((c) => c.charCodeAt(0));

      const applySaltToChar = (code) =>
        textToChars(salt).reduce((a, b) => a ^ b, code);

      return encoded
        .match(/.{1,2}/g)
        .map((hex) => parseInt(hex, 16))
        .map(applySaltToChar)
        .map((charCode) => String.fromCharCode(charCode))
        .join('');
    };

    let key = prompt('Please enter your API key:', 'API Key');
    if (key !== null && key !== '' && key.length === 12) {
      let surl = decrypt(key, shortUrl);
      let expression =
        // eslint-disable-next-line no-useless-escape
        /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;

      let regex = new RegExp(expression);
      if (surl.match(regex)) {
        let win = window.open(surl, '_blank');
        win.focus();
      } else {
        alert('Invalid Key');
        return;
      }
    } else {
      alert('Invalid Key');
      return;
    }
  };

  return (
    <div className="flex justify-center">
      <div className="container mx-auto px-4 sm:px-8">
        <div className="py-8">
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      URL
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Short Url
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      User
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <div className="flex">
                        <div className="ml-3">
                          <p className="text-gray-900 whitespace-no-wrap break-all">
                            {encrypted ? 'Encrypted' : url}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm break-all">
                      {encrypted ? (
                        <button
                          onClick={accessEncryptedUrl}
                          className="bg-green-500 text-white active:bg-green-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        >
                          access with key
                        </button>
                      ) : (
                        <a
                          rel="noreferrer"
                          target="_blank"
                          href={shortUrl}
                          className="text-blue-500 whitespace-no-wrap"
                        >
                          {shortUrl}
                        </a>
                      )}
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm break-all">
                      <p className="text-gray-900 whitespace-no-wrap">{user}</p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UrlCard;
