import Link from "next/link";
import css from "./Sidebar.module.css";

const tags = ["All", "Todo", "Work", "Personal", "Meeting", "Shopping"];

export default function Sidebar() {
    return (
        <aside className={css.sidebar}>
            <ul>
                {tags.map((tag) => (
                    <li key={tag}>
                        <Link href={`/notes/filter/${tag.toLowerCase()}`}>
                            {tag}
                        </Link>
                    </li>
                ))}
            </ul>
        </aside>
    );
}
