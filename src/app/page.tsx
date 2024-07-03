"use client"

import React, { useRef } from 'react';

const Home = () => {
  const inputNameRef = useRef<HTMLInputElement>(null);
  const inputCodeRef = useRef<HTMLInputElement>(null);

  async function createParty() {
  }

  async function joinparty() {
  }

  return (
    <div className="bg-blue-200 h-screen flex justify-center items-center flex-col gap-4">
      <div className="flex flex-col">
        <div className="ml-2">Name</div>
        <div className="h-[35px] w-[300px] border">
          <input className="text-base h-full w-full text-center" ref={inputNameRef}></input>
        </div>
      </div>
      <div className="w-[300px] h-[35px] bg-black rounded-xl">
        <button onClick={createParty} className="h-full w-full text-white">Create Party</button>
      </div>

      <div className="flex flex-col">
        <div className="ml-2">Code</div>
        <div className="h-[35px] w-[300px] border">
          <input className="text-base h-full w-full text-center" ref={inputCodeRef}></input>
        </div>
      </div>
      <div className="w-[300px] h-[35px] bg-black rounded-xl">
        <button onClick={joinparty} className="h-full w-full text-white">Join Party</button>
      </div>
    </div>
  );
};

const App = () => (
  <Home />
);

export default App;
