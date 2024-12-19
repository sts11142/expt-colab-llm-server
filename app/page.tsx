'use client';

import { useState } from 'react';

export default function Home() {
  const [wasResponsed, setWasResponsed] = useState<boolean>(false);

  const responseText = 'Dummy! This is a dummy responsed text.';

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-amber-200">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start w-1/3">
        <div className="w-full">
          {wasResponsed ? (
            <div>
              <p className='text-amber-800 text-center'>{responseText}</p>
            </div>
          ) : (
            <form action="" className="w-full">
              <div className="flex flex-col gap-4">
                <div>
                  <input
                    className="w-full text-slate-600 px-2 py-1 rounded-sm text-lg outline-none bg-amber-50"
                    type="text"
                    placeholder="Paste URL of your LLM server's endpoint here."
                  />
                </div>
                <div>
                  <input
                    className="w-full text-slate-600 px-2 py-1 rounded-sm text-lg outline-none bg-amber-50"
                    type="text"
                    placeholder="hola!"
                  />
                </div>
                <div className="w-full flex mt-4">
                  <button
                    className="w-36 mx-auto text-slate-500 px-2 py-1 rounded-sm  text-lg bg-amber-100 hover:bg-amber-50 hover:text-slate-700 transition-all duration-300"
                    type="submit"
                  >
                    Send
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </main>
    </div>
  );
}
