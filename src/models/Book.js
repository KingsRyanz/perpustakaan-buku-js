export class Book {
    constructor(id, title, author, year, category, genre, status = "tersedia") {
        this.id = id;
        this.title = title;
        this.author = author;
        this.year = year;
        this.category = category;
        this.genre = genre;
        this.status = status;
    }
}