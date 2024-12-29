# This project is a full-stack healthcare management system that bridges the gap between patients and doctors. It encompasses features for user authentication, profile management, appointments, health data, and patient reports.

## contributers:
1-Nouran Yasser Salama   120220250
2-Sara Ayman AbdelMoneim  120220240

## Aimed features:
# User Authentication and Role-Based Access
1. Login:

Patients and doctors can log in using email and password.
Credentials are validated with hashed passwords using bcrypt.
A token is generated along with user role (patient or doctor) and name for personalized session handling.

2. Signup:

Patient Signup:
Patients can register with details like name, age, gender, blood type, allergies, diseases, and last visit details.
Passwords are securely hashed before storage.
Doctor Signup:
Doctors can register with professional details such as specialization, experience, consultation fee, and hospital affiliation.
Secure password handling with bcrypt.

3. Role-Based Navigation:
The frontend dynamically adapts based on the role (patient or doctor).
Separate dashboards for patients and doctors.


# Patient Features
4. Patient Profile Management:
View and edit patient profiles, including health metrics like:
Blood type, height, weight, allergies, and diseases.
Last visit details and personal contact information.
Profile photos can be uploaded and updated.

5. Health Data Submission:
Patients can submit health data such as blood pressure, sleep hours, heart rate, and temperature.
Health scores are calculated and displayed as a percentage for self-assessment.

6. Appointment Booking:
Patients can book appointments with doctors.
Input includes appointment time, date, reason, and additional notes.
Confirmation of booking with a success message.

# Doctor Features
7. Doctor Profile Management:
View and edit professional profiles, including:
Specialization, years of experience, consultation fee, and availability.
Upload and update profile photos for better personalization.

8. Appointment Management:
Doctors can view appointments for the current day.
Each appointment includes patient name, time, reason, and additional details.
Notifications for no scheduled appointments to improve awareness.

9. Patient History:
Search and view detailed patient histories by name.
Displays previous visit details, diagnosis, and doctor’s notes.

10. Patient Report Submission:
Doctors can submit detailed medical reports for each appointment, including:
Vitals (blood pressure, heart rate, temperature, respiratory rate).
Symptoms (description, start date, severity).
Diagnosis and treatment plans.
Prescribed medications, lab tests, and follow-up instructions.


# Appointment Management
11. Book Appointments:
Patients can select doctors and book appointments with necessary details.
Appointments are categorized by date and time for better organization.

12. View Today’s Appointments:
Doctors can view all appointments scheduled for the current day.
Filters appointments by doctor name and current date.


# Health Data Management
13. Submit and Analyze Health Data:
Patients can submit health data, including:
Blood pressure, heart rate, temperature, and sleep hours.
Backend calculates a health percentage score based on input data.
Provides real-time health analysis to patients.

# Patient Report Management
14. Submit Reports:
Doctors can submit detailed reports after patient visits.

15. Reports include:
Visit information (date, reason).
Symptoms, diagnosis, and treatment plans.
Prescribed medications and dosage instructions.
Follow-up requirements and instructions.
Lab test results and additional recommendations.

16. View Patient Reports:
Doctors can search for patient reports by name.
Filtered results display summarized information, such as:
Visit date, diagnosis, and patient name.

17. Comprehensive Report Storage:
All reports are securely stored in Firestore for easy retrieval.


# Frontend Features
18. Role-Based Dashboards:
Separate dashboards for patients and doctors.
Adaptive navigation based on user role.

19. Responsive Design:
Fully responsive UI for mobile, tablet, and desktop.

20. Interactive Forms:
All forms (login, signup, health data submission, report submission) are user-friendly and validated.
Clear error messages guide users for corrections.

21. Health Metrics Visualization:
Health data is visualized as a progress bar for better understanding.
Dynamic feedback for improving health metrics.


# Backend Features
22. Secure Authentication:
Role-based token management.
Passwords hashed using bcrypt.

23. Optimized Data Queries:
Efficient Firestore queries for retrieving role-specific and date-specific data.
Filters appointments, reports, and histories for better performance.

24. Error Handling:
Detailed error messages for invalid inputs or missing data.
Handles empty scenarios gracefully (e.g., no appointments).

25. Comprehensive API Endpoints:
Endpoints for login, signup, profile management, appointment booking, and report submission.


# Security
26. Secure Data Handling:
All sensitive data (passwords, reports) is securely stored.
Backend validation ensures no invalid data is processed.

27. CORS Configuration:
Prevents unauthorized access with appropriate origin and method configurations.

# Additional Features
28. Notifications for Empty States:
Doctors are notified if no appointments are scheduled for the day.
Patients receive confirmations for successful bookings.

29. Admin-Friendly Management:
Fetch all patients, doctors, appointments, and reports for administrative oversight.

30. Cross-Browser Support:
Compatible with modern browsers, ensuring wider usability.





# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
