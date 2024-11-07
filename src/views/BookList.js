export class BookList {
    constructor() {
        this.bookListContainer = document.getElementById("book-list");
        this.filterState = {
            title: '',
            author: '',
            year: '',
            genre: '',
            status: '',
            category: ''
        };
        this.books = [];
        this.onDelete = null;
        this.onEdit = null;
    }

    render(books, onDelete, onEdit) {
        this.books = books;
        this.onDelete = onDelete;
        this.onEdit = onEdit;

        if (books.length === 0) {
            this.bookListContainer.innerHTML = '<p class="text-center">Belum ada buku yang ditambahkan.</p>';
            return;
        }

        this.renderLayout();
        this.attachEventListeners();
        this.renderFilteredBooks();
    }

    renderLayout() {
        this.bookListContainer.innerHTML = `
            <div class="mb-4">
                <div class="card shadow-neumorphic glassy p-3">
                    <div class="d-flex justify-content-between align-items-center mb-3">
                        <h5 class="mb-0">Filter Buku</h5>
                        <span class="badge bg-primary">Total Buku: ${this.books.length}</span>
                    </div>
                    <div class="row g-3">
                        <div class="col-md-4">
                            <input type="text" 
                                class="form-control rounded-pill neumorphic-input" 
                                id="filterTitle" 
                                placeholder="Filter judul..."
                                value="${this.filterState.title}">
                        </div>
                        <div class="col-md-4">
                            <input type="text" 
                                class="form-control rounded-pill neumorphic-input" 
                                id="filterAuthor" 
                                placeholder="Filter penulis..."
                                value="${this.filterState.author}">
                        </div>
                        <div class="col-md-4">
                            <select class="form-select rounded-pill" 
                                id="filterYear" 
                                value="${this.filterState.year}">
                                <option value="">Semua Tahun</option>
                                ${this.getUniqueYears().map(year => 
                                    `<option value="${year}" ${year.toString() === this.filterState.year ? 'selected' : ''}>${year}</option>`
                                ).join('')}
                            </select>
                        </div>
                        <div class="col-md-4">
                            <select class="form-select rounded-pill" 
                                id="filterGenre" 
                                value="${this.filterState.genre}">
                                <option value="">Semua Genre</option>
                                ${this.getUniqueValues('genre').map(genre => 
                                    `<option value="${genre}" ${genre === this.filterState.genre ? 'selected' : ''}>${genre}</option>`
                                ).join('')}
                            </select>
                        </div>
                        <div class="col-md-4">
                            <select class="form-select rounded-pill" 
                                id="filterStatus" 
                                value="${this.filterState.status}">
                                <option value="">Semua Status</option>
                                <option value="tersedia" ${this.filterState.status === 'tersedia' ? 'selected' : ''}>Tersedia</option>
                                <option value="dipinjam" ${this.filterState.status === 'dipinjam' ? 'selected' : ''}>Dipinjam</option>
                            </select>
                        </div>
                        <div class="col-md-4">
                            <select class="form-select rounded-pill" 
                                id="filterCategory" 
                                value="${this.filterState.category}">
                                <option value="">Semua Kategori</option>
                                ${this.getUniqueValues('category').map(category => 
                                    `<option value="${category}" ${category === this.filterState.category ? 'selected' : ''}>${category}</option>`
                                ).join('')}
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <div class="d-flex justify-content-between align-items-center mt-2 mb-3">
                <div>
                    <button class="btn btn-secondary btn-sm rounded-pill" id="resetFilter">
                        Reset Filter
                    </button>
                </div>
                <span class="badge bg-info">Hasil Pencarian: <span id="searchCount">0</span></span>
            </div>
            <h2 class="h4 mb-3">Daftar Buku</h2>
            <div class="row" id="filtered-books"></div>
        `;
    }

    renderFilteredBooks() {
        const filteredBooksContainer = document.getElementById('filtered-books');
        const filteredBooks = this.filterBooks(this.books);
        
        // Update search count
        document.getElementById('searchCount').textContent = filteredBooks.length;

        filteredBooksContainer.innerHTML = filteredBooks
            .map(
                (book) => `
                <div class="col-md-6 mb-3">
                    <div class="card shadow-neumorphic book-card glassy">
                        <div class="card-body">
                            <h5 class="card-title">${book.title}</h5>
                            <p class="card-text mb-1"><strong>Penulis:</strong> ${book.author}</p>
                            <p class="card-text mb-1"><strong>Tahun:</strong> ${book.year}</p>
                            <p class="card-text mb-1"><strong>Kategori:</strong> ${book.category || '-'}</p>
                            <p class="card-text mb-1"><strong>Genre:</strong> ${book.genre || '-'}</p>
                            <p class="card-text mb-1">
                                <strong>Status:</strong> 
                                <span class="badge ${book.status === 'tersedia' ? 'bg-success' : 'bg-warning'}">
                                    ${book.status}
                                </span>
                            </p>
                            <div class="d-flex justify-content-end mt-2">
                                <button class="btn btn-warning btn-sm me-2 edit-btn shadow-neumorphic" data-id="${book.id}">Edit</button>
                                <button class="btn btn-danger btn-sm delete-btn shadow-neumorphic" data-id="${book.id}">Hapus</button>
                            </div>
                        </div>
                    </div>
                </div>
                `
            )
            .join("");

        // Reattach button event listeners
        filteredBooksContainer.querySelectorAll(".delete-btn").forEach((button) => {
            button.addEventListener("click", () => this.onDelete(button.dataset.id));
        });
    
        filteredBooksContainer.querySelectorAll(".edit-btn").forEach((button) => {
            button.addEventListener("click", () => this.onEdit(button.dataset.id));
        });
    }

    attachEventListeners() {
        ['filterTitle', 'filterAuthor', 'filterYear', 'filterGenre', 'filterStatus', 'filterCategory'].forEach(filterId => {
            const filterInput = document.getElementById(filterId);
            filterInput.addEventListener('input', (e) => {
                const filterKey = filterId.replace('filter', '').toLowerCase();
                this.filterState[filterKey] = e.target.value;
                this.renderFilteredBooks();
            });
        });

        document.getElementById('resetFilter')?.addEventListener('click', () => {
            this.filterState = {
                title: '',
                author: '',
                year: '',
                genre: '',
                status: '',
                category: ''
            };
            this.renderLayout();
            this.attachEventListeners();
            this.renderFilteredBooks();
        });
    }

    filterBooks(books) {
        return books.filter(book => {
            const matchTitle = book.title.toLowerCase().includes(this.filterState.title.toLowerCase());
            const matchAuthor = book.author.toLowerCase().includes(this.filterState.author.toLowerCase());
            const matchYear = this.filterState.year === '' || book.year.toString() === this.filterState.year;
            const matchGenre = this.filterState.genre === '' || book.genre === this.filterState.genre;
            const matchStatus = this.filterState.status === '' || book.status === this.filterState.status;
            const matchCategory = this.filterState.category === '' || book.category === this.filterState.category;

            return matchTitle && matchAuthor && matchYear && matchGenre && matchStatus && matchCategory;
        });
    }

    getUniqueYears() {
        const years = this.books.map(book => book.year);
        return [...new Set(years)].sort((a, b) => b - a); // Urutkan dari tahun terbaru
    }

    getUniqueValues(property) {
        const values = this.books.map(book => book[property]).filter(value => value); // Filter out null/undefined
        return [...new Set(values)].sort();
    }
};