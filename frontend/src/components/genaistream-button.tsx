export function GenAIStreamButton() {
  // Frontend example
  const generateStreamingContent = async (prompt: string) => {
    const eventSource = new EventSource(
      `http://localhost:3000/generate_stream?prompt=${encodeURIComponent(prompt)}`
    );

    eventSource.onmessage = (event) => {
      if (event.data === "[DONE]") {
        eventSource.close();
        return;
      }

      const chunk = JSON.parse(event.data);
      // Update UI with each word/chunk
      //   setContent((prev) => prev + chunk);
    };

    eventSource.onerror = (error) => {
      console.error("Stream error:", error);
      eventSource.close();
    };
  };

  return <div></div>;
}
