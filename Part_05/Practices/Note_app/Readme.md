Project Status: React Router Refactoring (Part 5)
This frontend version focuses on the implementation of React Router. Due to the significant architectural change, some features from previous sections are not operational in this practice branch.

To keep pace with Part 6 (Complex State Management), I have prioritized the implementation of routing and UI components over refactoring the legacy logic.

Known Issues and Pending Refactorings:
Authentication: The login flow is not yet integrated into the new Router structure.

Note Handling (POST): When creating new notes, a 401 (Unauthorized) error is returned because JWT token handling is operational in the backend.

Note Interactions: Changing the importance and deleting notes are also not operational in the UI.

E2E Testing: The practice tests are temporarily not working due to URL changes (this has been fixed separately in the official exercises repository).

Note: All critical requirements for the official course exercises (e.g., exercise 5.28) are fully functional and have been tested in their respective folders.