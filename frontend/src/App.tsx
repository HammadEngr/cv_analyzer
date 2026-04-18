import type { JSX } from "react";
import Layout from "./components/layout/Layout";
import GenericUploader from "./components/uploader/GenericUploader";
function App(): JSX.Element {
  return (
    <Layout>
      <GenericUploader />
    </Layout>
  );
}

export default App;
