'use client';

import { useState } from 'react';

export default function Home() {
  const [wasResponsed, setWasResponsed] = useState<boolean>(false);
  const [endpoint, setEndpoint] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [responseText, setResponseText] = useState<string>(
    'Dummy! This is a dummy responsed text.'
  );

  const handleSend = async () => {
    if (!endpoint || !message) {
      alert('Please set endpoint and message.');
      return;
    }

    setLoading(true);
    setWasResponsed(false);

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });

      if (!res.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await res.json();
      // dataの構造に応じて変更が必要かもしれない
      setResponseText(data?.response ?? 'No response');
      setWasResponsed(true);
    } catch (error: unknown) {
      if (error instanceof Error) {
        // Error型として扱える
        setResponseText(`Error: ${error.message}`);
      } else {
        // Errorでない場合のフォールバック
        setResponseText('An unknown error occurred');
      }
      setWasResponsed(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-amber-200">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start w-1/3">
        <div className="w-full">
          {wasResponsed ? (
            <div>
              <p className="text-lg text-amber-800 text-center">
                {responseText}
              </p>
            </div>
          ) : loading ? (
            // スケルトン
            <div className="w-full flex flex-col gap-4 animate-pulse">
              <div className="h-4 bg-amber-400 rounded-sm"></div>
              <div className="h-4 bg-amber-400 rounded-sm"></div>
              <div className="h-4 bg-amber-400 rounded-sm"></div>
              <div className="h-4 w-4/12 bg-amber-400 rounded-sm"></div>
            </div>
          ) : (
            <form
              action=""
              className="w-full"
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <div className="flex flex-col gap-4">
                <div>
                  <input
                    className="w-full text-slate-600 px-2 py-1 rounded-lg text-lg focus:border-amber-800 focus:outline-none focus:ring-0 border-2 border-transparent outline-none bg-amber-50"
                    type="text"
                    placeholder="Paste URL of your LLM server's endpoint here."
                    value={endpoint}
                    onChange={(e) => setEndpoint(e.target.value)}
                  />
                </div>
                <div>
                  <input
                    className="w-full text-slate-600 px-2 py-1 rounded-lg text-lg focus:border-amber-800 focus:outline-none focus:ring-0 border-2 border-transparent bg-amber-50"
                    type="text"
                    placeholder="hola!"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </div>
                <div className="w-full flex mt-4">
                  <button
                    className="w-36 mx-auto text-slate-500 px-2 py-1 rounded-sm text-lg bg-amber-100 hover:bg-amber-50 hover:text-slate-700 transition-all duration-300 disabled:opacity-50"
                    type="button"
                    onClick={handleSend}
                    disabled={loading}
                  >
                    {loading ? 'Sending...' : 'Send'}
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
