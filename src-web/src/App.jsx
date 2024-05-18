import { invoke } from "@tauri-apps/api";
import { For, createResource } from "solid-js";
import StatusBar from "./components/StatusBar";

function App() {
  const [dirs] = createResource(() => invoke("discover_ae_app_dirs"));

  return (
    <div className="bg-rosePine-base h-screen text-rosePine-text">
      <div className="p-8">
        {dirs.loading && <p>Loading...</p>}
        {dirs.error && <p>Error!</p>}
        {dirs() && (
          <ul>
            <For each={dirs()}>{(dir) => <li>{dir}</li>}</For>
          </ul>
        )}
      </div>
      <div className="fixed bottom-0 left-0 right-0">
        <StatusBar />
      </div>
    </div>
  );
}

export default App;
