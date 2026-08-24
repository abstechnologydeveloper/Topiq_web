"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { BOOK_CATALOG, BOOK_GENRES, GENRE_SUBJECT_MAP } from "../../data";
import { bookFileMeta } from "./BooksScreen";
import type { SubjectData } from "./DiscoverScreen";
import { BackChevron } from "./shared";

type Props = {
  title: string;
  subjects: Record<string, SubjectData>;
};

type DocViewerBook = { title: string; icon: string; genre: string };

export default function BookDetail({ title, subjects }: Props) {
  const router = useRouter();
  const b = BOOK_CATALOG.find((x) => x.title === title);
  const [viewer, setViewer] = useState<DocViewerBook | null>(null);

  if (!b) {
    return (
      <section className="screen active" id="screen-bookdetail">
        <div className="back-row" onClick={() => router.push("/dashboard/books")}>
          <BackChevron /> Books
        </div>
        <span className="eyebrow" style={{ display: "block", marginTop: 10 }}>Book not found</span>
        <h1 className="page-title">Something went wrong</h1>
      </section>
    );
  }

  const genreColor = (() => {
    const c = BOOK_GENRES.find((g) => g.name === b.genre);
    return c ? c.color : "thread";
  })();

  const meta = bookFileMeta(b.title);
  const subjectId = GENRE_SUBJECT_MAP[b.genre as keyof typeof GENRE_SUBJECT_MAP];
  const subject = subjectId ? subjects[subjectId] : undefined;

  const openViewer = () => setViewer({ title: b.title, icon: b.icon, genre: b.genre });

  return (
    <section className="screen active" id="screen-bookdetail">
      <div className="back-row" onClick={() => router.push("/dashboard/books")}>
        <BackChevron /> Books
      </div>
      <div id="bookDetailHeader">
        <div className="book-detail-hero">
          <div className="book-detail-cover" style={{ background: `var(--${genreColor}-soft)` }}>{b.icon}</div>
          <div>
            <div className="book-detail-title">{b.title}</div>
            <div className="book-detail-genre">{b.genre}</div>
          </div>
        </div>
      </div>
      <span className="eyebrow" style={{ marginTop: 18, display: "block" }}>Soft copy</span>
      <div id="bookFileCard">
        <div className="book-file-card">
          <div className="book-file-icon">PDF</div>
          <div>
            <div className="book-file-name">{meta.filename}</div>
            <div className="book-file-meta">{meta.pages} pages · {meta.sizeMB} MB · from server</div>
          </div>
          <button className="book-file-read-btn" onClick={openViewer}>Read →</button>
        </div>
      </div>
      <span className="eyebrow" style={{ marginTop: 18, display: "block" }}>Practice</span>
      <div id="bookPracticeBox">
        <div className="book-practice-card">
          {subject ? (
            <>
              <p>Test yourself on {subject.name} — grounded practice questions, marked instantly.</p>
              <button onClick={() => router.push(`/dashboard/practice?setup=${subjectId}`)}>Practice {subject.name} →</button>
            </>
          ) : (
            <p>Practice questions for this title are still being put together — check back soon.</p>
          )}
        </div>
      </div>

      {viewer && (
        <DocViewer
          book={viewer}
          onClose={() => setViewer(null)}
        />
      )}
    </section>
  );
}

function DocViewer({ book, onClose }: { book: DocViewerBook; onClose: () => void }) {
  const meta = bookFileMeta(book.title);
  const [pageNum, setPageNum] = useState(1);

  const jump = (val: number) =>
    setPageNum(Math.max(1, Math.min(meta.pages, val || 1)));

  return (
    <div className="modal-overlay show" id="docViewerModal" onClick={onClose}>
      <div className="modal-sheet" style={{ maxWidth: 520, padding: 0, overflow: "hidden" }} onClick={(e) => e.stopPropagation()}>
        <div className="doc-viewer-topbar">
          <button className="doc-viewer-close" onClick={onClose}>✕</button>
          <div className="doc-viewer-filename" id="docViewerFilename">{meta.filename}</div>
          <div className="doc-viewer-page" id="docViewerPageIndicator">{pageNum} / {meta.pages}</div>
        </div>
        <div className="doc-viewer-canvas" id="docViewerCanvas">
          <div className="doc-viewer-page-sheet">
            <strong>{book.title}</strong>
            <p style={{ marginTop: 14, color: "#555" }}>
              Streaming page {pageNum} of {meta.pages} from the library file server ({meta.url}). The full page content renders here in the production app — this mockup shows the reader shell, not the book's actual text.
            </p>
            <div className="dvp-pagenum">— {pageNum} —</div>
          </div>
        </div>
        <div className="doc-viewer-controls">
          <button className="doc-viewer-nav" id="docViewerPrev" disabled={pageNum <= 1} onClick={() => jump(pageNum - 1)}>‹ Prev</button>
          <input type="range" id="docViewerSlider" min={1} max={meta.pages} value={pageNum} onChange={(e) => jump(parseInt(e.target.value, 10))} />
          <button className="doc-viewer-nav" id="docViewerNext" disabled={pageNum >= meta.pages} onClick={() => jump(pageNum + 1)}>Next ›</button>
        </div>
      </div>
    </div>
  );
}