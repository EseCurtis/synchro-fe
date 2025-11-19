// import { useState } from 'react';
// //@ts-ignore
// const [isModalOpen, setIsModalOpen] = useState(false);

// export const openModal = () => {
//   setIsModalOpen(true);
// };

// export const closeModal = () => {
//   setIsModalOpen(false);
// };
export const TABLE_STYLE =
  "px-6 py-4 whitespace-no-wrap border-b border-gray-300";

export const DROPDOWN_STYLE =
  "block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900";
//this passes in the authorization bearer token

const token = "";
export const ISAUTHENTICATED = `bearer ${token}`; //replace token with the name of your token
{
  /*
       Replace token with the name of your key
      use cookies for best practise
      the cookie package has already been installed
  */
}


export const brokenImageUrl = `data:image/png;base64,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`