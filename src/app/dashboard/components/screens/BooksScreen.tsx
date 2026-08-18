"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { BOOK_CATALOG, BOOK_GENRES, GENRE_SUBJECT_MAP } from "../../data";
import type { SubjectData } from "./DiscoverScreen";
import { SearchIcon } from "./shared";

type BooksProps = {
  subjects: Record<string, SubjectData>;
  openSubject: (id: string, pane?: string) => void;
};

type CatalogBook = {
  title: string;
  genre: string;
  icon: string;
  type: string;
  spotlight?: boolean;
};

export function bookFileMeta(title: string) {
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  const seed = title.length;
  const pages = 80 + (seed * 7) % 220;
  const sizeMB = (2 + (seed % 9) * 0.6).toFixed(1);
  return { filename: slug + ".pdf", url: "/files/library/" + slug + ".pdf", pages, sizeMB };
}

function chipColor(genre: string): string {
  const c = BOOK_GENRES.find((g) => g.name === genre);
  return c ? c.color : "thread";
}

export default function BooksScreen({ subjects, openSubject }: BooksProps) {
  const router = useRouter();
  const [bookType, setBookType] = useState<"books" | "pastquestions">("books");
  const [shelfFilter, setShelfFilter] = useState("all");
  const [query, setQuery] = useState("");

  const chipSource = useMemo(
    () =>
      bookType === "pastquestions"
        ? Object.values(subjects).map((s) => ({ name: s.name, color: s.color }))
        : BOOK_GENRES.map((g) => ({ name: g.name, color: g.color })),
    [bookType, subjects],
  );

  const colorOf = (name: string) => {
    const c = chipSource.find((x) => x.name === name);
    return c ? c.color : "thread";
  };

  const q = query.trim().toLowerCase();

  const shelfChips = [{ name: "all", label: "All" }].concat(
    chipSource.map((c) => ({ name: c.name, label: c.name })),
  );

  const matchesFilter = (genre: string) =>
    shelfFilter === "all" || genre === shelfFilter;
  const matchesQuery = (title: string) => !q || title.toLowerCase().includes(q);

  const spotlightBooks = BOOK_CATALOG.filter(
    (b) => b.type === bookType && b.spotlight && matchesFilter(b.genre) && matchesQuery(b.title),
  );

  // pastquestions (Textbooks) view -> subject grid
  const subjectItems = Object.keys(subjects).filter((id) => {
    const s = subjects[id];
    return (shelfFilter === "all" || s.name === shelfFilter) && (!q || s.name.toLowerCase().includes(q));
  });

  const genreRows = useMemo(() => {
    if (bookType !== "books") return [];
    const genres =
      shelfFilter === "all" ? BOOK_GENRES.map((g) => g.name) : [shelfFilter];
    return genres
      .map((genreName) => {
        const items = BOOK_CATALOG.filter(
          (b) =>
            b.type === "books" &&
            b.genre === genreName &&
            (!q || b.title.toLowerCase().includes(q)),
        );
        if (!items.length) return null;
        return { genreName, items };
      })
      .filter(Boolean) as { genreName: string; items: CatalogBook[] }[];
  }, [bookType, shelfFilter, q]);

  const selectType = (type: "books" | "pastquestions") => setBookType(type);

  const selectShelf = (name: string) => setShelfFilter(name);

  const openBook = (title: string) => router.push(`/dashboard/books/${encodeURIComponent(title)}`);

  const BookCover = ({ b }: { b: CatalogBook }) => (
    <div
      className="book-cover-card"
      data-book-title={b.title.toLowerCase()}
      data-book-genre={b.genre}
      onClick={() => openBook(b.title)}
    >
      <div className="book-cover" style={{ background: `var(--${colorOf(b.genre)}-soft)` }}>
        <span className="book-cover-menu">⋮</span>
        <div>
          <div className="book-cover-icon">{b.icon}</div>
        </div>
      </div>
      <div className="book-card-name">{b.title}</div>
    </div>
  );

  const SubjectCover = ({ id }: { id: string }) => {
    const s = subjects[id];
    return (
      <div
        className="book-cover-card"
        data-subject-name={s.name.toLowerCase()}
        onClick={() => openSubject(id, "overview")}
      >
        <div className="book-cover" style={{ background: `var(--${s.color}-soft)` }}>
          <div className="book-cover-icon">{s.icon}</div>
        </div>
        <div className="book-card-name">{s.name}</div>
      </div>
    );
  };

  return (
    <section className="screen active" id="screen-books">
      <span className="eyebrow">100,000+ resources</span>
      <h1 className="page-title">Books</h1>

      <div className="search-wrap" style={{ marginBottom: 16 }}>
        <div className="home-search">
          <SearchIcon size={17} />
          <input
            type="text"
            id="bookSearchInput"
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search titles, topics or authors…"
          />
        </div>
      </div>

      <span className="eyebrow">Browse by type</span>
      <div className="book-type-toggle">
        <button
          className={`book-type-btn${bookType === "books" ? " active" : ""}`}
          data-booktype="books"
          onClick={() => selectType("books")}
        >
          <span className="ttb-icon">📗</span><span className="ttb-name">Books</span><span className="ttb-count">42,300</span>
        </button>
        <button
          className={`book-type-btn${bookType === "pastquestions" ? " active" : ""}`}
          data-booktype="pastquestions"
          onClick={() => selectType("pastquestions")}
        >
          <span className="ttb-icon">📝</span><span className="ttb-name">Textbooks</span><span className="ttb-count">31,800</span>
        </button>
      </div>

      <div id="bookGenreView">
        <div className="shelf-chip-row" id="shelfChipRow">
          {shelfChips.map((c) => (
            <button
              key={c.name}
              className={`shelf-chip${shelfFilter === c.name ? " active" : ""}`}
              onClick={() => selectShelf(c.name)}
            >
              {c.label}
            </button>
          ))}
          <button className="shelf-chip">More shelves</button>
        </div>

        {bookType === "books" && (
          <div id="spotlightSection">
            <span className="shelf-section-title">Spotlight</span>
            <div className="book-shelf-row" id="spotlightRow">
              {spotlightBooks.length ? (
                spotlightBooks.map((b) => <BookCover key={b.title} b={b} />)
              ) : (
                <p style={{ fontSize: 12.5, color: "var(--ash)" }}>Nothing in the spotlight here yet.</p>
              )}
            </div>
          </div>
        )}

        {bookType === "pastquestions" ? (
          <>
            <span className="shelf-section-title" id="recentSectionTitle">Subjects</span>
            <div className="book-shelf-grid" id="recentGrid">
              {subjectItems.length ? (
                subjectItems.map((id) => <SubjectCover key={id} id={id} />)
              ) : (
                <p style={{ fontSize: 12.5, color: "var(--ash)" }}>No subjects match your search.</p>
              )}
            </div>
          </>
        ) : (
          <>
            <span className="shelf-section-title" id="recentSectionTitle" style={{ display: "none" }}>Recently added</span>
            <div id="recentGrid">
              {genreRows.length ? (
                genreRows.map((row) => (
                  <div key={row.genreName}>
                    <span className="shelf-section-title genre-row-title">{row.genreName}</span>
                    <div className="book-shelf-row">
                      {row.items.map((b) => <BookCover key={b.title} b={b} />)}
                    </div>
                  </div>
                ))
              ) : (
                <p style={{ fontSize: 12.5, color: "var(--ash)" }}>No titles match your search.</p>
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export const GENRE_SUBJECT = GENRE_SUBJECT_MAP;