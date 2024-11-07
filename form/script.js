// Add Education Field
function addEducationField() {
    const educationContainer = document.getElementById('educationContainer');
    const newEducationItem = document.createElement('div');
    newEducationItem.classList.add('education-item');
    newEducationItem.innerHTML = `
        <label>Title: <input type="text" name="educationTitle" placeholder="Enter the title"></label>
        <label>Description: <input type="text" name="educationDescription" placeholder="Enter the description"></label>
    `;
    educationContainer.appendChild(newEducationItem);
}

// Add Experience Field
function addExperienceField() {
    const experienceContainer = document.getElementById('experienceContainer');
    const newExperienceItem = document.createElement('div');
    newExperienceItem.classList.add('experience-item');
    newExperienceItem.innerHTML = `
        <label>Title: <input type="text" name="experienceTitle" placeholder="Enter the title"></label>
        <label>Description: <input type="text" name="experienceDescription" placeholder="Enter the description"></label>
    `;
    experienceContainer.appendChild(newExperienceItem);
}

// Add Skills Field
function addSkillsField() {
    const skillsContainer = document.getElementById('skillsContainer');
    const newSkillsItem = document.createElement('div');
    newSkillsItem.classList.add('skills-item');
    newSkillsItem.innerHTML = `
        <label>Title: <input type="text" name="skillsTitle" placeholder="Enter the skill title"></label>
    `;
    skillsContainer.appendChild(newSkillsItem);
}

// Add Language Field
function addLanguageField() {
    const languageContainer = document.getElementById('languageContainer');
    const newLanguageItem = document.createElement('div');
    newLanguageItem.classList.add('language-item');
    newLanguageItem.innerHTML = `
        <label>Language: <input type="text" name="language"></label>
        <label>Fluency: 
            <select name="fluency">
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Fluent">Fluent</option>
                <option value="Native">Native</option>
            </select>
        </label>
    `;
    languageContainer.appendChild(newLanguageItem);
}

function openResumePage() {
    const form = document.getElementById('resumeForm');

    // Check if any required fields are empty
    const requiredFields = form.querySelectorAll('[required]');
    for (let field of requiredFields) {
        if (!field.value.trim()) {
            alert('Please fill in all required fields.');
            field.focus(); // Focus on the first empty required field
            return;
        }
    }

    // Collect form data
    const name = form.elements['name'].value;
    const location = form.elements['location'].value;
    const email = form.elements['email'].value;
    const phone = form.elements['phone'].value;

    // Collect education, experience, skills, and languages data
    const education = Array.from(form.querySelectorAll('input[name="educationTitle"]')).map(input => input.value);
    const experience = Array.from(form.querySelectorAll('input[name="experienceTitle"]')).map(input => input.value);
    const skills = Array.from(form.querySelectorAll('input[name="skillsTitle"]')).map(input => input.value);

    const languages = Array.from(form.querySelectorAll('.language-item')).map(item => {
        const language = item.querySelector('input[name="language"]').value;
        const fluency = item.querySelector('select[name="fluency"]').value;
        return { language, fluency };
    });

    // Generate resume HTML
    const resumeHTML = `
        <html>
        <head>
            <title>Resume - ${name}</title>
            <link rel="stylesheet" href="../mainCss/mainCss.css">
            <link rel="stylesheet" href="../CV/style1.css">
        </head>
        <body>
            <div class="navbar">
                <a href="../mainPage/mainPage.html" class="homebutton">Home</a>
                <a href="../mainPage/mainPage.html#projects">Projects</a>
                <div class="dropdown">
                    <a href="" class="aboutme">About Me</a>
                    <div class="dropdown-content">
                        <a href="../CV/cv.html">CV</a>
                        <a href="../schedule/schedule.html">Schedule</a>
                    </div>
                </div>
            </div>

            <div class="container">
                <aside class="left-box">
                    <img src="image1.jpg" alt="Profile Image">
                    <h1>${name}</h1>
                    <p>${location}</p>
                    <p>Email: ${email}</p>
                    <p>Phone: ${phone}</p>

                    <h2><strong>Languages</strong></h2>
                    ${languages.map(item => `<p>${item.language}: ${item.fluency}</p>`).join('')}
                </aside>

                <main class="main-box">
                    <div class="education">
                        <h2><strong>Education</strong></h2>
                        ${education.map(item => `<p>${item}</p>`).join('')}
                    </div>

                    <div class="experience">
                        <h2><strong>Experience</strong></h2>
                        ${experience.map(item => `<p>${item}</p>`).join('')}
                    </div>

                    <div class="skills">
                        <h2><strong>Skills</strong></h2>
                        <div class="skill-bar">
                            ${skills.map(item => `<div class="skill">${item}</div>`).join('')}
                        </div>
                    </div>
                </main>
            </div>
            <footer class="footer">
        <p class="disclaimer"> Disclaimer: These projects are for academic purposes as part of my university studies</p>
    </footer>

        </body>
        </html>
    `;

    // Open the resume page
    const newWindow = window.open('', '_blank');
    newWindow.document.write(resumeHTML);
    newWindow.document.close();
}
