import { invoke } from "@tauri-apps/api";
import { createEffect, createResource, createSignal } from "solid-js";
import StatusBar from "./components/StatusBar";
import { Sidebar } from "./components/sidebar";
import { MainDisplay } from "./components/mainDisplay";

function App() {
  const [plugins] = createResource(() => invoke("discover_plugins"));
  const [loadedPlugins, setLoadedPlugins] = createSignal([]);
  const [pluginNames, setPluginNames] = createSignal([]);
  const [mainDisplaySubject, setMainDisplaySubject] = createSignal({
    kind: "Empty",
  });

  createEffect(() => {
    if (!plugins.loading && !plugins.error) {
      setLoadedPlugins(plugins());
      const names = Object.keys(plugins()).sort();
      setPluginNames(names);
      setMainDisplaySubject({ kind: "PluginsTable" });
    }
  });

  return (
    <div className="bg-rosePine-base text-rosePine-text h-screen flex flex-row select-none cursor-default">
      <div className="h-full py-8 border-r border-r-rosePine-highlightHigh bg-rosePine-surface">
        <Sidebar
          plugins={pluginNames()}
          subject={mainDisplaySubject()}
          setSubject={setMainDisplaySubject}
        />
      </div>
      <div className="py-8 w-full">
        <MainDisplay
          plugins={loadedPlugins()}
          subject={mainDisplaySubject()}
          setSubject={setMainDisplaySubject}
        />
      </div>
      <div className="fixed bottom-0 left-0 right-0 border-t border-t-rosePine-highlightHigh bg-rosePine-surface">
        <StatusBar />
      </div>
    </div>
  );
}

export default App;
