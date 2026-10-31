
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function LegacyPage({ file, css }) {
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`/legacy/${file}`)
      .then((response) => {
        if (!response.ok) throw new Error("Page not found");
        return response.text();
      })
      .then((html) => {
        const doc = new DOMParser().parseFromString(html, "text/html");

        let body = doc.body.innerHTML;

        body = body.replaceAll(
          'src="images/',
          'src="/legacy/images/'
        );

        body = body.replaceAll(
          "src='images/",
          "src='/legacy/images/"
        );

        setContent(body);
      })
      .catch(() => setError("Unable to load page."));
  }, [file]);

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = `/legacy/${css}`;
    document.head.appendChild(link);

    return () => link.remove();
  }, [css]);

  function handleClick(event) {
    const anchor = event.target.closest("a");
    if (!anchor) return;

    const routes = {
      "Home.html": "/",
      "Dashboard.html": "/dashboard",
      "Workout.html": "/workouts",
      "Progress.html": "/progress"
    };

    const href = anchor.getAttribute("href");

    if (routes[href]) {
      event.preventDefault();
      navigate(routes[href]);
    }
  }

  if (error) return <p>{error}</p>;

  return (
    <div onClick={handleClick}>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
}

export default LegacyPage;
