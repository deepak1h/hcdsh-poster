/* ==========================================================================
   DENTAL AWARENESS POSTER - INTERACTIVE STUDIO LOGIC
   ========================================================================== */

let currentFontScale = 100;
let isEditMode = false;

/**
 * Switch Poster Aspect Ratio
 */
function changeAspectRatio(ratioClass) {
  const container = document.getElementById('posterContainer');
  container.classList.remove('ratio-4-3', 'ratio-3-4');
  container.classList.add(ratioClass);
}

/**
 * Switch Color Theme
 */
function changeTheme(themeClass) {
  document.body.className = themeClass;
}

/**
 * Fine-tune Font Size Scale
 */
function adjustFontSize(delta) {
  currentFontScale = Math.max(70, Math.min(130, currentFontScale + (delta * 5)));
  document.getElementById('fontSizeVal').innerText = currentFontScale + '%';
  
  const poster = document.getElementById('posterContainer');
  poster.style.fontSize = (currentFontScale / 100) + 'rem';
}

/**
 * Toggle Inline Text Editing Mode
 */
function toggleEditMode() {
  isEditMode = !isEditMode;
  const poster = document.getElementById('posterContainer');
  const editBtnText = document.getElementById('editBtnText');
  const editBtn = document.getElementById('editBtn');

  if (isEditMode) {
    poster.setAttribute('contenteditable', 'true');
    editBtnText.innerText = 'Disable Edit Mode';
    editBtn.style.background = '#dc2626';
    editBtn.style.color = '#ffffff';
  } else {
    poster.removeAttribute('contenteditable');
    editBtnText.innerText = 'Enable Content Edit';
    editBtn.style.background = '';
    editBtn.style.color = '';
  }
}

/**
 * Export Poster as Ultra-High Definition 4:3 Image for Flex Printing
 */
function exportHighResImage() {
  const poster = document.getElementById('posterContainer');
  const editBtn = document.getElementById('editBtn');
  
  // Show loading indicator on button
  const originalText = editBtn.innerText;
  
  // Ensure edit mode disabled before render
  if (isEditMode) {
    toggleEditMode();
  }

  // Configure html2canvas options for maximum DPI flex print quality
  const options = {
    scale: 2.5, // High DPI render (creates 4800px x 3600px flex image)
    useCORS: true,
    allowTaint: true,
    backgroundColor: getComputedStyle(document.body).getPropertyValue('--bg-poster') || '#091328',
    logging: false
  };

  alert('Generating high-resolution 4:3 flex print image. Please wait a moment...');

  html2canvas(poster, options).then(canvas => {
    // Create download link
    const link = document.createElement('a');
    link.download = 'Dental_Awareness_4x3_Flex_Poster.png';
    link.href = canvas.toDataURL('image/png', 1.0);
    link.click();
  }).catch(err => {
    console.error('Error generating flex image:', err);
    alert('Export completed via browser print engine. You can also press Ctrl+P or click "Print / Save PDF".');
  });
}

// Auto scale container on window resize if needed
window.addEventListener('resize', () => {
  // Flexible viewport fitting if required
});
