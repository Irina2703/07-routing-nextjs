import axios from "axios";
import type { Note } from "@/types/note";

export interface CreateNoteParams {
    title: string;
    content: string;
    tag: "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";
}

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
    },
});

export async function fetchNotes(
    page: number,
    userQuery: string = ""
): Promise<{ notes: Note[]; totalPages: number }> {
    const res = await api.get<{ notes: Note[]; totalPages: number }>("/notes", {
        params: { page, search: userQuery },
    });
    return res.data;
}

export async function fetchNoteById(id: string): Promise<Note> {
    const res = await api.get<Note>(`/notes/${id}`);
    return res.data;
}

export async function createNote(
    newNote: CreateNoteParams
): Promise<Note> {
    const res = await api.post<Note>("/notes", newNote);
    return res.data;
}

export async function deleteNote(id: string): Promise<{ message: string }> {
    const res = await api.delete<{ message: string }>(`/notes/${id}`);
    return res.data;
}
