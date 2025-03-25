export function setupNotes() {
    const notesContainer = document.querySelector('.notes-container');
    const notesModal = document.querySelector('.notes-modal-parent');
    const notesHeading = document.querySelector('.notes-heading');
    const addButton = document.querySelector('.add');
    const notesTickets = document.querySelector('.notes-tickets');

    // Toggle notes modal
    notesContainer.addEventListener('click', () => {
        notesModal.classList.toggle('hide');
        notesModal.style.height = notesModal.classList.contains('hide') ? '0vh' : '88vh';
    });

    // Close notes modal
    notesHeading.addEventListener('click', () => {
        notesModal.classList.add('hide');
        notesModal.style.height = '0vh';
    });

    // Add new note
    addButton.addEventListener('click', () => {
        createNote(notesTickets);
    });
}

function createNote(container) {
    const notes = container.querySelectorAll('.stick-note');
    if (notes.length > 7) {
        console.log("Wait -- Maximum number of notes reached !!");
        return ;        
    }

    const note = document.createElement('div');
    note.className = 'stick-note';
    note.style.backgroundColor = getRandomColor();

    note.innerHTML = `
        <div class="s-title">
            <div class="s-head">Title</div>
            <div class="s-close">X</div>
        </div>
        <div class="s-content" contenteditable="true">Add your note here...</div>
    `;

    // Add delete functionality
    note.querySelector('.s-close').addEventListener('click', () => {
        note.remove();
    });

    container.appendChild(note);
}

function getRandomColor() {
    const colors = [
        '#8E95A4', '#979DAC','#3E038C','#5004B4','#016EB6','#017ACB','#566076','#0466C8','#0353A4','#0352A0','#0352A0'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
}