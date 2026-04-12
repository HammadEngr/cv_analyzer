import type { JSX } from "react";
import Layout from "./components/layout/Layout";
import Uploader from "./components/uploader/Uploader";
function App(): JSX.Element {
  return (
    <Layout>
      <Uploader />
    </Layout>
  );
}

export default App;
