import { useRef, useState, type JSX } from "react";
import styles from "./Uploader.module.css";
import ResultsPanel from "./Results/ResultsPannel";
import RotatingRing from "../Spinners/RotatingRing";
import PulsingDots from "../Spinners/PulsingDots";

// WITH STREAM
const sendFileToBackend = async (
  file: File,
  setStatus: (val: string) => void,
  setResult: (val: any) => void,
): Promise<void> => {
  try {
    setStatus("uploading");
    const formData = new FormData();
    formData.append("cv", file);

    const response = await fetch("http://localhost:5000/api/analyse", {
      method: "POST",
      body: formData,
    });

    const reader = response.body?.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { done, value } = await reader!.read();
      if (done) break;

      const chunk = decoder.decode(value);
      const lines = chunk.split("\n\n").filter(Boolean);

      for (const line of lines) {
        const data = JSON.parse(line.replace("data: ", ""));

        if (data.status === "uploading") {
          setStatus("uploading");
        }
        if (data.status === "analysing") {
          setStatus("analysing");
        }
        if (data.status === "done") {
          setStatus("done");
          setResult(data.response);
        }
        if (data.status === "error") {
          setStatus("error");
        }
      }
    }
  } catch (error) {
    setStatus("error");
  }
};

function Uploader(): JSX.Element {
  const [status, setStatus] = useState("none");
  const [result, setResult] = useState<any>();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange: (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => void = (event) => {
    const fileInput = event.target;
    const file = fileInput.files?.[0];
    if (file) {
      sendFileToBackend(file, setStatus, setResult);
    }
  };
  const handleUpload: () => void = () => inputRef.current?.click();

  return (
    <div className={styles.uploader}>
      <div className={styles.upload_section}>
        <h2 className={styles.uploader_heading}>
          Zero confusion with quantified results and suggestions
        </h2>
        <div className={styles.dropbox}>
          <p>Upload your resume in pdf format only here!</p>
          <input
            type="file"
            accept=".pdf"
            style={{ display: "none" }}
            id="cv-upload"
            onChange={handleFileChange}
            ref={inputRef}
          />
          <button className={styles.btn} onClick={handleUpload}>
            Upload Your Resume
          </button>
        </div>
      </div>
      <div className={styles.results_section}>
        {status === "uploading" && (
          <div className={styles.status_box}>
            <RotatingRing />
            <p className={styles.status}>Uploading your CV...</p>
          </div>
        )}
        {status === "analysing" && (
          <div className={styles.status_box}>
            <PulsingDots />
            <p className={styles.status}>Analysing with AI...</p>
          </div>
        )}
        {status === "done" && <ResultsPanel result={result} />}
        {status === "error" && <p>Something went wrong, please try again</p>}
        {status === "none" && (
          <div className={styles.status_box}>
            <p className={styles.status}>See your report here!</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Uploader;

// Without Streams
// const sendFileToBackend = async (file: File): Promise<void> => {
//   try {
//     const formData = new FormData();
//     formData.append("cv", file);
//     const response = await fetch("http://localhost:5000/api/analyse", {
//       method: "POST",
//       body: formData,
//     });
//     const data = await response.json();
//     console.log(data);
//   } catch (error) {
//     console.error("Error:", error);
//   }
// };
