import React, { useRef, useState, useEffect } from "react";
import "./Vision.css";

const Vision = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [emocion, setEmocion] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function iniciarCamara() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        setError("No se pudo acceder a la cámara: " + err.message);
      }
    }
    iniciarCamara();

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const capturarYDetectar = () => {
    setLoading(true);
    setError(null);
    setEmocion(null);

    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (!video || !canvas) {
      setError("Video o canvas no están disponibles.");
      setLoading(false);
      return;
    }

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    canvas.toBlob(async (blob) => {
      if (!blob) {
        setError("Error al capturar la imagen.");
        setLoading(false);
        return;
      }

      const formData = new FormData();
      formData.append("file", blob, "captura.jpg");

      try {
        const response = await fetch("http://localhost:8000/detectar-emocion/", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.detail || "Error en la API");
        }

        const data = await response.json();
        setEmocion(data.emocion_dominante || "No se detectó emoción");

      } catch (err) {
        setError("Error al detectar emoción: " + err.message);
      } finally {
        setLoading(false);
      }
    }, "image/jpeg");
  };

  return (
    <div className="vision-container" style={{ textAlign: "center", padding: 20 }}>
      <h1 className="titulo-vision">Visión artificial para detectar emociones</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        style={{ width: 320, height: 240, borderRadius: 8, border: "1px solid #ccc", marginTop: 10 }}
      />

      <div style={{ marginTop: 15 }}>
        <button onClick={capturarYDetectar} disabled={loading} style={{ padding: "10px 20px", fontSize: 16 }}>
          {loading ? "Detectando..." : "Capturar y detectar emoción"}
        </button>
      </div>

      {emocion && (
        <div style={{ marginTop: 20 }}>
          <h3>Emoción detectada:</h3>
          <p style={{ fontSize: 18, fontWeight: "bold" }}>{emocion}</p>
        </div>
      )}

      <canvas ref={canvasRef} style={{ display: "none" }} />
    </div>
  );
};

export default Vision;
