Rules for AI-Assisted Web Projects

1. Environment & Constraints
The Golden Rule: The final project must work perfectly when the index.html file is opened directly in a browser from the local file system (using the file:/// protocol).
No Servers: The solution cannot require a local web server (like VS Code's "Live Server" or Python's server).
No Command-Line Tools: The project cannot rely on any command-line tools. This includes build tools (npm, Vite), version control (git), or package managers.
Client-Side Only: All code must run entirely in the browser (client-side). There is no backend.
Restricted Environment: Assume developer tools may be inaccessible and external resources (like CDNs) could potentially be blocked.

2. Project Structure
Multi-File Structure is Mandatory: The project must be organized into separate files. A src folder should be used for assets. The required structure is:

/Project_Folder
├── index.html
└── /src
    ├── styles.css
    ├── app.js
    └── data.js  (or similar for data)
No Merging: Do not merge all the code into a single index.html file as a solution.

3. Code & Functionality
Core Technologies: The project must only use HTML, CSS, and vanilla JavaScript (ES6+).
JavaScript Communication:
Do NOT use ES Modules. This means no import/export keywords and no <script type="module">. This is the most common point of failure.
Use the global scope for communication between .js files. One file (e.g., billers.js) will declare a global constant (const BILLERS = [...]), and another file (app.js) will read it.

Script Loading Order is Critical: In index.html, the <script> tags must be ordered correctly. The script that declares the data (billers.js) must be loaded before the script that uses the data (app.js).

Prioritize Robustness: Code should include fallbacks where possible. For example, if a search library from a CDN fails to load, the application should gracefully fall back to a simpler, built-in search function.
