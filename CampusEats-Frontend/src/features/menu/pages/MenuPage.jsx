import { useState } from "react";
import { useDebounce } from "../hooks/useDebounce";
import { useFetch } from "../hooks/useFetch";
import MenuList from "../components/MenuList";
import { apiUrl } from "../../../api";

function MenuPage() {
  const [query, setQuery] = useState("");
  const debounced = useDebounce(query, 400);

  // const filtered = SAMPLE.filter((d) =>
  //   d.name.toLowerCase().includes(debounced.toLowerCase()),
  // );

  const { data: dishes, isLoading, error } = useFetch(apiUrl("/api/menu"));

  if (isLoading) return <p>Loading menu…</p>; // 1. loading
  if (error) return <p>Could not load menu: {error}</p>; // 2. error

  // 3. success → render search + <MenuList dishes={...} />
  const filtered = dishes.filter((d) =>
    d.name.toLowerCase().includes(debounced.toLowerCase()),
  );

  return (
    <div>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search dishes..."
      />
      <MenuList dishes={filtered} />
    </div>
  );
}
export default MenuPage;
