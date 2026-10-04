function LessonViewer({ lesson, onClose }) {
  if (!lesson) return null;

  const startLesson = () => {
    onClose();

    const basePath = import.meta.env.BASE_URL.replace(/\/$/, "");

    window.location.href = `${basePath}/lesson/${lesson.number}`;
  };

  return (
    <div className="lesson-overlay" onClick={onClose}>

      <div
        className="lesson-viewer"
        onClick={(event) => event.stopPropagation()}
      >

        <button
          className="lesson-close"
          onClick={onClose}
          aria-label="Close lesson"
          type="button"
        >
          ×
        </button>

        <div className="lesson-label">
          ARRAYVERSE // LESSON {lesson.number}
        </div>

        <h2>{lesson.title}</h2>

        <p className="lesson-description">
          {lesson.description}
        </p>

        <div className="lesson-block">
          <span>WHAT YOU WILL LEARN</span>

          <p>
            {lesson.explanation ||
              "Explore this array concept through visual explanations and interactive examples."}
          </p>
        </div>

        <div className="lesson-block">
          <span>LESSON STATUS</span>

          <p>
            This lesson is ready to explore. Complete this lesson
            to continue to the next stage of your Arrayverse journey.
          </p>
        </div>

        <div className="lesson-actions">

          <button
            className="lesson-start"
            onClick={startLesson}
            type="button"
          >
            START LESSON →
          </button>

        </div>

      </div>

    </div>
  );
}

export default LessonViewer;