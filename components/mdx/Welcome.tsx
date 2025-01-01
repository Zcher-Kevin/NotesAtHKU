import React from "react";
import Giscus from "../Giscus";

interface WelcomeProps {
  course: string;
}

const Welcome: React.FC<WelcomeProps> = ({ course }) => {
  return (
    <>
      <h2>Welcome readers!</h2>
      <p>
        Welcome readers! These notes are designed to condense the core concepts
        for the course {course} at HKU. They are written in a manner that is
        (hopefully) easy to understand if read chronologically, however, they
        are not exhaustive and do not include extensive examples and
        applications.
      </p>
      <p>
        Keep in mind that course contents might change over time. If you spot
        any errors, feel free to contribute to the notes by submitting a pull
        request on the{" "}
        <a href="https://github.com/EnhancedJax/notes.jaxtam.dev">
          GitHub repository
        </a>
        , or by leaving a comment below!
      </p>
      <p>Good luck!</p>
      <h3>PDF version</h3>
      <p>
        For notes written before 2024 Winter, you can download a PDF version of
        the notes <a href={`https://jaxtam.dev/notes/${course}`}>here</a>. Note
        that they will not receive any content updates.
      </p>
      <Giscus courseCode={course} />
    </>
  );
};

export default Welcome;
