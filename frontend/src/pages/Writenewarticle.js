import React, { useState } from "react";
import Navigationbar from "../component/Navigationbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Writenewarticle.css";

export default function Writenewarticle() {
  const navigate = useNavigate();
  const writerId = localStorage.getItem("writerId");

  const [formData, setFormData] = useState({
    topic: "",
    description: "",
    newsType: "LOCAL",
    category: "",
    country: "",
    sport: "",
  });

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    setFile(selected);
    if (selected && selected.type.startsWith("image/")) {
      setPreview(URL.createObjectURL(selected));
    } else {
      setPreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const data = new FormData();
    data.append("topic",       formData.topic);
    data.append("description", formData.description);
    data.append("newsType",    formData.newsType);
    data.append("writerId",    writerId);

    if (formData.newsType === "LOCAL")   data.append("category", formData.category);
    if (formData.newsType === "FOREIGN") data.append("country",  formData.country);
    if (formData.newsType === "SPORTS")  data.append("sport",    formData.sport);
    if (file) data.append("file", file);

    try {
      await axios.post("http://localhost:8090/api/news/create", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setIsError(false);
      setMessage("Article published successfully!");

     // setTimeout(() => navigate("/writer-dashboard"), 1500);

    } catch (error) {
      setIsError(true);
      setMessage("Failed to publish. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navigationbar />
      <div className="write-article-page">

        <div className="write-article-header">
          <h1>✍️ Write New Article</h1>
          <p>Fill in the details below to publish your news article</p>
        </div>

        {message && (
          <div className={`article-message ${isError ? "error" : "success"}`}>
            {message}
          </div>
        )}

        <form className="write-article-form" onSubmit={handleSubmit}>

          {/* Topic */}
          <div className="form-group">
            <label>News Topic *</label>
            <input
              type="text"
              name="topic"
              placeholder="Enter news topic / headline"
              value={formData.topic}
              onChange={handleChange}
              required
            />
          </div>

          {/* Description */}
          <div className="form-group">
            <label>Description *</label>
            <textarea
              name="description"
              placeholder="Write your full news article here..."
              value={formData.description}
              onChange={handleChange}
              rows={8}
              required
            />
          </div>

          {/* News Type */}
          <div className="form-group">
            <label>News Type *</label>
            <div className="news-type-buttons">
              {["LOCAL", "FOREIGN", "SPORTS"].map((type) => (
                <button
                  key={type}
                  type="button"
                  className={`type-btn ${formData.newsType === type ? "active" : ""}`}
                  onClick={() => setFormData({ ...formData, newsType: type })}
                >
                  {type === "LOCAL"   && "📍 Local"}
                  {type === "FOREIGN" && "🌍 Foreign"}
                  {type === "SPORTS"  && "🏆 Sports"}
                </button>
              ))}
            </div>
          </div>

          {/* Conditional Fields */}
          {formData.newsType === "LOCAL" && (
            <div className="form-group">
              <label>Category</label>
              <input
                type="text"
                name="category"
                placeholder="e.g. Politics, Health, Education"
                value={formData.category}
                onChange={handleChange}
              />
            </div>
          )}

          {formData.newsType === "FOREIGN" && (
            <div className="form-group">
              <label>Country</label>
              <input
                type="text"
                name="country"
                placeholder="e.g. USA, UK, India"
                value={formData.country}
                onChange={handleChange}
              />
            </div>
          )}

          {formData.newsType === "SPORTS" && (
            <div className="form-group">
              <label>Sport</label>
              <input
                type="text"
                name="sport"
                placeholder="e.g. Cricket, Football, Tennis"
                value={formData.sport}
                onChange={handleChange}
              />
            </div>
          )}

          {/* File Upload */}
          <div className="form-group">
            <label>Attach Image or PDF (optional)</label>
            <div className="file-upload-area">
              <input
                type="file"
                id="fileUpload"
                accept="image/*,application/pdf"
                onChange={handleFileChange}
                hidden
              />
              <label htmlFor="fileUpload" className="file-upload-label">
                {file ? (
                  <span>📎 {file.name}</span>
                ) : (
                  <span>📁 Click to upload image or PDF</span>
                )}
              </label>
            </div>

            {/* Image Preview */}
            {preview && (
              <div className="image-preview">
                <img src={preview} alt="Preview" />
                <button
                  type="button"
                  className="remove-file"
                  onClick={() => { setFile(null); setPreview(null); }}
                >
                  ✕ Remove
                </button>
              </div>
            )}

            {/* PDF name display */}
            {file && !preview && (
              <div className="pdf-preview">
                <span>📄 {file.name}</span>
                <button
                  type="button"
                  className="remove-file"
                  onClick={() => setFile(null)}
                >
                  ✕ Remove
                </button>
              </div>
            )}
          </div>

          {/* Buttons */}
          <div className="form-actions">
            <button
              type="button"
              className="cancel-btn"
              onClick={() => navigate("/Writerdashboard")}
            >
              Cancel
            </button>
            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? "Publishing..." : "🚀 Publish Article"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
