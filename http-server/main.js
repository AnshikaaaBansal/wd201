document.addEventListener('DOMContentLoaded', function () {
    const userForm = document.getElementById("registrationForm");

    // Function to retrieve entries from localStorage
    const retrieveEntries = () => {
        const entries = localStorage.getItem("formEntries");
        return entries ? JSON.parse(entries) : [];
    };

    // Function to display entries in the table
    const displayEntries = () => {
        const entries = retrieveEntries();
        const tableBody = document.querySelector("#entriesTable tbody");
        tableBody.innerHTML = ""; // Clear previous entries

        // Populate the table with each entry
        entries.forEach(entry => {
            const row = document.createElement('tr');

            const nameCell = document.createElement('td');
            nameCell.textContent = entry.name;

            const emailCell = document.createElement('td');
            emailCell.textContent = entry.email;

            const passwordCell = document.createElement('td');
            passwordCell.textContent = entry.password; // Display the password without masking

            const dobCell = document.createElement('td');
            dobCell.textContent = entry.dob;

            const termsCell = document.createElement('td');
            termsCell.textContent = entry.termsAccepted ? 'true' : 'false';

            row.appendChild(nameCell);
            row.appendChild(emailCell);
            row.appendChild(passwordCell);
            row.appendChild(dobCell);
            row.appendChild(termsCell);

            tableBody.appendChild(row);
        });
    };

    const calculateAge = (dob) => {
        const birthDate = new Date(dob);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        const dayDiff = today.getDate() - birthDate.getDate();
        if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
            age--;
        }
        return age;
    };

    const isValidAge = (dob) => {
        const age = calculateAge(dob);
        return age >= 18 && age <= 55;
    };

    const saveUserForm = (event) => {
        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();
        const dob = document.getElementById("dob").value;
        const acceptedTermsAndConditions = document.getElementById("terms").checked;

        if (!name || !email || !password || !dob || !acceptedTermsAndConditions) {
            alert('Please fill all fields and accept the terms and conditions.');
            return;
        }

        if (!isValidAge(dob)) {
            alert('Date of Birth must be between 18 and 55 years.');
            return;
        }

        const userEntries = retrieveEntries();

        const entry = {
            name,
            email,
            password,
            dob,
            termsAccepted: acceptedTermsAndConditions
        };

        userEntries.push(entry);

        localStorage.setItem("formEntries", JSON.stringify(userEntries));

        displayEntries(); // Update the table with new entries

        userForm.reset();
    };

    userForm.addEventListener("submit", saveUserForm);

    displayEntries(); // Display entries on page load
});