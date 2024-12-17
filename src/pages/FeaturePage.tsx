import React from "react";

const IFeaturePage: React.FC = () => {
    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Feature Under Development</h1>
            <p style={styles.subtitle}>
                We're working hard to bring you this feature soon. Stay tuned!
            </p>
        </div>
    );
};

const styles: { [key: string]: React.CSSProperties } = {
    container: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f9f9f9",
        fontFamily: "'Arial', sans-serif",
    },
    title: {
        fontSize: "2.5rem",
        color: "#333",
        marginBottom: "1rem",
    },
    subtitle: {
        fontSize: "1.2rem",
        color: "#666",
    },
};

export default IFeaturePage;
