import { useRef, type JSX } from "react";
import styles from "./Uploader.module.css";

const sendFileToBackend = async (file: File): Promise<void> => {
  try {
    const formData = new FormData();
    formData.append("cv", file);
    const response = await fetch("http://localhost:5000/api/analyse", {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Error:", error);
  }
};

function Uploader(): JSX.Element {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange: (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => void = (event) => {
    const fileInput = event.target;
    const file = fileInput.files?.[0];
    if (file) {
      sendFileToBackend(file);
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
      <div className={styles.results_section}></div>
    </div>
  );
}

export default Uploader;
