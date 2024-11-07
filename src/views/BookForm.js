export class BookForm {
    constructor() {
        this.formContainer = document.getElementById("book-form");
        this.isEditMode = false;
    }

    render(onSubmit, isEdit = false) {
        this.isEditMode = isEdit;
        this.formContainer.innerHTML = `
            <div class="card form-card glassy">
                <div class="card-body">
                    <h2 class="h2 mb-3">${isEdit ? 'Edit Buku' : 'Tambah Buku'}</h2>
                    <form id="book-form">
                        <div class="mb-3">
                            <label for="title" class="form-label">Judul Buku</label>
                            <input type="text" class="form-control rounded-pill neumorphic-input" id="title" placeholder="Judul Buku" required>
                        </div>
                        <div class="mb-3">
                            <label for="author" class="form-label">Penulis</label>
                            <input type="text" class="form-control rounded-pill neumorphic-input" id="author" placeholder="Penulis Buku" required>
                        </div>
                        <div class="mb-3">
                            <label for="year" class="form-label">Tahun Terbit</label>
                            <input type="number" class="form-control rounded-pill neumorphic-input" id="year" placeholder="Tahun Buku" required>
                        </div>
                        <div class="mb-3">
                            <label for="category" class="form-label">Kategori</label>
                            <select class="form-select rounded-pill" id="category" required>
                                <option value="">Pilih Kategori</option>
                                <option value="Fiksi">Fiksi</option>
                                <option value="Non-Fiksi">Non-Fiksi</option>
                                <option value="Referensi">Referensi</option>
                                <option value="Textbook">Textbook</option>
                            </select>
                        </div>
                        <div class="mb-3">
                            <label for="genre" class="form-label">Genre</label>
                            <select class="form-select rounded-pill" id="genre" required>
                                <option value="">Pilih Genre</option>
                                <option value="Novel">Novel</option>
                                <option value="Cerpen">Cerpen</option>
                                <option value="Komik">Komik</option>
                                <option value="Fantasi">Fantasi</option>
                                <option value="Humor">Humor</option>
                                <option value="Romansa">Romansa</option>
                                <option value="Fiksi ilmiah">Fiksi ilmiah</option>
                            </select>
                        </div>
                        <div class="mb-3">
                            <label for="status" class="form-label">Status Buku</label>
                            <select class="form-select rounded-pill" id="status" required>
                                <option value="tersedia">Tersedia</option>
                                <option value="dipinjam">Dipinjam</option>
                            </select>
                        </div>
                        <button type="submit" class="btn btn-primary w-100 rounded-pill shadow-neumorphic">Simpan Buku</button>
                    </form>
                </div>
            </div>
            `;

        this.formContainer.querySelector("form").addEventListener("submit", (e) => {
            e.preventDefault();
            const title = document.getElementById("title").value;
            const author = document.getElementById("author").value;
            const year = document.getElementById("year").value;
            const category = document.getElementById("category").value;
            const genre = document.getElementById("genre").value;
            const status = document.getElementById("status").value;
            onSubmit({title, author, year, category, genre, status});
            this.resetForm();
        });
    }

    if(book) {
        this.fillForm(book);
    }

    fillForm(book) {
        document.getElementById("title").value = book.title;
        document.getElementById("author").value = book.author;
        document.getElementById("year").value = book.year;
        document.getElementById("category").value = book.category || '';
        document.getElementById("genre").value = book.genre || '';
        document.getElementById("status").value = book.status || 'tersedia';
    }

    resetForm() {
        document.getElementById("title").value = "";
        document.getElementById("author").value = "";
        document.getElementById("year").value = "";
        document.getElementById("category").value = "";
        document.getElementById("genre").value = "";
        document.getElementById("status").value = "tersedia";
    }
}