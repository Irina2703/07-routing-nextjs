import { NextResponse } from "next/server";
import axios from "axios";

const LINK = "https://notehub-public.goit.study/api/notes";
const NOTEHUB_TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const page = searchParams.get("page") || "1";
    const search = searchParams.get("search") || "";

    try {
        const url = id ? `${LINK}/${id}` : LINK;
        const response = await axios.get(url, {
            params: id ? undefined : { page, perPage: 12, search },
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${NOTEHUB_TOKEN}`,
            },
        });
        return NextResponse.json(response.data);
    } catch (error: any) {
        return NextResponse.json(
            { message: error.message },
            { status: error.response?.status || 500 }
        );
    }
}

export async function POST(request: Request) {
    const body = await request.json();
    try {
        const response = await axios.post(LINK, body, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${NOTEHUB_TOKEN}`,
            },
        });
        return NextResponse.json(response.data, { status: 201 });
    } catch (error: any) {
        return NextResponse.json(
            { message: error.message },
            { status: error.response?.status || 500 }
        );
    }
}

export async function DELETE(request: Request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ message: "Missing id" }, { status: 400 });

    try {
        const response = await axios.delete(`${LINK}/${id}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${NOTEHUB_TOKEN}`,
            },
        });
        return NextResponse.json(response.data);
    } catch (error: any) {
        return NextResponse.json(
            { message: error.message },
            { status: error.response?.status || 500 }
        );
    }
}
