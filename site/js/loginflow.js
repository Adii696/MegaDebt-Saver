var loginBtnHtml = `<img style="width: 20px; padding-top:3px; margin-left:3px; margin-right:3px; float: left;" alt="Google sign-in" src="/site/image/icon/logo1.png" /><div class="logintext">Sign in with Google</div>`;
var logoutBtnHtml = `<img style="width: 20px; padding-top:3px; margin-left:3px; margin-right:3px; float: left;" alt="Google sign-in" src="/site/image/icon/logo1.png" /><span class="signouttext">`;
var uid;

function signInGoogle() {
  if (!firebase.auth().currentUser) {
    let provider = new firebase.auth.GoogleAuthProvider();
    // provider.addScope("https://www.googleapis.com/auth/plus.login");
    firebase.auth().signInWithRedirect(provider);
  }
}

function signOut() {
  return firebase.auth().signOut();
}

firebase.auth().onAuthStateChanged(function (user) {
  let googleLoginBtn = document.getElementById("google-login-button");
  if (user) {
    // User is signed in.
    var displayName = user.displayName;
    var email = user.email;
    var emailVerified = user.emailVerified;
    var photoURL = user.photoURL;
    var isAnonymous = user.isAnonymous;
    uid = user.uid;
    var providerData = user.providerData;
    // document.getElementById('quickstart-sign-in-status').textContent = 'Signed in';
    // document.getElementById('quickstart-sign-in').textContent = 'Sign out';
    // document.getElementById('quickstart-account-details').textContent = JSON.stringify(user, null, '  ');
    googleLoginBtn.innerHTML = logoutBtnHtml + /*"Logged in as " +*/ displayName + "</span>";
    googleLoginBtn.classList.remove("logged-out");
    googleLoginBtn.classList.add("logged-in");
    googleLoginBtn.removeEventListener("click", signInGoogle);
    googleLoginBtn.addEventListener("click", signOut);
    // var itemCount = firebase.database().ref("users/" + user.uid + "/");
    // itemCount.on("value", function (snapshot) {
    //   if (snapshot.val() == null) {
    //     firebase
    //       .database()
    //       .ref("users/" + user.uid +"/itemCount")
    //       .set({
    //         itemCount: 0,
    //       });
    //   }
    // });
  } else {
    // User is signed out.
    googleLoginBtn.innerHTML = loginBtnHtml;
    googleLoginBtn.removeEventListener("click", signOut);
    googleLoginBtn.addEventListener("click", signInGoogle);
    googleLoginBtn.classList.remove("logged-in");
    googleLoginBtn.classList.add("logged-out");
  }
});
