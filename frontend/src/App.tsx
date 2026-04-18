import type { JSX } from "react";
import Layout from "./components/layout/Layout";
import GenericUploader from "./components/uploader/GenericUploader";
import JdMatchUploader from "./components/jd_match_uploader/JdMatchUploader";
function App(): JSX.Element {
  return (
    <Layout>
      <GenericUploader />
      <JdMatchUploader />
    </Layout>
  );
}

export default App;
