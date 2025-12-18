'use strict';

const songs = [
    {
        title: "Anti-Hero",
        artist: "Taylor Swift",
        category: "Pop",
        language: "English"
    },
    {
        title: "Shake It Off",
        artist: "Taylor Swift",
        category: "Pop",
        language: "English"
    },
    {
        title: "Happiness",
        artist: "The 1975",
        category: "Indie Rock",
        language: "English"
    },
    {
        title: "I'm in Love with You",
        artist: "The 1975",
        category: "Indie Rock",
        language: "English"
    },
    {
        title: "How Long",
        artist: "Charlie Puth",
        category: "Pop",
        language: "English"
    },
    {
        title: "The Way I Am",
        artist: "Charlie Puth",
        category: "Pop",
        language: "English"
    },
    {
        title: "Feuerwerk",
        artist: "Wincent Weiss",
        category: "Pop",
        language: "German"
    },
    {
        title: "Musik sein",
        artist: "Wincent Weiss",
        category: "Pop",
        language: "German"
    },
    {
        title: "Deja Vu",
        artist: "Mike Singer",
        category: "Pop",
        language: "German"
    },
    {
        title: "Jung und frei",
        artist: "Mike Singer",
        category: "Pop",
        language: "German"
    },
    {
        title: "Bad Life",
        artist: "Sigrid",
        category: "Pop",
        language: "English"
    },
    {
        title: "Borderline",
        artist: "Sigrid",
        category: "Pop",
        language: "English"
    },
    {
        title: "Lean On Me",
        artist: "Clementine",
        category: "Pop",
        language: "English"
    },
    {
        title: "Bittersweet",
        artist: "Clementine",
        category: "Pop",
        language: "English"
    },
    {
        title: "J'ai cherché",
        artist: "Amir",
        category: "Pop",
        language: "French"
    },
    {
        title: "Longtemps",
        artist: "Amir",
        category: "Pop",
        language: "French"
    }
];

let currentLanguage = 'all';
let currentCategory = 'all';

const languageSelect = document.getElementById('language-filter');
const categorySelect = document.getElementById('category-filter');
const tbody = document.querySelector('tbody');

function createSongRow(song) {
    return `
        <tr>
            <td>
                <div class="cell-content">
                    <span class="text">${song.title}</span>
                    <button class="copy-btn">Copy</button>
                </div>
            </td>
            <td>
                <div class="cell-content">
                    <span class="text">${song.artist}</span>
                    <button class="copy-btn">Copy</button>
                </div>
            </td>
            <td>${song.category}</td>
            <td>${song.language}</td>
        </tr>
    `;
}

function renderSongs() {
	tbody.innerHTML = '';

    const filtered = songs.filter((song) => {
        const matchLanguage = currentLanguage === 'all' || song.language === currentLanguage;
        const matchCategory = currentCategory === 'all' || song.category === currentCategory;

        return matchLanguage && matchCategory;
    });

     filtered.forEach((song) => {
		tbody.insertAdjacentHTML('beforeend', createSongRow(song));
	 });
}

languageSelect.addEventListener('change', (e) => {
	currentLanguage = e.target.value;
	renderSongs();
});

categorySelect.addEventListener('change', (e) => {
	currentCategory = e.target.value;
	renderSongs();
});

// Initial render
renderSongs();

tbody.addEventListener('click', (e) => {
	if (!e.target.classList.contains('copy-btn')) {
		return;
	}

	const cellContent = e.target.closest('.cell-content');
	const textElement = cellContent.querySelector('.text');
	const textToCopy = textElement.textContent;

	navigator.clipboard.writeText(textToCopy)
		.then(() => {
			const originalText = e.target.textContent;
            e.target.textContent = 'Copied!';

            setTimeout(() => {
                e.target.textContent = originalText;
            }, 1000);
		})
		.catch((err) => {
            console.error('Failed to copy:', err);
         });;
});