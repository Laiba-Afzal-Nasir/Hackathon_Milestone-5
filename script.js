// Get references to the form and display area
const  form = document.getElementById('resume-form');
const profileInput = document.getElementById('profilePicture');
const  resumeDisplayElement = document.getElementById('resume-output');
const  container = document.getElementById('container');
const link = document.getElementById('link');
const pdfButton = document.getElementById('pdfButton');

// Handle form submission

form.addEventListener('submit', function (event) {
    event.preventDefault(); // prevent page reload
    
    
    // Collect input values
    
    const  username = document.getElementById('username').value;
    const  name = document.getElementById('name').value;
    const  email = document.getElementById('email').value;
    const  phone = document.getElementById('phone').value;
    const education = document.getElementById('education').value;
    const  experience = document.getElementById('experience').value;
    const  skills = document.getElementById('skills').value;
    
    
// Save form data in localStorage with the username as the key
    
    
    const  resumeData = {
        name,
        email,
        phone,
        education,
        experience,
        skills
    };
    
localStorage.setItem(username, JSON.stringify(resumeData)); // Saving the data locally
    
   

/*         Profile Picture         */

const file = profileInput.files?.[0]

const profileUrl = file? URL.createObjectURL(file) : "";


    
    const outputHtml = `

    <h1>Dynamic Resume</h1>
    
    ${profileUrl ? `<img src="${profileUrl}" alt="Profile Picture" class="profilePicture">`:''}
    
    
    <h3>Personal Information</h3>
    
    <p><b>Name:</b><span contenteditable="true"> ${name}</span></p>
    
    <p><b>Email:</b><span contenteditable="true"> ${email}</span></p>
    
    <p><b>Phone:</b><span contenteditable="true"> ${phone}</span></p>
    
    
    <h3>Education</h3>
    <p contenteditable="true">${education}</p>
    
    
    <h3>Experience</h3>
   <p contenteditable="true">${experience}</p>
    
    
    <h3>Skills</h3>
    <p contenteditable="true">${skills}</p>   
    
`;



/*         Display  Resume         */

resumeDisplayElement.innerHTML = outputHtml;


// Generate a shareable URL with the username only

const  shareableURL = `${window.location.origin}?username=${encodeURIComponent(username)}`

    // Display the link
    
container.style.display = 'block';
link.href = shareableURL;
link.textContent = shareableURL;

});



//  PDF download


pdfButton.addEventListener('click',()=> {
    window.print();
// This will open the print dialog and allow the user to save as PDF
});



// Prefill the form based on the username in the URL


window.addEventListener('DOMContentLoaded',() => {
    const  urlParams = new URLSearchParams(window.location.search);
    
    const  username = urlParams.get('username');
    
    if (username) {
    
// Autofill form if data is found in localStorage

const  savedResumeData = localStorage.getItem(username);



   if (savedResumeData) {
   
const  resumeData = JSON.parse(savedResumeData);
            document.getElementById('username').value = username;
                     document.getElementById('email').value = resumeData.email;
            document.getElementById('phone').value = resumeData.phone;
            document.getElementById('education').value = resumeData.education;
            document.getElementById('experience').value = resumeData.experience;
            document.getElementById('skills').value = resumeData.skills;
        }
    }
    
  
 

});