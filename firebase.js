<script type="module">
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyDnCDVc-PUK7s72jyXunt50kKZf2eIBfy8",
    authDomain: "biller-hub-analytics.firebaseapp.com",
    projectId: "biller-hub-analytics",
    storageBucket: "biller-hub-analytics.firebasestorage.app",
    messagingSenderId: "529544782831",
    appId: "1:529544782831:web:7176aa745ba56b6dd80c1a",
    measurementId: "G-440WP7X6PF"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
</script>