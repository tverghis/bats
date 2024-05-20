import { invoke } from "@tauri-apps/api";
import { createEffect, createResource, createSignal } from "solid-js";
import StatusBar from "./components/StatusBar";
import { Sidebar } from "./components/sidebar";

function App() {
  const [plugins] = createResource(() => invoke("discover_plugins"));
  const [pluginNames, setPluginNames] = createSignal([]);
  const [selectedPluginName, setSelectedPluginName] = createSignal(undefined);

  createEffect(() => {
    if (!plugins.loading && !plugins.error) {
      const names = Object.keys(plugins()).sort();
      setPluginNames(names);

      if (names.length > 0) {
        setSelectedPluginName(names[0]);
      }
    }
  });

  return (
    <div className="bg-rosePine-base text-rosePine-text h-screen flex flex-row select-none cursor-default">
      <div className="h-full py-8 border-r border-r-rosePine-highlightHigh bg-rosePine-surface">
        <Sidebar plugins={pluginNames()} />
      </div>
      <div className="p-8">
        <div className="mb-8">
          <h3 className="text-lg">Plugin: {selectedPluginName()}</h3>
        </div>
      </div>
      <div className="fixed bottom-0 left-0 right-0 border-t border-t-rosePine-highlightHigh bg-rosePine-surface">
        <StatusBar />
      </div>
    </div>
  );
}

export default App;
