import { invoke } from "@tauri-apps/api";
import { For, createResource } from "solid-js";

function App() {
  const [dirs] = createResource(() => invoke("discover_ae_app_dirs"));

  return (
    <div className="bg-rosePine-base h-screen text-rosePine-text">
      {dirs.loading && <p>Loading...</p>}
      {dirs.error && <p>Error!</p>}
      {dirs() && <For each={dirs()}>{(dir) => <li>{dir}</li>}</For>}
    </div>
  );
}

export default App;
