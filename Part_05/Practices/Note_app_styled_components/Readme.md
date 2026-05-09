Project Status: React Router and UI Refactoring (Part 5)
This frontend build focuses on implementing React Router and Styled Components. Due to the significant architectural change, some features from previous sections are not yet operational in this practice branch.

To keep pace with Part 6 (Complex State Management), I have prioritized implementing routing and UI components over refactoring legacy logic.

Known Issues and Pending Refactorings:
Authentication: The login flow is not yet integrated into the new Router structure.

Note Management (POST): Creating new notes returns a 401 (Unauthorized) error because JWT token management is operational in the backend.

Note Interactions: Changing the importance and deleting notes are also not operational in the UI.

End-to-end testing: Practice tests are temporarily unavailable due to URL changes (this has been addressed separately in the official exercise repository).

Note: All critical requirements for the official course exercises (e.g., exercise 5.28) are fully functional and have been tested in their respective folders.