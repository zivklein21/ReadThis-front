const googleClientId = "575942882016-fg711rej42mvgcnesm0n0vpt4s591ffr.apps.googleusercontent.com";

export const openGoogleLoginPopup = () => {
  if (!googleClientId) {
    console.error("Google Client ID is missing!");
    return;
  }

  const oauthUrl = `https://accounts.google.com/o/oauth2/v2/auth?
    client_id=${googleClientId}
    &redirect_uri=${encodeURIComponent(window.location.origin)}
    &response_type=token
    &scope=openid email profile
    &prompt=select_account`;

  const width = 500;
  const height = 600;
  const left = window.innerWidth / 2 - width / 2;
  const top = window.innerHeight / 2 - height / 2;

  const popup = window.open(
    oauthUrl,
    "Google Login",
    `width=${width},height=${height},top=${top},left=${left}`
  );

  const pollPopup = setInterval(() => {
    if (!popup || popup.closed) {
      clearInterval(pollPopup);
      console.log("Popup closed by user");
    }
  }, 1000);
};