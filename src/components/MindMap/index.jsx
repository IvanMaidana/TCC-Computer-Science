import React, { useEffect, useRef } from "react";
import { Markmap } from "markmap-view";
import { Transformer } from "markmap-lib";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";


export function MindMapViewer({ markdown }) {
    const divRef = useRef(null); 
    const transformer = new Transformer(); 

    useEffect(() => {
        if (!divRef.current) return;

        // Cria o elemento SVG dinamicamente
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.style.width = "100%";
        svg.style.height = "100%";
        svg.style.fontSize = '14px';

        divRef.current.appendChild(svg);

        // Cria o mapa mental no SVG
        const mm = Markmap.create(svg); 
        const { root } = transformer.transform(markdown); 
        mm.setData(root);
        mm.fit();

        return () => {
            divRef.current.removeChild(svg);
        };
    });

    // Função para baixar como PNG
    const handleDownloadPNG = () => {
        if (!divRef.current) return;

        // Usa html2canvas para capturar o conteúdo da div
        html2canvas(divRef.current).then((canvas) => {
            const link = document.createElement("a");
            link.href = canvas.toDataURL("image/png");
            link.download = "mapa-mental.png"; // Nome do arquivo PNG
            link.click();
        });
    };

    // Função para baixar como PDF
    const handleDownloadPDF = () => {
        if (!divRef.current) return;

        // Usa html2canvas para capturar o conteúdo da div
        html2canvas(divRef.current).then((canvas) => {
            const pdf = new jsPDF("landscape", "mm", "a4");
            const imgData = canvas.toDataURL("image/png");
            const imgWidth = 297; // Largura em mm para A4 landscape
            const pageHeight = 210; // Altura da página em mm
            const imgHeight = (canvas.height * imgWidth) / canvas.width;

            let position = 0;
            pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
            pdf.save("mapa-mental.pdf"); // Nome do arquivo PDF
        });
    };

    return (
        <div
            style={{
                width: "100%",
                height: "100%vh",
                backgroundColor: "#f9f9f9",
                border: "1px solid #ccc",
                borderRadius: "8px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                padding: "10px",
            }}
        >
            {/* Div para o SVG */}
            <div
                ref={divRef}
                style={{
                    width: "100%",
                    height: "calc(100% - 50px)",
                }}
            ></div>

            {/* Botões para baixar o mapa */}
            <div
                style={{
                    position: "relative",
                    bottom: "20px",
                    right: "10px", 
                    display: "flex",
                    gap: "10px",
                }}
            >
                <button
                    onClick={handleDownloadPNG}
                    style={{
                        padding: "10px 20px",
                        fontSize: "16px",
                        backgroundColor: "#007bff",
                        color: "#fff",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                    }}
                >
                    Baixar PNG
                </button>
                <button
                    onClick={handleDownloadPDF}
                    style={{
                        padding: "10px 20px",
                        fontSize: "16px",
                        backgroundColor: "#28a745",
                        color: "#fff",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                    }}
                >
                    Baixar PDF
                </button>
            </div>
        </div>
    );
}
