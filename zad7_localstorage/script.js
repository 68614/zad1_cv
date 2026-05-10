// ============================================================
//  Zadanie 7 – Local Storage
//  Cel: zapisywanie/odczyt/usuwanie notatek bez backendu
// ============================================================

const STORAGE_KEY = "cv_notes";

// --- Elementy DOM ---
const noteInput   = document.getElementById("noteInput");
const addBtn      = document.getElementById("addBtn");
const notesList   = document.getElementById("notesList");
const emptyMsg    = document.getElementById("emptyMsg");
const clearAllBtn = document.getElementById("clearAllBtn");
const counter     = document.getElementById("counter");

// -------------------------------------------------------
// 1. Odczyt danych z localStorage po załadowaniu strony
// -------------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
    renderNotes();
});

// -------------------------------------------------------
// 2. Dodanie nowej notatki
// -------------------------------------------------------
addBtn.addEventListener("click", addNote);

noteInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") addNote();
});

function addNote() {
    const text = noteInput.value.trim();

    if (text === "") {
        noteInput.focus();
        noteInput.style.borderColor = "#ef4444";
        setTimeout(() => { noteInput.style.borderColor = ""; }, 1000);
        return;
    }

    // Pobierz istniejące notatki
    const notes = getNotes();

    // Dodaj nową notatkę z datą
    const newNote = {
        id:   Date.now(),
        text: text,
        date: new Date().toLocaleString("pl-PL", {
            day: "2-digit", month: "2-digit", year: "numeric",
            hour: "2-digit", minute: "2-digit"
        })
    };

    notes.unshift(newNote); // dodaj na początku listy

    // Zapis do localStorage
    saveNotes(notes);

    // Wyczyść input i odśwież widok
    noteInput.value = "";
    noteInput.focus();
    renderNotes();
}

// -------------------------------------------------------
// 3. Usunięcie pojedynczej notatki
// -------------------------------------------------------
function deleteNote(id) {
    const notes = getNotes().filter(note => note.id !== id);
    saveNotes(notes);
    renderNotes();
}

// -------------------------------------------------------
// 4. Usuń wszystkie notatki
// -------------------------------------------------------
clearAllBtn.addEventListener("click", () => {
    if (getNotes().length === 0) return;
    if (confirm("Czy na pewno chcesz usunąć wszystkie notatki?")) {
        localStorage.removeItem(STORAGE_KEY);
        renderNotes();
    }
});

// -------------------------------------------------------
// Pomocnicze: zapis / odczyt z localStorage
// -------------------------------------------------------
function saveNotes(notes) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}

function getNotes() {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
}

// -------------------------------------------------------
// Renderowanie listy notatek w DOM
// -------------------------------------------------------
function renderNotes() {
    const notes = getNotes();

    // Wyczyść listę (zostaw emptyMsg)
    notesList.innerHTML = "";

    // Aktualizuj licznik
    counter.innerHTML = `Notatek: <strong>${notes.length}</strong>`;

    if (notes.length === 0) {
        const li = document.createElement("li");
        li.className = "empty-msg";
        li.id = "emptyMsg";
        li.textContent = "Brak notatek. Dodaj pierwszą! 👆";
        notesList.appendChild(li);
        return;
    }

    // Renderuj każdą notatkę
    notes.forEach(note => {
        const li = document.createElement("li");

        const textSpan = document.createElement("span");
        textSpan.className = "note-text";
        textSpan.textContent = note.text;

        const dateSpan = document.createElement("span");
        dateSpan.className = "note-date";
        dateSpan.textContent = note.date;

        const delBtn = document.createElement("button");
        delBtn.className = "delete-btn";
        delBtn.textContent = "Usuń";
        delBtn.addEventListener("click", () => deleteNote(note.id));

        li.appendChild(textSpan);
        li.appendChild(dateSpan);
        li.appendChild(delBtn);
        notesList.appendChild(li);
    });
}
