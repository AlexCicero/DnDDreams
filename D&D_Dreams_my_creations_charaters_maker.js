// D&D_Dreams_my_creations_charaters_maker.js

// Initialize modals
const saveModal = document.getElementById('saveModal');
const saveSuccessModal = document.getElementById('saveSuccessModal');
let isEditing = false;

window.onload = function() {
    const editingCharacter = JSON.parse(localStorage.getItem('editingCharacter'));
    const editingIndex = localStorage.getItem('editingIndex');

    // Fix for your HTML typo (extra space in 'characterName ')
    document.getElementById('characterName').value = editingCharacter?.name || '';
    document.getElementById('characterClass').value = editingCharacter?.class || '';
    document.getElementById('characterLevel').value = editingCharacter?.level || '';

    if (editingCharacter) {
        isEditing = true;
        localStorage.removeItem('editingCharacter');
        localStorage.removeItem('editingIndex');
    }

    // Modal event listeners
    document.getElementById('confirmSave')?.addEventListener('click', handleSaveConfirmation);
    document.getElementById('cancelSave')?.addEventListener('click', () => saveModal.style.display = 'none');
    document.getElementById('closeSuccess')?.addEventListener('click', () => {
        saveSuccessModal.style.display = 'none';
        window.location.href = 'D&D_Dreams_my_creations_charaters.html';
    });
};

function saveCharacter() {
    saveModal.style.display = 'block';
}

function handleSaveConfirmation() {
    const characterName = document.getElementById('characterName').value;
    const characterClass = document.getElementById('characterClass').value;
    const characterLevel = document.getElementById('characterLevel').value;

    const characterList = JSON.parse(localStorage.getItem('characters')) || [];
    const editingIndex = localStorage.getItem('editingIndex');

    if (editingIndex !== null) {
        // Update existing character
        characterList[editingIndex] = { 
            name: characterName,
            class: characterClass,
            level: characterLevel
        };
        localStorage.removeItem('editingIndex');
    } else {
        // Add new character
        characterList.push({
            name: characterName,
            class: characterClass,
            level: characterLevel
        });
    }

    localStorage.setItem('characters', JSON.stringify(characterList));
    saveModal.style.display = 'none';
    saveSuccessModal.style.display = 'block';
}

// Form submission handler
document.getElementById('character-form')?.addEventListener('submit', function(event) {
    event.preventDefault();
    saveCharacter();
});