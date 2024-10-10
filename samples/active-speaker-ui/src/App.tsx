import Meeting from './components/Meeting';
import { DyteSpinner } from '@dytesdk/react-ui-kit';
import { DyteProvider, useDyteClient } from '@dytesdk/react-web-core';
import { useEffect } from 'react';

function App() {
  const [meeting, initMeeting] = useDyteClient();

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);

    // Update this line to correctly retrieve the authToken from the URL
    const authToken = searchParams.get('authToken'); // Change 'authToken' to whatever your token key is

    // If the authToken does not exist, redirect to the URL with the token
    if (!authToken) {
      // Construct the new URL with the authToken
      const newUrl = `https://dyte-react.vercel.app/?authToken=<your-token>`; // Change this part to your logic for retrieving the token

      // Redirect the user to the new URL
      window.location.href = newUrl;
      return;
    }

    // If authToken is found, initialize the meeting
    initMeeting({
      authToken,
      defaults: {
        audio: false,
        video: false,
      },
    }).then((meeting) => {
      Object.assign(window, { meeting });
    });
  }, []);

  // By default this component will cover the entire viewport.
  // To avoid that and to make it fill a parent container, pass the prop:
  // `mode="fill"` to the component.
  return (
    <DyteProvider
      value={meeting}
      fallback={
        <div className="size-full flex flex-col gap-3 place-items-center justify-center">
          <DyteSpinner className="w-12 h-12 text-blue-600" />
          <p className="text-lg">Joining...</p>
        </div>
      }
    >
      <Meeting />
    </DyteProvider>
  );
}

export default App;
