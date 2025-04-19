// D&D_Dreams_my_creations_charaters_list.js
document.addEventListener('DOMContentLoaded', () => {
    let deleteIndex = null;
    const contextMenu = document.getElementById('contextMenu');
    const deleteModal = document.getElementById('deleteModal');

    // Load initial characters
    loadCharacters();

    // Table click handler (using event delegation)
    document.getElementById('character-list').addEventListener('click', (e) => {
        const row = e.target.closest('tr');
        if (!row) return;

        // Get stored index from data attribute
        deleteIndex = parseInt(row.dataset.index);
        
        // Position context menu
        contextMenu.style.display = 'block';
        contextMenu.style.left = `${e.clientX}px`;
        contextMenu.style.top = `${e.clientY}px`;
        // Update delete modal
        const characters = JSON.parse(localStorage.getItem('characters')) || [];
        document.getElementById('deleteCharacterName').textContent = characters[deleteIndex]?.name || '';
    });

    // Context menu handlers
    document.querySelector('.edit-btn').addEventListener('click', () => {
        contextMenu.style.display = 'none';
        if (deleteIndex !== null) {
            editCharacter(deleteIndex);
        }
    });

    document.querySelector('.delete-btn').addEventListener('click', () => {
        contextMenu.style.display = 'none';
        deleteModal.style.display = 'block';
    });

    // Modal handlers
    document.getElementById('confirmDelete').addEventListener('click', () => {
        if (deleteIndex !== null) {
            const characters = JSON.parse(localStorage.getItem('characters')) || [];
            characters.splice(deleteIndex, 1);
            localStorage.setItem('characters', JSON.stringify(characters));
            loadCharacters();
        }
        deleteModal.style.display = 'none';
    });

    document.getElementById('cancelDelete').addEventListener('click', () => {
        deleteModal.style.display = 'none';
    });
});

function loadCharacters() {
    const characters = JSON.parse(localStorage.getItem('characters')) || [];
    const tbody = document.getElementById('character-list');
    
    tbody.innerHTML = characters.map((character, index) => `
        <tr data-index="${index}">
            <td>${character.name}</td>
            <td>${character.class}</td>
            <td>${character.level}</td>
        </tr>
    `).join('');
}

function editCharacter(index) {
    const characters = JSON.parse(localStorage.getItem('characters')) || [];
    if (characters[index]) {
        localStorage.setItem('editingCharacter', JSON.stringify(characters[index]));
        localStorage.setItem('editingIndex', index.toString());
        window.location.href = 'D&D_Dreams_my_creations_charaters_maker.html';
    }
}


document.addEventListener('click', (event) => {
    const row = event.target.closest('tr');
    const button = event.target.closest('.edit-btn, .delete-btn');
    
    // If a button is clicked, keep the row active
    if (button) {
        if (row) {
            row.classList.add('active'); // Keep the row active
        }
        return; // Exit early to prevent further processing
    }
    
    // If a row is clicked, activate it and deactivate others
    if (row) {
        // Remove active class from all rows first
        document.querySelectorAll('tr').forEach(r => r.classList.remove('active'));
        row.classList.add('active'); // Activate the clicked row
    } else {
        // If clicking outside of any row or button, remove active class
        document.querySelectorAll('tr').forEach(r => r.classList.remove('active'));
    }
});

// Close when clicking outside the table
document.addEventListener('click', (event) => {
    if (!event.target.closest('table')) {
        document.querySelectorAll('tr').forEach(r => r.classList.remove('active'));
    }
});

// Add this to your existing code
document.addEventListener('click', (event) => {
    const contextMenu = document.getElementById('contextMenu');
    const isClickInsideMenu = contextMenu.contains(event.target);
    const isClickOnRow = event.target.closest('tr');
    const isDeleteModal = event.target.closest('#deleteModal');

    // Close context menu if clicking outside
    if (!isClickInsideMenu && !isClickOnRow && !isDeleteModal) {
        contextMenu.style.display = 'none';
        document.querySelectorAll('tr').forEach(r => r.classList.remove('active'));
    }
});

// Modify your existing row click handler to stop propagation
document.getElementById('character-list').addEventListener('click', (e) => {
    const row = e.target.closest('tr');
    if (!row) return;
    
    e.stopPropagation(); // Add this line
    deleteIndex = parseInt(row.dataset.index);
    
    // Rest of your existing code...
    contextMenu.style.display = 'block';
    contextMenu.style.left = `${e.clientX}px`;
    contextMenu.style.top = `${e.clientY}px`;
    const characters = JSON.parse(localStorage.getItem('characters')) || [];
    document.getElementById('deleteCharacterName').textContent = characters[deleteIndex]?.name || '';
});