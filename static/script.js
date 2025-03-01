// DOM Elements
const apiKeyInput = document.getElementById('apiKey');
const inputText = document.getElementById('inputText');
const previewSection = document.getElementById('preview');
const themeIcon = document.getElementById('theme-icon');

// Check for saved theme preference or use system preference
document.addEventListener('DOMContentLoaded', () => {
  // Set the initial theme
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.body.classList.add('dark');
    updateThemeIcon(true);
  } else {
    updateThemeIcon(false);
  }

  // Check for saved API key
  const savedApiKey = localStorage.getItem('apiKey');
  if (savedApiKey) {
    apiKeyInput.value = savedApiKey;
  }
});

// Toggle dark/light mode
function toggleDarkMode() {
  const isDarkMode = document.body.classList.toggle('dark');
  localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  updateThemeIcon(isDarkMode);
}

// Update theme icon based on current mode
function updateThemeIcon(isDarkMode) {
  if (isDarkMode) {
    themeIcon.innerHTML = '<circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>';
  } else {
    themeIcon.innerHTML = '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>';
  }
}

// Validate and save API key
async function validateKey() {
  const apiKey = apiKeyInput.value.trim();
  
  if (!apiKey) {
    alert('Please enter an API key');
    return false;
  }
  
  // Get the button element directly
  const validateButton = document.querySelector('.api-key-section button');
  
  try {
    // Show validation is in progress
    const originalButtonText = validateButton.textContent;
    validateButton.textContent = 'Validating...';
    validateButton.disabled = true;
    
    // Use the existing generate endpoint with minimal content
    const response = await fetch('/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': apiKey
      },
      body: JSON.stringify({ text: 'test validation' })
    });
    
    // Reset button state
    validateButton.textContent = originalButtonText;
    validateButton.disabled = false;
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || 'Invalid API key');
    }
    
    // Key is valid, save it to localStorage
    localStorage.setItem('apiKey', apiKey);
    alert('API key validated and saved successfully');
    return true;
    
  } catch (error) {
    // Reset button state in case of error
    validateButton.textContent = 'Activate';
    validateButton.disabled = false;
    
    alert(`API key validation failed: ${error.message}`);
    return false;
  }
}

// Generate README from input text
async function generateReadme() {
  // Make sure we have valid API key
  const apiKey = apiKeyInput.value.trim();
  if (!apiKey) {
    alert('Please enter your API key first');
    return;
  }
  
  // Get input text
  const text = inputText.value.trim();
  if (!text) {
    alert('Please enter project details');
    return;
  }
  
  // Get the generate button
  const generateButton = document.querySelector('.input-section button');
  const originalButtonText = generateButton.textContent;
  
  try {
    // Show loading state
    generateButton.textContent = 'Generating...';
    generateButton.disabled = true;
    previewSection.innerHTML = '<div class="text-center p-4">Generating README...</div>';
    previewSection.classList.remove('hidden');
    
    // Send request to backend
    const response = await fetch('/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': apiKey
      },
      body: JSON.stringify({ text })
    });
    
    // Reset button state
    generateButton.textContent = originalButtonText;
    generateButton.disabled = false;
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || 'Failed to generate README');
    }
    
    // Get and display the markdown content
    const markdown = await response.text();
    previewSection.innerHTML = marked.parse(markdown);
    
    // Store the raw markdown for copying/downloading
    previewSection.setAttribute('data-markdown', markdown);
    
  } catch (error) {
    // Reset button state in case of error
    generateButton.textContent = originalButtonText;
    generateButton.disabled = false;
    
    previewSection.innerHTML = `<div class="text-red-500 p-4">Error: ${error.message}</div>`;
  }
}

// Copy generated README to clipboard
function copyText() {
  const markdown = previewSection.getAttribute('data-markdown');
  if (!markdown) {
    alert('Generate a README first');
    return;
  }
  
  navigator.clipboard.writeText(markdown)
    .then(() => {
      alert('README copied to clipboard');
    })
    .catch(err => {
      console.error('Failed to copy: ', err);
      alert('Failed to copy to clipboard');
    });
}

// Download README.md file
function downloadFile() {
  const markdown = previewSection.getAttribute('data-markdown');
  if (!markdown) {
    alert('Generate a README first');
    return;
  }
  
  const blob = new Blob([markdown], { type: 'text/markdown' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  
  a.href = url;
  a.download = 'README.md';
  document.body.appendChild(a);
  a.click();
  
  // Cleanup
  setTimeout(() => {
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, 100);
}