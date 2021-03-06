import React, { useState, useEffect } from 'react';

const InstallAppButton = () => {
  const [ deferredPrompt, setDeferredPrompt ] = useState(null);

  useEffect(() => {
    window.addEventListener('beforeinstallprompt', e => {
      e.preventDefault();

      setDeferredPrompt(e);
    });
  }, []);

  function installApp() {
    if(deferredPrompt) {
      deferredPrompt.prompt();

      deferredPrompt.userChoice.then(result => {
        if(result.outcome === 'accepted') {
          console.log('User wants to install');
        } else {
          console.log('User dismissed install');
        }

        setDeferredPrompt(null);
      });
    }
  }

  return deferredPrompt || process.env.NODE_ENV === 'development' ? (
    <button onClick={installApp}>Install App</button>
  ) : null;
};

export default InstallAppButton;
