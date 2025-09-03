import type { Note } from "@/types/note";

export interface CreateNoteParams {
    title: string;
    content: string;
    tag: "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";
}

export async function fetchNotes(page: number, userQuery: string = "") {
    const res = await fetch(`/api/notes?page=${page}&search=${userQuery}`);
    return res.json() as Promise<{ notes: Note[]; totalPages: number }>;
}

export async function fetchNoteById(id: string) {
    const res = await fetch(`/api/notes?id=${id}`);
    return res.json() as Promise<Note>;
}

export async function createNote(newNote: CreateNoteParams) {
    const res = await fetch(`/api/notes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newNote),
    });
    return res.json() as Promise<Note>;
}

export async function deleteNote(id: string) {
    const res = await fetch(`/api/notes?id=${id}`, { method: "DELETE" });
    return res.json() as Promise<Note>;
}
